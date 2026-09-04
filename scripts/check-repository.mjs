#!/usr/bin/env node

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
}

function expect(condition, message) {
  if (!condition) {
    fail(message);
  }
}

function read(relativePath) {
  return readFileSync(join(repoRoot, relativePath), "utf8");
}

function readJson(relativePath) {
  try {
    return JSON.parse(read(relativePath));
  } catch (error) {
    fail(`${relativePath} is not valid JSON: ${error.message}`);
    return {};
  }
}

function sameArray(actual, expected) {
  return (
    Array.isArray(actual) &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

function collectFiles(directory) {
  const files = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === ".git" || entry.name === "node_modules") {
      continue;
    }

    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(path));
    } else if (entry.isFile()) {
      files.push(path);
    }
  }

  return files;
}

const expectedVersion = "0.1.0";
const expectedDescription = "Agent skills for clear, direct technical writing";
const expectedRepository = "https://github.com/youssoufdasilva/yds-skills";
const expectedAuthor = {
  name: "Youssouf Da Silva",
  url: "https://github.com/youssoufdasilva",
};
const expectedKeywords = [
  "agent-skills",
  "unslop",
  "technical-writing",
  "documentation",
  "claude-code",
  "codex",
];
const expectedSkillNames = ["technical-writing", "unslop"];
const expectedPluginSkills = [
  "./skills/unslop",
  "./skills/technical-writing",
];

const packageJson = readJson("package.json");
const pluginJson = readJson(".claude-plugin/plugin.json");
const marketplaceJson = readJson(".claude-plugin/marketplace.json");

expect(packageJson.name === "yds-skills", "package.json must use the yds-skills name.");
expect(packageJson.version === expectedVersion, "package.json must start at version 0.1.0.");
expect(packageJson.private === true, "package.json must remain private.");
expect(packageJson.description === expectedDescription, "package.json has the wrong description.");
expect(
  JSON.stringify(packageJson.author) === JSON.stringify(expectedAuthor),
  "package.json has the wrong author.",
);
expect(
  packageJson.repository?.url === expectedRepository,
  "package.json has the wrong repository URL.",
);
expect(packageJson.homepage === expectedRepository, "package.json has the wrong homepage.");
expect(packageJson.license === "MIT", "package.json must use the MIT license.");
expect(
  sameArray(packageJson.keywords, expectedKeywords),
  "package.json has the wrong keywords.",
);
for (const field of [
  "dependencies",
  "devDependencies",
  "peerDependencies",
  "optionalDependencies",
]) {
  expect(!(field in packageJson), `package.json must not contain ${field}.`);
}

expect(pluginJson.name === "yds-skills", "plugin.json must use the yds-skills name.");
expect(pluginJson.version === expectedVersion, "plugin.json must start at version 0.1.0.");
expect(
  pluginJson.version === packageJson.version,
  "package.json and plugin.json versions must match.",
);
expect(pluginJson.description === expectedDescription, "plugin.json has the wrong description.");
expect(
  JSON.stringify(pluginJson.author) === JSON.stringify(expectedAuthor),
  "plugin.json has the wrong author.",
);
expect(pluginJson.repository === expectedRepository, "plugin.json has the wrong repository URL.");
expect(pluginJson.homepage === expectedRepository, "plugin.json has the wrong homepage.");
expect(pluginJson.license === "MIT", "plugin.json must use the MIT license.");
expect(
  sameArray(pluginJson.keywords, expectedKeywords),
  "plugin.json has the wrong keywords.",
);
expect(
  sameArray(pluginJson.skills, expectedPluginSkills),
  "plugin.json must expose exactly unslop and technical-writing.",
);

expect(
  marketplaceJson.name === "youssoufdasilva",
  "marketplace.json must use the youssoufdasilva marketplace name.",
);
expect(
  JSON.stringify(marketplaceJson.owner) === JSON.stringify(expectedAuthor),
  "marketplace.json has the wrong owner.",
);
expect(
  marketplaceJson.description === expectedDescription,
  "marketplace.json has the wrong description.",
);
expect(
  Array.isArray(marketplaceJson.plugins) && marketplaceJson.plugins.length === 1,
  "marketplace.json must expose one plugin.",
);
const marketplacePlugin = marketplaceJson.plugins?.[0] ?? {};
expect(marketplacePlugin.name === "yds-skills", "marketplace.json has the wrong plugin name.");
expect(marketplacePlugin.source === "./", "marketplace.json must point at the repository root.");
expect(
  marketplacePlugin.description === expectedDescription,
  "marketplace.json has the wrong plugin description.",
);
expect(
  sameArray(marketplacePlugin.keywords, expectedKeywords),
  "marketplace.json has the wrong plugin keywords.",
);

const skillsRoot = join(repoRoot, "skills");
const actualSkillNames = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();
expect(
  sameArray(actualSkillNames, expectedSkillNames),
  "skills/ must contain only technical-writing and unslop.",
);

const discoveredSkillFiles = collectFiles(skillsRoot)
  .filter((path) => path.endsWith(`${sep}SKILL.md`))
  .map((path) => relative(repoRoot, path).split(sep).join("/"))
  .sort();
expect(
  sameArray(discoveredSkillFiles, [
    "skills/technical-writing/SKILL.md",
    "skills/unslop/SKILL.md",
  ]),
  "The skills.sh discovery path must expose exactly two skills.",
);

for (const skillName of expectedSkillNames) {
  const skillPath = `skills/${skillName}/SKILL.md`;
  const openaiPath = `skills/${skillName}/agents/openai.yaml`;
  expect(existsSync(join(repoRoot, skillPath)), `${skillPath} is missing.`);
  expect(existsSync(join(repoRoot, openaiPath)), `${openaiPath} is missing.`);

  if (!existsSync(join(repoRoot, skillPath)) || !existsSync(join(repoRoot, openaiPath))) {
    continue;
  }

  const skill = read(skillPath);
  const openai = read(openaiPath);
  const frontmatter = skill.split(/^---\s*$/m)[1] ?? "";

  expect(
    new RegExp(`^name:\\s*${skillName}$`, "m").test(frontmatter),
    `${skillPath} has the wrong skill name.`,
  );
  expect(
    !/^disable-model-invocation:/m.test(frontmatter),
    `${skillPath} must allow model invocation.`,
  );
  expect(/^interface:\s*$/m.test(openai), `${openaiPath} must define interface metadata.`);
  expect(
    !/^policy:\s*$/m.test(openai),
    `${openaiPath} must rely on the default model invocation policy.`,
  );
  expect(
    !/allow_implicit_invocation:\s*false/.test(openai),
    `${openaiPath} must allow implicit invocation.`,
  );
}

const technicalWriting = read("skills/technical-writing/SKILL.md");
expect(
  technicalWriting.includes('Call the Skill tool for "unslop" on every doc this skill touches.'),
  "technical-writing must call the unslop skill.",
);
expect(
  !technicalWriting.includes("/technical-writing"),
  "technical-writing must not use harness-specific invocation text in its description.",
);

const readme = read("README.md");
for (const skillName of expectedSkillNames) {
  expect(
    readme.includes(`[${skillName}](./skills/${skillName}/SKILL.md)`),
    `README.md must link ${skillName} to its SKILL.md.`,
  );
}

const proseExtensions = new Set([".json", ".md", ".mjs", ".sh", ".yaml", ".yml"]);
const allProseFiles = collectFiles(repoRoot).filter((path) => {
  return proseExtensions.has(extname(path)) || path.endsWith(`${sep}LICENSE`);
});
for (const path of allProseFiles) {
  const relativePath = relative(repoRoot, path).split(sep).join("/");
  if (readFileSync(path, "utf8").includes("\u2014")) {
    fail(`${relativePath} contains an em dash.`);
  }
}

const staleFragments = [
  ["matt", "pocock"].join(""),
  ["matt", "pocock"].join(" "),
  ["ai", "hero"].join(""),
  ["setup", "matt"].join("-"),
];
for (const path of allProseFiles) {
  const relativePath = relative(repoRoot, path).split(sep).join("/");
  if (
    relativePath === "LICENSE" ||
    relativePath.startsWith(".scratch/yds-skills-conversion/")
  ) {
    continue;
  }

  const text = readFileSync(path, "utf8").toLowerCase();
  for (const fragment of staleFragments) {
    if (text.includes(fragment)) {
      fail(`${relativePath} contains a stale inherited reference.`);
      break;
    }
  }
}

if (failures.length > 0) {
  console.error("Repository invariant checks failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Repository invariant checks passed.");

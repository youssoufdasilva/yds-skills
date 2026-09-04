Status: resolved
Type: grilling
Blocked by: 01, 02, 03

## Question

Which repository files and conventions should remain after the personal conversion? Account for installation, validation, documentation, local development, licensing, and the existing uncommitted tracker configuration without retaining Matt-specific machinery that the two-skill repository does not use.

## Answer

Use a flat, two-skill repository. The promoted set lives at these paths:

- `skills/unslop/SKILL.md`
- `skills/unslop/agents/openai.yaml`
- `skills/technical-writing/SKILL.md`
- `skills/technical-writing/agents/openai.yaml`

Both installers must expose exactly those two skills.

### Installation and public documentation

Retain `.claude-plugin/plugin.json` and `.claude-plugin/marketplace.json`. The plugin manifest lists the two skill directories explicitly. The repository marketplace is the documented Claude Code route until `yds-skills` has an official marketplace listing:

```bash
claude plugin marketplace add youssoufdasilva/yds-skills
claude plugin install yds-skills@youssoufdasilva
```

Document `skills.sh` with this command:

```bash
npx skills@latest add youssoufdasilva/yds-skills
```

The README tells users to pick one installation route because installing both creates duplicate skills.

Use `README.md` as the only human-facing product documentation. It introduces the two skills, links each name directly to its `SKILL.md`, explains invocation, and contains the installation and local development commands. Remove the bucket README files, the skill pages under `docs/engineering/` and `docs/productivity/`, and the AI Hero documentation conventions. Remove `.agents/install-block.md`, `.agents/writing-docs.md`, the old ADRs, and `.out-of-scope/` because they describe the Matt Pocock collection rather than this distribution.

### Package and release maintenance

Retain a private, dependency-free `package.json` as the source of the package identity and version. Keep `scripts/sync-plugin-version.mjs`, and use the npm `version` lifecycle to copy the package version into `.claude-plugin/plugin.json`. Keep a separate check command that fails when the versions differ.

Remove Changesets, `package-lock.json`, `.github/workflows/release.yml`, and the inherited `CHANGELOG.md`. The repository does not publish an npm package, and the first release does not need the previous repository's automated release pull requests or release history. A later release effort can add automation after its desired release flow is known.

### Validation

Provide one repository validation command through `package.json`. It must check the following invariants:

- `package.json` and `.claude-plugin/plugin.json` have version `0.1.0` and remain synchronized.
- The package, plugin, and marketplace carry the resolved `yds-skills` identity.
- The plugin and the skills.sh discovery path expose exactly `unslop` and `technical-writing`.
- Each skill contains `SKILL.md` and `agents/openai.yaml` with model invocation enabled.
- Retained prose contains no em dash.
- Retained product files contain no stale Matt Pocock references except the required copyright notice in `LICENSE` and the historical conversion record under `.scratch/yds-skills-conversion/`.

The validation command runs the repository invariant checks, `claude plugin validate . --strict`, and `npx skills@latest add . --list`. During final validation, also run the `skill-creator` validator against both skill folders and exercise both local installation routes in temporary directories. These checks must not publish, modify a remote marketplace, or overwrite installed user skills.

### Local development

Retain `scripts/link-skills.sh` as a maintainer tool, limited to the two skills. The script links them into the Claude Code and Agent Skills directories, refuses to overwrite a real directory or file, and accepts a task-specific root override so tests can run in a temporary directory. Remove `scripts/list-skills.sh`; skills.sh discovery and the repository validation command replace it.

Retain `.gitignore` for local dependency and harness state.

### License

Retain the MIT license. Its copyright block contains both lines:

```text
Copyright (c) 2026 Matt Pocock
Copyright (c) 2026 Youssouf Da Silva
```

The first line preserves attribution for inherited material. The second covers the new distribution and contributions.

### Project-local agent configuration

Retain `CLAUDE.md`, `CONTEXT.md`, `docs/agents/`, and `.scratch/yds-skills-conversion/`. The tracker files and agent docs were committed on the conversion branch before this decision. They are project maintenance configuration, not part of the promoted set.

Rewrite `CLAUDE.md` around the flat two-skill layout, the matching installer invariant, the validation command, and the existing local tracker and domain-doc pointers. Remove its bucket, AI Hero, setup-skill, and `ask-matt` rules. Keep the generic tracker, triage, and domain configuration under `docs/agents/`, and keep the conversion map as the repository's decision record.

Do not create a separate ADR for this decision. This resolved decision ticket is the canonical record.

## Comments

- 2026-09-03: Youssouf Da Silva approved the complete recommended infrastructure after a read-only pre-flight.

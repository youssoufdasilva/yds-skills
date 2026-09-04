# YDS Skills

YDS Skills is Youssouf Da Silva's collection of agent skills for clear, direct technical writing.

## Skills

- [unslop](./skills/unslop/SKILL.md) removes AI writing patterns and restores a direct, human voice.
- [technical-writing](./skills/technical-writing/SKILL.md) applies Diátaxis, Google developer style, Simplified Technical English, and Global English to technical documentation.

Both skills are model-invoked, so an agent can select them when your request matches. You can also invoke them by name. Use `/unslop` or `/technical-writing` in Claude Code, and use `$unslop` or `$technical-writing` in Codex.

## Install

Pick one installation route. Installing both routes creates duplicate copies of the skills.

### Claude Code

Add this repository as a marketplace, then install the plugin:

```bash
claude plugin marketplace add youssoufdasilva/yds-skills
claude plugin install yds-skills@youssoufdasilva
```

### skills.sh

Install the skills in any Agent Skills-compatible client:

```bash
npx skills@latest add youssoufdasilva/yds-skills
```

## Maintain the repository

Run every repository and distribution check:

```bash
npm run validate
```

Link both skills into your local Claude Code and Agent Skills directories:

```bash
./scripts/link-skills.sh
```

To test the link script without changing your installed skills, pass a temporary root:

```bash
test_root="$(mktemp -d)"
./scripts/link-skills.sh --root "$test_root"
```

Update the package and Claude Code plugin versions together:

```bash
npm version 0.1.1 --no-git-tag-version --package-lock=false
```

## License

YDS Skills is available under the [MIT License](./LICENSE).

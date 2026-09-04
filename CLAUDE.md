# YDS Skills

This repository ships one promoted set with two model-invoked skills:

- `skills/unslop/`
- `skills/technical-writing/`

## Repository rules

- Keep the promoted set flat under `skills/`.
- Keep `README.md` and `.claude-plugin/plugin.json` limited to exactly the promoted set.
- Keep the Claude Code plugin and the skills.sh discovery path in sync.
- Link each skill name in `README.md` directly to its `SKILL.md`.
- Use `README.md` as the only human-facing product documentation.
- Keep both skills model-invoked. Omit `disable-model-invocation` from each `SKILL.md`, and omit `policy.allow_implicit_invocation: false` from each `agents/openai.yaml`.
- Preserve the `technical-writing` dependency on `unslop`.
- Keep `package.json` private and dependency-free.
- Keep the package and Claude Code plugin versions synchronized through `scripts/sync-plugin-version.mjs`.
- Do not use an em dash in repository prose or code comments.
- Run `npm run validate` after changing a skill, manifest, repository metadata, or maintenance script.

`scripts/link-skills.sh` is a maintainer tool. It links only the promoted set and refuses to replace a real file or directory.

## Agent configuration

### Issue tracker

Issues live as Markdown files under `.scratch/<feature-slug>/`. See `docs/agents/issue-tracker.md`.

### Triage labels

The issue tracker uses the default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

This repository uses a single-context layout. See `docs/agents/domain.md`.

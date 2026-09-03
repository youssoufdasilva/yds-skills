Status: resolved
Type: grilling
Blocked by: none

## Question

What author name, repository URL, package metadata, plugin display name, initial version, and license attribution should identify `yds-skills`?

## Answer

Use the following repository identity for the new distribution:

- Author name: `Youssouf Da Silva`
- Author URL: `https://github.com/youssoufdasilva`
- Repository URL: `https://github.com/youssoufdasilva/yds-skills`
- Package name: `yds-skills`
- Claude Code plugin name: `yds-skills`
- Human-facing name: `YDS Skills`
- Marketplace name: `youssoufdasilva`
- Description: `Agent skills for clear, direct technical writing`
- Homepage: `https://github.com/youssoufdasilva/yds-skills`
- Keywords: `agent-skills`, `unslop`, `technical-writing`, `documentation`, `claude-code`, and `codex`
- Initial package and plugin version: `0.1.0`
- License: MIT

Keep `package.json` private. Use the same package name, description, author, repository, homepage, license, and version wherever a retained manifest supports those fields. Keep the package and Claude Code plugin versions synchronized.

Treat `yds-skills` as a new release line. Do not continue the `mattpocock-skills` `1.2.3` version sequence.

Preserve `Copyright (c) 2026 Matt Pocock` in `LICENSE` for inherited material. Add `Copyright (c) 2026 Youssouf Da Silva` for the new distribution and contributions.

## Comments

- 2026-09-03: Youssouf Da Silva approved the recommended identity, attribution, and Git setup after a read-only pre-flight.

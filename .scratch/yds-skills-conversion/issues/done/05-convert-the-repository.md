Status: resolved
Type: task
Blocked by: 04

## Question

Apply the resolved collection, identity, invocation, and infrastructure decisions. Convert the working tree to `yds-skills`, copy the two source skills, remove the ruled-out files, and update every retained reference.

## Answer

The working tree is now the `yds-skills` distribution.

- The promoted set is flat and contains only `unslop` and `technical-writing`.
- Both skills are model-invoked and include Codex interface metadata. `technical-writing` calls the Skill tool for `unslop`.
- The package, Claude Code plugin, marketplace, README, license, domain glossary, and agent instructions use the resolved repository identity.
- The repository retains only the approved maintenance scripts, generic agent configuration, and conversion record.
- Changesets, the npm lockfile, inherited release automation, old product documentation, optional collections, and the original skill buckets are removed.
- `npm run validate` checks repository invariants, the strict Claude Code plugin manifest, and skills.sh discovery.
- `scripts/link-skills.sh` links only the promoted set, accepts an isolated test root, and refuses to replace a real file or directory.

The complete repository validation command passed. Both skill-level validators passed. An isolated link test created the expected Claude Code and Agent Skills symlinks and confirmed the overwrite guard.

## Comments

- 2026-09-04: Youssouf Da Silva approved the conversion after a read-only pre-flight.

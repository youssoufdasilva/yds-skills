Label: wayfinder:map

## Destination

Convert this repository into the personal `yds-skills` distribution. Its primary promoted set contains `unslop` and `technical-writing`, and it supports both Claude Code plugin installation and `skills.sh`. Decide whether the Matt Pocock collection remains as an optional collection, then carry the conversion through implementation and validation.

## Notes

- Domain: agent skill authoring and distribution.
- Every session must consult `writing-for-agents`, `technical-writing`, and `unslop`. Consult `skill-creator` for skill changes and `plugin-creator` for plugin manifests.
- This map carries execution through completion.
- Copy the two source skills from `/home/rem/.agents/skills/unslop` and `/home/rem/.agents/skills/technical-writing`. Do not edit those source directories.
- Preserve the existing user changes in `CLAUDE.md` and `docs/agents/` until a decision ticket explicitly accounts for them.
- Use **promoted set** for the skills shipped together. Use **optional collection** for another separately installable set.

## Decisions so far

- [Choose the first-release collection scope](./issues/done/01-choose-first-release-collection-scope.md): The first release ships only `unslop` and `technical-writing`; the Matt Pocock collection remains in Git history and upstream.
- [Define repository identity](./issues/02-define-repository-identity.md): `yds-skills` starts at `0.1.0` as Youssouf Da Silva's MIT-licensed distribution, with its repository, package, plugin, and marketplace identities aligned.

## Not yet specified

None.

## Out of scope

- Rewriting Git history.
- Publishing a release or changing a remote marketplace listing.
- Editing the source skills under `/home/rem/.agents/skills/`.
- Packaging or documenting a Matt Pocock optional collection in the first release. [Choose the first-release collection scope](./issues/done/01-choose-first-release-collection-scope.md) defers that work to a separate effort.

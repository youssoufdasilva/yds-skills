Status: resolved
Type: grilling
Blocked by: none

## Question

Should the first converted repository contain only the `yds-skills` promoted set, with the original Matt Pocock collection retained in Git history, or should it also expose the Matt Pocock skills as an optional collection? Set the first-release boundary without making either installer expose an accidental mixed set.

## Answer

The first converted repository contains only the `yds-skills` promoted set: `unslop` and `technical-writing`. The Claude Code plugin and `skills.sh` must expose this same set.

The Matt Pocock skills do not remain in the working tree and do not ship as an optional collection. Git history and the upstream repository retain them.

This boundary gives the first release one product identity and one installable set. An optional collection would require its own repository layout, installer rules, documentation, attribution, and synchronization policy. Those decisions are not required to release `yds-skills`.

A later effort can add a separately installable Matt Pocock collection without reversing this decision.

## Comments

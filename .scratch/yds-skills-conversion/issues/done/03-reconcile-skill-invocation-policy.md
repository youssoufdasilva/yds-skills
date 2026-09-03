Status: resolved
Type: grilling
Blocked by: none

## Question

Should `unslop` remain model-invoked and `technical-writing` remain user-invoked, or should `technical-writing` become model-invoked so agents apply it automatically to documentation? Ensure that each skill uses matching Claude frontmatter and Codex `agents/openai.yaml` policy.

## Answer

Both `unslop` and `technical-writing` are model-invoked. Agents can select either skill automatically when its description matches the work, and users can still invoke either skill explicitly.

Apply the invocation policy consistently during the conversion:

- Omit `disable-model-invocation` from both `SKILL.md` files.
- Give both skills model-facing descriptions that state their automatic trigger cases. Remove the harness-specific `/technical-writing` phrase when copying that description.
- Create an `agents/openai.yaml` for each skill with its Codex interface metadata. Omit the `policy` block, so `allow_implicit_invocation` keeps its default value of `true`.
- Preserve `technical-writing`'s dependency on `unslop`, but express the operative instruction as a Skill tool call. This dependency is valid because `unslop` is model-invoked.

The source folders contain no `agents/openai.yaml` files. The conversion task must create them in this repository rather than edit the source folders.

## Comments

- 2026-09-03: Youssouf Da Silva approved model invocation for both skills after a read-only pre-flight.

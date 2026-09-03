# Domain docs

This repo uses a single-context domain-doc layout.

## Read domain docs before exploring

- Read `CONTEXT.md` at the repo root.
- Read ADRs in `docs/adr/` that affect the area you will work on.

If a file or directory does not exist, continue without reporting its absence. The `/domain-modeling` skill creates domain docs when the project resolves terms or decisions.

## File structure

```text
/
├── CONTEXT.md
├── docs/adr/
└── src/
```

## Use the glossary vocabulary

Use terms as defined in `CONTEXT.md` when an issue title, proposal, hypothesis, or test names a domain concept. Avoid synonyms that the glossary rejects.

If the glossary does not define a needed concept, reconsider whether the project uses that language. If the gap is real, record it for `/domain-modeling`.

## Report ADR conflicts

Report any conflict between proposed work and an existing ADR. Name the ADR and explain why the decision may need review.

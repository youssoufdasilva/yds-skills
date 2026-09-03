# Issue tracker: local Markdown

Issues and specs for this repo live as Markdown files in `.scratch/`.

## Conventions

- Store each feature in `.scratch/<feature-slug>/`.
- Store its spec in `.scratch/<feature-slug>/spec.md`.
- Store each implementation issue in `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01`.
- Record triage state in a `Status:` line near the top of each issue file. See `triage-labels.md` for the role strings.
- Append comments and conversation history under a `## Comments` heading at the bottom of the file.

## When a skill says "publish to the issue tracker"

Create a file under `.scratch/<feature-slug>/`. Create the directory if it does not exist.

## When a skill says "fetch the relevant ticket"

Read the referenced file. The user normally passes the path or issue number.

## Wayfinding operations

`/wayfinder` uses a map file with one child file per decision ticket.

- Store the map in `.scratch/<effort>/map.md`. Its body contains the Notes, Decisions-so-far, and Fog sections.
- Store each child in `.scratch/<effort>/issues/NN-<slug>.md`, numbered from `01`.
- Record the child type in a `Type:` line. Valid types are `research`, `prototype`, `grilling`, and `task`.
- Record `claimed` or `resolved` in a `Status:` line.
- Record dependencies in a `Blocked by: NN, NN` line near the top.
- Treat a child as unblocked when every listed dependency has a `resolved` status.
- To find the frontier, scan `.scratch/<effort>/issues/` for open, unblocked, and unclaimed files. Select the lowest issue number.
- To claim a child, set `Status: claimed` and save the file before starting work.
- To resolve a child, append the answer under an `## Answer` heading and set `Status: resolved`. Then append a summary and link to the Decisions-so-far section in `map.md`.

#!/usr/bin/env bash
set -euo pipefail

# Maintainers use this script to link the promoted set into local skill
# directories. Pass --root to exercise the script in an isolated directory.

repo_root="$(cd "$(dirname "$0")/.." && pwd -P)"
link_root=""

if (( $# > 0 )); then
  if [[ "$1" != "--root" || $# -ne 2 ]]; then
    echo "usage: $0 [--root <directory>]" >&2
    exit 2
  fi
  link_root="$2"
fi

if [[ -n "$link_root" ]]; then
  destinations=(
    "$link_root/.claude/skills"
    "$link_root/.agents/skills"
  )
else
  destinations=(
    "$HOME/.claude/skills"
    "$HOME/.agents/skills"
  )
fi

skill_names=(
  "unslop"
  "technical-writing"
)

for skill_name in "${skill_names[@]}"; do
  skill_source="$repo_root/skills/$skill_name"
  if [[ ! -f "$skill_source/SKILL.md" ]]; then
    echo "error: missing $skill_source/SKILL.md" >&2
    exit 1
  fi
done

for destination in "${destinations[@]}"; do
  if [[ -L "$destination" ]]; then
    resolved_destination="$(readlink -f "$destination")"
    case "$resolved_destination" in
      "$repo_root"|"$repo_root"/*)
        echo "error: $destination resolves into this repository." >&2
        exit 1
        ;;
    esac
  elif [[ -e "$destination" && ! -d "$destination" ]]; then
    echo "error: $destination is not a directory." >&2
    exit 1
  fi

  mkdir -p "$destination"

  for skill_name in "${skill_names[@]}"; do
    skill_source="$repo_root/skills/$skill_name"
    target="$destination/$skill_name"

    if [[ -e "$target" && ! -L "$target" ]]; then
      echo "error: refusing to replace $target because it is not a symlink." >&2
      exit 1
    fi

    ln -sfn "$skill_source" "$target"
    echo "linked $skill_name -> $skill_source ($destination)"
  done
done

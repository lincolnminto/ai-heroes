# Domain Docs

How the engineering skills should consume this repo's domain documentation when exploring the codebase.

## Layout

This repo uses a single-context layout:

- `CONTEXT.md` at the repo root for project vocabulary and domain rules
- `docs/adr/` at the repo root for architectural decision records

If these files do not exist, proceed silently. Do not flag their absence or suggest creating them upfront.

## Before exploring, read these

- `CONTEXT.md`, if present
- Relevant ADRs under `docs/adr/`, if present

## Use the glossary's vocabulary

When output names a domain concept, use the term as defined in `CONTEXT.md`. Do not drift to synonyms the glossary explicitly avoids.

If the concept is missing from the glossary, note the gap only when it matters to the task.

## Flag ADR conflicts

If output contradicts an existing ADR, surface it explicitly rather than silently overriding.

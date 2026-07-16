# Migrating Avo from GitHub Copilot to Claude Code

This bundle converts your `Avo.agent.md` Copilot custom agent into the equivalent
Claude Code setup, plus a sandboxed dev container.

## What's in this bundle

Files are staged with `dot-` prefixes because some environments block writing
literal dotfiles. **Rename them when you drop them into your repo:**

| Staged file                          | Rename to                        | Purpose |
|--------------------------------------|----------------------------------|---------|
| `CLAUDE.md`                          | `CLAUDE.md`                       | Avo's persona + all conventions. Loaded automatically every session. |
| `dot-claude/settings.json`           | `.claude/settings.json`           | Project settings: model, tool permissions, env. Commit to repo. |
| `dot-mcp.json`                       | `.mcp.json`                       | Project MCP servers (GitHub). Edit/remove as needed. |
| `dot-devcontainer/devcontainer.json` | `.devcontainer/devcontainer.json` | Dev container definition. |
| `dot-devcontainer/Dockerfile`        | `.devcontainer/Dockerfile`        | Node 20 + Claude Code + firewall tooling. |
| `dot-devcontainer/init-firewall.sh`  | `.devcontainer/init-firewall.sh`  | Default-deny egress firewall. |

## Setup steps

1. **Install Claude Code** (if not using the dev container):
   `npm install -g @anthropic-ai/claude-code`, then run `claude` in your repo.

2. **Drop in the files.** From this bundle's folder:
   ```bash
   cp CLAUDE.md /path/to/avo-ai/
   mkdir -p /path/to/avo-ai/.claude
   cp dot-claude/settings.json /path/to/avo-ai/.claude/settings.json
   cp dot-mcp.json /path/to/avo-ai/.mcp.json
   mkdir -p /path/to/avo-ai/.devcontainer
   cp dot-devcontainer/devcontainer.json /path/to/avo-ai/.devcontainer/devcontainer.json
   cp dot-devcontainer/Dockerfile /path/to/avo-ai/.devcontainer/Dockerfile
   cp dot-devcontainer/init-firewall.sh /path/to/avo-ai/.devcontainer/init-firewall.sh
   chmod +x /path/to/avo-ai/.devcontainer/init-firewall.sh
   ```

3. **Set your secrets.** `.mcp.json` reads `${GITHUB_TOKEN}` from the environment.
   Export it (or drop it in a `.env` the container loads) — do not hardcode it.
   If you don't use MCP yet, delete `.mcp.json` entirely.

4. **Open in the container (optional but recommended):** VS Code →
   *Dev Containers: Reopen in Container*. The firewall runs on create; Claude
   Code is preinstalled. Run `claude` in the integrated terminal.

5. **Verify.** Start `claude`, and Avo should introduce itself with
   "✨ I'm Avo. Let's go! ✨" and follow all your conventions. Use `/permissions`
   to review tool rules and `/mcp` to confirm MCP servers connected.

## Copilot → Claude Code mapping

| Copilot concept                         | Claude Code equivalent                    |
|-----------------------------------------|-------------------------------------------|
| `Avo.agent.md` custom agent             | `CLAUDE.md` (auto-loaded project memory)  |
| `.github/copilot-instructions.md`       | `CLAUDE.md`                               |
| Agent YAML frontmatter (`name`/`desc`)  | Dropped — CLAUDE.md has no frontmatter    |
| Copilot settings / permissions          | `.claude/settings.json`                   |
| MCP servers                             | `.mcp.json` (project) / `~/.claude/mcp.json` (user) |
| Slash commands / prompts                | `.claude/commands/*.md`                   |
| Additional specialist agents            | `.claude/agents/*.md` (subagents)         |

## Design choices worth knowing

- **Avo lives in `CLAUDE.md`, not a subagent.** You chose the primary-agent
  route, which is the closest match to how you use Avo today: it *is* your
  default coding partner in this repo rather than something you delegate to.
  Claude Code also reads `AGENTS.md` as a fallback if you ever want a
  tool-neutral file, but `CLAUDE.md` takes precedence when both exist.

- **`CLAUDE.md` is long on purpose.** Anthropic's general guidance is to keep
  it short (~a couple thousand tokens), but your spec is a deliberate, detailed
  standard. It's kept faithful. If you notice Avo drifting on the finer rules,
  the usual fix is to move the most-violated rules to the top and/or split
  rarely-needed sections (e.g. the full component template) into a referenced
  file.

- **`settings.json` permissions** pre-approve safe read/build/lint/test commands
  so Avo isn't constantly asking, while `git commit`/`push` still prompt and
  `.env` reads and `rm -rf` are denied. Tune to taste.

- **The firewall** allow-lists Anthropic, npm, and GitHub only. Add internal
  registries or APIs to `ALLOWED_DOMAINS` in `init-firewall.sh`. The container
  needs `NET_ADMIN`/`NET_RAW` caps (already set in `devcontainer.json`).

## Note on MCP servers

MCP is optional — Claude Code works fully without it. This bundle ships only the
GitHub MCP server (for issue/PR work). If you don't need it, delete `.mcp.json`.

A database MCP server (e.g. MongoDB) is **not** included: it would let Avo query
a *live* database, which isn't needed for writing code against your conventions.
Add one later only if you specifically want Avo inspecting real schemas/data, and
point it at a dev/staging database rather than production.

## Optional next steps

- Turn recurring workflows (e.g. "scaffold a new component from the §7 template")
  into a slash command at `.claude/commands/new-component.md`.
- Add a `code-reviewer` subagent under `.claude/agents/` that enforces your
  ESLint/§8 rules on diffs.

# Skill Registry — Flo

## User Skills

| Name | Path | Triggers |
|------|------|----------|
| go-testing | `C:\Users\Lucas\.claude\skills\go-testing\SKILL.md` | Writing Go tests, Bubbletea TUI testing, teatest, table-driven tests, golden file testing |
| skill-creator | `C:\Users\Lucas\.claude\skills\skill-creator\SKILL.md` | Creating a new skill, adding agent instructions, documenting patterns for AI |

## SDD Phase Skills (Auto-managed by Orchestrator)

| Name | Path | Purpose |
|------|------|---------|
| sdd-init | `C:\Users\Lucas\.claude\skills\sdd-init\SKILL.md` | Initialize project context in Engram |
| sdd-explore | `C:\Users\Lucas\.claude\skills\sdd-explore\SKILL.md` | Explore a change area before proposing |
| sdd-propose | `C:\Users\Lucas\.claude\skills\sdd-propose\SKILL.md` | Create change proposal |
| sdd-spec | `C:\Users\Lucas\.claude\skills\sdd-spec\SKILL.md` | Write functional spec from proposal |
| sdd-design | `C:\Users\Lucas\.claude\skills\sdd-design\SKILL.md` | Write technical design from proposal |
| sdd-tasks | `C:\Users\Lucas\.claude\skills\sdd-tasks\SKILL.md` | Break design into executable tasks |
| sdd-apply | `C:\Users\Lucas\.claude\skills\sdd-apply\SKILL.md` | Apply tasks to codebase |
| sdd-verify | `C:\Users\Lucas\.claude\skills\sdd-verify\SKILL.md` | Verify implementation against spec |
| sdd-archive | `C:\Users\Lucas\.claude\skills\sdd-archive\SKILL.md` | Archive completed change |

## Project Conventions

| File | Purpose |
|------|---------|
| `.atl/skill-registry.md` | This file — maps skill names to paths and triggers |
| `CLAUDE.md` | Project-level AI instructions (not yet created) |

## Notes

- No project-level CLAUDE.md exists yet — global `~/.claude/CLAUDE.md` applies.
- No project skills defined yet — only user-level skills are active.
- Persistence mode: `engram` (no openspec/ directory).

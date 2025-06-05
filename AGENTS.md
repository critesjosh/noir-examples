# Repository guidelines for Codex agents

This repo contains several Noir example projects. Each project lives in its own directory and has a README with setup and testing instructions. Follow these rules when contributing or generating PRs:

## Formatting
- Format Noir circuits with `nargo fmt` when available.
- Format Rust sources with `cargo fmt`.

## Testing
- Always run the tests for any example you modify. Example test commands:
  - `nargo test` (and optionally `cargo test`) for examples in `noir_by_example`.
  - `yarn test` for the recursion example.
  - `bun run test` for the stealthdrop project.
  - `forge test` inside `solidity-example/contract` after generating a proof.
- Consult each README for exact steps. For instance, `noir_by_example/README.md` shows how to run `nargo test` and `cargo test`【F:noir_by_example/README.md†L38-L44】, `recursion/README.md` instructs to run `yarn test`【F:recursion/README.md†L18-L25】, `stealthdrop/README.md` mentions `bun run test`【F:stealthdrop/README.md†L52-L54】, and `solidity-example/README.md` demonstrates running `forge test`【F:solidity-example/README.md†L31-L33】【F:solidity-example/README.md†L62-L64】.

## Commits and PRs
- Use concise, imperative commit messages.
- Keep commits focused; unrelated changes should be in separate commits.
- PR descriptions should list affected examples and mention which tests were executed along with their results.


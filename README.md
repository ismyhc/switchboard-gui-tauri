# DriveNet - Switchboard

🚧 Under heavy construction

This application is built using Tauri. The frontend is built using Sveletkit with static adpater

## Development Enviornment Prerequisites

- [Rust](https://www.rust-lang.org/learn/get-started)
- [pnpm](https://pnpm.io/installation)
- [Tauri Prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites)

- If you are running on macOS with Apple Silicon you will need to ensure you have Rossetta 2 installed. You can run the following comand to install.

```
softwareupdate --install-rosetta
```

Once you've gotten your development environment setup

1. clone repo
2. change into directory and run

```
pnpm install
pnpm tauri dev
```

It also important to note that the unnamed mainchain binaries live in `src-tauri/unnamed-binaries`. When running `pnpm tauri dev` or `pnpm tauri build`, it will copy the binary for the current platform, rename it and put it in `src-tauir/binaries`.

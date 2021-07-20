# Dash-platform

This is a central multi-package repository under which Dash Platform lives.

### Preserving commit history

When importing a new repository into this multi-package repo, all the commit history will be preserved
and added to this repo git history. This repository wil have all the commits and history of the repos
it is constructed from. A new repository can be added via 
`lerna import %path_to_repo% --preserve-commit --flatten` command.

### Running scripts for a specific package withing a repository

Scripts can be run for the all packages at the same time, as well as on per-package basis. To run the 
script with the same name from all repos, run `lerna run test`. To run it for a specific package, 
run `lerna run --scope @dashevo/dpp test` (use the package name from the respective component `package.json`)

## Usage

run `npm run bootstrap`, then `npm run reset_data`, and finally `npm run build_and_test`.

### Building and linking

To intall modules, you need to run `lerna bootstrap --ci`. To link local modules, you need to run `lerna link`

### Notes

In the bootstrap script, `lerna exec npm ci` is used because `lerna bootstrap` causes issues with module resolution. 
If modules are build prior to running `lerna bootstrap`, the linking and build process are working fine.

Also, --hoist=grpc is used becuase grpc won't work if there's more that one instance of grpc in the project.
Hoits is used to remove all other grpc instances.
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

### Building and linking

To intall modules, you need to run `lerna bootstrap --ci`. To link local modules, you need to run `lerna link`
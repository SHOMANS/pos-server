to initialize the app run after installing `pnpm`:

```bash
pnpm init
```

we use .gitignore to ignore files that should not be committed to the repository, such as:

- `.env` files containing sensitive information
- `node_modules` directory containing installed packages
- `pnpm-lock.yaml` file containing lockfile information

we use `.env.example` as a template for environment variables, which should be copied to `.env` and filled with actual values.

we use `pnpm` as the package manager for this project, which is a fast and efficient alternative to npm and yarn.

to install dependencies, run:

```bash
pnpm i <package-name> <package-name> # replace <package-name> with the actual package name and install for the current project and you can add multiple packages at once

pnpm i -g <package-name> # replace <package-name> with the actual package name and install globally, it won't be added to the package.json file (won't be a dependency of the project)
pnpm i -D <package-name> # replace <package-name> with the actual package name and install as a dev dependency (it will be added to the package.json file under devDependencies and will be used only in development)

```

<h1 align="center">🎗 Export Version</h1>

<p align="center">
  <a href="/wow-actions/export-version/blob/master/LICENSE"><img alt="MIT License" src="https://img.shields.io/github/license/wow-actions/export-version?style=flat-square"></a>
  <a href="https://www.typescriptlang.org" rel="nofollow"><img alt="Language" src="https://img.shields.io/badge/language-TypeScript-blue.svg?style=flat-square"></a>
  <a href="https://github.com/wow-actions/export-version/pulls"><img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=flat-square" ></a>
  <a href="https://github.com/marketplace/actions/export-version" rel="nofollow"><img alt="website" src="https://img.shields.io/static/v1?label=&labelColor=505050&message=marketplace&color=0076D6&style=flat-square&logo=google-chrome&logoColor=0076D6" ></a>
  <a href="https://github.com/wow-actions/export-version/actions/workflows/release.yml"><img alt="build" src="https://img.shields.io/github/workflow/status/wow-actions/export-version/Release/master?logo=github&style=flat-square" ></a>
  <a href="https://lgtm.com/projects/g/wow-actions/export-version/context:javascript" rel="nofollow"><img alt="Language grade: JavaScript" src="https://img.shields.io/lgtm/grade/javascript/g/wow-actions/export-version.svg?logo=lgtm&style=flat-square" ></a>
</p>

<p align="center">
  <strong>Extract package version from package.json and export it</strong>
</p>

## 🚀 Usage

Create a `.github/workflows/export-version.yml` file in the repository you want to install this action, then add the following to it:

```yml
name: Export Version
on:
  push:
    branches:
      - master
jobs:
  run:
    runs-on: ubuntu-latest
    steps:
      - uses: wow-actions/export-version@v1
        with:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The default config will generate a file `"src/version.ts"` with the following content:

```ts
/* eslint-disable */

/**
 * Auto generated version file, do not modify it!
 */
const version = 'xxx'
export { version }
```

## Inputs

Various inputs are defined to let you configure the action:

> Note: [Workflow command and parameter names are not case-sensitive](https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-commands-for-github-actions#about-workflow-commands).

| Name | Description | Default |
| --- | --- | --- |
| `GITHUB_TOKEN` | The GitHub token for authentication | N/A |
| `source` | The `package.json` path or the directory path contains a `package.json` file | `'package.json'` |
| `target` | The auto generated target file path | `'src/version.ts'` |
| `template` | Template to render the target file content <br> Placeholder `{{version}}` is supportted | `...` |
| `commitMessage` | Commit message to create/update the target file | `'chore: update version file [skip ci]'` |

## 🔖 License

The scripts and documentation in this project are released under the [MIT License](LICENSE)

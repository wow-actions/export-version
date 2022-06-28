import fs from 'fs'
import path from 'path'
import mustache from 'mustache'
import * as core from '@actions/core'
import * as github from '@actions/github'
import { getOctokit, getInputs } from './util'

async function run() {
  try {
    const options = getInputs()

    core.debug(`inputs: \n ${JSON.stringify(options, null, 2)}`)

    let sourcePath = options.source
    if (!fs.existsSync(sourcePath)) {
      throw new Error(
        `The given source file/directory "${sourcePath}" do not exist`,
      )
    }

    const stat = fs.statSync(sourcePath)
    if (stat.isDirectory()) {
      sourcePath = path.join(options.source, 'package.json')
      if (!fs.existsSync(sourcePath)) {
        throw new Error(
          `The given source directory "${options.source}" do not contain a package.json file`,
        )
      }
    }

    const version = JSON.parse(fs.readFileSync(sourcePath, 'utf8'))
      .version as string
    const newContent = mustache.render(options.template, { version })

    const { context } = github
    const octokit = getOctokit()
    const targetFile = options.target
    const getContent = async () => {
      try {
        return await octokit.rest.repos.getContent({
          ...github.context.repo,
          path: targetFile,
        })
      } catch (err) {
        return null
      }
    }

    const res = await getContent()
    const oldContent = res
      ? Buffer.from((res.data as any).content, 'base64').toString()
      : null

    if (newContent !== oldContent) {
      await octokit.rest.repos.createOrUpdateFileContents({
        ...context.repo,
        path: options.target,
        content: Buffer.from(newContent).toString('base64'),
        message: options.commitMessage,
        sha: res ? (res.data as any).sha : undefined,
      })
      core.info(`Generated: "${options.target}"`)
    } else {
      core.debug('No updated required, version not changed')
    }
  } catch (e) {
    core.error(e)
    core.setFailed(e.message)
  }
}

run()

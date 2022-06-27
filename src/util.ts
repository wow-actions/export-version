import * as core from '@actions/core'
import * as github from '@actions/github'

export function getOctokit() {
  const token = core.getInput('GITHUB_TOKEN', { required: true })
  return github.getOctokit(token)
}

export function getInputs() {
  return {
    source: core.getInput('source'),
    target: core.getInput('target'),
    template: core.getInput('template'),
    commitMessage: core.getInput('commitMessage'),
  }
}

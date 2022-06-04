import { Octokit } from 'octokit'

const config = require('config')

export const sleep = (msec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, msec))

const run = async () => {
  const token = config.get('githubAccessToken')
  const sourceOwner = config.get('source.owner')
  const sourceRepo = config.get('source.repo')
  const destOwner = config.get('dest.owner')
  const destRepo = config.get('dest.repo')

  const octokit = new Octokit({ auth: token })
  const { data } = await octokit.rest.issues.listForRepo({
    owner: sourceOwner,
    repo: sourceRepo,
    page: 2,
  })
  let index = 0
  while (index <= data.length - 1) {
    const d = data[index]
    const title = d.title
    const body = d.body ?? ''
    await sleep(5000)
    octokit.rest.issues.create({
      owner: destOwner,
      repo: destRepo,
      title,
      body,
    })
    console.log('created', title, body)
    index++
  }
}

export default run()

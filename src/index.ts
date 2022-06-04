import { Octokit } from 'octokit'

const config = require('config')

export const sleep = (msec: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, msec))

const run = async () => {
  const token = config.get('githubAccessToken')
  const owner = config.get('owner')
  const repo = config.get('repo')

  const octokit = new Octokit({ auth: token })
  const { data } = await octokit.rest.issues.listForRepo({
    owner,
    repo,
    page: 2,
  })
  let index = 0
  while (index <= data.length - 1) {
    const d = data[index]
    const title = d.title
    const body = d.body ?? ''
    await sleep(5000)
    octokit.rest.issues.create({
      owner,
      repo,
      title,
      body,
    })
    console.log('created', title, body)
    index++
  }
}

export default run()

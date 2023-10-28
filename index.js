const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;

// take this out later when you make the final commit 
// const dotenv = require('dotenv').config()
// const creds = process.env.PAT
// end of take this out 

async function main() {
  try {
    const token = core.getInput('GITHUB_TOKEN');
    const octokit = new github.getOctokit(token)
    // const octokit = new github.getOctokit(creds);
    console.log('cool... it did it... ');

    let pr = await octokit.rest.pulls.get({
      owner: 'lmnleaf',
      repo: 'pr-size',
      pull_number: 1
    });
    console.log("Additions: ", pr.data.additions);
    console.log("Changed files: ", pr.data.changed_files);

  } catch (error) {
    core.setFailed(error.message);
  }

}

main();

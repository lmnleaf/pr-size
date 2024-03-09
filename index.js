const core = require('@actions/core');
const github = require('@actions/github');

const context = github.context;
const sizePR = require('../src/size-pr.js')

async function main() {
  try {
    const token = core.getInput('GITHUB_TOKEN');
    const octokit = new github.getOctokit(token);

    const specsInput = core.getInput('exclude_specs');
    const directoriesInput = core.getInput('excluded_directories');
    const labelColor = core.getInput('label_color') || 'fcffff';

    const size = await sizePR(specsInput, directoriesInput, labelColor, context, octokit);

    return core.notice(size);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

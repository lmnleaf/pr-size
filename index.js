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

    const excludeSpecs = (specsInput === 'true' || specsInput === 1);
    const excludedDirectories = directoriesInput || [];

    const repo = context.repo;
    const prNumber = context.payload.pull_request.number;

    const size = await sizePR(excludeSpecs, excludedDirectories, labelColor, repo, prNumber, octokit);

    return core.notice(size);
  } catch (error) {
    core.setFailed(error.message);
  }
}

main();

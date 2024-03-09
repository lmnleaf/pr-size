const size = require('./size.js');
const totalLines = require('./total-lines.js');
const ensureLabelExists = require('./ensure-label-exists.js');
const labelPR = require('./label-pr.js');

async function sizePR(specsInput, directoriesInput, color, context, octokit) {
  try {
    console.log('Excluded Directories', excludedDirectories);
    console.log('Excluded Specs', excludedSpecs);
    const repo = context.repo;
    const prNumber = context.payload.pull_request.number;
    const prLabels = context.payload.pull_request.labels;
    const excludeSpecs = (specsInput === 'true' || specsInput === 1) || false;
    const excludedDirectories =
      directoriesInput === null || directoriesInput === undefined
        ? []
        : directoriesInput.split(',');

    const total = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    const { label, description } = size(total);

    await ensureLabelExists(label, description, color, repo, octokit);

    let labelAdded = labelPR(label, prLabels, repo, prNumber, octokit);

    return labelAdded;
  } catch(error) {
    throw error;
  }
}

module.exports = sizePR

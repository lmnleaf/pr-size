const size = require('./size.js');
const totalLines = require('./total-lines.js');
const ensureLabelExists = require('./ensure-label-exists.js');
const labelPR = require('./label-pr.js');

async function sizePR(excludeSpecs, excludedDirectories, color, context, octokit) {
  try {
    const repo = context.repo;
    const prNumber = context.payload.pull_request.number;
    const prLabels = context.payload.pull_request.labels;

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

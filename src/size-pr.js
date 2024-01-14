const size = require('./size.js');
const totalLines = require('./total-lines.js');
const ensureLabelExists = require('./ensure-label-exists.js');

async function sizePR(owner, repo, excludeSpecs, excludedDirectories, prNumber, color, octokit) {
  try {
    const total = await totalLines(owner, repo, prNumber, excludeSpecs, excludedDirectories, octokit);
    const { label, description } = size(total);

    await ensureLabelExists(owner, repo, label, description, color, octokit);

    await octokit.rest.issues.addLabels({
      owner: owner,
      repo: repo,
      issue_number: prNumber,
      labels: [label]
    });
  } catch(error) {
    throw error;
  }
}

module.exports = sizePR

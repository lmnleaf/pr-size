const size = require('./size.js');
const totalLines = require('./total-lines.js');
const ensureLabelExists = require('./ensure-label-exists.js');

async function sizePR(excludeSpecs, excludedDirectories, color, repo, prNumber, octokit) {
  try {
    const total = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    const { label, description } = size(total);

    await ensureLabelExists(label, description, color, repo, octokit);

    await octokit.rest.issues.addLabels({
      ...repo,
      issue_number: prNumber,
      labels: [label]
    });

    return "Label Added: " + label;
  } catch(error) {
    throw error;
  }
}

module.exports = sizePR

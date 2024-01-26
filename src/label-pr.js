async function labelPR(label, repo, octokit) {
  // check for label on PR

  
  await octokit.rest.issues.addLabels({
    ...repo,
    issue_number: prNumber,
    labels: [label]
  });

  return "Label Added: " + label;

}

module.exports = labelPR

async function labelPR(label, prLabels, repo, prNumber, octokit) {
  const labelNames = prLabels.map((prLabel) => prLabel.name);
  const prSizeLabels = labelNames.filter(
    (labelName) => labelName.includes('PR Size:') && labelName != label
  );

  if (prSizeLabels.length > 0) {
    for (const prSizeLabel of prSizeLabels) {
      await octokit.rest.issues.removeLabel({
        ...repo,
        issue_number: prNumber,
        name: prSizeLabel
      });
    }
  }

  await octokit.rest.issues.addLabels({
    ...repo,
    issue_number: prNumber,
    labels: [label]
  });

  return "Label added: " + label;

}

module.exports = labelPR

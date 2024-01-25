async function ensureLabelExists(labelName, description, color, repo, octokit) {
  try {
    let labels = await octokit.rest.issues.listLabelsForRepo({
      ...repo
    });
  
    let exists = labels.data.some(label => label.name === labelName);
  
    if (!exists) {
      await octokit.rest.issues.createLabel({
        ...repo,
        name: labelName,
        description: description,
        color: color
      });
    }
  } catch(error) {
    throw error;
  }
}

module.exports = ensureLabelExists

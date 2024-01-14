async function ensureLabelExists(owner, repo, labelName, description, color, octokit) {
  try {
    let labels = await octokit.rest.issues.listLabelsForRepo({
      owner: owner,
      repo: repo,
    });
  
    let exists = labels.data.some(label => label.name === labelName);
  
    if (!exists) {
      await octokit.rest.issues.createLabel({
        owner: owner,
        repo: repo,
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

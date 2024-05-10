async function totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit) {
  const pr = await octokit.rest.pulls.get({
    ...repo,
    pull_number: prNumber
  }).then((response) => {
    return response.data;
  });

  let prLines = pr.additions;
  console.log('Excluded Directories Type: ');
  console.log(typeof excludedDirectories);
  let excludeDirectories = (excludedDirectories != undefined && excludedDirectories.length > 0);
  console.log('Exclude Directories: ', excludeDirectories);
  if (!excludeSpecs && !excludeDirectories) {
    return prLines;
  }

  const prFileInfo = await octokit.rest.pulls.listFiles({
    ...repo,
    pull_number: prNumber
  }).then((response) => {
    return response.data;
  });

  let indexes = [];

  if (excludeSpecs) {
    let specLines = 0

    prFileInfo.forEach((file) => {
      let specFile = (
        file.filename.includes('test/') ||
        file.filename.includes('spec/') ||
        file.filename.includes('tests/') ||
        file.filename.includes('specs/')
      );

      if (specFile) {
        specLines += file.additions;
        // collect indexes, so can use them to remove spec files that have already
        // been excluded before excluding based on directory; this ensures that
        // the same file isn't subtracted from the total lines multiple times
        indexes.push(prFileInfo.indexOf(file));
      }
    });

    prLines -= specLines;
  }
  
  if (excludeDirectories) {
    let directoryLines = 0

    // remove files with lines that have already been subtracted from the total lines
    if (indexes.length < 0) {
      indexes.forEach((index) => {
        prFileInfo.slice(index, 1);
      })
    }

    prFileInfo.forEach((file) => {
      try {
        excludedDirectories.forEach((directory) => {
          if (file.filename.includes(directory + '/')) {
            console.log('Directory', directory);
            console.log('Number Lines to Subtract: ', file.additions);
            directoryLines += file.additions;
  
            // throw error to break out of excludedDirectories loop
            // to avoid double counting files when files contain
            // multiple excluded directory names
            throw new Error();
          }
        });
      } catch(error) {
        return true;
      }
    });
    console.log('PR Lines: ', prLines);
    console.log('Directory Lines: ', directoryLines);
    prLines -= directoryLines;
  }

  return prLines;
}

module.exports = totalLines

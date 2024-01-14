const sizePR = require("../src/size-pr.js");
const Moctokit = require('./support/moctokit.js');

describe("Size PR", function() {
  let octokit = new Moctokit();
  let prLines = 475;
  let prNumber = 2;
  let color = 'fcffff'

  it('adds a label to the PR that indicates the size', async function() {
    let excludeSpecs = false;
    let excludedDirectories = [];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR('org', 'repo', excludeSpecs, excludedDirectories, prNumber, color, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'org',
      repo: 'repo',
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });

  it('adds a label to the PR that indicates size when specs are excluded', async function() {
    let excludeSpecs = true;
    let excludedDirectories = [];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR('org', 'repo', excludeSpecs, excludedDirectories, prNumber, color, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'org',
      repo: 'repo',
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });


  it('adds a label to the PR that indicates size when directories are excluded', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['test'];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR('org', 'repo', excludeSpecs, excludedDirectories, prNumber, color, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'org',
      repo: 'repo',
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });


  it('adds a label to the PR that indicates size when both specs and directories are excluded', async function() {
    let excludeSpecs = true;
    let excludedDirectories = ['test', 'specs'];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR('org', 'repo', excludeSpecs, excludedDirectories, prNumber, color, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      owner: 'org',
      repo: 'repo',
      issue_number: prNumber,
      labels: ['PR Size: XS']
    });
  });

  it('handles errors', async function() {
    spyOn(octokit.rest.pulls, 'get').and.callFake(function() {
      return Promise.reject(new Error('woops'));
    });

    try {
      await sizePR('org', 'repo', false, [], prNumber, color, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('woops'));
    }
  })
});

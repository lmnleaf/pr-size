const sizePR = require("../src/size-pr.js");
const Moctokit = require('./support/moctokit.js');

describe("Size PR", function() {
  let octokit = new Moctokit();
  let context = {
    payload: {
      repo: { name: 'repo-name' },
      pull_request: {
        number: 2,
        labels: [
          {
            color: 'fcffff',
            default: false,
            description: 'PR is 30 - 99 lines',
            id: 6430124161,
            name: 'PR Size: M',
            node_id: 'LA_kwDOKmQoOc8AAAABf0PogQ',
            url: 'https://api.github.com/repos/lmnleaf/pr-size/labels/PR%20Size:%20M'
          }
        ]
      }
    }
  }
  let prNumber = context.payload.pull_request.number;
  let color = 'fcffff'

  it('adds a label to the PR that indicates the size', async function() {
    let excludeSpecs = false;
    let excludedDirectories = [];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR(excludeSpecs, excludedDirectories, color, context, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      ...context.repo,
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });

  it('adds a label to the PR that indicates size when specs are excluded', async function() {
    let excludeSpecs = true;
    let excludedDirectories = [];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR(excludeSpecs, excludedDirectories, color, context, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      ...context.repo,
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });

  it('adds a label to the PR that indicates size when directories are excluded', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['test'];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR(excludeSpecs, excludedDirectories, color, context, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      ...context.repo,
      issue_number: prNumber,
      labels: ['PR Size: L']
    });
  });

  it('adds a label to the PR that indicates size when both specs and directories are excluded', async function() {
    let excludeSpecs = true;
    let excludedDirectories = ['test', 'specs'];

    spyOn(octokit.rest.issues, 'addLabels').and.callThrough();

    await sizePR(excludeSpecs, excludedDirectories, color, context, octokit);
    expect(octokit.rest.issues.addLabels).toHaveBeenCalledWith({
      ...context.repo,
      issue_number: prNumber,
      labels: ['PR Size: XS']
    });
  });

  it('handles errors', async function() {
    spyOn(octokit.rest.pulls, 'get').and.callFake(function() {
      return Promise.reject(new Error('woops'));
    });

    try {
      await sizePR(false, [], color, context, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('woops'));
    }
  })
});

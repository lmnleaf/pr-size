const labelPR = require("../src/label-pr.js");
const Moctokit = require('./support/moctokit.js');

describe("Label PR", function() {
  let octokit = new Moctokit();
  let repo = { repo: 'repo-name' };
  let prNumber = 2;

  it('labels PRs with the correct size', async function() {
    let addedLabel = await labelPR('PR Size: XS', [], repo, prNumber, octokit);

    expect(addedLabel).toEqual('Label added: PR Size: XS');
  });

  it('removes a PR Size label from the PR when they no longer match the size', async function() {
    let addedLabel = await labelPR('PR Size: XS', [{ name: 'PR Size: XL' }], repo, prNumber, octokit);

    expect(addedLabel).toEqual('Label added: PR Size: XS');
  });

  it('removes multiple PR Size labels from the PR when they no longer match the size', async function() {
    let prLabels = [{ name: 'PR Size: XL' }, { name: 'PR Size: L' }];
    let addedLabel = await labelPR('PR Size: XS', prLabels, repo, prNumber, octokit);

    expect(addedLabel).toEqual('Label added: PR Size: XS');
  });

  it('does not remove non-PR Size label', async function() {
    let prLabels = [{ name: 'PR Size: XL' }, { name: 'Bug' }]
    let addedLabel = await labelPR('PR Size: XS', prLabels, repo, prNumber, octokit);

    spyOn(octokit.rest.issues, 'removeLabel').and.callThrough();

    await labelPR('PR Size: XS', prLabels, repo, prNumber, octokit);
    expect(octokit.rest.issues.removeLabel).toHaveBeenCalledWith({
      ...repo,
      issue_number: prNumber,
      name: 'PR Size: XL'
    });
    expect(octokit.rest.issues.removeLabel).not.toHaveBeenCalledWith({
      ...repo,
      issue_number: prNumber,
      name: 'PR Size: Bug'
    });
  });

  it('handles errors when removing labels', async function() {
    spyOn(octokit.rest.issues, 'removeLabel').and.callFake(function() {
      return Promise.reject(new Error('woops'));
    });

    try {
      await labelPR('PR Size: XS', [], repo, prNumber, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('woops'));
    }
  }); 

  it('handles errors when adding labels', async function() {
    spyOn(octokit.rest.issues, 'addLabels').and.callFake(function() {
      return Promise.reject(new Error('woops'));
    });

    try {
      await labelPR('PR Size: XS', [], repo, prNumber, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('woops'));
    }
  }); 
});

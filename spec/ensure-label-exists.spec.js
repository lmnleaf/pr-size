const ensureLabelExists = require("../src/ensure-label-exists.js");
const Moctokit = require('./support/moctokit.js');

describe("Ensure Label Exists", function() {
  let octokit = new Moctokit();
  let repo = { repo: 'repo-name' }

  it('checks for the label', async function() {
    spyOn(octokit.rest.issues, 'listLabelsForRepo').and.callThrough();
    let labels = await ensureLabelExists('PR Size: S', 'PR is 10 - 29 lines', 'fcffff', repo, octokit);

    expect(octokit.rest.issues.listLabelsForRepo).toHaveBeenCalledWith({
      ...repo
    });
  });

  it('does NOT create a label when the label already exists', async function() {
    spyOn(octokit.rest.issues, 'createLabel').and.callThrough();
    let labels = await ensureLabelExists('PR Size: XS', 'PR is fewer than 10 lines', 'fcffff', repo, octokit);

    expect(octokit.rest.issues.createLabel).not.toHaveBeenCalled();
  })

  it("creates a label when the label does NOT already exist", async function() {
    spyOn(octokit.rest.issues, 'listLabelsForRepo').and.callThrough();
    spyOn(octokit.rest.issues, 'createLabel').and.callThrough();

    let labels = await ensureLabelExists('PR Size: S', 'PR is 10 - 29 lines', 'fcffff', repo, octokit);
    expect(octokit.rest.issues.listLabelsForRepo).toHaveBeenCalledWith({
      ...repo
    });
    
    expect(octokit.rest.issues.createLabel).toHaveBeenCalledWith({
      ...repo,
      name: 'PR Size: S',
      description: 'PR is 10 - 29 lines',
      color: 'fcffff'
    })
  });

  it('handles errors when listing labels', async function() {
    spyOn(octokit.rest.issues, 'listLabelsForRepo').and.callFake(function() {
      return Promise.reject(new Error('uh oh'));
    });

    try {
      let labels = await ensureLabelExists(
        'PR Size: XS', 'PR is fewer than 10 lines', 'fcffff', repo, octokit
      );
    } catch (error) {
      expect(error).toEqual(new Error('uh oh'));
    }
  })

  it('handles errors when creating a label', async function() {
    spyOn(octokit.rest.issues, 'createLabel').and.callFake(function() {
      return Promise.reject(new Error('uh oh'));
    });

    try {
      let labels = await ensureLabelExists('PR Size: XS', 'PR is fewer than 10 lines', 'fcffff', repo, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('uh oh'));
    }
  })
});

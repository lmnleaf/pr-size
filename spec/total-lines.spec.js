const totalLines = require('../src/total-lines.js');
const Moctokit = require('./support/moctokit.js');

describe("total lines", function() {
  let octokit = new Moctokit();
  let prLines = 475;
  let prNumber = 2;
  let repo = { repo: 'repo-name' }

  it('sets the total lines when all files should be included', async function() {
    let excludeSpecs = false;
    let excludedDirectories = null;

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(prLines);
  });

  it('sets the total lines when spec files are NOT included', async function() {
    let excludeSpecs = true;
    let excludedDirectories = null;

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(222);
  });

  it('sets the total lines when multiple files have the same directory', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['dist'];

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(353);
  });

  it('sets the total lines when specified directories are NOT included', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['dist', 'wow'];

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(351);
  });

  it('sets the total lines when neither spec files nor specified directories are included', async function() {
    let excludeSpecs = true;
    let excludedDirectories = ['dist'];

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(100);
  });

  it('handles an empty excludedDirectories array', async function() {
    let excludeSpecs = false;
    let excludedDirectories = [];

    let lines = await totalLines(excludeSpecs, excludedDirectories, repo, prNumber, octokit);
    expect(lines).toEqual(475);
  });

  it('handles errors when getting total lines in the PR', async function() {
    spyOn(octokit.rest.pulls, 'get').and.callFake(function() {
      return Promise.reject(new Error('uh oh'));
    });

    try {
      let lines = await totalLines(false, [], repo, prNumber, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('uh oh'));
    }
  })

  it('handles errors when getting PR files', async function() {
    spyOn(octokit.rest.pulls, 'listFiles').and.callFake(function() {
      return Promise.reject(new Error('uh oh'));
    });

    try {
      let lines = await totalLines(true, [], repo, prNumber, octokit);
    } catch (error) {
      expect(error).toEqual(new Error('uh oh'));
    }
  })
});

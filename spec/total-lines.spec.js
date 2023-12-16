const totalLines = require('../src/total-lines.js');
const Moctokit = require('./support/moctokit.js');

describe("total lines", function() {
  let octokit = new Moctokit();
  let prLines = 475;
  let prNumber = 2;

  it('sets the total lines when all files should be included', async function() {
    let excludeSpecs = false;
    let excludedDirectories = null;

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(475);
  });

  it('sets the total lines when spec files are NOT included', async function() {
    let excludeSpecs = true;
    let excludedDirectories = null;

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(222);
  });

  it('sets the total lines when multiple files have the same directory', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['dist'];

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(353);
  });

  it('sets the total lines when specified directories are NOT included', async function() {
    let excludeSpecs = false;
    let excludedDirectories = ['dist', 'wow'];

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(351);
  });

  it('sets the total lines when neither spec files nor specified directories are included', async function() {
    let excludeSpecs = true;
    let excludedDirectories = ['dist'];

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(100);
  });

  it('handles an empty excludedDirectories array', async function() {
    let excludeSpecs = false;
    let excludedDirectories = [];

    let lines = await totalLines(prLines, prNumber, excludeSpecs, excludedDirectories, octokit);
    expect(lines).toEqual(475);
  });
});

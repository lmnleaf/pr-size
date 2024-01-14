class Moctokit {
  constructor() {
    this.rest = {
      pulls: {
        get: this.getPR,
        listFiles: this.listFiles
      },
      issues: {
        listLabelsForRepo: this.listLabels,
        createLabel: this.createLabel,
        addLabels: this.addLabels
      }
    };
  }

  getPR() {
    return Promise.resolve({
      data: { additions: 475 }
    })
  }

  listFiles() {
    return Promise.resolve({
      data: [
        { filename: 'specs/woot.py', additions: 5 },
        { filename: 'spec/wit/woot.js', additions: 2 },
        { filename: 'test/yup/yip.js', additions: 225 },
        { filename: 'src/woot/woot.js', additions: 75 },
        { filename: 'src/yup/yip.js', additions: 20 },
        { filename: 'app/dist/index.js', additions: 120 },
        { filename: 'tests/specs/yo/yo.js', additions: 21 },
        { filename: 'wow/phew.js', additions: 2 },
        { filename: '/dist/wow/cool.js', additions: 2 },
        { filename: 'so/cool/cool.js', additions: 3 }
      ]
    })
  }

  listLabels() {
    return Promise.resolve({
      data: [
        {
          id: 208045946,
          node_id: 'MDU6TGFiZWwyMDgwNDU5NDY=',
          url: 'https://api.github.com/repos/octocat/repo-name/labels/bug',
          name: 'bug',
          color: 'f29513',
          default: true,
          description: 'Something isn\'t working'
        },
        {
          id: 208045947,
          node_id: 'MDU6TGFiZWwyMDgwNDU5NDZ=',
          url: 'https://api.github.com/repos/octocat/repo-name/labels/PRSizeXS',
          name: 'PR Size: XS',
          color: 'fcffff',
          default: false,
          description: 'PR is fewer than 10 lines'
        },
        {
          id: 208045948,
          node_id: 'MDU6TGFiZWwyMDgwNDU5NDX=',
          url: 'https://api.github.com/repos/octocat/repo-name/labels/bug',
          name: 'PR Size: XL',
          color: 'fcffff',
          default: false,
          description: 'PR is 500+ lines'
        }
      ]
    })
  }

  createLabel() {
    return Promise.resolve({
      data: {
        id: 208045948,
        node_id: 'MDU6TGFiZWwyMDgwNDU5NDW=',
        url: 'https://api.github.com/repos/octocat/repo-name/labels/bug',
        name: 'PR Size: M',
        color: 'fcffff',
        default: false,
        description: 'PR is 30 - 99 lines'
      }
    })
  }

  addLabels() {
    return Promise.resolve({
      data: {
        id: 208045948,
        node_id: 'MDU6TGFiZWwyMDgwNDU5NDW=',
        url: 'https://api.github.com/repos/octocat/repo-name/labels/bug',
        name: 'PR Size: M',
        color: 'fcffff',
        default: false,
        description: 'PR is 30 - 99 lines'
      }
    })
  }
}

module.exports = Moctokit

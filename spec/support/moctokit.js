class Moctokit {
  constructor() {
    this.rest = {
      pulls: {
        listFiles: this.listFiles,
      }
    };
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
}

module.exports = Moctokit

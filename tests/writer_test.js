describe("The writer", function() {
  var testDir = './tests/tmp';
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');
  var writer = require('../src/writer');
  var fs = require('fs');
  var expect = require('chai').expect;

  before(function() {
    mkdirp('./tests/tmp');
  });
  
  after(function() {
    rimraf.sync('./tests/tmp');
  });
    

  it("makes directories if needed", function() {

    var outputDir = testDir + "/anotherLevel/output.txt";

    writer(outputDir, 'foo');

    expect(fs.existsSync(testDir + '/anotherLevel/output.txt')).to.equal(true);
  });

});

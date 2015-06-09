describe("The writer", function() {
  var testDir = __dirname + '/tmp';
  var mkdirp = require('mkdirp');
  var rimraf = require('rimraf');
  var writer = require('../src/writer');
  var fs = require('fs');
  var expect = require('chai').expect;

  beforeEach(function() {
    console.log('mkdir!');
    mkdirp(testDir);
  });
  
  afterEach(function() {
    rimraf.sync(testDir);
  });
    

  it("makes directories if needed", function() {

    var outputDir = testDir + "/anotherLevel/output.txt";

    writer(outputDir, 'foo', {
      mkdir: true
    });

    expect(fs.existsSync(testDir + '/anotherLevel/output.txt')).to.equal(true);
  });

});

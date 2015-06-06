var Writer = function(obj, inputFile, outputDir, argOptions) {

  console.log("\n\n\n");
  console.log('--------------------------------------------');
  console.log('  Final convertered Javascript Object');
  console.log(' ');


  console.log(require('util').inspect(obj, {
    depth: 100,
    colors: true,
    customInspect: false
  }));

};

module.exports = Writer;

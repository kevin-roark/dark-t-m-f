#!/usr/local/bin/node

var fs = require('fs');
var ncp = require('ncp').ncp;
var execFile = require('child_process').execFile;

var parser = require('./parser');

var args = process.argv.slice(2);

ncp.limit = 16;

function processPoem(poem) {
  console.log('readin poem: ' + poem);

  var dirname = './poem';

  fs.mkdirSync(dirname);

  parser(poem, dirname + '/poem.js');
  
  ncp(__dirname + '/boiler', dirname, function(err) {
    if (err) {
      return console.error(err);
    }
  
    console.log('HANDLED THE BOILER DATA');
  });
}

if (args.length < 1) {
  console.log('need text file as first arg');
  return;
}

execFile('./clean.sh');

var file = args[0];
processPoem(file);

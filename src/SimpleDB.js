const { create } = require('domain');
const { readFile, writeFile } =  require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDB {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.json`; 
    this.newFile = path.join(rootDir, fileName); 
  }
  
  save(object){
    const objectContents = readFile(object, 'utf8');
    const createdFile = writeFile(this.newFile, stringyObject);
    const stringyObject = JSON.stringify(object); 
    return createdFile;
  }

  //Need to add readfile
}

module.exports = SimpleDB;

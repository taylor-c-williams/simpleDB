const { writeFile } =  require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDB {
  constructor(rootDir) {
    const fileName = `${shortid.generate()}.json}`; 
    this.newFile = path.join(rootDir, fileName); 
  }

  save(object){
    JSON.stringify(object); 
    return writeFile(this.newFile, object);
  }
}

module.exports = SimpleDB;

const { readFile, writeFile, readdir } =  require('fs/promises');
const path = require('path');
const shortid = require('shortid');

class SimpleDB {
  constructor(rootDir) {
    this.rootDir = rootDir;
  }

  save(file){
    this.id = `${shortid.generate()}`;
    file.id = this.id;
    const fileName = `${file.id}.json`; 
    this.newFile = path.join(this.rootDir, fileName); 
    const stringyObject = JSON.stringify(file); 
    return writeFile(this.newFile, stringyObject);
  }

  get(id) {
    const filePath = `${this.rootDir}/${id}.json`;
    return readFile(filePath, JSON)
      .then((unstrungFile) => JSON.parse(unstrungFile))
      .catch((err) => {
        if (err.code === 'ENOENT') {
          return null;
        }
        throw err;
      });
  }

  async getAll() {
    const allFiles = await readdir(this.rootDir);
    const filePromise = await Promise.all (
      allFiles.map((fileName) => 
        readFile(`${this.rootDir}/${fileName}`, JSON)
          .then((unstrungFile) => JSON.parse(unstrungFile))

          .catch((err) => {
            if (err.code === 'ENOENT') {
              return null;
            }
            throw err;
          })
      )
    );
    return filePromise;
  }
}


module.exports = SimpleDB;

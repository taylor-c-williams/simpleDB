const { mkdir, rm } = require ('fs/promises');
const SimpleDB = require('../src/SimpleDB');

describe ('SimpleDB', () => {
  const rootDir = './__tests__/rootDir';
    
  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then (() => mkdir(rootDir, { recursive: true })
    );
  });

  it('Creates and saves an object', () => {
    const DB = new SimpleDB(rootDir);
    const object = 'this is a string';

    return DB
      .save(object)
      .then((actualObject) => expect(actualObject).toEqual(object));
  });
});

const { mkdir, rm } = require('fs/promises');
const SimpleDB = require('../src/SimpleDB');

describe('SimpleDB', () => {
  const rootDir = './__tests__/rootDir';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  const newDB = new SimpleDB(rootDir);

  // Save & Get by ID
  it('Creates and saves an object', () => {
    const object = { words: 'this is a string' };
    return newDB
      .save(object)
      .then(() => newDB.get(object.id))
      .then((newObj) => {
        expect(newObj).toEqual(object);
      });
  });

  // get(id) returns null if ENOENT
  it('Returns null if enoent', () => {
    const wrongId = 1;
    return newDB.get(wrongId).then((results) => expect(results).toEqual(null));
  });

  // Get All
  it('Returns an array of all objects within the directory', () => {
    const expected = [
      { anArray: 'of objects', id: expect.any(String) },
      { likeSo: 'another object', id: expect.any(String) },
    ];
    return newDB
      .save({ anArray: 'of objects' })
      .then(() => newDB.save({ likeSo: 'another object' }))
      .then(() => newDB.getAll())
      .then((arrayOfObjects) =>
        expect(arrayOfObjects).toEqual(expect.arrayContaining(expected))
      );
  });
});

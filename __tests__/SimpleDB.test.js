const { mkdir, rm } = require('fs/promises');
const SimpleDB = require('../src/SimpleDB');

describe('SimpleDB', () => {
  const rootDir = './__tests__/rootDir';

  beforeEach(() => {
    return rm(rootDir, { force: true, recursive: true }).then(() =>
      mkdir(rootDir, { recursive: true })
    );
  });

  const DB = new SimpleDB(rootDir);

  // Save & Get by I.D.
  it('Creates and saves an object', () => {
    const object = { words: 'this is a string' };
    return DB.save(object)
      .then(() => DB.get(object.id))
      .then((newObj) => {
        expect(newObj).toEqual(object);
      });
  });

  // Get All
  it('Returns an array of all objects within the directory', () => {
    const expected = [
      { anArray: 'of objects' },
      { likeSo: 'another object' }
    ];

    return DB
      .save([{ anArray: 'of objects' }])
      .then(() => DB.save({ likeSo: 'another object' }))
      .then (DB.getAll())
      .then((allObj) => 
        expect(allObj).toEqual(expected));
  });
});


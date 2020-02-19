import Realm from 'realm';

const schema = [
  {
    name: 'User',
    primaryKey: 'uid',
    properties: {
      uid: 'int',
      uuid: 'string?',
      name: 'string?',
      code: 'string?',
      zone: 'Zone?',
      event_id: 'string?'
    }
  },
  {
    name: 'Zone',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      name: 'string?'
    }
  }
];

const realmOptions = {
  schema,
  schemaVersion : 6
};



export const local = new Realm(realmOptions);

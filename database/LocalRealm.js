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
      zone: 'Zone?'
    }
  },
  {
    name: 'Zone',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      name: 'string?'
    }
  },
  // {
  //   name: 'Certificates',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string',
  //     title: 'string?',
  //     date_expire: 'date?',
  //     img: 'string?',
  //     qr: 'string?',
  //     status: 'string?',
  //     description: 'string?',
  //     quantity: 'int?',
  //     code: 'string?',
  //     odoo_id: 'int',
  //     odooid: 'int?'

  //   }
  // }
];

const realmOptions = {
  schema,
  schemaVersion : 6
};



export const local = new Realm(realmOptions);

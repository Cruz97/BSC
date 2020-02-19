
 const AppSchema = {
  name: 'App',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    name: 'string?',
    name2: 'string?',
  }
}


const User = {
  name: 'User',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    app_id: 'App?',
    name: 'string?',
    code: 'string?',
    zone: 'Zone?',
    event: 'Event?',
    create_at: 'date?'
  }
}

const Event = {
  name: 'Event',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    name: 'string?',
    title: 'string?',
    subtitle: 'string?',
    date: 'date?',
    image: 'AppImage?',
    summary: 'string?',
    app_id: 'App?',
    create_at: 'date?',
    date_expire: 'date?'
  }
}

const Card = {
  name: 'Card',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    app_id: 'App?',
    code: 'string?',
    status: 'bool?',
    zone: 'Zone?',
    type: 'string?' // qr/rfid,

  }
}

const Zone = {
  name: 'Zone',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    name: 'string?'
  }
}

const Log = {
  name: 'Log',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string',
    event: 'Event?',
    card_code: 'string?',
    description: 'string?',
    date: 'date?',
    status: 'bool?',
    zone: 'Zone?',
    user_id: 'User?',
    app_id: 'App?',
  }
}

 const AppImageSchema = {
  name: 'AppImage',
  primaryKey: 'uuid',
  properties: {
    uuid: 'string?',
    app_id: 'App?',
    name: 'string?',
    url: 'string?',
    caption: 'string?'
  }
}

export const schema = [
  AppSchema,
  User,
  Card,
  Zone,
  Event,
  Log,
  AppImageSchema
];




  
  
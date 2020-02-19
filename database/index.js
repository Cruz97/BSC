import { local } from './LocalRealm';
import { v1 } from 'uuid';
import {schema}  from './CloudRealm';
import Realm from 'realm';
import config from '../database/config/configuration';

export class RealmObject {
  constructor(realm) {
    this.realm = realm;
    this.I18N_DB = {};
  }

  create(objectName, object, callback = () => {}) {
    this.realm.write(() => {
      callback(this.realm.create(objectName, { uuid: v1(), ...object }, true));
    });
  }

  batchCreate(objectName, objects) {
    this.realm.write(() => {
      for (let i = 0, iMax = objects.length; i < iMax; i++) {
        try {
          this.realm.create(objectName, { uuid: v1(), ...objects[i] });
        } catch (e) {
          alert(e);
        }
      }
    });
  }

  update(objectName, object, callback = () => {}) {
    this.realm.write(() => {
      try {
        callback(this.realm.create(objectName, object, true));
      } catch (e) {
        console.log('Eso: ', e);
      }
    });
  }

  deleteByQuery(objectName, query) {
    this.realm.write(() => {
      this.realm.delete(this.search(objectName, query));
    });
  }

  deleteAllObjects(objectName) {
    this.realm.write(() => {
      this.realm.delete(this.realm.objects(objectName));
    });
  }

  delete(objectName, uuid) {
    this.realm.write(() => {
      this.realm.delete(this.get(objectName, uuid));
    });
  }

  get(objectName, uuid) {
    return this.realm.objectForPrimaryKey(objectName, uuid);
  }

  search(objectName, query) {
    return this.realm.objects(objectName).filtered(query);
  }

  searchObject(objectName, query) {
    return this.realm.objects(objectName).filtered(query)[0];
  }

  searchAll(objectName) {
    return this.realm.objects(objectName);
  }
  getApp(id){
    //alert(this.realm)
    
    return this.realm.objectForPrimaryKey('App',`${id}`)
  }

  getAppCustom(id){
    return this.realm.objectForPrimaryKey('AppCustom',`${id}`)
  }

  getAppConfiguration(id){
    //alert(this.realm)
    
    return this.realm.objectForPrimaryKey('AppConfiguration',`${id}`)
  }

  getStatusCode(code, zone_id){
    return this.searchObject('Card', `code = '${code}' AND zone.uuid = '${zone_id}'`);
}

getCount(schema, query){
  let objects = [...this.realm.objects(schema).filtered(query)];
  let count = objects.length;
  return count
}

  initTranslate(){
    let dic = Database.CloudDB.search('Translate', `app_id.uuid = '1' and language.uuid = '2'`);
    let newdic = {};
    dic.map((x)=>{
      if(!newdic[x.section]){
          newdic[x.section] = {};
        }
        newdic[String(x.section)][String(x.label)] = x.value;
    })
     this.I18N_DB = newdic;
  }

  _t(key){
    if(!key || !key.match(/^\w+\.\w+$/)){
      console.warn('You must usse a key in format <section>.<label>');
      return 'TRANSLATION_KEY_MALFORMED'
   }
   let parts = key.split('.');
   let s = parts[0];
   let l = parts[1];
   if(!this.I18N_DB[s] || !this.I18N_DB[s][l]){
       //alert(JSON.stringify(dic,null,4))
       console.warn('Translation <' + key + '> missing');
       return (l.charAt(0).toUpperCase() + l.slice(1)).replace(/_+/g, ' ');
   }
   return this.I18N_DB[s][l];
  }



}

const Database = {
  User: null,
  LocalDB: new RealmObject(local),
  CloudDB: Realm.Sync.User.current ? 
    new RealmObject(
        new Realm(
          Realm.Sync.User.current.createConfiguration({
            sync: {
              fullSynchronization: true,
              url: config.realmUrl
            },
            schema
          })
        )
      )
    : null,
  Translate: {}
};

export default Database;


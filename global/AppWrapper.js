import {local} from '../database/LocalRealm'
import {RealmObject} from '../database'
import { Alert } from 'react-native';

class AppWrapper {
    constructor(key, {db}){
      this.appKey = key;
      this.db = db || null;
      this.local = new RealmObject(local),
      this.user = null
    }
  
    setDB(db){
      this.db = db;
      
      return this;
    }

    getUserLocal(id){
      return this.local.get('User',id);
    }

    setUser(user){
      this.user = user;
      return this;
    }
  
    initApp(){
      if(this.db){
        this.app = this.db.search('App', `uuid = '${this.appKey}'`);
      }
      return this;
    }

    getStatusCode(code, zone_id){
        return this.db.searchObject('Card', `code = '${code}' AND zone.uuid = '${zone_id}'`);
    }

    setLog(schema, obj){
      return this.db.create(schema,obj);
  }

    getObject(schema,query){
      return this.db.searchObject(schema, query);
  }

    updateObject(schema,obj){
        this.db.update(schema,obj);
    }
  
    getScreen(key){
      return this.db.search('AppScreen', `app.uuid = {this.app.uuid} AND key = '${key}'`);
    }
  
    getScreens({limit, order}) {
      return this.db.search('AppScreen', `app.uuid = {this.app.uuid}`)
    }
  
    getSection(key, {screen}){
      let query = `app.uuid = ${this.app.uuid} AND key = ${key}`;
      if(screen){
        query += ` AND screenId.key = ${screen}`;
      }
      return this.db.search('AppSection', query);
    }
  }
  
  
const mainApp = new AppWrapper(1,{});

export default mainApp;
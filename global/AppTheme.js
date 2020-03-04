import {local} from '../database/LocalRealm'
import {RealmObject} from '../database'

class AppTheme {
    constructor(){
        this.local = null
        // new RealmObject(local);
    }

    setDBLocal(local){
        this.local = local;
        // return this;
      }
}

export default new AppTheme();
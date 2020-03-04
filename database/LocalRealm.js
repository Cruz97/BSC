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
  },
  {
    name: 'App',
    primaryKey: 'app_id',
    properties: {
      app_id: 'int?',
      version: 'int?',
      name: 'string?',
      name2: 'string?',
      icon: 'string?',
      icon_alt: 'string?',
      loading_icon: 'string?',
      loading_bg: 'string?',
      theme_color_primary: 'string?',
      theme_color_secondary: 'string?',
      theme_color_success: 'string?',
      theme_color_info: 'string?',
      theme_color_warning: 'string?',
      theme_color_danger: 'string?',
      theme_bg: 'string?',
      theme_bg_alt: 'string?',
      login_bg: 'string?',
      login_mode: 'string?',
      theme_color_text_primary: 'string?',
      theme_color_text_secondary: 'string?'
    }
  }
];


// const custom = {
//       app_id: 1,
//       name: 'BSC Ticket',
//       name2: 'BSC Ticket2',
//       icon: 'https://1.bp.blogspot.com/-bKZ7iquUf-g/V-LZEoPMw_I/AAAAAAAACGI/0CMHHVikYGkK9h9M_5N6qyYf0-6i-pc3gCEw/s1600/Barcelona%2BSporting%2BClub.PNG',
//       icon_alt: 'Icono BSC',
//       loading_icon: 'https://1.bp.blogspot.com/-bKZ7iquUf-g/V-LZEoPMw_I/AAAAAAAACGI/0CMHHVikYGkK9h9M_5N6qyYf0-6i-pc3gCEw/s1600/Barcelona%2BSporting%2BClub.PNG',
//       loading_bg: '#FAE400',
//       theme_color_primary: '#FAE400',
//       theme_color_secondary: '#000000',
//       theme_color_success: '#A2E83A',
//       theme_color_info: '#44C0FF',
//       theme_color_warning: '#FFD70F',
//       theme_color_danger: '#FF4935',
//       theme_bg: '#FAE400',
//       theme_bg_alt: '#FBED3E',
//       login_bg: '#FFFFFF',
//       login_mode: 'PIN',
//       theme_color_text_primary: '#000000',
//       theme_color_text_secondary: '#FFF'
// }


const realmOptions = {
  schema,
  schemaVersion : 7
};



export const local = new Realm(realmOptions);

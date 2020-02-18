
 const AppSchema = {
    name: 'App',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string?',
      name: 'string?',
      name2: 'string?',
    }
  }
  
  
  const AppCustomSchema = {
    name: 'AppCustom',
    primaryKey: 'uuid',
    properties: {
        uuid: 'string?',
        app_id: 'App?',
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
        theme_color_text_secondary: 'string?',
    }
  }
  
  const AppConfigurationSchema = {
      name: 'AppConfiguration',
      primaryKey: 'uuid',
      properties: {
        uuid: 'string?',
        app_id: 'App?',
        host: 'string?',
        port: 'int?',
        database: 'string?',
        username: 'string?', 
        password: 'string?',
        protocol: 'string?',
        token: 'string?',
        secret: 'string?'  
      }
  }
  
   const LanguageSchema = {
    name: 'Language',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string?',
      name: 'string?',
      language: 'string?'
    }
  }
  
   const TranslateSchema = {
    name: 'Translate',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string?',
      section: 'string?',
      label: 'string?',
      value: 'string?',
      app_id: 'App?',
      language: 'Language?'
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
  
  const AppContent= {
    name: 'AppContent',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string?',
      app_id: 'App?',
      title: 'string?',
      // type_id: 'AppContentType[]',
      // categories: 'AppContentCategory[]',
      subtitle: 'string?',
      date: 'date?',
      image: 'AppImage?',
      body: 'string?',
      gallery: 'AppImage[]',
      summary: 'string?',
      //sections: 'AppContentSection[]'
    }
  }
  
  const Event = {
    name: 'Event',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string?',
      name: 'string?',
      content_id: 'AppContent?',
      app_id: 'App?',
    }
  }
  
  const Log = {
    name: 'Log',
    primaryKey: 'uuid',
    properties: {
      uuid: 'string',
      content_id: 'AppContent?',
      app_id: 'App?',
      event: 'Event?',
      user_id: 'User?',
      zone: 'Zone?',
      status: 'bool?',
      description: 'string?',
      date: 'date?'
    }
  }
  
  
  
   
  
  //  const AppSection = {
  //     name: 'AppSection',
  //     primaryKey: 'uuid',
  //     properties: {
  //         uuid: 'string?',
  //         name: 'string?',
  //         items: 'AppSectionItem[]'
  //     }
  // }
  
  //    const AppSectionItem = {
  //     name: 'AppSectionItem',
  //     primaryKey: 'uuid',
  //     properties: {
  //         uuid: 'string?',
  //         content_id: 'AppContent?',
  //         sequence: 'int?',
  //         name: 'string?',
  //         title: 'string?',
  //         image: 'AppImage?',
  //         subtitle: 'string?',
  //         text: 'string?',
  //         date: 'date?',
  //         type: 'string?',
  //         icon: 'string?',
  
  //     }
  // }
  
  //  const AppItemBody = {
  //     name: 'AppItemBody',
  //     primaryKey: 'uuid',
  //     properties: {
  //         uuid: 'string?',
  //         app_id: 'string?',
  //         title: 'string?',
  //         subtitle: 'strng?',
  //         image: 'string?',
  //         text: 'string?',
  //         item_paragraph: 'ItemParagraph[]'
  //     }
  // }
  
  //  const ItemParagraph = {
  //   name: 'ItemParagraph',
  //   primaryKey: 'uuid',
  //   properties: {
  //       uuid: 'string?',
  //       app_id: 'string?',
  //       title: 'string?',
  //       paragraph: 'strng?'
  //   }
  // }
  
  //  const AppContentTypeSchema = {
  //   name: 'AppContentType',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     app_id: 'App?',
  //     name: 'string?',
  //     type: 'string?', 
  //     icon: 'string?',
  //     //appid: 'App?'
  //   }
  // }
  
  //  const AppContentCategorySchema = {
  //   name: 'AppContentCategory',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     app_id: 'App?',
  //     name: 'string?',
  //     icon: 'string?',
  //     type: 'string?'
  //   }
  // }
  
  //  const AppContentTagSchema = {
  //   name: 'AppContentTag',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     app_id: 'App?',
  //     name: 'string?',
  //     icon: 'string?',
  //     type: 'string?'
  //   }
  // }
  
  
  //  const Rel_Content_Type = {
  //     name: 'AppRel_Content_Type',
  //     primaryKey: 'uuid',
  //     properties: {
  //         uuid: 'string?',
  //         content_id: 'AppContent?',
  //         type_id: 'AppContentType?'
  //     }
  // } 
  
  //  const Rel_Content_Category = {
  //   name: 'AppRel_Content_Category',
  //   primaryKey: 'uuid',
  //   properties: {
  //       uuid: 'string?',
  //       content_id: 'AppContent?',
  //       type_id: 'AppContentCategory?'
  //   }
  // } 
  
  // const Rel_Content_Tag = {
  //   name: 'AppRel_Content_Tag',
  //   primaryKey: 'uuid',
  //   properties: {
  //       uuid: 'string?',
  //       content_id: 'AppContent?',
  //       type_id: 'AppContentTag?'
  //   }
  // }
  
  //  const AppContentSectionItemSchema = {
  //   name: 'AppContentSectionItem',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     app_id: 'App?',
  //     content_id: 'AppContent?',
  //     sequence: 'int?'
  //     // name: 'string?',
  //     // title: 'string?',
  //     // image: 'AppImage?',
  //     // subtitle: 'string?',
  //     // text: 'string?',
  //     // date: 'date?',
  //     // type: 'string?',
  //     // icon: 'string?',
  //   }
  // }
  
  
  //  const AppContentSectionSchema = {
  //   name: 'AppContentSection',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     app_id: 'App?',
  //     name: 'string?',
  //     items: 'AppContentSectionItem[]'
  //   }
  // }
  
  
  //  const AppSectionItemSchema = {
  //   name: 'AppSectionItem',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: 'string?',
  //     sequence: 'int?',
  //     post_id: 'int?'
  //   }
  // }
  
  
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
  
  
  
  //  const Realm = require('realm');
  
  // class stringObject extends Realm.Object {}
  
  // stringObject.AppMenuSchema = {
  //   name: 'AppMenu',
  //   primaryKey: 'uuid',
  //   properties: {
  //     uuid: { type: 'string?'},
  //     //app_id: 'App?',
  //     title_menu: { type: 'string?'},
  //     icon: {type : 'string?'},
  //     color: { type: 'string?'},
  //     tintcolor: { type: 'string?'},
  //   }
  // }
  
  export const schema = [
    AppSchema,
    AppCustomSchema,
    AppConfigurationSchema,
    LanguageSchema, 
    TranslateSchema,
    AppContent,
    User,
    Card,
    Zone,
    Event,
    Log,
    // AppContentTypeSchema,
    // AppContentCategorySchema,
    // AppContentTagSchema,
    // Rel_Content_Category,
    // Rel_Content_Tag,
    // Rel_Content_Type,
    // AppContentSectionItemSchema,
    // AppContentSectionSchema,
     AppImageSchema,
    // Parking,
    // ZoneParking
  ];
  
  
  
  
  
  
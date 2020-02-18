export const detectBg = (str) =>{
    let _str = str || '';
    if(_str.match(/^https?:\/\/.+/)){ return 'url'}
    if(_str.match(/^#[0-9a-fA-F]{6}$/)){ return 'color'}
    return null;
  }
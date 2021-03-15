import CryptoJS from 'crypto-js';

export function encrypt(value) {
  return CryptoJS.AES.encrypt(value, 'U 12OG1a23 rsS4 57B').toString();
}

export function decrypt(value) {
  var bytes = CryptoJS.AES.decrypt(value, 'U 12OG1a23 rsS4 57B');
  return bytes.toString(CryptoJS.enc.Utf8);
}

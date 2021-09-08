// @ts-nocheck
import CryptoES from 'crypto-es';

const JsonFormatter = {
  stringify: function (cipherParams) {
    var jsonObj = { ct: cipherParams.ciphertext.toString(CryptoES.enc.Base64) };
    if (cipherParams.iv) {
      jsonObj.iv = cipherParams.iv.toString();
    }
    if (cipherParams.salt) {
      jsonObj.s = cipherParams.salt.toString();
    }
    return JSON.stringify(jsonObj);
  },
  parse: function (jsonStr) {
    var jsonObj = JSON.parse(jsonStr);
    var cipherParams = CryptoES.lib.CipherParams.create({
      ciphertext: CryptoES.enc.Base64.parse(jsonObj.ct),
    });
    if (jsonObj.iv) {
      cipherParams.iv = CryptoES.enc.Hex.parse(jsonObj.iv);
    }
    if (jsonObj.s) {
      cipherParams.salt = CryptoES.enc.Hex.parse(jsonObj.s);
    }
    return cipherParams;
  },
};

export default JsonFormatter;

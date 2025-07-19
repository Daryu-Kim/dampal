import CryptoJS from "crypto-js";

const secretKey = "dampalshopecigarettecrypto";
// 암호화
export function encryptText(text) {
  return CryptoJS.AES.encrypt(text, secretKey).toString();
}

// 복호화
export function decryptText(encryptedText) {
  const bytes = CryptoJS.AES.decrypt(encryptedText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
}

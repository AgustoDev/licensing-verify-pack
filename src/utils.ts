import CryptoJS from 'crypto-js';
import { type } from 'os';

interface encryptDataProps {
  id: string;
  name: string;
  startDate: number;
  endDate: number;
  gracePeriod?: number;
}

class LicenseValidator {
  verify(licensingKey: string) {
    let response = { data: null, error: null, errorMessage: null };
    try {
      let l: any = licensingKey.charAt(licensingKey.length - 1);
      let h = parseInt(l) + 30;
      let s = licensingKey.substring(0, l);
      let d: any = licensingKey.slice(h, licensingKey.length - 1);

      d = CryptoJS.AES.decrypt(d, s);
      d = d.toString(CryptoJS.enc.Utf8);

      let r: encryptDataProps = JSON.parse(d);
      return { ...response, data: r };
    } catch (error: any) {
      return { ...response, error, errorMessage: error.message };
    }
  }
}

export default LicenseValidator;

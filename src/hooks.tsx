import { useMemo } from 'react';
import { preprocess } from './preprocess';
import dbJson from './database/db.json';

const db = preprocess(dbJson);

export const useThaiAddress = () => {
  const addresses = useMemo(() => db, []);

  // https://github.com/Sellsuki/thai-address-database/blob/master/src/index.js#L73-L104
  const resolveResultbyField = (
    type: 'district' | 'amphoe' | 'province' | 'zipcode',
    searchStr: string,
    maxResult?: number
  ) => {
    searchStr = searchStr.toString().trim();
    if (searchStr === '') {
      return [];
    }
    if (!maxResult) {
      maxResult = 20;
    }
    let possibles = [];
    try {
      possibles = db
        .filter((item: any) => {
          let regex = new RegExp(searchStr, 'g');
          return (item[type] || '').toString().match(regex);
        })
        .slice(0, maxResult);
    } catch (e) {
      return [];
    }
    return possibles;
  };

  const searchAddressByDistrict = (searchStr: string, maxResult?: number) => {
    return resolveResultbyField('district', searchStr, maxResult);
  };
  const searchAddressByAmphoe = (searchStr: string, maxResult?: number) => {
    return resolveResultbyField('amphoe', searchStr, maxResult);
  };
  const searchAddressByProvince = (searchStr: string, maxResult?: number) => {
    return resolveResultbyField('province', searchStr, maxResult);
  };
  const searchAddressByZipcode = (searchStr: string, maxResult?: number) => {
    return resolveResultbyField('zipcode', searchStr, maxResult);
  };

  return {
    addresses,
    searchAddressByDistrict,
    searchAddressByAmphoe,
    searchAddressByProvince,
    searchAddressByZipcode,
  };
};

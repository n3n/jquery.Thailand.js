import { ThaiAddress } from './props';

export const preprocess = (data: any) => {
  var lookup: string[] = [];
  var words: string[] = [];
  var expanded: any[] = [];
  var useLookup = false;

  if (data.lookup && data.words) {
    // compact with dictionary and lookup
    useLookup = true;
    lookup = data.lookup.split('|');
    words = data.words.split('|');
    data = data.data;
  }

  const t = function t(text: string) {
    function repl(m: string) {
      var ch = m.charCodeAt(0);
      return words[ch < 97 ? ch - 65 : 26 + ch - 97];
    }
    if (!useLookup) {
      return text;
    }
    if (typeof text === 'number') {
      text = lookup[text];
    }
    return text.replace(/[A-Z]/gi, repl);
  };

  if (!data[0].length) {
    // non-compacted database
    return data;
  }
  // decompacted database in hierarchical form of:
  // [["province",[["amphur",[["district",["zip"...]]...]]...]]...]
  data.forEach(function(provinces: any[]) {
    var i = 1;
    if (provinces.length === 3) {
      // geographic database
      i = 2;
    }

    provinces[i].forEach(function(amphoes: any[]) {
      amphoes[i].forEach(function(districts: any[]) {
        districts[i] = districts[i] instanceof Array ? districts[i] : [districts[i]];
        districts[i].forEach(function(zipcode: number) {
          var entry: ThaiAddress = {
            district: t(districts[0]),
            amphoe: t(amphoes[0]),
            province: t(provinces[0]),
            zipcode: zipcode,
          };
          if (i === 2) {
            // geographic database
            entry.district_code = districts[1] || false;
            entry.amphoe_code = amphoes[1] || false;
            entry.province_code = provinces[1] || false;
          }
          expanded.push(entry);
        });
      });
    });
  });
  return expanded;
};

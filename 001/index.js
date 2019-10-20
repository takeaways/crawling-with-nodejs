//001
// const parse = require('csv-parse/lib/sync');
const fs = require('fs');
// const path = require('path');
//
// const csv = fs.readFileSync('001/test.csv');
// const records = parse(csv.toString('utf-8'));
// records.forEach( (f,i) => {
//   console.log(i, f)
// })

//002
// const xlsx = require('xlsx');
// const workbook = xlsx.readFile('./001/data.xlsx');
// const ws = workbook.Sheets.영화목록;
// const records = xlsx.utils.sheet_to_json(ws);
//
// for(const [i ,r] of records.entries()){
//   console.log(i,r.제목 , r.링크)
// }


//003
const axios = require('axios');
const cheerio = require('cheerio');
const xlsx = require('xlsx');
const workbook = xlsx.readFile('./001/data.xlsx');
const ws = workbook.Sheets.영화목록;
const records = xlsx.utils.sheet_to_json(ws);

const crawler = async () => {
  await Promise.all(records.map( async r =>{
    const response = await axios.get(r.링크);
    if(response.status === 200){
      const html = response.data;
      const $ = cheerio.load(html);
      const text = $('.score.score_left .star_score').text();
      console.log(r.제목, "평점 : ",text.trim());
    }
  }));
}

// crawler();

(async function(){
  for(const [i ,r] of records.entries()){
    const response = await axios.get(r.링크);
    if(response.status === 200){
      const html = response.data;
      const $ = cheerio.load(html);
      const text = $('.score.score_left .star_score').text();
      console.log(r.제목, "평점 : ",text.trim());
    }
  }
})();

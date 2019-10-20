const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const fs = require('fs');
const puppeteer = require('puppeteer');

const csv = fs.readFileSync('002/test.csv');
const records = parse(csv.toString('utf-8'));


const crawler = async () => {
  try {
    const result = [];
    const browser = await puppeteer.launch({headless:process.env.NODE_ENV === 'production'});
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36");
    console.log(await page.evaluate('navigator.userAgent'));
    for( const [i,r] of records.entries()){
        await page.goto(r[1]);
        const text = await page.evaluate(() => {
          const score = document.querySelector('.score.score_left .star_score');
          if(score) return {
            score : score.textContent,
          }
        });
        if(text){
          result[i] = [...r, text['score'].trim()] ;
        }
        page.waitFor(3000);
    };
    page.close();
    await browser.close();
    const str = stringify(result);
    console.log(str);
    fs.writeFileSync('002/result.csv', str);
  }catch(e){
    console.error(e);
  }
}

crawler();

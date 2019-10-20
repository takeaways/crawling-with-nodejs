const parse = require('csv-parse/lib/sync');
const stringify = require('csv-stringify/lib/sync');
const axios = require('axios');
const fs = require('fs');
const puppeteer = require('puppeteer');
const csv = fs.readFileSync('003/test.csv');
const records = parse(csv.toString('utf-8'));

fs.readdir('003/poster', err => {
  if(err){
    console.error('Not Found Folder');
    fs.mkdirSync('003/poster');
  }
});

fs.readdir('003/screenshot', err => {
  if(err){
    console.error('Not Found Folder');
    fs.mkdirSync('003/screenshot');
  }
});

const crawler = async () => {
  try {
    const result = [];
    const browser = await puppeteer.launch({
      headless:process.env.NODE_ENV === 'production',
      args:['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.setViewport({
      width:1920,
      height:1080
    });
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36");

    for( const [i,r] of records.entries()){
        await page.goto(r[1]);
        const data = await page.evaluate(async () => {
          const scoreEl = document.querySelector('.score.score_left .star_score');
          const imgEl = document.querySelector('.poster img');
          let img = '';
          let score = '';
          if(imgEl) img = imgEl.src;
          if(scoreEl) score = scoreEl.textContent;
          return {
            score,
            img
          }
        });
        if(data) result[i] = [...r, data['score'].trim(), data.img] ;
        if(data && data.img){
          const buffer = await page.screenshot({
            path:`003/screenshot/${r[0]}.png`,
            //fullPage:true,
            clip:{
              /*
                0,0 [ 시작:(100,100 ), (width : 300,height: 300) ]
              */
              x:100,
              y:100,
              width:300,
              height:300
            }
          });
          //fs.writeFileSync('003/screenshot',buffer);
          const imgResult = await axios.get(data.img.replace(/\?.*$/, ''), {
            responseType:'arraybuffer',
          });
          fs.writeFileSync(`003/poster/${r[0]}.jpg`, imgResult.data);
        }
        await page.waitFor(1000);
    };

    await page.close();
    await browser.close();
    const str = stringify(result);
    fs.writeFileSync('003/result.csv', str);
  }catch(e){
    console.error(e);
  }
}

crawler();

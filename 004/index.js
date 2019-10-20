const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');

const getImages = async (page) => {
  await page.waitFor(2000);
  return page.evaluate(async ()=>{
    window.scrollTo(0,0);
    let imgs = [];
    const imgsEls = document.querySelectorAll('img._2zEKz');
    if(imgsEls.length){
      imgsEls.forEach(v => {
        let src = v.src;
        if(src) imgs.push(v.src);
        nowTag = v.parentElement.className
        v.parentElement.removeChild(v);
      })
    }
    window.scrollBy(0,1500);
    return imgs
  });
}

const crawler = async () => {
  try {
    let result = [];
    const browser = await puppeteer.launch({ headless:process.env.NODE_ENV === 'production'});
    const page = await browser.newPage();
    await page.goto('https://unsplash.com');
    while(true){
      result = result.concat( await getImages(page) );
      if(result.length > 10) break;
    }
    await page.close();
    await browser.close();
    return result;
  } catch (e) {
    console.error(e);
  }
}

(async () => {
  try {
    fs.readdir('004/images', err => err && fs.mkdirSync('004/images') );
    const result = await crawler();
    fs.writeFile('004/result.txt',result.join("\n"), error => {
      if(error)throw error;
    })
    result.forEach(async (src, index) => {
      const image = await axios.get(src, {responseType:'arraybuffer'});
      fs.writeFileSync(`004/images/${index}.jpeg`, image.data);
    });
  } catch (e) {
    console.error(e);
  }
})();

const PROXY = "http://spys.one/free-proxy-list/KR/";
const puppeteer = require('puppeteer');
const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv');
const db = require('./models');
dotenv.config();

const crawler = async () => {
  try {
    await db.sequelize.sync();
    let result = [];
    let browser = await puppeteer.launch({
      headless:true,
      args:[
        '--window-size=1920,1080',
        '--disable-notifications'
      ]
    });
    let page = await browser.newPage();
    await page.setViewport({
      width:1920,
      height:1080
    });

    await page.goto(PROXY);
    const proxies = await page.evaluate(() => {
      const ip_list = Array.from(document.querySelectorAll(`tr > td:first-of-type > .spy14`)).map(v=>v.innerText);
      const types = Array.from(document.querySelectorAll(`tr > td:nth-of-type(2)`)).splice(5).map(v=>v.textContent);
      const latency = Array.from(document.querySelectorAll(`tr > td:nth-of-type(6) > .spy1`)).map(v=>v.textContent);
      return ip_list.map((v, i) => {
        return {
          ip:v,
          type:types[i],
          latency:latency[i]
        }
      })
    });
    const type_http_sorted_by_latency_proxies = proxies.filter(v => v.type.startsWith("HTTP")).sort( (a,b) => a.latency - b.latency) ;
    await page.close();
    await browser.close();

    await Promise.all(type_http_sorted_by_latency_proxies.map(obj =>{
      const {ip, type, latency} = obj;
      return db.Proxy.upsert({
        ip,type,latency
      })
    }))

    const fastest_proxy = await db.Proxy.findOne({
      order:[['latency','ASC']]
    })


    browser = await puppeteer.launch({
      headless:true,
      args:[
        '--window-size=1920,1080',
        '--disable-notifications',
        //`--proxy-server=${fastest_proxy.ip}`
      ],
    });


    const context1 = await browser.createIncognitoBrowserContext();
    const page1 = await context1.newPage();


    page = await browser.newPage();
    await page.goto("https://www.naver.com");
    await page1.goto("https://www.naver.com");


  } catch (e) {
    console.error(e);
  }
}


crawler();

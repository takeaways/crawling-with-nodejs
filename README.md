"# crawling-with-nodejs"
### NodeJs 크롤링 - 파이썬, 자바 001
1. CSV, XLSX 파싱
1. axios, cheerio로 간단한 페이지 크롤링
1. puppeteer로 복작합 페이지 크롤링
  - SPA 크롤링 (인피니트 스크롤링)
  - 로그인이 필요한 페이지 스크롤링
  - 데이터 베이스에 저장
  - 크롤링한 결과물을 다시 CSV, XLSX로 저장
## 장점
1. 웹을 구성하는 언어가 자바스크립트기 때문에 호완성이 좋다.
  - 생산성이 좋다.

### csv-parse 패키지로 csv 파싱하기
3. npm init
3. csv: 콤마와 줄 바꿈의로 구별된 값들
3. npm i csv-parse 바퀴를 재발명하지 말아라
3. const parse = require('csv-parse/lib/sync')
  - node_modules/csv-parse/lib/sync 함수를 require 하는 것으로 보면됩니다.

### xlsx패키지로  엑셀 파싱하기
1. npm i xlsx

### axios + cheerio
1. npm i axios cheerio

### puppeteer 002
1. npm i puppeteer
2. userAgent 내 환경이 무엇인지
3. const browser = await puppeteer.launch({headless:false});
  - headless : 서버에서 사용하기 때문에 화면에 보이고 안보이고를 판단 할 수 있다
4. npm i csv-stringify
5. document 쓰는 위치 잘 기억!! 002/index.js
6. https://try-puppeteer.appspot.com
7. page.setUserAgent : navigator.userAgent

### axios & cheerio로 이미지 다루기 003
<pre>
<code>
  const imgResult = await axios.get(data.img.replace(/\?.*$/, ''), {
    responseType:'arraybuffer',
  });
  fs.writeFileSync(`003/poster/${r[0]}.jpg`, imgResult.data);


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
</code>
</pre>

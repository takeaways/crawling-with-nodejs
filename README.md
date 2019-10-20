"# crawling-with-nodejs"
### NodeJs 크롤링 - 파이썬, 자바
1. CSV, XLSX 파싱
1. axios, cheerio로 간단한 페이지 크롤링
1. puppeteer로 복작합 페이지 크롤링
  - SPA 크롤링 (인피니트 스크롤링)
  - 로그인이 필요한 페이지 스크롤링
  - 데이터 베이스에 저장
  - 크롤링한 결과물을 다시 CSV, XLSX로 저장
## 장점
2. 웹을 구성하는 언어가 자바스크립트기 때문에 호완성이 좋다.
  - 생산성이 좋다.

### csv-parse 패키지로 csv 파싱하기
1. npm init
2. csv: 콤마와 줄 바꿈의로 구별된 값들
3. npm i csv-parse 바퀴를 재발명하지 말아라
4. const parse = require('csv-parse/lib/sync')
  - node_modules/csv-parse/lib/sync 함수를 require 하는 것으로 보면됩니다.

### xlsx패키지로  엑셀 파싱하기
1. npm i xlsx

### axios + cheerio
1. npm i axios cheerio

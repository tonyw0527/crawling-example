// crawling example
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

// set delay to the http request
function delay(ms: number) {
  return new Promise<void>(function(resolve, reject) {
    setTimeout(function() {
      resolve();
    }, ms)
  })
}

// get html data from the URL
function getHTML(url: string) {
  return new Promise(resolve => {
    delay(300).then(function() {
      axios.get(url).then(function(data: any) {
        resolve(data);
      })
    })
  })
}

// custom function
async function getSomeThing(name: string) {

  const baseURL = `https://people.com/list?name=${name}`;

  return await getHTML(baseURL).then((html: any) => {
    
    // whole data
    const $ = cheerio.load(html.data);
  
    // pick a data you need in jquery style
    const userName = $(`#${name}`, 'body').find('.name-span').text();
  })
}

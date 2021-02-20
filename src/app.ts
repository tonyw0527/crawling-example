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

// custom function for handling queries or parameters.
async function getSomeThing(name: string, city: string) {

  const baseURL = `https://people.com/list?name=${name}&city=${city}`;

  return await getHTML(baseURL).then((html: any) => {
    
    // whole data
    const $ = cheerio.load(html.data);
  
    // pick a data you need by jquery grammar
    const userName = $(`#${name}`, 'body').find('.name-span').text();
    console.log('crawled user name - ', userName);
  })
}

// If you want to save the data into JSON file.
async function saveInJSON(fileName: string, data: Array<object>) {
  
  const json = JSON.stringify(data);

  fs.writeFile(`${fileName}.json`, '', 'utf8', (error: any) => {
    if (error) {
      console.log('error', error);
    }
    console.log(`Successfully created ${fileName}.json`);
  });

  try {
    fs.appendFileSync(`${fileName}.json`, json, 'utf8');
    console.log('Successfully saved in json');
  } catch (error: any) {
    console.log('error', error);
  }
}
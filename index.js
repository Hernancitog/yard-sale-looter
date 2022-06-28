const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');


// const app = express();

// YardSaleSearch (YSS)
const YSS_URL = 'https://www.yardsalesearch.com/garage-sales.html?week=0&date=0&zip=33707&r=10&q='
const YSS_EVENT_CLASS='.event.row'

// yardsalesearch.com
console.log('Querying ' + YSS_URL)
axios(YSS_URL)
    .then(response => {
        const html = response.data
        console.log('Parsing response...')
        const $ = cheerio.load(html)

        // TODO: Modify to only pull events within search radius
        const events = $(YSS_EVENT_CLASS, html)
        const eventCount = events.contents().length
        console.log(eventCount + ' event(s) found')

        if (events.contents().length > 0) {
            const sales = parseYSSSales($, events)
        }
        else {
            console.log('Nothing to process...')
        }
    })
    .catch(error => {
        console.error(error)
    })

function parseYSSSales($, events) {
    const YSS_NAME_QUERY = 'h2[itemprop=name]'
    // location element also includes coordinates if necessary
    const YSS_ADDRESS_QUERY = 'div[itemprop=address]'

    events.each((index, element) => {
        const saleDetails = $(element).find('.sale-details')

        const name = saleDetails.find(YSS_NAME_QUERY).text()
        const address = saleDetails.find(YSS_ADDRESS_QUERY).text()
        if (index < 10){
            console.log(address)
        }
        // i++
    })

}

function test() {
    console.log('Parsing ');
    // const list = document.getElementsByClassName('event row');
    // console.log(list);
    // console.log(list.length + ' rows retrieved');

    // list.forEach(parseAddress);

    // const item = list[0];
    // console.log(item.textContent);
}

function parseAddress(row, index) {
    if (index==0) {
        console.log(row.textContent);
    }
}


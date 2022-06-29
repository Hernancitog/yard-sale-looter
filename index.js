const cheerio = require('cheerio');
const axios = require('axios');
const express = require('express');


// const app = express();

// YardSaleSearch (YSS)
const week = 1
const date = 0
const zip = 33707
const radius = 10
const keyword_query = ''
const YSS_URL = `https://www.yardsalesearch.com/garage-sales.html?week=${week}&date=${date}&zip=${zip}&r=${radius}&q=${keyword_query}`

// yardsalesearch.com
console.log('Querying ' + YSS_URL)
axios(YSS_URL)
    .then(response => {
        const html = response.data
        console.log('Parsing response...')
        const $ = cheerio.load(html)

        const events = $('.box.radius.clearfix > .eventList.clearFix > .event.row', html)
        const sales = parseYSSSales($, events)
        
    })
    .catch(error => {
        console.error(error)
    })

function parseYSSSales($, events) {
    const yardsales = []
    var count = 0

    events.each((index, element) => {
        const saleDetails = $(element).find('.sale-details')

        const name = saleDetails.find('h2[itemprop=name]').text()
        const address = saleDetails.find('div[itemprop=address]').text()
        const latitude = saleDetails.find('meta[itemprop=latitude]').attr('content')
        const longitude = saleDetails.find('meta[itemprop=longitude]').attr('content')
        const startDate = saleDetails.find('meta[itemprop=startDate]').attr('content')
        const endDate = saleDetails.find('meta[itemprop=endDate]').attr('content')

        yardsales.push({
            name,
            address,
            latitude,
            longitude,
            startDate,
            endDate
        })
        count++
    })

    console.log(count + ' yardsale(s) parsed')
    return yardsales
}



// function test() {
//     console.log('Parsing ');
//     const list = document.getElementsByClassName('event row');
//     console.log(list);
//     console.log(list.length + ' rows retrieved');

//     list.forEach(parseAddress);

//     const item = list[0];
//     console.log(item.textContent);
// }

// function parseAddress(row, index) {
//     if (index==0) {
//         console.log(row.textContent);
//     }
// }


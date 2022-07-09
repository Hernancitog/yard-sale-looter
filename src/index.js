import axios from 'axios';

window.initMap = initMap;
window.loadYSS = loadYSS;


let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 27.7706423, lng: -82.6985936 },
    zoom: 12,
    mapId: "338e2796e9465f47"
  });
}

// YardSaleSearch (YSS)
// TODO: Get these values from browser and pass to loadYSS()
const week = 1
const date = 0
const zip = 33707
const radius = 10
const keyword_query = ''
const YSS_URL = `https://www.yardsalesearch.com/garage-sales.html?week=${week}&date=${date}&zip=${zip}&r=${radius}&q=${keyword_query}`

function loadYSS() {
  axios.get('http://localhost:3000/parse/yss')
      .then(response => {
          const data = response.data
          console.log('Parsed data: ' + JSON.stringify(data) )
          data.forEach(createMarkerFromSale)
      })
      .catch(error => {
          console.error(error)
      })
}

function createMarkerFromSale(yardsale) {
  const marker = new google.maps.Marker({
    position: {lat: Number(yardsale['latitude'] ),  lng: Number(yardsale['longitude'] ) },
    map: map,
    title: yardsale['name']
  });

  console.log(yardsale['name'])
}


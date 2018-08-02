var app = function(){
  const url = 'https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json'
  makeRequest(url, requestComplete)
}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener('load', callback);
  request.send();
};

const requestComplete = function(){
  // this is the request object itself
  if(this.status !== 200) return;
  // grab the response text
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateList(beers);
  getBeer(beers);
};

const populateList = function(beers) {
  const select = document.getElementById('beer-select')
  beers.forEach(function(beer, index) { // for(var beer of beers)
    let option = document.createElement('option') // creates an empty option tag <option> </option>
    option.innerText = beer.name // puts beers name in the option tag  <option> Punk IPA </option>
    option.value = index // <option value="1"> Punk IPA </option>
    select.appendChild(option) // sticks that in the select drop down
  });
}

  const getBeer = function (beers) {
    const selectedBeer = document.querySelector('select')
    selectedBeer.addEventListener('change', function() {
      let beer = beers[this.value] // once theres a change in the select option
      // it then calls getBeerInfo and displays the relevant information
      getBeerInfo(beer);
    });
  }

  const getBeerInfo = function (beer){
    const div = document.getElementById('beer-details')
    clearContent(div)
    const beerName = document.createElement('h2')
    beerName.innerText = `${beer.name}`
    const beerTagline = document.createElement('p')
    beerTagline.innerText = `"${beer.tagline}"`
    const beerImage = document.createElement('img')
    beerImage.src = beer.image_url
    div.appendChild(beerName)
    div.appendChild(beerTagline)
    div.appendChild(beerImage)
    return div
  }

  const clearContent = function(node){
    while (node.hasChildNodes()) {
      node.removeChild(node.lastChild);
    }
  }


    window.addEventListener('load', app);

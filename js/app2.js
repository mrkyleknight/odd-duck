'use strict';

// ***** GLOBALS ******
let votingRounds = 25;
let duckArray = [];
const voteData = [];

// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');
let chartContainer = document.getElementById('chart-container');

// **** CONSTRUCTOR FUNCTION ****
function Duck(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** HELPER FUNCTIONS / UTILITIES ****

function randomIndexGenerator(){
  return Math.floor(Math.random() * duckArray.length);
}

function renderImgs(){
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

  while (imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex){
    imageOneIndex = randomIndexGenerator();
    imageTwoIndex = randomIndexGenerator();
    imageThreeIndex = randomIndexGenerator();
  }

  imgOne.src = duckArray[imageOneIndex].image;
  imgOne.title = duckArray[imageOneIndex].name;

  imgTwo.src = duckArray[imageTwoIndex].image;
  imgTwo.title = duckArray[imageTwoIndex].name;

  imgThree.src = duckArray[imageThreeIndex].image;
  imgThree.title = duckArray[imageThreeIndex].name;

  duckArray[imageOneIndex].views++;
  duckArray[imageTwoIndex].views++;
  duckArray[imageThreeIndex].views++;
}

function collectVoteData(){
  voteData.length = 0;
  for (let i = 0; i < duckArray.length; i++) {
    voteData.push({
      name: duckArray[i].name,
      votes: duckArray[i].votes,
      views: duckArray[i].views
    });
  }
}

function displayChart(){
  // Create labels and data arrays
  const labels = voteData.map(item => item.name);
  const votesData = voteData.map(item => item.votes);
  const viewsData = voteData.map(item => item.views);

  // Create chart canvas element
  const chartCanvas = document.createElement('canvas');
  chartCanvas.id = 'chart';
  chartContainer.appendChild(chartCanvas);

  // Create the chart
  new Chart(chartCanvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Votes',
          data: votesData,
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Views',
          data: viewsData,
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

function handleImgClick(event){
  let imageClicked = event.target.title;

  for(let i = 0; i < duckArray.length; i++){
    if(imageClicked === duckArray[i].name){
      duckArray[i].votes++;
      votingRounds--;
      renderImgs();
    }
  }

  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);

    let stringifedDucks = JSON.stringify(duckArray);
    collectVoteData();
    displayChart();
    console.log('Stringifed Ducks', stringifedDucks);

    localStorage.setItem('myDucks', stringifedDucks);
  }
}

function handleShowResults(){
  if(votingRounds === 0){
    for(let i = 0; i < duckArray.length; i++){
      let duckListItem = document.createElement('li');
      duckListItem.textContent = `${duckArray[i].name} - Votes: ${duckArray[i].votes} & Views: ${duckArray[i].views}`;
      resultsList.appendChild(duckListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// **** EXECUTABLE CODE *****

let retrievedDucks = localStorage.getItem('myDucks')

console.log('Ducks from local sotrage >>>', retrievedDucks);

let parsedDucks = JSON.parse(retrievedDucks);
console.log('parsed items  >>>', parsedDucks);

if(retrievedDucks){
  duckArray = parsedDucks; 

} else { 
let sweep = new Duck('sweep', 'png');
let bag = new Duck('bag');
let banana = new Duck('banana');
let bathroom = new Duck('bathroom');
let boots = new Duck('boots');
let breakfast = new Duck('breakfast');
let bubblegum = new Duck('bubblegum');
let chair = new Duck('chair');
let cthulhu = new Duck('cthulhu');
let dogDuck = new Duck('dog-duck');
let dragon = new Duck('dragon');
let pen = new Duck('pen');
let petSweep = new Duck('pet-sweep');
let scissors = new Duck('scissors');
let shark = new Duck('shark');
let tauntaun = new Duck('tauntaun');
let unicorn = new Duck('unicorn');
let waterCan = new Duck('water-can');
let wineGlass= new Duck('wine-glass');

duckArray.push(sweep, bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogDuck, dragon, pen, petSweep, scissors, shark, tauntaun, unicorn, waterCan, wineGlass);

}

renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);



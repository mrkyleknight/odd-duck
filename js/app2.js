'use strict';







// ***** GLOBALS ******
let votingRounds = 25;
let duckArray = [];





// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

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
  // DONE: get 2 random images on the page
  let imageOneIndex = randomIndexGenerator();
  let imageTwoIndex = randomIndexGenerator();
  let imageThreeIndex = randomIndexGenerator();

  // DONE: make sure they are unique
  while(imageOneIndex === imageTwoIndex || imageOneIndex === imageThreeIndex || imageTwoIndex === imageThreeIndex){
    
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

  // DONE: Increase the goats views
  duckArray[imageOneIndex].views++;
  duckArray[imageTwoIndex].views++;
  duckArray[imageThreeIndex].views++;
}

// **** EVENT HANDLERS ****
function handleImgClick(event){
  // DONE: Identify the image that was clicked

  let imageClicked = event.target.title;
  // console.dir(event.target);
  // console.log(imageClicked);

  // TODO: Increase the vote on that image
  for(let i = 0; i < duckArray.length; i++){
    if(imageClicked === duckArray[i].name){
      duckArray[i].votes++;
      // TODO: decrement the voting round
      votingRounds--;
      // TODO: generate new images
      renderImgs();
    }
  }

  // TODO: once voting are done, we want to remove the ability to click
  if(votingRounds === 0){
    imgContainer.removeEventListener('click', handleImgClick);
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


renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
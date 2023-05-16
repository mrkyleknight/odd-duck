'use strict';







// ***** GLOBALS ******
let votingRounds = 20;
let goatArray = [];





// ***** DOM WINDOWS ****
let imgContainer = document.getElementById('img-container');
let imgOne = document.getElementById('img-one');
let imgTwo = document.getElementById('img-two');
let imgThree = document.getElementById('img-three');
let resultBtn = document.getElementById('show-results-btn');
let resultsList = document.getElementById('results-container');

// **** CONSTRUCTOR FUNCTION ****
function Goat(name, imageExtension = 'jpg'){
  this.name = name;
  this.image = `img/${name}.${imageExtension}`;
  this.votes = 0;
  this.views = 0;
}

// **** HELPER FUNCTIONS / UTILITIES ****

function randomIndexGenerator(){
  return Math.floor(Math.random() * goatArray.length);
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

  imgOne.src = goatArray[imageOneIndex].image;
  imgOne.title = goatArray[imageOneIndex].name;

  imgTwo.src = goatArray[imageTwoIndex].image;
  imgTwo.title = goatArray[imageTwoIndex].name;

  imgThree.src = goatArray[imageThreeIndex].image;
  imgThree.title = goatArray[imageThreeIndex].name;

  // DONE: Increase the goats views
  goatArray[imageOneIndex].views++;
  goatArray[imageTwoIndex].views++;
  goatArray[imageThreeIndex].views++;
}

// **** EVENT HANDLERS ****
function handleImgClick(event){
  // DONE: Identify the image that was clicked

  let imageClicked = event.target.title;
  // console.dir(event.target);
  // console.log(imageClicked);

  // TODO: Increase the vote on that image
  for(let i = 0; i < goatArray.length; i++){
    if(imageClicked === goatArray[i].name){
      goatArray[i].votes++;
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
    for(let i = 0; i < goatArray.length; i++){
      let goatListItem = document.createElement('li');

      goatListItem.textContent = `${goatArray[i].name} - Votes: ${goatArray[i].votes} & Views: ${goatArray[i].views}`;

      resultsList.appendChild(goatListItem);
    }
    resultBtn.removeEventListener('click', handleShowResults);
  }
}

// **** EXECUTABLE CODE *****
let bunnyGoat = new Goat('sweep', 'png');
let coolGoat = new Goat('bag');
let cruisinGoat = new Goat('banana');
let floatYourGoat = new Goat('bathroom');
let goatOutOfHand = new Goat('boots');
let kissingGoat = new Goat('breakfast');
let sassyGoat = new Goat('bubblegum');
let smilingGoat = new Goat('chair');
let sweaterGoat = new Goat('cthulhu');

goatArray.push(bunnyGoat, coolGoat, cruisinGoat, floatYourGoat, goatOutOfHand, kissingGoat, sassyGoat, smilingGoat, sweaterGoat);


renderImgs();

imgContainer.addEventListener('click', handleImgClick);
resultBtn.addEventListener('click', handleShowResults);
const requestURL = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
let drawnNumber 

function error(numberError) {
  let hundredNumber = Math.floor(numberError/100)
  let tenNumber = Math.floor((numberError%100)/10)
  let unitNumber = Math.floor((numberError%100)%10)
  returnMessage.style.color = '#CC3300'
  returnMessage.innerHTML = 'ERRO'
  fillNumber('hundred', hundredNumber, '#CC3300')
  fillNumber('ten', tenNumber, '#CC3300')
  fillNumber('unit', unitNumber, '#CC3300')
  endGame()
  inputForm.value = ''
}

request.onload = function() {
  if (request.status !== 200) {
    return error(request.status)
  }
  else drawnNumber = request.response.value
}

let returnMessage = document.querySelector('div.return-message')
let buttonReset = document.querySelector('button.reset')
let inputForm = document.querySelector('#chosen-number')
let buttonForm = document.querySelector('#send-number')
let classesHundred = document.querySelectorAll(".hundred")
let classesTen = document.querySelectorAll(".ten")
returnMessage.style.visibility = 'hidden'
buttonReset.style.visibility = 'hidden'

function displayNumber(chosenNumber) {
  
  if (chosenNumber <= 9) {
    for (classHundred of classesHundred) {
      classHundred.style.display = "none"
    }
    for(classTen of classesTen){
      classTen.style.display = "none"
    }
  }
  else if (chosenNumber <= 99) {
    for(classHundred of classesHundred){
      classHundred.style.display = "none"
    }
  }
}

function fillNumber(typeClass, number, color = '#262A34') {
  const numbersList = {
    0: ".pos-1, .pos-2, .pos-3, .pos-4, .pos-5, .pos-6",
    1: ".pos-3, .pos-6",
    2: ".pos-1, .pos-3, .pos-4, .pos-5, .pos-7",
    3: ".pos-1, .pos-3, .pos-4, .pos-6, .pos-7",
    4: ".pos-2, .pos-3, .pos-6, .pos-7",
    5: ".pos-1, .pos-2, .pos-4, .pos-6, .pos-7",
    6: ".pos-1, .pos-2, .pos-4, .pos-5, .pos-6, .pos-7",
    7: ".pos-1, .pos-3, .pos-6",
    8: ".pos-1, .pos-2, .pos-3, .pos-4, .pos-5, .pos-6, .pos-7",
    9: ".pos-1, .pos-2, .pos-3, .pos-4, .pos-6, .pos-7"
  }
  
  let typeList = document.querySelectorAll(`.${typeClass}`)
  for (let type of typeList) {
    let segmentsList = type.querySelectorAll(numbersList[number])
    for (let segment of segmentsList) {
      segment.style.fill = color
    }
  }
}

function resetNumber() {
  for(classHundred of classesHundred) {
    classHundred.style.display = 'inline'
  }
  for(classTen of classesTen){
    classTen.style.display = 'inline'
  }
  let segments = document.querySelectorAll('path')
  for (let segment of segments) {
    segment.style.fill = '#DDDDDD'
  }
}

function endGame() {
  buttonReset.style.visibility = 'visible'
  inputForm.setAttribute('disabled', true)
  inputForm.style.background = "#F5F5F5"
  inputForm.value = ''
  buttonForm.setAttribute('disabled', true)
  buttonForm.style.background = "#DDDDDD"
  buttonForm.style.cursor = "auto"
}

displayNumber(0)
fillNumber('unit', 0)

function sendNumber() {
  resetNumber()
  chosenNumber = parseFloat(document.querySelector('input#chosen-number').value)
  let hundredNumber = Math.floor(chosenNumber/100)
  let tenNumber = Math.floor((chosenNumber%100)/10)
  let unitNumber = Math.floor((chosenNumber%100)%10)
  fillNumber('hundred', hundredNumber)
  fillNumber('ten', tenNumber)
  fillNumber('unit', unitNumber)
  returnMessage.style.visibility = 'visible'

  displayNumber(chosenNumber)

  if (Number.isInteger(chosenNumber) && chosenNumber >= 1 && chosenNumber <= 300) {
    if (chosenNumber > drawnNumber) {
      returnMessage.innerHTML = 'É menor'
    }
    else if (chosenNumber < drawnNumber) {
      returnMessage.innerHTML = 'É maior'
    }
    else {
      returnMessage.style.color = '#32BF00'
      returnMessage.innerHTML = 'Você acertou!!!'
      fillNumber('hundred', hundredNumber, '#32BF00')
      fillNumber('ten', tenNumber, '#32BF00')
      fillNumber('unit', unitNumber, '#32BF00')
      endGame()
    }
  }
  else {
    error(chosenNumber)
  }
  inputForm.value = ''
}
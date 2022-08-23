// Requisição do valor JSON contido na URL para obter o número a ser adivinhado.
const requestURL = 'https://us-central1-ss-devops.cloudfunctions.net/rand?min=1&max=300';
const request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
let drawnNumber 

// Função para verificar o status da requisição. Se for diferente de 200 retorna um erro, se for igual a 200 salva o número em uma variável.
request.onload = function() {
  if (request.status !== 200) {
    return error(request.status)
  }
  else drawnNumber = request.response.value
}

// Declaração das variáveis globais que serão utilizadas 
let returnMessage = document.querySelector('div.return-message')
let buttonReset = document.querySelector('button.reset')
let inputForm = document.querySelector('#chosen-number')
let buttonForm = document.querySelector('#send-number')
let classesHundred = document.querySelectorAll(".hundred")
let classesTen = document.querySelectorAll(".ten")
// Alteração da visibilidade da mensagem e do botão para início do jogo
returnMessage.style.visibility = 'hidden'
buttonReset.style.visibility = 'hidden'

// Função que preenche os números de acordo com os parâmetros enviados: dígito, número e cor (já definido com uma cor padrão).
function fillNumber(typeClass, number, color = '#262A34') {
  // Lista dos números e das classes dos segmentos que precisam ser preenchidos para completá-lo.
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
  // Selecionando as tags do dígito pela classe
  let typeList = document.querySelectorAll(`.${typeClass}`)
  // Loop para percorrer as classes e preencher cada um dos segmentos definidos no objeto 'numberList'
  for (let type of typeList) {
    let segmentsList = type.querySelectorAll(numbersList[number])
    for (let segment of segmentsList) {
      segment.style.fill = color
    }
  }
}

// Função que retorna erro quando o número enviado for menor do que 0 ou maior do que 300.
function error(numberError) {
  // Variáveis que separam a centena, dezena e unidade de um número. 
  let hundredNumber = Math.floor(numberError/100)
  let tenNumber = Math.floor((numberError%100)/10)
  let unitNumber = Math.floor((numberError%100)%10)
  // Modifica a cor e o texto da mensagem que aparece acima do número na tela.
  returnMessage.style.color = '#CC3300'
  returnMessage.innerHTML = 'ERRO'
  // Funções que preenchem os segmentos de cada número (centena, dezena e unidade) com os seguintes parâmetros: digito a ser preenchido, número que será preenchido e cor. 
  fillNumber('hundred', hundredNumber, '#CC3300')
  fillNumber('ten', tenNumber, '#CC3300')
  fillNumber('unit', unitNumber, '#CC3300')
  // Função para finalizar o jogo
  endGame()
  // Esvaziar o campo input
  inputForm.value = ''
}

// Função para definir quantos dígitos aparecerão na tela (por padrão são 3) de acordo com o número enviado.
function displayNumber(chosenNumber) {
  // Se o número tiver apenas um dígito, tanto a centena como a dezena ficam ocultas.
  if (chosenNumber <= 9) {
    for (classHundred of classesHundred) {
      classHundred.style.display = "none"
    }
    for(classTen of classesTen){
      classTen.style.display = "none"
    }
  }
  // Se o número tiver dois dígitos, apenas a centena fica oculta.
  else if (chosenNumber <= 99) {
    for(classHundred of classesHundred){
      classHundred.style.display = "none"
    }
  }
}

// Função para resetar o número que aparece na tela. 
function resetNumber() {
  // Mostra novamente todos os dígitos na tela. 
  for(classHundred of classesHundred) {
    classHundred.style.display = 'inline'
  }
  for(classTen of classesTen){
    classTen.style.display = 'inline'
  }
  // Altera a cor dos segmentos para a de início.
  let segments = document.querySelectorAll('path')
  for (let segment of segments) {
    segment.style.fill = '#DDDDDD'
  }
}

// Função que finaliza o jogo, mostra o botão de reset, limpa o campo do input e desativa o input e o botão, alterando também suas cores.
function endGame() {
  buttonReset.style.visibility = 'visible'
  inputForm.value = ''
  inputForm.setAttribute('disabled', true)
  inputForm.style.background = "#F5F5F5"
  buttonForm.setAttribute('disabled', true)
  buttonForm.style.background = "#DDDDDD"
  buttonForm.style.cursor = "auto"
}

// Chamada da função para iniciar o jogo com o número 0.
displayNumber(0)
// Chamada da função para iniciar o jogo com apenas um dígito na tela.
fillNumber('unit', 0)

// Função para avaliar o número enviado pelo input e compará-lo com o número sorteado pela requisição da URL.
function sendNumber() {
  // Função para resetar o número que aparece na tela. 
  resetNumber()
  // Variável que salva o valor enviado no input como um número. 
  chosenNumber = parseFloat(document.querySelector('input#chosen-number').value)
  // Variáveis que separam a centena, dezena e unidade de um número.
  let hundredNumber = Math.floor(chosenNumber/100)
  let tenNumber = Math.floor((chosenNumber%100)/10)
  let unitNumber = Math.floor((chosenNumber%100)%10)
  // Funções que preenchem os segmentos de cada número (centena, dezena e unidade) com os seguintes parâmetros: digito a ser preenchido e número que será preenchido (a cor está como um parâmetro padrão).
  fillNumber('hundred', hundredNumber)
  fillNumber('ten', tenNumber)
  fillNumber('unit', unitNumber)
  // Apresenta a mensagem acima do número na tela.
  returnMessage.style.visibility = 'visible'
  // Função para definir quantos dígitos aparecerão na tela (por padrão são 3) de acordo com o número enviado.
  displayNumber(chosenNumber)
  // Filtro para que o número seja inteiro, maior ou igual a 1 e menor ou igual a 300.
  if (Number.isInteger(chosenNumber) && chosenNumber >= 1 && chosenNumber <= 300) {
    // Filtro para comparar se o número escolhido é maior do que o sorteado, retornando a mensagem 'É menor'.
    if (chosenNumber > drawnNumber) {
      returnMessage.innerHTML = 'É menor'
    }
    // Filtro para comparar se o número escolhido é menor do que o sorteado, retornando a mensagem 'É maior'.
    else if (chosenNumber < drawnNumber) {
      returnMessage.innerHTML = 'É maior'
    }
    // Filtro para comparar se o número escolhido é igual ao sorteado, retornando a mensagem 'Você acertou!!!', preenchendo tanto o número quanto o texto de verde e mostrando a tela de finalização de jogo.
    else {
      returnMessage.style.color = '#32BF00'
      returnMessage.innerHTML = 'Você acertou!!!'
      fillNumber('hundred', hundredNumber, '#32BF00')
      fillNumber('ten', tenNumber, '#32BF00')
      fillNumber('unit', unitNumber, '#32BF00')
      endGame()
    }
  }
  // Filtro de erro para quando o número não é inteiro, é menor do que 1 e maior do que 300.
  else {
    error(chosenNumber)
  }
  // Limpa o campo do input.
  inputForm.value = ''
}
// Aqui se ve los elementos que se usaran como audio, verbos e imagenes
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

// Son auxiliares del juego como siguiente y todos los verbos
const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-answers");
const verbsContainer = document.getElementById("verbs-container");
// Son las opciones de las respuestas
const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

// Cuantos verbos son
const numberOfVerbs = verbs.length;
// Aqui se usa que solo una respuesta esta correcta y las demas mal
let answerRoullete = [0,1,1,1];

let everyNumberOfVerbs = [];
// contadores de respuestas correctas
let rightAnswer; 
let rightAnswersCounter = 0; 

// aqui el click para empezar el juego
next.addEventListener("click",function(){
  ponerVerbo();
  next.style.display = 'none';
});

//aqui empieza la lista random
makeRandomList();
// la posicion 
let lastPosition = everyNumberOfVerbs.length-1;
function makeRandomList(){
  // este es el arrive de los verbos
  for (var i = 0; i < numberOfVerbs; i++){
    everyNumberOfVerbs.push(i);
  }
  everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}


//aqui los botones si estan bien o si estan mal

function buttonEffect(itsRight,button){
  if (itsRight){
    button.classList.add('rightAnswer');
    setTimeout(function(){
      button.classList.remove('rightAnswer');
    },1000);
    rightAnswersCounter = rightAnswersCounter+1;
  }else{
    button.classList.add('wrongAnswer');
    setTimeout(function(){
      button.classList.remove('wrongAnswer');
    },1000);
  }
  setTimeout(function(){
    ponerVerbo();
  },500);
}

// aqui el primer botton para la primera respuesta
first.addEventListener("click",function(){
  buttonEffect(isItRight_(first.innerHTML),this);
});

// aqui el primer botton para el segundo de la respuesta
second.addEventListener("click", function(){
  buttonEffect(isItRight_(second.innerHTML),this);
});

// aqui el primer botton para el tercero de la respuesta
third.addEventListener("click", function(){
  buttonEffect(isItRight_(third.innerHTML),this);
});

// aqui el primer botton para el cuarto de la respuesta
fourth.addEventListener("click", function(){
  buttonEffect(isItRight_(fourth.innerHTML),this);
});


//las respuestas
function shuffleAnswers(array) {
  // aqui empieza el array
  let numberOfAnswerButtons = array.length;
  let randomIndex;
  while (numberOfAnswerButtons != 0) {

    // Aqui se escoge el elemento
    randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
    numberOfAnswerButtons--;
    // se usa el elemento que se esocogio
    [array[numberOfAnswerButtons], array[randomIndex]] = [
    array[randomIndex], array[numberOfAnswerButtons]];
  }

  return array;
}

// si la respuesta es correcta
function isItRight_(answer){
  return answer==rightAnswer?true:false;
}

// la respuesta esta mal
function randomVerbo(notThisOne){
  theOne = Math.floor(Math.random()*verbos.length);

  return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}

function ponerVerbo(){
  answerRoullete = shuffleAnswers(answerRoullete);
  let randomPosition = everyNumberOfVerbs[lastPosition];
  //aqui se acomoda lo que es la posision de la imagen para que se use en este caso es de 140 por 100
  let imgText = "<img src='img/"+verbs[randomPosition]+".jpg' height:'140px' width='100px'>";

  // los estilos de los botones de respuesta
  first.classList.add("btn","btn-outline-primary","btn-md");
  second.classList.add("btn","btn-outline-primary","btn-md");
  third.classList.add("btn","btn-outline-primary","btn-md");
  fourth.classList.add("btn","btn-outline-primary","btn-md");

  if (lastPosition >= 0){
    var just_position = lastPosition+1;
    verbsCounter.innerHTML = ""+just_position+" / "+numberOfVerbs;
    allRightCounter.innerHTML = "Respuestas Correctas: "+rightAnswersCounter;
    showVerb.innerHTML = verbs[randomPosition];
    showImage.innerHTML = imgText;

    showAudio.src = "audio/"+verbs[randomPosition]+".mp3";
    showAudio.play();

    first.innerHTML = !answerRoullete[0]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    second.innerHTML = !answerRoullete[1]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    third.innerHTML = !answerRoullete[2]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];
    fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition]:verbos[randomVerbo(randomPosition)];

    rightAnswer = verbos[randomPosition];
    lastPosition =lastPosition - 1;
  }else{
    verbsCounter.innerHTML = "0 / "+numberOfVerbs;
    allRightCounter.innerHTML = "Respuestas correctas: "+rightAnswersCounter;
    showVerb.innerHTML = "Gracias por Jugar !";
    verbsContainer.innerHTML = "";
  }
}
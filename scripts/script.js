const imgCartas = [
  "bobrossparrot",
  "explodyparrot",
  "fiestaparrot",
  "metalparrot",
  "revertitparrot",
  "tripletsparrot",
  "unicornparrot",
];

const mesa = document.querySelector(".board");
let intervalo;
let contador = 0;

let numCartas;

function perguntarNumCartas() {
  numCartas = parseInt(
    prompt("Quantas cartas você deseja? (Números pares de 4 a 14)")
  );

  while (numCartas % 2 != 0 || numCartas < 4 || numCartas > 14) {
    numCartas = parseInt(
      prompt("Quantas cartas você deseja? (Números pares de 4 a 14)")
    );
  }

  distribuirCartas();
}

perguntarNumCartas();

// Contador de segundos
function contarSegundos() {
  const contadorDeSegundos = document.querySelector(".contador-de-segundos");
  contadorDeSegundos.innerHTML = contador;
  contador++;
}

function distribuirCartas() {
  imgCartas.sort(comparador);

  let cartas = [];

  for (let i = 0; i < numCartas / 2; i++) {
    cartas.push(`<div class="card" onclick="virarCarta(this)" data-identifier="card">
    <div class="front-face face" data-identifier="front-face">
       <img src="./img/${imgCartas[i]}.gif">
    </div>
    <div class="back-face face" data-identifier="back-face">
       <img class="icon" src="./img/icon.png">
    </div>
 </div>`);
    cartas.push(`<div class="card" onclick="virarCarta(this)" data-identifier="card">
  <div class="front-face face" data-identifier="front-face">
      <img src="./img/${imgCartas[i]}.gif">
  </div>
  <div class="back-face face" data-identifier="back-face">
      <img class="icon" src="./img/icon.png">
  </div>
  </div>`);
  }

  cartas.sort(comparador);

  function comparador() {
    return Math.random() - 0.5;
  }

  for (let indice in cartas) {
    mesa.innerHTML += cartas[indice];
  }

  intervalo = setInterval(contarSegundos, 1000);
}

let numJogadas = 0;
let cartasViradas = [];

function virarCarta(carta) {
  numJogadas++;
  carta.classList.add("flip");

  cartasViradas.push(carta);

  if (cartasViradas[0] && cartasViradas[1]) {
    console.log(cartasViradas);
    setTimeout(compararCartas, 1000);
  }
}

function compararCartas() {
  let imgCarta1 = cartasViradas[0].querySelector("div img").getAttribute("src");
  let imgCarta2 = cartasViradas[1].querySelector("div img").getAttribute("src");

  if (imgCarta1 != imgCarta2) {
    cartasViradas[0].classList.remove("flip");
    cartasViradas[1].classList.remove("flip");
  }

  cartasViradas.shift();
  cartasViradas.shift();

  finalizarJogo();
}

function limparJogo() {
  mesa.innerHTML = "";
  contador = 0;
}

let jogarNovamente;
function finalizarJogo() {
  let qntCartasViradas = document.querySelectorAll(".flip");
  let segundos = 0;

  if (qntCartasViradas.length == numCartas) {
    clearInterval(intervalo);
    segundos = document.querySelector(".contador-de-segundos").innerHTML;
  }

  if (qntCartasViradas.length == numCartas && segundos != 0) {
    alert(
      `Parabéns! Você ganhou em ${numJogadas} jogadas e ${segundos} segundos!`
    );

    jogarNovamente = prompt("Deseja jogar novamente? (sim/nao)");

    if (jogarNovamente == "sim") {
      limparJogo();
      perguntarNumCartas();
    }
  }
}

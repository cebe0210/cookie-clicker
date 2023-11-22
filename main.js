let score = document.getElementById("score")

let donut = document.getElementById("donut")

let reset = document.getElementById("reset")


let prixMulti = document.getElementById("prix-multi")

let boutonMulti = document.getElementById("btn-multi")

let valeurMultiplicateur = document.getElementById("multi")


let boutonBonus = document.getElementById("btn-bonus")

let flagBonus = false

let valeurAuto = document.getElementById("auto")

let prixAuto = document.getElementById("clic-auto")

let boutonAuto = document.getElementById("btn-auto")


score.innerHTML = 0

prixMulti.innerHTML = 20

prixAuto.innerHTML = 30

valeurMultiplicateur.innerHTML = 1

score.innerHTML = localStorage.getItem("score") || 0

valeurMultiplicateur.innerHTML = localStorage.getItem("multiplicateur") || 1

prixMulti.innerHTML = localStorage.getItem("prixMulti") || 30

valeurAuto.innerHTML = localStorage.getItem("valeurAuto") || 0


donut.addEventListener("click", function () {
  console.log("donut")
  score.innerHTML = (+score.innerHTML) + 1 * (+valeurMultiplicateur.innerHTML)
  donut.style.animation = "rotation 20s linear infinite"

})

reset.addEventListener("click", function () {
  console.log("reset");
  score.innerHTML = 0;
  prixMulti.innerHTML = 20;
  valeurMultiplicateur.innerHTML = 1;
  valeurAuto.innerHTML = 0;
})

boutonMulti.addEventListener("click", () => {
  if ((+score.innerHTML) >= (+prixMulti.innerHTML)) {
    score.innerHTML = (+score.innerHTML) - (+prixMulti.innerHTML)
    valeurMultiplicateur.innerHTML = (+valeurMultiplicateur.innerHTML) * 2
    prixMulti.innerHTML = (+prixMulti.innerHTML) * 2
    console.log("yes")

  }
})


boutonAuto.addEventListener("click", () => {
  if ((+score.innerHTML) >= (+prixAuto.innerHTML)) {
    valeurAuto.innerHTML = (+valeurAuto.innerHTML) + 1
    score.innerHTML = (+score.innerHTML) - 30
  }
})

setInterval(() => {
  score.innerHTML = (+score.innerHTML) + (+valeurAuto.innerHTML)
}, 1000)



/* Si le score est supérieur au prix d'achat du click automatique, 
celui-ci change de couleur et de pointeur*/

setInterval(() => {
  if ((+score.innerHTML) >= (+prixAuto.innerHTML)) {
    boutonAuto.style.backgroundColor = "#98FF98"
    boutonAuto.style.cursor = "pointer"

  }
  else {
    boutonAuto.style.backgroundColor = "#888888"
    boutonAuto.style.cursor = "not-allowed"
  }
}, 10)


/* Si le score est supérieur au prix d'achat du multiplicateur, 
celui-ci change de couleur et de pointeur*/

setInterval(() => {
  if ((+score.innerHTML) >= (+prixMulti.innerHTML)) {
    boutonMulti.style.backgroundColor = "#98FF98"
    boutonMulti.style.cursor = "pointer"

  }
  else {
    boutonMulti.style.backgroundColor = "#888888"
    boutonMulti.style.cursor = "not-allowed"
  }
}, 10)


function timerBonus() {
  flagBonus = false
  boutonBonus.style.backgroundColor = "#888888"
  boutonBonus.style.cursor = "not-allowed"
  let timerElement = document.getElementById("timer");
  let remainingTime = 10;
  timerElement.textContent = remainingTime + " secondes jusqu'à activation";
  timerInterval = setInterval(() => {
    remainingTime -= 1;
    timerElement.textContent = remainingTime + " secondes jusqu'à activation";

    if (remainingTime <= 0) {

      clearInterval(timerInterval);
      timerElement.textContent = "";
      boutonBonus.style.backgroundColor = "#98FF98"
      boutonBonus.style.cursor = "pointer"
      flagBonus = true;
      attachBonusClickListener()
    }
  }, 1000)
}





function attachBonusClickListener() {
  if (flagBonus == true) {

    console.log("TRUE")
    boutonBonus.addEventListener("click", () => {
      while (flagBonus == true) {
        valeurMultiplicateur.innerHTML = (+valeurMultiplicateur.innerHTML) * 7;


        console.log("BONUS TIME");
        const timerElement = document.getElementById("timer");
        let remainingTime = 5;
        timerElement.textContent = remainingTime + " secondes";
        timerInterval = setInterval(() => {
          document.getElementById("donut").src = "img/DonutMordu.png"
          remainingTime -= 1;
          timerElement.textContent = remainingTime + " secondes";

          if (remainingTime <= 0) {
            document.getElementById("donut").src = "img/Donut_DALL_E_.webp"
            clearInterval(timerInterval);
            timerElement.textContent = "";
            valeurMultiplicateur.innerHTML = (+valeurMultiplicateur.innerHTML) / 7;
            timerBonus()
          }
        }, 1000)
        flagBonus = false
      }
    })
  }
}

timerBonus()


setInterval(() => {
  let scoreSauvegarde = parseInt(score.innerHTML, 10);
  localStorage.setItem("score", scoreSauvegarde)

  let multiSauvegarde = parseInt(valeurMultiplicateur.innerHTML, 10)
  localStorage.setItem("multiplicateur", multiSauvegarde)

  let prixMultiSauvegarde = parseInt(prixMulti.innerHTML, 10)
  localStorage.setItem("prixMulti", prixMultiSauvegarde)

  let valeurAutoSauvegarde = parseInt(valeurAuto.innerHTML, 10)
  localStorage.setItem("valeurAuto", valeurAutoSauvegarde)

}, 1000)






var cookieModal = document.getElementById("cookieModal");
var modal = document.getElementById("myModal");

var acceptButton = document.getElementById("acceptButton");
var cancelButton = document.getElementById("cancelButton");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

let audioElement = document.getElementById("music")


cookieModal.style.display = "block";

acceptButton.addEventListener("click", function () {
  cookieModal.style.display = "none";
  modal.style.display = "block";
})

cancelButton.addEventListener("click", function () {
  cookieModal.style.display = "none";
  modal.style.display = "block";
})

span.onclick = function () {
  cookieModal.style.display = "none";
  modal.style.display = "block";
}
// When the user clicks the button, open the modal 
btn.onclick = function () {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
  if (audioElement.paused) {
    // If it's paused, play the audio
    audioElement.play();
  }
}




// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (audioElement.paused) {
    // If it's paused, play the audio
    audioElement.play();
  }
}

let volumeControl =document.getElementById("volumeControl");

volumeControl.addEventListener("input", function() {
  // Set the volume of the audio based on the range input value
  audioElement.volume = parseFloat(volumeControl.value);
});

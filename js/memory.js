let arrayAnimali = ['🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐰', '🐯', '🐱', '🦉', '🐾', '🦁', '🦋', '🐛', '🐝', '🐬', '🦊', '🐨', '🐯', '🐰'];
let arrayComparison = [];

let interval;
let modal_var = document.querySelector('#modal');
let iconsFind = document.querySelectorAll('.find');
let timer = document.querySelector('.timer');


document.body.onload = startGame();

// mi serviranno alcune variabili 1. interval 2. una agganciata alla classe find 
// 3. una agganciata al'id modal 4. una agganciata alla classe timer

// una funzione che rimuove la classe active e chiama la funzione startGame()

// la funzione startGame che pulisce il timer, dichiara un array vuoto, mescola casualmente l'array degli animali
// pulisce tutti gli elementi che eventualmente contiene
// chiama la funzione timer e associa a tutti gli elementi (div) di classe icon l'evento click e le due funzioni definit sotto


function startGame(){
    clearInterval(interval);
    cron_start();
    create_cards();
}

function create_cards(){ 
    let griglia = document.querySelector('#griglia'); //per non far creare nuove griglie al reset
    griglia.innerHTML = '';

    let cards = shuffle(arrayAnimali); // (var arrayShuffle = shuffle(arrayAnimali);), aggancia il contenitore con id griglia, 
    
    cards.forEach(card => { // poi fa ciclo di arrayshuffle per creare i 24 div child -> aggiunge la class e l'elemento dell'array in base all'indice progressivo
        let crea_card = document.createElement('div');
        let card_content = document.createElement('div');
        card_content.className = 'icon'; 
        card_content.innerHTML = card;
        griglia.appendChild(crea_card);
        crea_card.appendChild(card_content);
    });

    let icon = document.querySelectorAll(".icon"); //devo per forza dichiararle qua anche se sono nelle prime due righe della funzione displayicon
    let icons = [...icon];

    icons.forEach(card => {
        card.addEventListener('click', displayIcon);
    });

    //la modal non riesco a farla uscire, ho provato con vari metodi ma mi manca un qualche passaggio
}

//una funzione che serve a mescolare in modo random gli elementi dell'array che viene passato 
// (l'array contiene le icone degli animali)
function shuffle(a) {
    var currentIndex = a.length;
    var temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = a[currentIndex];
        a[currentIndex] = a[randomIndex];
        a[randomIndex] = temporaryValue;
    }
    return a;
}

function displayIcon() {
    var icon = document.getElementsByClassName("icon");
    var icons = [...icon];

   
    //mette/toglie la classe show
    this.classList.toggle("show");
    //aggiunge l'oggetto su cui ha cliccato all'array del confronto
    arrayComparison.push(this);

    var len = arrayComparison.length;
    //se nel confronto ci sono due elementi
    if (len === 2) {
        //se sono uguali aggiunge la classe find
        if (arrayComparison[0].innerHTML === arrayComparison[1].innerHTML) {
            arrayComparison[0].classList.add("find", "disabled");
            arrayComparison[1].classList.add("find", "disabled");
            arrayComparison = [];
        } else {
            //altrimenti (ha sbagliato) aggiunge solo la classe disabled
            icons.forEach(function(item) {
                item.classList.add('disabled');
            });
            // con il timeout rimuove  la classe show per nasconderli
            setTimeout(function() {
                arrayComparison[0].classList.remove("show");
                arrayComparison[1].classList.remove("show");
                icons.forEach(function(item) {
                    item.classList.remove('disabled');
                    for (var i = 0; i < iconsFind.length; i++) {
                        iconsFind[i].classList.add("disabled");
                    }
                });
                arrayComparison = [];
            }, 700);
        }
    }
}

//una funzione che viene mostrata alla fine quando sono tutte le risposte esatte

// una funzione che nasconde la modale alla fine e riavvia il gioco

// una funzione che calcola il tempo e aggiorna il contenitore sotto

function cron_start(){
    let cron_min = 0;
    let cron_sec = 0;
    cron_set();

    function cron_set(){
        cron_sec++;
        if(cron_sec == 60){
            cron_sec = 0;
            cron_min++;
        }
        cron_print();
    }

    function cron_print(){
        timer.innerHTML = 'Tempo: ' + cron_min + " min " + cron_sec + " sec";
    }

    interval = setInterval(cron_set, 1000);
}
/*
*2C = Two of clubs 
*2D = Two of Diamonds 
*2H = Two of heart 
*2S = Two of spades 
*/ 

let deck         =[];
const tipos      =['C','D','H','S'];
const especiales =['A','J','Q','K'];
let puntosJugador=0;
let puntosComputadora=0;

//referencias de HTML
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
//console.log(btnPedir);


// esta funcion crea una nueva baraja
const crearDeck = ()=>{

    for(let i=2; i<=10;i++){
       for(let tipo of tipos){
        deck.push(i+ tipo)
    }
}
for(let tipo of tipos){
    for(let esp of especiales){
        deck.push(esp +tipo)

    }

}

deck=_.shuffle( deck );
console.log( deck );
return deck;
}

crearDeck();

// funcion crea cartas

const pedirCarta = ()=>{
    if( deck.length===0){
        throw 'no hay cartas en el deck'
    }
    const carta = deck.pop();

    return carta;
}
 
const valorCarta = ( carta ) => {

    const valor = carta.substring(0, carta.length-1);
    return ( isNaN( valor ) ) ?
            ( valor==='A' ) ? 11 : 10
            :valor*1;        
}

// turno computadora 

const turnoComputadora = (puntosMinimos) => {

    do{
        const carta = pedirCarta();
        puntosComputadora+=valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `./cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );
        if( puntosMinimos > 21 ) {
            break;

        }
    }
    while( (puntosComputadora < puntosMinimos) && puntosMinimos < 21 );
    setTimeout(()=>{
        if( puntosComputadora === puntosMinimos ){
            alert('Nadie gana soquetes');
    
        }else if( puntosMinimos > 21 ){
            alert('La computadora te ganó');
        }else if( puntosComputadora > 21 ){
            alert('Jugador Gana');
        }
        else if( puntosComputadora > puntosMinimos){
            alert('la computadora gana');
        }
    
    },100);
    
}

// eventos

btnPedir.addEventListener('click',()=>{
    const carta = pedirCarta();
    puntosJugador+=valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `./cartas/${ carta }.png`;

    
    imgCarta.classList.add('carta');
    
    divCartasJugador.append( imgCarta );
    if( puntosJugador > 21 ){
        console.log('perdiste');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );
    }else if( puntosJugador ===21 ){
        console.warn('que suerte tenés 21 puntos');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
});

// boton detener

btnDetener.addEventListener('click', ()=>{
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
});

//btn nuevo

btnNuevo.addEventListener('click',()=>{
    deck=[];
    deck= crearDeck();
    puntosJugador = 0;
    puntosComputadora = 0;
    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML='';
    divCartasJugador.innerHTML='';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
})
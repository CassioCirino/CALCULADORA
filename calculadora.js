// CALCULADORA JAVASCRIPT VERSAO 1.0 AUTOR:CASSIO CIRINO 

// GITHUB    github.com/cassiocirino
// Linkedin  likedin.com/in/cassiocirino
// email     cassio.cirino@gmail.com


'use strict'

//constantes globais
const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla]');
const operadores = document.querySelectorAll('[id*=operador]');

//variaveis globais
let novoNumero = true;
let operador;
let numeroAnterior;

//função calcular

const operacaoPendente = () => operador !== undefined;

const calcular = () =>{
    if (operacaoPendente()){
        const numeroAtual = parseFloat(display.textContent.replace(',','.'));
        novoNumero = true;
        const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
        atualizarDisplay(resultado);

        //PODE TAMBÉM SER FEITO DESTA FORMA O 'eval' É UMA FUNÇAO NATIVA DO JAVASCRIPT QUE FAZ JUSTAMENTE O MESMO
        // if(operador == '+'){
        //     atualizarDisplay(numeroAnterior + numeroAtual);   
        // }else if (operador == '-'){
        //     atualizarDisplay(numeroAnterior - numeroAtual);
        // }else if (operador == '*'){
        //     atualizarDisplay(numeroAnterior * numeroAtual);
        // }else if (operador == '/'){
        //     atualizarDisplay(numeroAnterior / numeroAtual);
        // }

    }
}

//FUNÇAO QUE ATUALIZA O DISPLAY
const atualizarDisplay = (texto) =>{
    if(novoNumero){
        display.textContent = texto.toLocaleString('BR'); 
        novoNumero = false;       
    }
    else{
    display.textContent += texto.toLocaleString('BR');
    }
}

//PEGANDO O EVENTO CLICK E GUARDANDO NA VARIAVEL NUMEROS
const inserirNumero = (evento) => atualizarDisplay(evento.target.textContent);
numeros.forEach (numero =>  numero.addEventListener ('click', inserirNumero));

//PEGANDO O EVENTO CLICK E AMARZENANDO EM OPERADORES
    const selecionarOperador = (evento) => {
        if(!novoNumero){
            calcular ();
            novoNumero = true;
            operador = evento.target.textContent;
            numeroAnterior = parseFloat(display.textContent.replace(',','.'));
        }
    }
    operadores.forEach (operador => operador.addEventListener ('click', selecionarOperador));

//BOTAO DE IGUALDADE    
    const ativarIgual = () => {
        calcular();
        operador = undefined;
    }

    document.getElementById('igual').addEventListener('click', ativarIgual);

//BOTAO LIMPAR DISPLAY CE
    const limparDisplay = () => display.textContent = '';
    document.getElementById('limparDisplay').addEventListener('click', limparDisplay);

//LIMPAR CALCULO BOTAO C
    const limparCalculo = () =>{
        limparDisplay();
        operador=undefined;
        novoNumero=true;
        numeroAnterior=undefined;
    }
    document.getElementById('limparCalculo').addEventListener('click', limparCalculo);

//BOTAO BACKSPACE OU  APAGAR
    const removerUltimoNumero = () => display.textContent = display.textContent.slice(0, -1);
    document.getElementById('backspace').addEventListener('click', removerUltimoNumero);

//BOTAO INVERTER SINAL
    const inverterSinal = () =>{
        novoNumero=true;
        atualizarDisplay(display.textContent * -1);
    }
    document.getElementById('inverter').addEventListener('click', inverterSinal);

//BOTAO DECIMAL OU VIRGULA
    const existeDecimal = () => display.textContent.indexOf(',') !== -1;
    const existeValor = () => display.textContent.length>0;
    const inserirDecimal = () =>{
        if(!existeDecimal()){
            if(existeValor()){
                atualizarDisplay(',');
            }else{
                atualizarDisplay('0,'); v
            }
        }
    }
    document.getElementById('decimal').addEventListener('click', inserirDecimal);


//CAPTURANDO E TRATANDO O TECLADO
    const mapaTeclado = {
        '0'             :'tecla0',
        '1'             :'tecla1',
        '2'             :'tecla2',
        '3'             :'tecla3',
        '4'             :'tecla4',
        '5'             :'tecla5',
        '6'             :'tecla6',
        '7'             :'tecla7',
        '8'             :'tecla8',
        '9'             :'tecla9',
        ','             :'decimal',
        '-'             :'operadorSubtrair',
        '+'             :'operadorAdicionar',
        '/'             :'operadorDividir',
        '*'             :'operadorMultiplicar',
        '='             :'igual',
        'Enter'         :'igual',
        'Backspace'     :'backspace',
        'c'             :'limparDisplay',
        'Escape'        :'limparCalculo',
    }
    const mapearTeclado = (evento) =>{
        const tecla =evento.key;
        const teclaPermitida = () => Object.keys(mapaTeclado).indexOf(tecla) !== -1;
        if(teclaPermitida()) document.getElementById(mapaTeclado[tecla]).click();

        }
        
    document.addEventListener('keydown', mapearTeclado);
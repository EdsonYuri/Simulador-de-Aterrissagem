const nave = document.getElementById('nave')
const body = document.querySelector('body')

let velocidade = 0
let aceleracaoGravidade = 0;
let aceleracao = 0;

const planetaSelecionado = document.getElementsByClassName('planetas')

for (let i = 0; i <= planetaSelecionado.length - 1; i++) {
    planetaSelecionado[i].addEventListener('click', () => {
        aceleracaoGravidade = Number(planetaSelecionado[i].value)
        body.style.backgroundImage = `url('assets/${planetaSelecionado[i].textContent}.jpg')`

        /*aceleracao = (-aceleracaoGravidade * 300 / (1000) ** 2) / 10 // recalcular a aceleração aqui
        velocidade = 0
        nave.style.bottom = '600px'*/
        resetaValores()

        simulaQueda()
    })
}

const resetaValores = () => {
    aceleracao = (-aceleracaoGravidade * 300 / (1000) ** 2) / 10 // recalcular a aceleração aqui
    velocidade = 0
    nave.style.bottom = '600px'
}

const aceleracaoPersonalizada = () => {
    let aceleracao = Number(document.getElementById('aceleracaoPersonalizada').value)
    aceleracaoGravidade = aceleracao
    
    resetaValores()

    simulaQueda()
}

const RecuperaAlturaDaNave = () => {
    const { bottom } = getComputedStyle(nave) //recupera o valor da propriedade bottom da nave

    let alturaDaNave = +bottom.replace("px", "")
    return alturaDaNave //retorna o valor de bottom convertido em número que corresponde a altura da nave
}

//S = S0 + vt + 0.5 * at^2
const novaAlturaDaNave = (S0, v, t) => S0 + v * t + 0.5 * aceleracao * (t ** 2) // calcula a nova altura da nave

function simulaQueda() {
    let tempo = Date.now()
    console.log(aceleracaoGravidade)
    const intervalo = setInterval(() => {
        let tempoAtual = Date.now()
        let intervaloDeTempo = tempoAtual - tempo
        tempo = tempoAtual

        // console.log(intervaloDeTempo)

        const altura = RecuperaAlturaDaNave()

        velocidade += aceleracao * intervaloDeTempo // atualiza a velocidade 

        const novaAltura = novaAlturaDaNave(altura, velocidade, intervaloDeTempo) // calcula a nova altura

        nave.style.bottom = `${Math.max(novaAltura, 0)}px` // atualiza a altura da nave no estilo, não permitindo que ela vá abaixo de 0
        if (nave.style.bottom == '0px') clearInterval(intervalo)
    }, 1)
    //console.log('re')
}

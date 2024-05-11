const nave = document.getElementById('nave')
let velocidade = 0

let tempo = Date.now()

// const aceleracao = -3 * (10 ** (-3)) // aceleração = 300px por segundo ao quadrado
const aceleracao = -24 * 300 / (1000) ** 2 // aceleração = 1.6 * 300px por segundo ao quadrado

const RecuperaAlturaDaNave = () => {
    const { bottom } = getComputedStyle(nave) //recupera o valor da propriedade bottom da nave

    let alturaDaNave = +bottom.replace("px", "")
    return alturaDaNave //retorna o valor de bottom convertido em número que corresponde a altura da nave
}

//S = S0 + vt + 0.5 * at^2
const novaAlturaDaNave = (S0, v, t) => S0 + v * t + 0.5 * aceleracao * (t ** 2) // calcula a nova altura da nave

setInterval(() => {
    let tempoAtual = Date.now()
    let intervaloDeTempo = tempoAtual - tempo
    tempo = tempoAtual

    console.log(intervaloDeTempo)

    const altura = RecuperaAlturaDaNave()

    velocidade += aceleracao * intervaloDeTempo // atualiza a velocidade 

    const novaAltura = novaAlturaDaNave(altura, velocidade, intervaloDeTempo) // calcula a nova altura

    nave.style.bottom = `${Math.max(novaAltura, 0)}px` // atualiza a altura da nave no estilo, não permitindo que ela vá abaixo de 0
}, 1)

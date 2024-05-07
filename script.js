let nave = document.getElementById('nave')

let altitude = 300
let combustivel = 50
let velocidade = 0
let aceleração = 0

let estadoMotor = false

let intervalo;

document.addEventListener('mousedown', () => {
    estadoMotor = true
    nave.style.backgroundColor = 'red'
})
document.addEventListener('mouseup', () => {
    estadoMotor = false
    nave.style.backgroundColor = 'blue'
})

const controleNave = () => {
    if(combustivel <= 0) estadoMotor = false
    if (estadoMotor) {
        aceleração = 0.2
        combustivel--
    } else {
        aceleração = -0.3
    }

    document.getElementById('velocidade').innerHTML = velocidade.toFixed(2)
    document.getElementById('combustivel').innerHTML = combustivel

    velocidade += aceleração
    altitude += velocidade

    if (altitude <= 0) {
        if (velocidade <= -2.4) {
            alert('nave explodiu')
        } else {
            alert('pouso realizado com sucesso') 
        }
        clearInterval(intervalo)
    }

    altitude--
    nave.style.top = (300 - altitude) + 'px'
}

intervalo = setInterval(controleNave,100)
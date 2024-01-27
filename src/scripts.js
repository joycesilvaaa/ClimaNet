const chave = 'chave aqui!'

const erroContainer = document.querySelector('#container-erro')
const resultadoContainer = document.querySelector('#container-resultado')
const erroMensagem = document.querySelector('.messagem_erro')
const resultadoPesquisa = document.querySelector('.esconde')

const iconTempoAtual = document.querySelector(".icon_tempo_atual")
const tempCidade = document.querySelector(".temperatura")
const tempDescricao = document.querySelector(".descricao")
const iconUmidade = document.querySelector(".icon_umidade")
const umidadePorcentagem = document.querySelector(".porcetagem")
const umidadeDescricao = document.querySelector(".descricao_umi")
const iconVento = document.querySelector(".icon_vento")
const ventoKm = document.querySelector(".quilometros")
const ventoDescricao = document.querySelector(".descricao_vent")
const inputBusca = document.querySelector('#input_busca')
const botaoBusca = document.querySelector('.botao_busca')

// eventos 
botaoBusca.addEventListener('click', nomeCidade)
inputBusca.addEventListener('input', adiconaEsconde)
inputBusca.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        nomeCidade()
    }
    // verefica se código da tecla é enter e chama a função nomeCidade
})

//Funções
async function nomeCidade() {
    const cidade = document.querySelector('#input_busca').value
    if (cidade === '') {
        adiconaEsconde()
    } else {
        buscaCidade(cidade)
    }
}

// usando função async para acessar o servidor 
async function buscaCidade(cidade) {

    try {
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br&units=metric`)

        const dados_cidade = await resposta.json()

        if (dados_cidade.cod === '404' || dados_cidade.cod === '400') {
            const mensagem = 'Cidade não encontrada! Verifique o nome e tente novamente!'
            removeEsconde()
            mensagemErro(mensagem)
        }
        else {
            semErro()
            mostraDados(dados_cidade)
            removeEsconde()
        }

    }
    catch (erro) {
        const mensagem = 'Erro na requisição. Tente novamente mais tarde.'
        removeEsconde()
        mensagemErro(mensagem)
    }
}

async function mostraDados(dados_cidade) {

    iconTempoAtual.src = `https://openweathermap.org/img/wn/${dados_cidade.weather[0].icon}.png`

    tempCidade.innerText = `${Math.floor(dados_cidade.main.temp)}°C`

    tempDescricao.innerText = dados_cidade.weather[0].description

    iconUmidade.src = '../src/imagens/icon_umidade.png'

    umidadePorcentagem.innerText = dados_cidade.main.humidity + '%'
    umidadeDescricao.innerText = 'Umidade'

    iconVento.src = '../src/imagens/icon_vento.png'

    ventoKm.innerText = dados_cidade.wind.speed + ' Km/h'

    ventoDescricao.innerText = 'Vento'

}
function mensagemErro(mensagem) {
    erroContainer.style.display = 'flex'
    resultadoContainer.style.display = 'none'
    erroMensagem.innerText = `${mensagem}`
}
function semErro() {
    erroContainer.style.display = 'none'
    resultadoContainer.style.display = 'flex'
}
function removeEsconde() {
    resultadoPesquisa.classList.remove('esconde')
}
function adiconaEsconde() {
    resultadoPesquisa.classList.add('esconde')
}


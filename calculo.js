let nomeAluno = sessionStorage.getItem("nomeAluno");
let projetoSelecionado = sessionStorage.getItem("projetoSelecionado");

document.getElementById("nomeResultado").innerText = nomeAluno;
document.getElementById("tipoProjetoResultado").innerText = projetoSelecionado;


let tipoProjetoSelecionado;

// Variável global para armazenar a quantidade de atrasos
let contagemAtrasoSim = 0;
let contagemAtrasoNao = 0;
let mediaTotalPonderada = 0

// json com os pesos para cada tipo de projeto
const PESOS = {
    interface: {
        tematica: 1.5,
        criatividade: 1,
        aspectosTecnicos: 0.5,
        aspectosDesign: 2,
    },
    fotografia: {
        tematica: 1,
        criatividade: 1.5,
        aspectosTecnicos: 1.5,
        aspectosDesign: 1,
    },
    composicao: {
        tematica: 2,
        criatividade: 2,
        aspectosTecnicos: 0.5,
        aspectosDesign: 0.5,
    },
    colagem: {
        tematica: 2,
        criatividade: 2,
        aspectosTecnicos: 0.5,
        aspectosDesign: 0.5,
    },
};

const resultados = {
    tematica: 0,
    criatividade: 0,
    aspectosTecnicos: 0,
    aspectosDesign: 0,
    totalAvaliadores: 0,
};

// Função para registrar a avaliação individual
function registrarAvaliacao() {
    // Obter os valores armazenados na sessionStorage
    let nomeAluno = sessionStorage.getItem("nomeAluno");
    let projetoSelecionado = sessionStorage.getItem("projetoSelecionado");

    // Preencher os resultados do formulário com os valores obtidos
    document.getElementById("nomeResultado").innerText = nomeAluno;
    document.getElementById("tipoProjetoResultado").innerText = projetoSelecionado;

    // Obter as pontuações do formulário
    let pontuacaoTematica = parseFloat(document.getElementById("tema").value);
    let pontuacaoCriatividade = parseFloat(document.getElementById("criatividade").value);
    let pontuacaoAspectosTecnicos = parseFloat(document.getElementById("tecnica").value);
    let pontuacaoAspectosDesign = parseFloat(document.getElementById("design").value);
    let atrasoNaEntregaSelecionado = document.getElementById("atraso").value;

    // Validar as notas
    if (
        isNaN(pontuacaoTematica) || isNaN(pontuacaoCriatividade) ||
        isNaN(pontuacaoAspectosTecnicos) || isNaN(pontuacaoAspectosDesign) ||
        pontuacaoTematica > 5 || pontuacaoCriatividade > 5 ||
        pontuacaoAspectosTecnicos > 5 || pontuacaoAspectosDesign > 5
    ) {
        alert("Por favor, insira notas válidas (cada nota deve ser menor ou igual a 5).");
        return;
    }

    // Incrementar os resultados com as pontuações do avaliador atual
    resultados.tematica += pontuacaoTematica;
    resultados.criatividade += pontuacaoCriatividade;
    resultados.aspectosTecnicos += pontuacaoAspectosTecnicos;
    resultados.aspectosDesign += pontuacaoAspectosDesign;
    resultados.totalAvaliadores++;

    // Aplicar desconto se a quantidade de "sim" for maior que a de "não"
    if (atrasoNaEntregaSelecionado === "sim") {
        contagemAtrasoSim++;
    } else if (atrasoNaEntregaSelecionado === "nao") {
        contagemAtrasoNao++;
    }

    // Limpar os campos do formulário
    document.getElementById("avaliacaoForm").reset();

    // Verificar a contagem de atrasos e aplicar desconto se necessário
    if (contagemAtrasoSim > contagemAtrasoNao) {
        // Aplicar desconto de 0.5 após calcular a média ponderada
        calcularMediaPonderada(projetoSelecionado);
        mediaTotalPonderada -= 0.5;
    } else {
        // média ponderada sem desconto
        calcularMediaPonderada(projetoSelecionado);
    }
}


function calcularMediaPonderada(tipoProjeto) {
    // Verificar se há pelo menos um avaliador
    if (resultados.totalAvaliadores === 0) {
        alert("Nenhum avaliador registrou nota ainda.");
        return;
    }

     // Verificar se o tipo do projeto existe nos pesos
     if (!PESOS.hasOwnProperty(tipoProjeto)) {
        alert("Tipo de projeto inválido.");
        return;
    }

    // Calcular a pontuação total ponderada
    let pontuacaoTotalPonderada =
        resultados.tematica * PESOS[tipoProjeto].tematica +
        resultados.criatividade * PESOS[tipoProjeto].criatividade +
        resultados.aspectosTecnicos * PESOS[tipoProjeto].aspectosTecnicos +
        resultados.aspectosDesign * PESOS[tipoProjeto].aspectosDesign;

    // Calcular a soma dos pesos
    let somaDosPesos =
        PESOS[tipoProjeto].tematica +
        PESOS[tipoProjeto].criatividade +
        PESOS[tipoProjeto].aspectosTecnicos +
        PESOS[tipoProjeto].aspectosDesign;

    // Calcular a média ponderada total
    let mediaTotalPonderada = pontuacaoTotalPonderada / (somaDosPesos * resultados.totalAvaliadores);

        exibirResultadosFinais(mediaTotalPonderada);
}

function exibirResultadosFinais(mediaTotalPonderada) {
    let resultadosDiv = document.getElementById("resultadosDiv");
    resultadosDiv.innerHTML = `<p><strong>Média Total Ponderada: ${mediaTotalPonderada.toFixed(1)}</strong></p>`;
    resultadosDiv.style.display = "block";
}

function votacao() {
    tipoProjetoSelecionado = document.getElementById("projeto-fotografico").value;

    switch (tipoProjetoSelecionado) {
        case "interface":
            aplicarVotacaoParaProjeto(tipoProjetoSelecionado);
            break;
        case "fotografia":
            aplicarVotacaoParaProjeto(tipoProjetoSelecionado);
            break;
        case "composicao":
            aplicarVotacaoParaProjeto(tipoProjetoSelecionado);
            break;
        case "colagem":
            aplicarVotacaoParaProjeto(tipoProjetoSelecionado);
            break;
        case "":
            console.log("Valor inválido");
            break;
        default:
            console.log("Tipo de projeto não reconhecido");
            break;
    }

    // Impedir o envio padrão do formulário
    return true;
}

// Ação para voltar à página inicial
document.getElementById("botaoVoltarIndex").addEventListener("click", function() {
    // Redirecione para a página inicial (substitua "index.html" pelo nome da sua página inicial)
    window.location.href = "index.html";
});
// Constantes de pesos para cada tipo de projeto
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

// Função chamada no segundo formulário
function registrarAvaliacao() {
    // valores dos inputs no segundo formulário
    let pontuacaoTematica = parseFloat(document.getElementById("tema").value);
    let pontuacaoCriatividade = parseFloat(document.getElementById("criatividade").value);
    let pontuacaoAspectosTecnicos = parseFloat(document.getElementById("tecnica").value);
    let pontuacaoAspectosDesign = parseFloat(document.getElementById("design").value);

    // validação das notas
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

    // Limpar os campos do formulário
    document.getElementById("avaliacaoForm").reset();

    // Exibir os resultados parciais se desejar
    exibirResultadosParciais();
}

function calcularMediaPonderada(tipoProjeto) {
    // Verificar se há pelo menos um avaliador
    if (resultados.totalAvaliadores === 0) {
        alert("Nenhum avaliador registrou nota ainda.");
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

    // Exibir os resultados finais
    alert(`Média Total Ponderada: ${mediaTotalPonderada.toFixed(2)}`);
}


// Função para exibir os resultados parciais
function exibirResultadosParciais() {
    console.log("Resultados Parciais:", resultados);
}












// Função chamada no primeiro formulário
function votacao() {
    let tipoProjeto = document.getElementById("projeto-fotografico").value;

    switch (tipoProjeto) {
        case "interface":
            aplicarVotacaoParaProjeto(tipoProjeto);
            break;
        case "fotografia":
            aplicarVotacaoParaProjeto(tipoProjeto);
            break;
        case "composicao":
            aplicarVotacaoParaProjeto(tipoProjeto);
            break;
        case "colagem":
            aplicarVotacaoParaProjeto(tipoProjeto);
            break;
        case "":
            console.log("Valor inválido");
            break;
        default:
            console.log("Tipo de projeto não reconhecido");
            break;
    }

    // Impedir o envio padrão do formulário
    return false;
}

// Função genérica para aplicar votação para um projeto específico
function aplicarVotacaoParaProjeto(tipoProjeto) {
    // Lógica específica para votação de qualquer tipo de projeto
    // ...
    console.log(`Aplicando votação para projeto de ${tipoProjeto}`);

    // Chame a função que define o segundo formulário
    definirSegundoFormulario(tipoProjeto);
}

// Função para definir o segundo formulário com base no tipo de projeto
function definirSegundoFormulario(tipoProjeto) {
    // Lógica para definir o segundo formulário com base no tipo de projeto
    // ...

    // Chame a função para calcular a média ponderada após o registro de avaliações
    calcularMediaPonderada(tipoProjeto);
}
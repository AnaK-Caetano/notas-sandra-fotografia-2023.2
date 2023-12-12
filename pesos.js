const PESO_TEMATICA_FOTOGRAFIA = 1;
const PESO_CRIATIVIDADE_FOTOGRAFIA = 1.5;
const PESO_ASPECTOS_TECNICOS_FOTOGRAFIA = 1.5;
const PESO_ASPECTOS_DESIGN_FOTOGRAFIA = 1;

const PESO_TEMATICA_INTERFACE = 1.5;
const PESO_CRIATIVIDADE_INTERFACE = 1;
const PESO_ASPECTOS_TECNICOS_INTERFACE = 0.5;
const PESO_ASPECTOS_DESIGN_INTERFACE = 2;

const PESO_TEMATICA_COLAGEM = 2;
const PESO_CRIATIVIDADE_COLAGEM = 2;
const PESO_ASPECTOS_TECNICOS_COLAGEM = 0.5;
const PESO_ASPECTOS_DESIGN_COLAGEM = 0.5;

const PESO_TEMATICA_COMPOSICAO = 2;
const PESO_CRIATIVIDADE_COMPOSICAO = 2;
const PESO_ASPECTOS_TECNICOS_COMPOSICAO = 0.5;
const PESO_ASPECTOS_DESIGN_COMPOSICAO = 0.5;


let totalTematica = 0;
let totalCriatividade = 0;
let totalAspectosTecnicos = 0;
let totalAspectosDesign = 0;
let avaliadores = 0;



function interface() {
    let pontuacaoTematica = parseFloat(document.getElementById("tema").value);
    let pontuacaoCriatividade = parseFloat(document.getElementById("criatividade").value);
    let pontuacaoAspectosTecnicos = parseFloat(document.getElementById("tecnica").value);
    let pontuacaoAspectosDesign = parseFloat(document.getElementById("design").value);

    if (isNaN(pontuacaoTematica) || isNaN(pontuacaoCriatividade) || isNaN(pontuacaoAspectosTecnicos) || isNaN(pontuacaoAspectosDesign)) {
        alert("Por favor, insira notas válidas.");
        return;
    }

    totalTematica += pontuacaoTematica;
    totalCriatividade += pontuacaoCriatividade;
    totalAspectosTecnicos += pontuacaoAspectosTecnicos;
    totalAspectosDesign += pontuacaoAspectosDesign;

    avaliadores++;

    calcularMediaPonderada(PESO_TEMATICA_INTERFACE, PESO_CRIATIVIDADE_INTERFACE, PESO_ASPECTOS_TECNICOS_INTERFACE, PESO_ASPECTOS_DESIGN_INTERFACE);

    document.getElementById("avaliacaoForm").reset();
}


function calcularMediaPonderada(pesoTematica, pesoCriatividade, pesoAspectosTecnicos, pesoAspectosDesign) {
    if (avaliadores === 0) {
        alert("Nenhum avaliador registrou nota ainda.");
        return;
    }

    // Calcular a média ponderada para cada critério
    let mediaTematica = (totalTematica * pesoTematica) / avaliadores;
    let mediaCriatividade = (totalCriatividade * pesoCriatividade) / avaliadores;
    let mediaAspectosTecnicos = (totalAspectosTecnicos * pesoAspectosTecnicos) / avaliadores;
    let mediaAspectosDesign = (totalAspectosDesign * pesoAspectosDesign) / avaliadores;

    // Calcular a média ponderada total
    let mediaTotal = (mediaTematica + mediaCriatividade + mediaAspectosTecnicos + mediaAspectosDesign) / 4;

    // Retornar as médias calculadas
    return {
        mediaTematica,
        mediaCriatividade,
        mediaAspectosTecnicos,
        mediaAspectosDesign,
        mediaTotal
    };
}
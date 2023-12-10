function votacao() {
    let tipoProjeto = document.getElementById("projeto-fotografico").value;

    switch (tipoProjeto) {
        case ("interface"):
            return calculoInterface();
            break;
        case ("fotografia"):
            return calculoFotografia();
            break;
        case ("composicao"):
            return calculoComposicao();
            break;
        case ("colagem"):
            return calculoColagem();
            break;
        case (""):
            console.log("Valor inválido")
            break;
    }
}
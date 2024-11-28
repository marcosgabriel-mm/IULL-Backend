export default class Validator {
    
    #dadosInvalidos = [];
    
    dadosInvalidos() {
        return this.#dadosInvalidos;
    }

    validarDadosDeEntradaEmLote( dados ) {

        this.validarMoedaSemNadaEscrito(dados.moedaDeOrigem, dados.moedaDeDestino);
        this.validarTamanhoDaMoeda(dados.moedaDeOrigem, dados.moedaDeDestino);

        this.validarValordeEntradaDaMoeda(dados.valorAConverter);
        this.validarDiferencaMoedaDeOrigemEDestino(dados.moedaDeOrigem, dados.moedaDeDestino);

        return this.dadosInvalidos();

    }

    validarMoedaSemNadaEscrito(moedaOrigem, moedaDestino) {
        if (moedaOrigem === "" || moedaDestino === "") {
            this.#dadosInvalidos.push("A moeda de origem e de destino não podem ser vazias.");
        }
    }

    validarTamanhoDaMoeda(moedaOrigemm, moedaDestino) {
        if (moedaOrigemm.length !== 3) {
            this.#dadosInvalidos.push("A moeda de origem deve ter 3 caracteres.");
        }

        if (moedaDestino.length !== 3) {
            this.#dadosInvalidos.push("A moeda de destino deve ter 3 caracteres.");
        }
    }

    validarValordeEntradaDaMoeda(valorDeEntrada) {
        if (valorDeEntrada <= 0) {
            this.#dadosInvalidos.push("O valor deve ser maior que zero.");
        }
    }

    validarDiferencaMoedaDeOrigemEDestino(moedaDeOrigem, moedaDeDestino) {
        if (moedaDeOrigem === moedaDeDestino) {
            this.#dadosInvalidos.push("A moeda de origem e de destino não podem ser iguais.");
        }
    }

}
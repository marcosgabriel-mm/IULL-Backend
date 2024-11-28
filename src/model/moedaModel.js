export default class MoedaModel {

    #moedaOrigem;
    #moedaDestino;
    #valorAConverter
    #valorConvertido;

    moedaDestino() {
        return this.#moedaDestino;
    }

    moedaOrigem() {
        return this.#moedaOrigem;
    }

    valorAconverter() {
        return this.#valorAConverter;
    }

    valorConvertido() {
        return this.#valorConvertido;
    }

    setMoedaOrigem(moedaOrigem) {
        this.#moedaOrigem = moedaOrigem;
    }

    setMoedaDestino(moedaDestino) {
        this.#moedaDestino = moedaDestino;
    }

    setValorAConverter(valorAConverter) {
        this.#valorAConverter = valorAConverter;
    }

    setValorConvertido(valorConvertido) {
        this.#valorConvertido = valorConvertido;
    }

    setDadosValidados(dados) {
        this.#moedaOrigem = dados.moedaDeOrigem;
        this.#moedaDestino = dados.moedaDeDestino;
        this.#valorAConverter = dados.valorAConverter;
    }

}
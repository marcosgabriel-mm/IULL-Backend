import MenuView from "../view/menuView.js";
import axios from "axios";

import dotenv from 'dotenv';
dotenv.config();

export default class ConversorController {

    constructor( moedaModel, validador, conversorModel ) {
        this.validador = validador;
        this.moedaModel = moedaModel;
        this.conversorModel = conversorModel;
    }

    receberDadosDaUI() {
        
        const dados = MenuView.receberDadosDoUsuario();       
        const listaDeErros = this.validador.validarDadosDeEntradaEmLote(dados);
        
        if (listaDeErros.length !== 0) {
            MenuView.mostrarErrosDeInsercaoDoUsuario(listaDeErros);
            return false;
        }
        
        this.moedaModel.setDadosValidados(dados);
        return true;
    }

    async converterValorDaMoedaDeOrigemParaDestino() {
        
        try {
            const resposta = await axios.get(
                `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${this.moedaModel.moedaOrigem()}/${this.moedaModel.moedaDestino()}`
            );
            const valorConvertido = this.moedaModel.valorAconverter() * resposta.data.conversion_rate;
            this.moedaModel.setValorConvertido(valorConvertido.toFixed(2));
            this.conversorModel.setDadosDaConversao(resposta.data);
            

            MenuView.mostrarResultadoDaConversao(
                {
                    moedaDeOrigem: this.moedaModel.moedaOrigem(),
                    moedaDeDestino: this.moedaModel.moedaDestino(),
                    valorAConverter: this.moedaModel.valorAconverter(),
                    valorConvertido: this.moedaModel.valorConvertido(),
                    taxaDeConversao: this.conversorModel.conversionRate()
                }
            );
            
        } catch (error) {
            MenuView.mostrarErrosDaConversao(error);
        }   
    }
}
import PromptSync from "prompt-sync";

const prompt = PromptSync();
export default class MenuView {

    static receberDadosDoUsuario() {

        return {
            moedaDeOrigem: this.receberMoedadeOrigemDoUsuario(),
            moedaDeDestino: this.receberMoedadeDestinoDoUsuario(),
            valorAConverter: this.receberValorAConverterDoUsuario()
        }
    }

    static receberMoedadeOrigemDoUsuario() {
        return prompt("Moeda de origem: ").toUpperCase();
    }

    static receberMoedadeDestinoDoUsuario() {
        return prompt("Moeda de destino: ").toUpperCase();
    }

    static receberValorAConverterDoUsuario() {
        return parseFloat(prompt("Valor a converter: ").replace(',', '.')); 
    }

    static mostrarErrosDeInsercaoDoUsuario(listaDeErros) {
        console.log(
            "\nHouve um erro ao inserir os dados. Por favor, verifique os seguintes erros:\n\n" + listaDeErros.join("\n")
        );
    }

    static mostrarErrosDaConversao(error) {
            console.log("\nErro ao converter a moeda. Tente novamente mais tarde.");
            
            if (error.response.data["error-type"] === "unsupported-code") {
                console.log("Erro: Código de moeda não suportado. Mais detalhes abaixo\n");
                console.log(error.response.data);
            
            }else {
                console.log("\nErro: " + error);
            }
    }

    static mostrarResultadoDaConversao(valores) {
        console.log(
            `\n${valores.moedaDeOrigem} ${valores.valorAConverter} => ${valores.moedaDeDestino} ${valores.valorConvertido}\nTaxa: ${valores.taxaDeConversao}`
        );
    }

}
import ConverterController from "./src/controller/conversorController.js";
import ConversorModel from "./src/model/conversorModel.js";
import MoedaModel from "./src/model/moedaModel.js";
import Validator from "./src/utils/validador.js";



function inicializarClasses() {
    
    const moedaModel = new MoedaModel();
    const validador = new Validator();
    const conversorModel = new ConversorModel();
    const controller = new ConverterController( moedaModel, validador, conversorModel );
    
    return controller
}

function main() {

    const controller = inicializarClasses();

    if (!controller.receberDadosDaUI()) {
        process.exit(1);
    } 
    controller.converterValorDaMoedaDeOrigemParaDestino();
}

main();
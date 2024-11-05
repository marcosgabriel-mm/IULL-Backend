import { PacienteView } from "./views/pacienteView.js";
import { ConsultaView } from "./views/consultaView.js";
import { PacienteController } from "./controllers/pacienteController.js";
import { ConsultaController } from "./controllers/consultaController.js";
import PromptSync from "prompt-sync";
import { DateTime } from "luxon";

const pacienteController = new PacienteController();
const consultaController = new ConsultaController();
const prompt = PromptSync();

function validarData(data) {

    const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!formatoValido.test(data)) {
        console.log("Erro: Formato Invalido");
        return true;
    }
    
    if (!DateTime.fromFormat(data, 'dd/MM/yyyy').isValid) {
        console.log("Erro: Data Invalida");
        return true;
    }

    return false;

}

function validarHora(hora) {

    const formatoValido = /^\d{4}$/;

    if (!formatoValido.test(hora)) {
        console.log("Erro: Formato Invalido");
        return true;
    }

    
    if (!DateTime.fromFormat(hora, 'HHmm').isValid) {
        console.log("Erro: Hora Invalida");
        return true;
    }

    return false;

}

function menuPrincipal() {
    console.log("\nMenu Principal");
    console.log("1-Cadastro de pacientes");
    console.log("2-Agenda");
    console.log("3-Fim\n");
}

function opcaoPaciente() {
    while (true) {

        PacienteView.mostrarMenu();
        let opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                pacienteController.adicionarNovoPaciente();
                break;
            case 2:
                pacienteController.removerPaciente(consultaController);
                break;
            case 3:
                PacienteView.mostrarPaciente(pacienteController.pacientesPorCPF(), consultaController.consultas());
                break;
            case 4:
                PacienteView.mostrarPaciente(pacienteController.pacientePorNome(), consultaController.consultas());
                break;
            case 5:
                console.log("Voltando para o menu principal\n");
                return false;
            default:
                break;
        }
    }
}

function opcaoConsulta() {

    while (true) {

        ConsultaView.mostrarMenu();
        let opcao = parseInt(prompt("Escolha uma opção: "));

        switch (opcao) {
            case 1:
                consultaController.agendarConsulta(pacienteController);
                break;
            case 2:
                consultaController.cancelarConsulta(pacienteController);
                break;
            case 3:
                ConsultaView.mostrarAgenda(consultaController.consultas(), pacienteController.pacientes());
                break;
            case 4: 
                console.log("Voltando para o menu principal\n");
                return false;
            default:
                break;
        }
    }

}

function main() {

    while (true) {

        menuPrincipal();
        let opcao = parseInt(prompt("Escolha uma opção: "))

        switch (opcao) {
            case 1:
                opcaoPaciente();
                break;
            case 2:
                opcaoConsulta();
                break;
            case 3:
                console.log("Encerrando Aplicação...\n")
                return false;
            default:
                break;
        }

    }
}

main();

export { validarData, validarHora };
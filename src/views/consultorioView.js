import PromptSync from "prompt-sync";
import PacienteView from "./pacienteView.js";
import ConsultaView from "./consultaView.js";
import PacienteController from "../controllers/pacienteController.js";
import ConsultaController from "../controllers/consultaController.js";

const prompt = PromptSync();
export default class ConsultorioView {

    static menuPrincipal() {
        console.log("\nMenu Principal");
        console.log("1-Cadastro de pacientes");
        console.log("2-Agenda");
        console.log("3-Fim\n");
    }

    static async opcaoPaciente() {
        while (true) {
    
            PacienteView.mostrarMenu();
            let opcao = parseInt(prompt("Escolha uma opção: "));
    
            switch (opcao) {
                case 1:
                    await PacienteController.adicionarNovoPaciente();
                    break;
                case 2:
                    await PacienteController.removerPaciente();
                    break;
                case 3:
                    PacienteView.mostrarPaciente(await PacienteController.listarPacientes('cpf'));
                    break;
                case 4:
                    PacienteView.mostrarPaciente(await PacienteController.listarPacientes('nome'));
                    break;
                case 5:
                    console.log("Voltando para o menu principal\n");
                    return false;
                default:
                    break;
            }
        }
    }

    static async opcaoConsulta() {

        while (true) {
    
            ConsultaView.mostrarMenu();
            let opcao = parseInt(prompt("Escolha uma opção: "));
    
            switch (opcao) {
                case 1:
                    await ConsultaController.agendarConsulta();
                    break;
                case 2:
                    await ConsultaController.cancelarConsulta();
                    break;
                case 3:
                    ConsultaView.mostrarAgenda(await ConsultaController.listarConsultas());
                    break;
                case 4: 
                    console.log("Voltando para o menu principal\n");
                    return false;
                default:
                    break;
            }
        }
    
    }

    static async main() {

        while (true) {
    
            this.menuPrincipal();
            let opcao = parseInt(prompt("Escolha uma opção: "))
    
            switch (opcao) {
                case 1:
                    await this.opcaoPaciente();
                    break;
                case 2:
                    await this.opcaoConsulta();
                    break;
                case 3:
                    console.log("Encerrando Aplicação...\n")
                    return false;
                default:
                    break;
            }
    
        }
    }

}
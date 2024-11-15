import PromptSync from "prompt-sync";
import { validarData } from "../main.js";

const prompt = PromptSync();
class ConsultaView {

    static mostrarMenu() {
        console.log("\nAgenda");
        console.log("1-Agendar Consulta");
        console.log("2-Cancelar Agendamento");
        console.log("3-Lista Agenda");
        console.log("4-Voltar para o menu principal\n");
    }

    static mostrarAgenda( consultas, pacientes ) {

        let opcao = prompt("Apresentar agenda T-Toda ou P-Periodo: ");
        let consultasPeriodo = [];

            if (opcao === ("P" || "p")) {
                let dataInicio = prompt("Data Inicio (DD/MM/AAAA): ");
                validarData(dataInicio);

                let dataFim = prompt("Data Fim (DD/MM/AAAA): ");
                validarData(dataFim);

                consultasPeriodo = consultas.filter(consulta => consulta.dataConsulta() >= dataInicio && consulta.dataConsulta() <= dataFim);
                this.imprimirAgenda(consultasPeriodo, pacientes);
            } else { 
                this.imprimirAgenda(consultas, pacientes);
            }
    }
        
    static imprimirAgenda (consultas, pacientes) {
        console.log("\n--------------------------------------------------------------");
        console.log("Data\t\tH.Ini\tH.Fim\tTempo\tNome\t\tDt.Nasc.");
        console.log("--------------------------------------------------------------");
        consultas.forEach(consulta => {
            let paciente = pacientes.find(paciente => paciente.cpf() === consulta.cpfAtrelado());
            console.log(`${consulta.dataConsulta()}\t${consulta.horaInicio()}\t${consulta.horaFinal()}\t${consulta.tempoConsulta()}\t${paciente.nome()}\t${paciente.dataNascimento()}`);
        });
        console.log("--------------------------------------------------------------\n");
    }

    static obterCpf() {
        return prompt("CPF (somente numeros): ");
    }

    static obterNome() {
        return prompt("Nome: ");
    }

    static obterDataConsulta() {
        return prompt("Data da consulta (DD/MM/AAAA): ");
    }

    static obterHorario() {
        return prompt("Hora (HHMM): ");
    }

    static mensagemSucesso( mensagem ) {
        console.log(mensagem);
    }

    static mensagemError( mensagem ) {
        console.log(mensagem);
    }
}
    
export { ConsultaView };
import PromptSync from "prompt-sync";
import Validar from "../utils/validacao.js";
import moment from "moment";
import { DateTime } from "luxon";

const prompt = PromptSync();
export default class ConsultaView {

    static mostrarMenu() {
        console.log("\nAgenda");
        console.log("1-Agendar Consulta");
        console.log("2-Cancelar Agendamento");
        console.log("3-Lista Agenda");
        console.log("4-Voltar para o menu principal\n");
    }

    static mostrarAgenda(consultas) {

        let opcao = prompt("Apresentar agenda T-Toda ou P-Periodo: ");

            if (opcao === ("P" || "p")) {
                let dataInicio = prompt("Data Inicio (DD/MM/AAAA): ");
                Validar.validarFormatoData(dataInicio);

                let dataFim = prompt("Data Fim (DD/MM/AAAA): ");
                Validar.validarFormatoData(dataFim);

                console.log("\n-------------------------------------------------------------\nData\t\tH.Ini\tH.Fim\tTempo\tNome\t\tDt.Nasc.\n-------------------------------------------------------------");
                for (let consulta of consultas) {   
                    if (DateTime.fromISO(consulta.dataConsulta) >= DateTime.fromFormat(dataInicio, 'dd/MM/yyyy') && DateTime.fromISO(consulta.dataConsulta) <= DateTime.fromFormat(dataFim, 'dd/MM/yyyy')) {
                        let tempoDeConsulta = DateTime.fromISO(consulta.horaFinal).diff(DateTime.fromISO(consulta.horaInicio), ['hours', 'minutes']).toFormat('hh:mm');
                        console.log(`${DateTime.fromISO(consulta.dataConsulta).toFormat('dd/MM/yyyy')}\t${DateTime.fromISO(consulta.horaInicio).toFormat('HH:mm')}\t${DateTime.fromISO(consulta.horaFinal).toFormat('HH:mm')}\t${tempoDeConsulta}\t${consulta.paciente.nome}\t${DateTime.fromISO(consulta.paciente.dataNascimento).toFormat('dd/MM/yyyy')}`);
                    }
                }
                console.log("\n-------------------------------------------------------------");

            } else { 
                console.log("\n-------------------------------------------------------------\nData\t\tH.Ini\tH.Fim\tTempo\tNome\t\tDt.Nasc.\n-------------------------------------------------------------");
                for (let consulta of consultas) {
                    let tempoDeConsulta = DateTime.fromISO(consulta.horaFinal).diff(DateTime.fromISO(consulta.horaInicio), ['hours', 'minutes']).toFormat('hh:mm');
                    console.log(`${DateTime.fromISO(consulta.dataConsulta).toFormat('dd/MM/yyyy')}\t${DateTime.fromISO(consulta.horaInicio).toFormat('HH:mm')}\t${DateTime.fromISO(consulta.horaFinal).toFormat('HH:mm')}\t${tempoDeConsulta}\t${consulta.paciente.nome}\t${DateTime.fromISO(consulta.paciente.dataNascimento).toFormat('dd/MM/yyyy')}`);
                }     
                console.log("\n-------------------------------------------------------------");           
            }
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

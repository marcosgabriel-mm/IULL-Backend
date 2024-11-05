import { DateTime } from "luxon";
import { Consulta } from "../models/consulta.js";
import { validarData, validarHora } from "../main.js";
import PromptSync from "prompt-sync";
import _ from 'lodash';
 
const prompt = PromptSync();
class ConsultaController {

    #consultas

    constructor() {
        this.#consultas = [];
    }

    consultas() {
        return this.#consultas = _.orderBy(
            this.#consultas, 
            [
                consulta => DateTime.fromFormat(consulta.dataConsulta(), 'dd/MM/yyyy'),
                consulta => DateTime.fromFormat(consulta.horaInicio(), 'HH:mm')
            ],
            ['asc', 'asc']
        );
    }

    agendarConsulta(pacienteController) {

        while (true) {

            let cpf = prompt("CPF (somente numeros): ");
            if (!pacienteController.verificarCPF(cpf)) {
                console.log("Erro: paciente não cadastrado");
                continue;
            }

            if (this.#consultas.some(consulta => consulta.cpfAtrelado() === cpf &&  DateTime.fromFormat(consulta.dataConsulta(), 'dd/MM/yyyy') > DateTime.now())) {
                console.log("Erro: Paciente já possue uma consulta marcada");
                continue;
            }
            
            let dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");
            validarData(dataConsulta);
            
            const [dia, mes, ano] = dataConsulta.split('/');
            if (DateTime.fromObject({ day: dia, month: mes, year: ano }) < DateTime.now()) {
                console.log("Erro: Precisa ser uma data atual ou futura")
                continue;
            }
            
            let horaInicio = prompt("Hora inicial (HHMM): ");
            validarHora(horaInicio);
            
            if (this.intervaloTempo(horaInicio)) {
                console.log("Erro: A consulta precisa ser em intervalos de 15 minutos");
                continue;
            }

            if (this.verificarHorario(horaInicio, dataConsulta)) {
                console.log("Erro: Já existe uma consulta nesse horario");
                continue;
            }

            if (this.horarioFuncionamento(horaInicio)) {
                console.log("Erro: Horario fora do horario de funcionamento");
                continue;
            }

            let horaFinal = prompt("Hora final (HHMM): ");
            validarHora(horaFinal);
            
            if (this.intervaloTempo(horaFinal)) {
                console.log("Erro: A consulta precisa ser em intervalos de 15 minutos");
                continue;
            }

            if (horaFinal <= horaInicio) {
                console.log("Erro: O horario final precisa ser maior que o inicial");
                continue;
            }

            if (this.horarioFuncionamento(horaFinal)) {
                console.log("Erro: Horario fora do horario de funcionamento");
                continue;
            }

            if (this.verificarHorario(horaFinal, dataConsulta)) {
                console.log("Erro: Já existe uma consulta nesse horario");
                continue;
            }

            let consulta = new Consulta(cpf, dataConsulta, this.converteHora(horaInicio), this.converteHora(horaFinal));
            this.#consultas.push(consulta);
            
            console.log("Agendamento realizado com sucesso!");
            break;
        }

    }

    cancelarConsulta( pacienteController ) {
        while (true) {

            let cpf = prompt("CPF (somente numeros): ");
            if (!pacienteController.verificarCPF(cpf)) {
                console.log("Erro: paciente não cadastrado");
                continue;
            }

            let dataConsulta = prompt("Data da consulta (DD/MM/AAAA): ");
            let dataConsultaObj = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
            validarData(dataConsulta);

            let horaInicio = prompt("Hora inicial (HHMM): ");
            validarHora(horaInicio);
            
            const consulta = this.#consultas.findIndex(consulta => consulta.cpfAtrelado() === cpf && consulta.dataConsulta() === dataConsulta && consulta.horaInicio() === DateTime.fromFormat(horaInicio, 'HHmm').toFormat('HH:mm').toString());
            if ( consulta !== -1 && dataConsultaObj > DateTime.now() ) {
                this.#consultas.splice(consulta , 1);
                console.log("Agendamento cancelado com sucesso!");
                break;
            }

            console.log("Erro: Agendamento não encontrado");

        }

    }

    intervaloTempo(hora) {

        let minutos = parseInt(hora.slice(-2));
        return minutos === 0 || minutos === 15 || minutos === 30 || minutos === 45 ? false : true;

    }

    converteHora(hora) {
        return DateTime.fromObject({hour: parseInt(hora.slice(0, 2)), minute: parseInt(hora.slice(2, 4))}).toFormat('HH:mm');
    }

    horarioFuncionamento(hora) {

        if (
            DateTime.fromFormat(hora, "HH:mm") < DateTime.fromFormat("08:00", "HH:mm") || 
            DateTime.fromFormat(hora, "HH:mm") > DateTime.fromFormat("19:00", "HH:mm")
        ) { return true; }

        return false;
    }

    verificarHorario(hora, data) {
        
        for (let consulta of this.#consultas) {
            if ( hora >= consulta.horaInicio() && hora < consulta.horaFinal() && consulta.dataConsulta() === data) { return true; }
        }
        
        return false;
    }

    verificarConsulta(cpf) {
        return this.#consultas.filter(consulta => consulta.cpfAtrelado() === cpf && DateTime.fromFormat(consulta.dataConsulta(), 'dd/MM/yyyy') > DateTime.now()).length > 0 ? true : false;
    }

    removerConsultasAntigas(cpf) {

        const consultasCopy = this.#consultas.copyWithin();
        let consultasAntigas = this.#consultas.filter(consulta => 
            consulta.cpfAtrelado() === cpf && 
            DateTime.fromFormat(consulta.dataConsulta(), 'dd/MM/yyyy') < DateTime.now()
        ).length;
    
        let consultasRemovidas = 0;
        for (let index = 0; index < this.#consultas.length; index++) {
            if (this.#consultas[index].cpfAtrelado() === cpf && DateTime.fromFormat(this.#consultas[index].dataConsulta(), 'dd/MM/yyyy') < DateTime.now()) {
                this.#consultas.splice(index, 1);
                index--;
                consultasRemovidas++;
            }
        }
    
        if (consultasAntigas !== consultasRemovidas) {
            this.#consultas = consultasCopy;
            return false;
        } 

        return true;
    }

}

export { ConsultaController }
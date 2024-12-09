import { DateTime } from "luxon";
import ConsultaView from "../views/consultaView.js";
import _ from 'lodash';
import Validar from "../utils/validacao.js";
import ConsultaRepository from "../repositories/consultaRepository.js";
import PacienteController from "./pacienteController.js";
 
export default class ConsultaController {

    static async agendarConsulta() {

        while (true) {

            let cpf = ConsultaView.obterCpf();
            if (await PacienteController.verificarSeExistePaciente(cpf)) {
                ConsultaView.mensagemError("Erro: paciente não cadastrado");
                continue;
            }

            if (await this.verificarSePacienteTemConsulta(cpf)) {
                ConsultaView.mensagemError("Erro: Paciente já possue uma consulta marcada");
                continue;
            }
            
            let dataConsulta = ConsultaView.obterDataConsulta();
            Validar.validarFormatoData(dataConsulta);
            
            
            if (this.verificarSeConsultaEAtual(dataConsulta)) {
                ConsultaView.mensagemError("Erro: Precisa ser uma data atual ou futura");
                continue;
            }
            
            let horaInicio = ConsultaView.obterHorario();
            Validar.ValidarFormatoHora(horaInicio);
            
            if (this.verificarSeEstaNoIntevaloDeTempo(horaInicio)) {
                ConsultaView.mensagemError("Erro: A consulta precisa ser em intervalos de 15 minutos");
                continue;
            }

            if (await this.verificarHorarioDeDisponibilidadeDaConsulta(horaInicio, dataConsulta)) {
                ConsultaView.mensagemError("Erro: Já existe uma consulta nesse horario");
                continue;
            }

            if (this.horarioDeFuncionamentoDoEstabelecimento(horaInicio)) {
                ConsultaView.mensagemError("Erro: Horario fora do horario de funcionamento");
                continue;
            }

            let horaFinal = ConsultaView.obterHorario();
            Validar.ValidarFormatoHora(horaFinal);
            
            if (this.verificarSeEstaNoIntevaloDeTempo(horaFinal)) {
                ConsultaView.mensagemError("Erro: A consulta precisa ser em intervalos de 15 minutos");
                continue;
            }

            if (horaFinal <= horaInicio) {
                ConsultaView.mensagemError("Erro: O horario final precisa ser maior que o inicial");
                continue;
            }

            if (this.horarioDeFuncionamentoDoEstabelecimento(horaFinal)) {
                ConsultaView.mensagemError("Erro: Horario fora do horario de funcionamento");
                continue;
            }

            if (await this.verificarHorarioDeDisponibilidadeDaConsulta(horaFinal, dataConsulta)) {
                ConsultaView.mensagemError("Erro: Já existe uma consulta nesse horario");
                continue;
            }

            const consultaDados = {dataConsulta: DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy').toISO(), horaInicio: horaInicio, horaFinal: horaFinal, pacienteCpf: cpf}
            await ConsultaRepository.criarConsulta(consultaDados);
            
            ConsultaView.mensagemSucesso("Consulta agendada com sucesso!");
            break;
        }

    }

    static async cancelarConsulta() {
        while (true) {

            let cpf = ConsultaView.obterCpf();
            if (await PacienteController.verificarSeExistePaciente(cpf)) {
                ConsultaView.mensagemError("Erro: paciente não cadastrado");
                continue;
            }

            let dataConsulta = ConsultaView.obterDataConsulta();
            Validar.validarFormatoData(dataConsulta);

            let horaInicio = ConsultaView.obterHorario();
            Validar.ValidarFormatoHora(horaInicio);
            
            let consulta = await ConsultaRepository.buscarConsultasPorData(DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy').toISO(), DateTime.fromFormat(horaInicio, 'HHmm').toFormat('HH:mm:ss'), cpf);
            if (_.isEmpty(consulta)) {
                ConsultaView.mensagemError("Erro: Não foi possível cancelar o agendamento, verifique os dados informados");
                continue;
            }

            await ConsultaRepository.removerConsulta(consulta.id);
            ConsultaView.mensagemSucesso("Consulta cancelada com sucesso!");
            break;
        }

    }

    static async listarConsultas() {
        return await ConsultaRepository.buscarTodasConsultas();
    }

    static async listarConsultasFuturas() {
        return await ConsultaRepository.buscarConsultasFuturas();
    }

    static verificarSeEstaNoIntevaloDeTempo(hora) {
        let minutos = parseInt(hora.slice(-2));
        return minutos === 0 || minutos === 15 || minutos === 30 || minutos === 45 ? false : true;
    }

    static converteHora(hora) {
        return DateTime.fromObject({hour: parseInt(hora.slice(0, 2)), minute: parseInt(hora.slice(2, 4))}).toFormat('HH:mm');
    }

    static horarioDeFuncionamentoDoEstabelecimento(hora) {
        if (
            DateTime.fromFormat(hora, "HHmm") < DateTime.fromFormat("08:00", "HH:mm") || 
            DateTime.fromFormat(hora, "HHmm") > DateTime.fromFormat("19:00", "HH:mm")
        ) { return true; }
        return false;
    }

    static async verificarHorarioDeDisponibilidadeDaConsulta(hora, data) {    

        let consultas = await ConsultaRepository.buscarTodasConsultas();
        for (let consulta of consultas) {
            if ( 
                DateTime.fromFormat(hora, "HHmm").toFormat('HH:mm') >= consulta.horaInicio && 
                DateTime.fromFormat(hora, "HHmm").toFormat('HH:mm') <= consulta.horaFinal && 
                DateTime.fromISO(consulta.dataConsulta).hasSame(DateTime.fromFormat(data, 'dd/MM/yyyy'), 'day')
            ) { return true; }
        }
        return false;
    }

    static async removerConsultasAntigas(cpf) {
        await ConsultaRepository.removerConsultasAntigas(cpf); 
        return ConsultaRepository.buscarTodasConsultasAntigas(cpf).length === 0 ? true : false;
    }

    static async verificarSePacienteTemConsulta(cpf) {
        let consultas = await ConsultaRepository.buscarTodasConsultasPaciente(cpf);
        for (let consulta of consultas) {
            if (DateTime.fromISO(consulta.dataConsulta) > DateTime.now()) { return true; }
        }
        return false;
    }

    static verificarSeConsultaEAtual(dataConsulta){
        let [dia, mes, ano] = dataConsulta.split('/');
        return DateTime.fromObject({ day: dia, month: mes, year: ano }) < DateTime.now()
    }
}
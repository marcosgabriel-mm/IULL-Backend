import { DateTime } from "luxon";
import { Op } from "sequelize";
import Consulta from "../models/consulta.js";
import Paciente from "../models/paciente.js";

export default class ConsultaRepository  {

    static of(dataConsulta, horaInicio, horaFinal, pacienteCpf) {
        return Consulta.build({dataConsulta, horaInicio, horaFinal, pacienteCpf});
    }

    static async criarConsulta(consulta) {
        return await Consulta.create(consulta);
    }

    static async removerConsulta(id) {
        return await Consulta.destroy({where: {id: id}});
    }

    static async buscarTodasConsultas() {
        return await Consulta.findAll({ 
            order: [['dataConsulta', 'ASC'], ['horaInicio', 'ASC']],
            include: [{
                model: Paciente,
                as: 'paciente'
            }]
        });
    }

    static async buscarConsultasFuturas() {
        return await Consulta.findAll({where: {dataConsulta: {[Op.gte]: DateTime.now().toISODate()}}});
    }

    static async buscarTodasConsultasPaciente(cpf) {
        return await Consulta.findAll({where: {pacienteCpf: cpf}});
    }

    static async removerConsultasAntigas(cpf) {
        return await Consulta.destroy({where: {[Op.lt]: DateTime.now().toISODate()}, pacienteCpf: cpf});
    }

    static async buscarTodasConsultasAntigas(cpf) {
        return await Consulta.findAll({where: {[Op.lt]: DateTime.now().toISODate()}, pacienteCpf: cpf});
    }

    static async buscarConsultasPorData(data, horaInicio, cpf) {
        return await Consulta.findOne({where: {dataConsulta: data, horaInicio: horaInicio, pacienteCpf: cpf}});
    }
}
import Consulta from "../models/consulta.js";
import Paciente from "../models/paciente.js";

//metodos de acesso ao banco de dados
export default class PacienteRepository  {

    static of(cpf, nome, dataNascimento) {
        return Paciente.build({cpf, nome, dataNascimento});
    }

    static async criarPaciente(paciente) {
        return await Paciente.create(paciente);
    }

    static async buscarPaciente(cpf) {
        return await Paciente.findByPk(cpf);
    }

    static async buscarTodosPacientes() {
        return await Paciente.findAll();
    }

    
    static async removerPaciente(cpf) {
        return await Paciente.destroy({where: {cpf}});
    }
    
    static async buscarTodosPacientesOrdenados(arg) {
        return await Paciente.findAll({
            order: [[arg, 'ASC']],
            include: [{
                model: Consulta,
                as: 'consultas'
            }]
        });
    }
}
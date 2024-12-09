import PacienteRepository from "../repositories/pacienteRepository.js";
import Validar from "../utils/validacao.js";
import PacienteView  from "../views/pacienteView.js";
import ConsultaController from "./consultaController.js";
import { DateTime } from "luxon";

export default class PacienteController {

    static async adicionarNovoPaciente() {
        
        while (true) {

            let cpf = PacienteView.obterCpf();
            if (!Validar.validarCPF(cpf)) {
                PacienteView.mensagemError("Erro: CPF invalido");
                continue;
            }

            if (!await this.verificarSeExistePaciente(cpf)) {
                PacienteView.mensagemError("Erro: CPF já cadastrado");
                continue;
            }

            let nome = PacienteView.obterNome();
            if (Validar.validarTamanhoNome(nome)) {
                PacienteView.mensagemError("Erro: Nome precisa ter no minimo 5 caracteres");
                continue;
            }

            let dataNascimento = PacienteView.obterDataNascimento();
            Validar.validarFormatoData(dataNascimento);

            if (Validar.validarIdadePaciente(dataNascimento)) {
                PacienteView.mensagemError("Erro: Paciente menor de 13 anos");
                continue;
            }

            const dadosPaciente = {cpf: cpf, nome: nome, dataNascimento: DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy').toISO()};

            await PacienteRepository.criarPaciente(dadosPaciente);            
            PacienteView.mensagemSucesso("Paciente Cadastrado");
            
            break;
        }

    }

    static async removerPaciente() {

        let cpf = PacienteView.obterCpf();

        if (await ConsultaController.verificarSePacienteTemConsulta(cpf)) {
            PacienteView.mensagemError("Erro: Paciente está agendado");
            return;
        }

        if (await this.verificarSeExistePaciente(cpf)) { 
            PacienteView.mensagemError("Erro: Paciente não cadastrado");
            return;
        }
            
        if (!await ConsultaController.removerConsultasAntigas(cpf)) {
            PacienteView.mensagemError("Erro: Consultas antigas não removidas");
            return;
        }
            
        await PacienteRepository.removerPaciente(cpf);
        PacienteView.mensagemSucesso("Paciente excluído com sucesso!");
    }

    static async verificarSeExistePaciente(cpf) {
        return await PacienteRepository.buscarPaciente(cpf) === null ? true : false;
    }

    static async listarPacientes(arg) {
        const pacientes = await PacienteRepository.buscarTodosPacientesOrdenados(arg);

        for (let paciente of pacientes) {
            paciente.setDataValue('idade', Math.floor(DateTime.now().diff(DateTime.fromISO(paciente.dataNascimento), 'years').years));
        }

        return pacientes;
    }
}

    // calcularDigito (cpf, pesoInicial) {
    //     let soma = 0;
    //     for (let i = 0; i < pesoInicial - 1; i++) {
    //         soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
    //     }
    //     let resto = (soma * 10) % 11;
    //     return resto === 10 ? 0 : resto;
    // }
    
    // validarCPF(cpf) {
    //     if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) { return false; }
        
    //     let digito1 = this.calcularDigito(cpf, 10);
    //     let digito2 = this.calcularDigito(cpf, 11);

    //     return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
    // }
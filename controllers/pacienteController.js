import { Paciente } from "../models/paciente.js";
import { PacienteView } from "../views/pacienteView.js";
import { DateTime } from "luxon";
import { validarData } from "../main.js";

import PromptSync from "prompt-sync";
// import { cpf } from "cpf-cnpj-validator";

const prompt = PromptSync();
class PacienteController {

    #pacientes;

    constructor () {
        this.#pacientes = [];
    }
    
    pacientes() {
        return this.#pacientes;
    }

    adicionarNovoPaciente() {
        
        while (true) {

            let cpf = PacienteView.obterCpf();
            if (!this.validarCPF(cpf)) {
                PacienteView.mensagemError("Erro: CPF invalido");
                continue;
            }

            if (this.verificarCPF(cpf)){
                PacienteView.mensagemError("Erro: CPF já cadastrado");
                continue;
            }

            let nome = PacienteView.obterNome();
            if (nome.length < 5) {
                PacienteView.mensagemError("Erro: Nome precisa ter no minimo 5 caracteres");
                continue;
            }

            let dataNascimento = PacienteView.obterDataNascimento();
            validarData(dataNascimento);

            if (Math.floor(DateTime.now().diff(DateTime.fromObject({ day: parseInt(dataNascimento.split('/')[0]), month: parseInt(dataNascimento.split('/')[1]), year: parseInt(dataNascimento.split('/')[2]) }), 'years').years) < 13) {
                PacienteView.mensagemError("Erro: Paciente menor de 13 anos");
                continue;
            }

            const paciente = new Paciente(cpf, nome, dataNascimento);
            this.#pacientes.push(paciente);
            PacienteView.mensagemSucesso("Paciente Cadastrado");
            break;

        }

    }

    removerPaciente( consultaController ) {

        let cpf = PacienteView.obterCpf();
        const paciente = this.#pacientes.findIndex(p => String(p.cpf()) === String(cpf));

        if (consultaController.verificarConsulta(cpf)) {
            PacienteView.mensagemError("Erro: Paciente está agendado");
            return;
        }

        if (paciente !== -1) {
            
            if (!consultaController.removerConsultasAntigas(cpf)) {
                PacienteView.mensagemError("Erro: Consultas antigas não removidas");
                return;
            }
            this.#pacientes.splice(paciente, 1);

            PacienteView.mensagemSucesso("Paciente excluído com sucesso!");
            return;
        }

        PacienteView.mensagemError("Erro: Paciente não cadastrado");
    }

    pacientesPorCPF() {
        const pacientesOrdenados = [...this.#pacientes].sort((a, b) => {
            return String(a.cpf()).localeCompare(String(b.cpf()));
        });
        return pacientesOrdenados;
    }

    pacientePorNome() {
        const pacientesPorNome = [...this.#pacientes].sort((a,b) => {
            return a.nome().localeCompare(b.nome());
        });
        return pacientesPorNome;
    }

    calcularDigito (cpf, pesoInicial) {
        let soma = 0;
        for (let i = 0; i < pesoInicial - 1; i++) {
            soma += parseInt(cpf.charAt(i)) * (pesoInicial - i);
        }
        let resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    }
    
    validarCPF(cpf) {
        if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) { return false; }
        
        let digito1 = this.calcularDigito(cpf, 10);
        let digito2 = this.calcularDigito(cpf, 11);

        return digito1 === parseInt(cpf.charAt(9)) && digito2 === parseInt(cpf.charAt(10));
    }
    
    verificarCPF(cpf) {
        return this.#pacientes.some(paciente => String(paciente.cpf()) === String(cpf)); 
    }

}

export { PacienteController }; 
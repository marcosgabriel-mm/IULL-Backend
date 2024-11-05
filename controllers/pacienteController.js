import { Paciente } from "../models/paciente.js";
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

            let cpf = prompt("CPF (somente numeros): ");
            if (!this.validarCPF(cpf)) {
                console.log("Erro: CPF invalido");
                continue;
            }

            if (this.verificarCPF(cpf)){
                console.log("Erro: CPF já cadastrado");
                continue;
            }

            let nome = prompt("Nome: ");
            if (nome.length < 5) {
                console.log("Erro: O nome deve ter pelo menos 5 caracteres");
                continue;
            }

            let dataNascimento = prompt("Data de nascimento (DD/MM/AAAA): ");
            validarData(dataNascimento);

            if (Math.floor(DateTime.now().diff(DateTime.fromObject({ day: parseInt(dataNascimento.split('/')[0]), month: parseInt(dataNascimento.split('/')[1]), year: parseInt(dataNascimento.split('/')[2]) }), 'years').years) < 13) {
                console.log("Erro: O paciente deve ter 13 anos ou mais");
                continue;
            }

            const paciente = new Paciente(cpf, nome, dataNascimento);
            this.#pacientes.push(paciente);
            console.log("Paciente Cadastrado");
            break;

        }

    }

    removerPaciente( consultaController ) {

        let cpf = prompt("CPF (somente numeros): ");
        const paciente = this.#pacientes.findIndex(p => String(p.cpf()) === String(cpf));

        if (consultaController.verificarConsulta(cpf)) {
            console.log("Erro: Paciente está agendado");
            return;
        }

        if (paciente !== -1) {
            
            if (!consultaController.removerConsultasAntigas(cpf)) {
                console.log("Erro: Consultas antigas não removidas");
                return;
            }
            this.#pacientes.splice(paciente, 1);

            console.log("Paciente excluído com sucesso!");
            return;
        }

        console.log("Erro: Paciente não cadastrado");
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
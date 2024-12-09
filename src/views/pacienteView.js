import { DateTime } from "luxon";
import moment from "moment";
import PromptSync from "prompt-sync";

const prompt = PromptSync();
export default class PacienteView {

    static mostrarMenu() {
        console.log("\nMenu do Cadastro de Pacientes");

        console.log("1-Cadastrar novo paciente");
        console.log("2-Excluir paciente");
        console.log("3-Listar Pacientes (Por CPF)");
        console.log("4-Listar Pacientes (Por nome)");
        console.log("5-Voltar para o menu principal.\n");
    }

    static mostrarPaciente( pacientes ) {

        if ( pacientes.length < 1) {
            console.log("Nenhum paciente cadastrado!\n");
            return;
        }

        console.log("\n----------------------------------------------------------------------");
        console.log("CPF\t\tNome\t\t\t\tDt.Nasc.\tIdade");
        console.log("----------------------------------------------------------------------");
        for (let paciente of pacientes) {
            console.log(`${paciente.dataValues.cpf}\t${paciente.dataValues.nome}\t\t\t${moment(paciente.dataValues.dataNascimento, 'YYYY-MM-DD').format('DD/MM/YYYY')}\t${paciente.dataValues.idade}`);
            if (paciente.dataValues.consultas.length > 0) { 
                for (let consulta of paciente.dataValues.consultas) {
                    console.log(`\t\tAgendado para: ${moment(consulta.dataValues.dataConsulta, 'YYYY-MM-DD').format('DD/MM/YYYY')}\n\t\t${consulta.dataValues.horaInicio} às ${consulta.dataValues.horaFinal}`); 
                }
            }
        }
        console.log("----------------------------------------------------------------------\n");

    }

    static obterCpf() {
        return prompt("CPF (somente numeros): ");
    }

    static obterNome() {
        return prompt("Nome: ");
    }

    static obterDataNascimento() {
        return prompt("Data de Nascimento (dd/mm/yyyy): ");
    }

    static mensagemSucesso( mensagem ) {
        console.log(mensagem);
    }

    static mensagemError( mensagem ) {
        console.log(mensagem);
    }

}
import { DateTime } from "luxon";

class PacienteView {

    static mostrarMenu() {
        console.log("\nMenu do Cadastro de Pacientes");

        console.log("1-Cadastrar novo paciente");
        console.log("2-Excluir paciente");
        console.log("3-Listar Pacientes (Por CPF)");
        console.log("4-Listar Pacientes (Por nome)");
        console.log("5-Voltar para o menu principal.\n");
    }

    static mostrarPaciente( pacientes, consultas ) {

        if ( pacientes.length < 1) {
            console.log("Nenhum paciente cadastrado!\n");
            return;
        }

        console.log("\n----------------------------------------------------------------------");
        console.log("CPF\t\tNome\t\t\t\tDt.Nasc.\tIdade");
        console.log("----------------------------------------------------------------------");
        for (let paciente of pacientes) {
            console.log(`${paciente.cpf()}\t${paciente.nome()}\t\t\t${paciente.dataNascimento()}\t${paciente.idade()}`);
            for (let consulta of consultas) {
               if ( consulta.cpfAtrelado() === paciente.cpf() && DateTime.fromFormat(consulta.dataConsulta(), 'dd/MM/yyyy') > DateTime.now() ) {
                    console.log(`\t\tAgendado para: ${consulta.dataConsulta()}\n\t\t${consulta.horaInicio()} às ${consulta.horaFinal()}`);
               }
            }
        }
        console.log("----------------------------------------------------------------------\n");

    }

}

export { PacienteView };
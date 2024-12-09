import { cpf } from "cpf-cnpj-validator";
import { DateTime } from "luxon";

export default class Validar {

    static validarFormatoData(data) {

        const formatoValido = /^\d{2}\/\d{2}\/\d{4}$/;
    
        if (!formatoValido.test(data)) {
            console.log("Erro: Formato Invalido");
            return true;
        }
        
        if (!DateTime.fromFormat(data, 'dd/MM/yyyy').isValid) {
            console.log("Erro: Data Invalida");
            return true;
        }
    
        return false;
    
    }
    
    static ValidarFormatoHora(hora) {
    
        const formatoValido = /^\d{4}$/;
    
        if (!formatoValido.test(hora)) {
            console.log("Erro: Formato Invalido");
            return true;
        }
    
        
        if (!DateTime.fromFormat(hora, 'HHmm').isValid) {
            console.log("Erro: Hora Invalida");
            return true;
        }
    
        return false;
    
    }

    static validarTamanhoNome(nome) {
        return nome.length < 5;
    }
    
    static validarCPF(pcpf) {
        return cpf.isValid(pcpf);
    }

    static validarIdadePaciente(dataNascimento) {
        return Math.floor(DateTime.now().diff(DateTime.fromObject(
            { 
                day: parseInt(dataNascimento.split('/')[0]), 
                month: parseInt(dataNascimento.split('/')[1]), 
                year: parseInt(dataNascimento.split('/')[2]) 
            }), 'years' ).years) < 13;
    }

}
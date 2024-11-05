import { DateTime } from "luxon";

class Paciente {

    #cpf;
    #nome;
    #dataNascimento;

    constructor (cpf, nome, dataNascimento) {
        this.#cpf = cpf;
        this.#nome = nome;
        this.#dataNascimento = dataNascimento;
    }

    cpf() {
        return this.#cpf;
    }

    nome() {
        return this.#nome;
    }
    
    dataNascimento() {
        return this.#dataNascimento;
    }

    idade() {
        const [dia, mes, ano] = this.#dataNascimento.split('/');
        return Math.floor(DateTime.now().diff(DateTime.fromObject({day: dia, month: mes, year: ano}),'years').years);
    }

}

export { Paciente };
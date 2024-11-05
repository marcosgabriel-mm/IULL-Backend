import { DateTime } from "luxon";
class Consulta {

    #dataConsulta;
    #horaInicio;
    #horaFinal;
    #cpfAtrelado;

    constructor (cpfAtrelado, dataConsulta, horaInicio, horaFinal) {
        this.#cpfAtrelado = cpfAtrelado;
        this.#dataConsulta = dataConsulta;
        this.#horaInicio = horaInicio;
        this.#horaFinal = horaFinal;
    }

    dataConsulta() {
        return this.#dataConsulta; 
    }

    cpfAtrelado() {
        return this.#cpfAtrelado;
    }

    horaInicio() {
        return this.#horaInicio;
    }

    horaFinal() {
        return this.#horaFinal;
    }

    tempoConsulta() {
        return DateTime.fromFormat(this.#horaFinal, 'HH:mm').diff(DateTime.fromFormat(this.#horaInicio, 'HH:mm')).toFormat("hh:mm");
    }
}

export { Consulta };
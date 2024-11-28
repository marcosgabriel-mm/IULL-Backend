export default class ConversorModel {

    #result;
    #timeLastUpdateUnix;
    #timeLastUpdateUTC;
    #timeNextUpdateUnix;
    #timeNextUpdateUTC;
    #baseCode;
    #targetCode;
    #conversionRate;

    setDadosDaConversao(jsonResposta) {
        this.#result = jsonResposta.result;
        this.#timeLastUpdateUnix = jsonResposta.time_last_update_unix;
        this.#timeLastUpdateUTC = jsonResposta.time_last_update_utc;
        this.#timeNextUpdateUnix = jsonResposta.time_next_update_unix;
        this.#timeNextUpdateUTC = jsonResposta.time_next_update_utc;
        this.#baseCode = jsonResposta.base_code;
        this.#targetCode = jsonResposta.target_code;
        this.#conversionRate = jsonResposta.conversion_rate.toFixed(6);
    }

    result() {
        return this.#result;
    }

    timeLastUpdateUnix() {
        return this.#timeLastUpdateUnix;
    }

    timeLastUpdateUTC() {
        return this.#timeLastUpdateUTC;
    }

    timeNextUpdateUnix() {
        return this.#timeNextUpdateUnix;
    }

    timeNextUpdateUTC() {
        return this.#timeNextUpdateUTC;
    }

    baseCode() {
        return this.#baseCode;
    }

    targetCode() {
        return this.#targetCode;
    }

    conversionRate() {
        return this.#conversionRate;
    }

}
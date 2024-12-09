import { Sequelize } from "sequelize";
import Paciente from "../models/paciente.js";
import Consulta from "../models/consulta.js";

export default class Database {

    #sequelize;

    async init() {
        this.#sequelize = new Sequelize({
            dialect: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'marcos',
            password: 'mgmm4103',
            database: 'consultorio'
        });

        try {
            await this.#sequelize.authenticate();
        } catch (error) {
            return false;
        }
        
        Paciente.init(this.#sequelize);
        Consulta.init(this.#sequelize);

        Paciente.associate({Consulta});
        Consulta.associate({Paciente});

        await this.#sequelize.sync();
        return true;

    }

    sequelize() { return this.#sequelize; }

}


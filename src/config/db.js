import { Sequelize } from "sequelize";
import Paciente from "../models/paciente.js";
import Consulta from "../models/consulta.js";

import dotenv from 'dotenv';
dotenv.config();

export default class Database {

    #sequelize;

    async init() {
        this.#sequelize = new Sequelize({
            dialect: process.env.DB_DIALECT,
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
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


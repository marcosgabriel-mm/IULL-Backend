import { Model, DataTypes } from "sequelize";

export default class Consulta extends Model {

    static init(sequelize) { 
        super.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            dataConsulta: {
                type: DataTypes.DATEONLY,
                allowNull: false
            },
            horaInicio: {
                type: DataTypes.TIME,
                allowNull: false
            },
            horaFinal: {
                type: DataTypes.TIME,
                allowNull: false
            },
            pacienteCpf: {
                type: DataTypes.STRING,
                allowNull: false,
                references: {
                    model: 'Pacientes',
                    key: 'cpf'
                }
            }
        }, {
            sequelize,
            modelName: 'Consulta'
        });
    }

    static associate(models) {
        this.belongsTo(models.Paciente, {foreignKey: 'pacienteCpf', as: 'paciente'});
    }
}


//     tempoConsulta() {
//         return DateTime.fromFormat(this.#horaFinal, 'HH:mm').diff(DateTime.fromFormat(this.#horaInicio, 'HH:mm')).toFormat("hh:mm");
//     }


import { Model, DataTypes } from "sequelize";

export default class Paciente extends Model {

    static init(sequelize) {
        super.init({
            cpf: {
                type: DataTypes.STRING,
                allowNull: false,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING,
                allowNull: false
            },
            dataNascimento: {
                type: DataTypes.DATEONLY,
                allowNull: false
            }
        }, {
            sequelize,
            modelName: 'Paciente'
        });
    }

    static associate(models) {
        this.hasMany(models.Consulta, {foreignKey: 'pacienteCpf', as: 'consultas'});
    }

} 


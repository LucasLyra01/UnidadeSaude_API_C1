const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const AgendamentoModel = postgres.define('agendamento', {

    id_agendamento: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    data_hora_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    necessidades_especiais: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    observacoes_agendamento: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = AgendamentoModel;
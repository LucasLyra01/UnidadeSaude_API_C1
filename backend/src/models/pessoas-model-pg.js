const Sequelize = require('../infra/postgres').Sequelize;
const postgres = require('../infra/postgres').sequelize;

const PessoasModel = postgres.define('pessoas', {
    id_unidade: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome_pessoa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    cpf:{
        type: Sequelize.STRING,
        allowNull: false
    },
    data_nascimento: {
        type: Sequelize.STRING,
        allowNull: false
    },
    telefone_pessoa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    grupo_prioritario: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    endereco_pessoa:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email_pessoa:{
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = PessoasModel;
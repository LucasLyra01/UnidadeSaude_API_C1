const mongoose = require('mongoose');

const unidadeSchema = mongoose.Schema({
    nome_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    descricao: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    endereco_unidade: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    telefone_unidade: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    email_unidade: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    lat_long: {
        type: mongoose.Schema.Types.String,
        required: false
    },
    data_alteracao: {
        type: mongoose.Schema.Types.Date,
        default: null
    }
});

let Unidade = module.exports = mongoose.model('unidade', unidadeSchema);

module.exports.get = function(callback, limit){
    Unidade.find(callback).limit(limit);
}
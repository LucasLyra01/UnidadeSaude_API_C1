const agendamentoModel = require('../models/agendamento-model');
const mongodb = require('../infra/mongodb');

// data_hora_agendamento
// necessidades_especiais
// observacoes_agendamento
// data_alteracao

exports.adicionarAgendamentos = (req, res) => {
    agendamentoModel.find((error, agendamentos) => {
        if(error){
            console.log("Não foi possível registrar este agendamento");
            res.json({
                status: 'erro',
                message: 'Não foi possível inserir o novo agendamento'
            });
        }
        for (let i = 0; i < agendamentos.length; i++) {
            
            if (req.body.data_hora_agendamento == agendamentos[i].data_hora_agendamento) {
                res.json({
                    status: 'erro',
                    message: `O agendamento com o horário ${req.body.data_hora_agendamento} já está preenchido`
                });
            }
            return;
        }
        let agendamento = new agendamentoModel();
        agendamento.data_hora_agendamento = req.body.data_hora_agendamento;
        agendamento.necessidades_especiais = req.body.necessidades_especiais;
        agendamento.observacoes_agendamento = req.body.observacoes_agendamento;

        agendamento.save((error) => {
            if(error){
                res.send({
                    status: 'erro',
                    message: 'Não foi possível inserir o agendamento'
                });
            }else{
                res.send({
                    status: 'ok',
                    message: `O agendamento de data e hora ${agendamento.data_hora_agendamento} foi inserido com sucesso`
                });
            }
        });
    });
}

exports.listarAgendamentos = (req, res) => {
    agendamentoModel.find((error, agendamentos) => {
        if(error){
            console.log("Não foi possível listar os agendamentos");
            res.json({
                status: 'erro',
                message: "Não foi possível listar os agendamentos"
            });
        }else{
            res.json({
                status: 'ok',
                message: agendamentos
            });
        }
    });
}

exports.listarAgendamentosPorId = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (error, agendamentos) => {
        if(error || !agendamentos){
            console.log(`Não foi possível encontrar o agendamento com o id ${id_agendamento}`);
            res.json({
                status: 'erro',
                message: `Não foi possível encontrar o agendamento com o id ${id_agendamento}`
            });
        }else{
            console.log(`O agendamento com o id ${id_agendamento} foi encontrado na base de dados`);
            res.json({
                status: 'ok',
                message: agendamentos
            });
        }
    });
}

exports.atualizarAgendamentos = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.findById(id_agendamento, (error, agendamentos) => {
        if(error || !agendamentos){
            console.log(`Não foi possível atualizar o agendamento de id ${id_agendamento}`);
            res.json({
                status: 'erro',
                message: `Não foi possível atualizar o agendamento de id ${id_agendamento}`
            });
        }else{
            agendamentos.data_hora_agendamento = req.body.data_hora_agendamento;
            agendamentos.necessidades_especiais = req.body.necessidades_especiais;
            agendamentos.observacoes_agendamento = req.body.observacoes_agendamento;
            agendamentos.data_alteracao = Date.now();

            agendamentos.save((error) => {
                if(error){
                    res.json({
                        status: 'erro',
                        message: `Houve um erro ao atualizar o agendamento do dia ${agendamentos.data_hora_agendamento}`
                    });
                }else{
                    res.json({
                        status: 'ok',
                        message: `O agendamento do dia ${agendamentos.data_hora_agendamento} foi atualizado com sucesso`,
                        novoAgendamento: agendamentos
                    });
                }
            });
        }
    });
}

exports.removerAgendamentos = (req, res) => {
    let id_agendamento = req.params.id;

    agendamentoModel.remove({
        _id: id_agendamento
    }, (error, agendamentos) => {
        if(error){
            res.json({
                status: 'erro',
                message: `Não foi possível remover o agendamento do dia ${agendamentos.data_hora_agendamento}`
            });
        }else{
            res.json({
                status: 'ok',
                message: `O agendamento selecionado foi deletado com sucesso`
            });
        }
    });
}
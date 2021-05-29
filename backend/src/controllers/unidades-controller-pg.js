const unidadeModelPg = require('../models/unidade-model-pg');

exports.adicionarUnidadePg = async(req, res) => {

    const unidade = req.body;

    const unidadeExiste = await unidadeModelPg.findAll({
        where: {
            email_unidade: unidade.email_unidade
        }
    });

    console.log(unidadeExiste);

    if(unidadeExiste.length > 0){
        res.json({
            status: 'ok',
            message: "Este email já está cadastrado"
        });
    }else{
        const unidadeInserida = await unidadeModelPg.create({
            nome_unidade: unidade.nome_unidade,
            descricao: unidade.descricao,
            endereco_unidade: unidade.endereco_unidade,
            telefone_unidade: unidade.telefone_unidade,
            email_unidade: unidade.email_unidade,
            lat_long: unidade.lat_long
        });
        res.json({
            status: 'ok',
            message: unidadeInserida
        });
    }
}

exports.listarUnidadesPg = async(req, res) => {

    try {
        const unidades = await unidadeModelPg.findAll();
        res.json({
            status: 'ok',
            message: unidades
        });
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: 'Não foi possível listar as unidades'
        });
    }
}

exports.listarUnidadesPorIdPg = async(req, res) => {

    let id_unidade = req.params.id_unidade;

    try {
        const unidadeEspecifica = await unidadeModelPg.findByPk(id_unidade);
        console.log(unidadeEspecifica);
        if(unidadeEspecifica){
            res.json({
                status: 'ok',
                message: 'Unidade recuperada com sucesso',
                unidade: unidadeEspecifica
            });
        }else{
            res.json({
                status: 'erro',
                message: `Não foi possível recuperar a unidade de id ${id_unidade}`
            });
        }
    } catch (error) {
        console.log(error);
        res.json({
            status: 'erro',
            message: `Erro ao recuperar o id ${id_unidade}`
        });
    }
}

exports.atualizarUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    let novaUnidade = {
        nome_unidade: req.body.nome_unidade,
        descricao: req.body.descricao,
        endereco_unidade: req.body.endereco_unidade,
        telefone_unidade: req.body.telefone_unidade,
        email_unidade: req.body.email_unidade,
        lat_long: req.body.lat_long
    }

    if(id_unidade){
        let unidadeAtualizada = await unidadeModelPg.update(novaUnidade, {where: {id: id_unidade}});
        if(unidadeAtualizada){
            res.json({
                status: 'ok',
                message: 'Unidade atualizada com sucesso'
            });
        }else{
            res.json({
                status: 'erro',
                message: `Erro ao atualizar a unidade de id ${id_unidade}`
            });
        }
    }else{
        console.log("Sem id");
    }
}

exports.removerUnidadePg = async (req, res) => {
    let id_unidade = req.params.id_unidade;

    if(id_unidade){
        try {
            let unidadeDeletada = await unidadeModelPg.destroy({where: {id: id_unidade}});
            if(unidadeDeletada){
                res.json({
                    status: 'ok',
                    message: `Unidade de id ${id_unidade} deletada com sucesso`
                });
            }else{
                res.json({
                    status: 'erro',
                    message: `Não foi possível remover a unidade de id ${id_unidade}`
                });
            }
        } catch (error) {
            res.json({
                status: 'erro',
                message: `Não foi possível remover a unidade de id ${id_unidade}`
            });
        }
    }
}
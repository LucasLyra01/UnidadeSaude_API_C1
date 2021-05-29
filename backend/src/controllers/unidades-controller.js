const unidadeSaudeModel = require('../models/unidade-model');
const mongodb = require('../infra/mongodb');

// nome_unidade
// descricao
// endereco_unidade
// telefone_unidade
// email_unidade
// lat_long
// data_alteracao

exports.adicionarUnidade = (req, res) => {
    unidadeSaudeModel.find((error, unidades) => {
        if(error){
            console.log("Não foi possível adicionar a nova unidade");
            res.json({
                status: 'erro',
                message: "Não foi possível adicionar a nova unidade"
            });
        }

        for (let i = 0; i < unidades.length; i++) {
            
            if (req.body.email_unidade == unidades[i].email_unidade) {
                res.json({
                    status: 'erro', 
                    message: `A unidade ${req.body.nome_unidade} já está cadastrado com o email ${req.body.email_unidade}`
                });
                return;
            }
        }

        let unidade = new unidadeSaudeModel();
        unidade.nome_unidade = req.body.nome_unidade;
        unidade.descricao = req.body.descricao;
        unidade.endereco_unidade = req.body.endereco_unidade;
        unidade.telefone_unidade = req.body.telefone_unidade;
        unidade.email_unidade = req.body.email_unidade;
        unidade.lat_long = req.body.lat_long;

        unidade.save((error) => {
            if(error){
                res.send({
                    status: 'erro',
                    // message: 'Não foi possível inserir a nova unidade'
                    message: error
                });
            }else{
                res.send({
                    status: 'ok',
                    message: `A unidade ${unidade.nome_unidade} foi inserida com sucesso`
                });
            }
        });
    });
}

exports.listarUnidade = (req, res) => {
  unidadeSaudeModel.find((error, unidades) => {
      if(error){
          console.log("Não foi possível listas as unidades");
          res.json({
              status: 'erro',
              message: "Não foi possível listas as unidades"
          });
      }else{
          res.json({
              status: 'ok',
              message: unidades
          });
      }
  });  
}

exports.listarUnidadePorId = (req, res) => {
    let id_unidade = req.params.id;

    unidadeSaudeModel.findById(id_unidade, (error, unidades) => {
        if(error || !unidades){
            console.log(`Não foi possível encontrar a unidade ${id_unidade}`);
            res.json({
                status: 'erro',
                message: `Não foi possível encontrar a unidade ${id_unidade}`
            });
        }else{
            console.log(`Unidade de id ${id_unidade} foi encontrada com sucesso`);
            res.json({
                status: 'ok',
                message: unidades
            });
        }
    });
}

exports.atualizarUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadeSaudeModel.findById(id_unidade, (error, unidades) => {
        if(error || !unidades){
            console.log(`Não foi possível atualizar a unidade com o id ${id_unidade}`);
            res.json({
                status: 'erro',
                message: `Não foi possível atualizar a unidade com o id ${id_unidade}`
            });
        }else{
            unidades.nome_unidade = req.body.nome_unidade;
            unidades.descricao = req.body.descricao;
            unidades.endereco_unidade = req.body.endereco_unidade;
            unidades.telefone_unidade = req.body.telefone_unidade;
            unidades.email_unidade = req.body.email_unidade;
            unidades.lat_long - req.body.lat_long;
            unidades.data_alteracao = Date.now();

            unidades.save((error) => {
                if(error){
                    res.json({
                        status: 'erro',
                        message: `Houve um erro ao atualizar a unidade ${unidades.nome_unidade}`
                    });
                }else{
                    res.json({
                        status: 'ok',
                        message: `A unidade ${unidades.nome_unidade} foi atualizada com sucesso`,
                        novaUnidade: unidades
                    });
                }
            });
        }
    });
}

exports.removerUnidade = (req, res) => {
    let id_unidade = req.params.id;

    unidadeSaudeModel.remove({
        _id: id_unidade
    }, (error, unidades) => {
        if(error){
            res.json({
                status: 'erro',
                message: `Não foi possível remover a unidade ${unidades.nome_unidade}`
            });
        }else{
            res.json({
                status: 'ok',
                message: `A Unidade foi deletada com sucesso`
            });
        }
    });
}

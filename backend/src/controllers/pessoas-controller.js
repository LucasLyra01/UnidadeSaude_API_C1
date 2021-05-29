const pessoasModel = require('../models/pessoas-model');
const mongodb = require('../infra/mongodb');

exports.adicionarPessoas = (req, res) =>  {

    pessoasModel.find((error, pessoas) => {
        if(error){
            console.log("Não foi possível recuperar as pessoas");
            res.json({
                status: 'erro',
                message: "Não foi possível recuperar as pessoas"
            });
        }

        for (let i = 0; i < pessoas.length; i++) {
            
            if(req.body.email_pessoa == pessoas[i].email_pessoa){
                res.json({
                    status: 'erro',
                    message: `A pessoa ${req.body.nome} já está cadastrado com o email ${req.body.email_pessoa}`
                });
                return;
            }
        }

        let pessoa = new pessoasModel();
        pessoa.nome_pessoa = req.body.nome_pessoa;
        pessoa.cpf = req.body.cpf;
        pessoa.data_nascimento = req.body.data_nascimento;
        pessoa.telefone_pessoa = req.body.telefone_pessoa;
        pessoa.grupo_prioritario = req.body.grupo_prioritario;
        pessoa.endereco_pessoa = req.body.endereco_pessoa;
        pessoa.email_pessoa = req.body.email_pessoa;
    
        pessoa.save((error) => {
            if (error) {
                res.send({
                    status: 'erro',
                    message: error
                });
            }else{
                res.send({
                    status: 'ok',
                    message: `A pessoa ${pessoa.nome_pessoa} foi inserida com sucesso`
                });
            }
        });
    });
}

exports.listarPessoas = (req, res) => {
    pessoasModel.find((error, pessoas) => {
        if(error){
            console.log("Não foi possível listar as pessoas");
            res.json({
                status: 'erro',
                message: 'Não foi possível listar as pessoas'
            });
        }else{
            res.json({
                status: 'ok',
                message: pessoas
            });
        }
    });
}

exports.listarPessoasPorId = (req, res) => {

    let id_pessoa = req.params.id;

    pessoasModel.findById(id_pessoa, (error, pessoas) => {
        if (error || !pessoas) {
            console.log(`Não foi possível encontrar a pessoa ${id_pessoa}`);
            res.json({
                status: 'erro',
                message: `Não foi possível encontrar a pessoa ${id_pessoa}`
            });
        }else{
            console.log(`Pessoa de id ${id_pessoa} encontrado na base de dados`);
            res.json({
                status: 'ok',
                message: pessoas
            });
        }
    });
}

exports.atualizarPessoas = (req,res) => {
    
    let id_pessoa =  req.params.id;

    pessoasModel.findById(id_pessoa, (error, pessoas) => {
        if (error || !pessoas) {
            console.log(`Não foi possível atualizar a pessoa com o id ${id_pessoa}`);
            res.json({
                status: 'erro',
                message: `Não foi possível atualizar a pessoa com o id ${id_pessoa}`
            });
        }else{
            pessoas.nome_pessoa = req.body.nome_pessoa;
            pessoas.cpf = req.body.cpf;
            pessoas.data_nascimento = req.body.data_nascimento;
            pessoas.telefone_pessoa = req.body.telefone_pessoa;
            pessoas.grupo_prioritario = req.body.grupo_prioritario;
            pessoas.endereco_pessoa = req.body.endereco_pessoa;
            pessoas.email_pessoa = req.body.email_pessoa;
            pessoas.data_alteracao = Date.now();

            pessoas.save((error) => {
                if(error){
                    res.json({
                        status: 'erro',
                        // message: `Houve um erro ao atualizar a pessoa ${pessoas.nome_pessoa}`
                        message: error
                    });
                }else{
                    res.json({
                        status: 'ok',
                        message: `A informações ${pessoas.nome_pessoa} foram atualizadas com sucesso`,
                        novaPessoa: pessoas
                    });
                }
            });
        }
    });
}

exports.removerPessoas = (req, res) => {
    let id_pessoa = req.params.id;

    pessoasModel.remove({
        _id: id_pessoa
    }, (error, pessoas) => {
        if(error){
            res.json({
                status: 'erro',
                message: `Não foi possível remover a pessoa ${pessoas.nome_pessoa}`
            });
        }else{
            res.json({
                status: 'ok', 
                message: `A Pessoa foi deletada com sucesso`
            });
        }
    });
}

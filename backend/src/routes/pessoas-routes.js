let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller');

router.post('/', pessoasController.adicionarPessoas);

router.get('/', pessoasController.listarPessoas);

router.get('/:id', pessoasController.listarPessoasPorId);

router.put('/:id', pessoasController.atualizarPessoas);

router.delete('/:id', pessoasController.removerPessoas);

module.exports = router;
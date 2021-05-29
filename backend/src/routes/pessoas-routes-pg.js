let router = require('express').Router();

const pessoasController = require('../controllers/pessoas-controller-pg');

router.post('/', pessoasController.adicionarPessoaPg);

router.get('/', pessoasController.listarPessoasPg);

router.get('/:id', pessoasController.listarPessoaPorIdPg);

router.put('/:id', pessoasController.atualizarPessoaPg);

router.delete('/:id', pessoasController.removerPessoaPg);

module.exports = router;
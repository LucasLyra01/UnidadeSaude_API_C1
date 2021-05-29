let router = require('express').Router();

const agendamentoController = require('../controllers/agendamento-controller-pg');

router.post('/', agendamentoController.adicionarAgendamentoPg);

router.get('/', agendamentoController.listarAgendamentosPg);

router.get('/:id', agendamentoController.listarAgendamentosPorIdPg);

router.put('/:id', agendamentoController.atualizarAgendamentoPg);

router.delete('/:id', agendamentoController.removerAgendamentoPg);

module.exports = router;
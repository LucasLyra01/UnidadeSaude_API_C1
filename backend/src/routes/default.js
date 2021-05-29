let router = require('express').Router();

router.get('/', function (req, res) {
    res.json({
        status: 'ok',
        message: 'Servidor da unidade de saúde funcionando'
    });
});

module.exports = router;
var express = require('express');
var router = express.Router();
var marketsController = require("../controllers/markets.controller");
var pdf = require("../exportPdf");



/* Adicionar mercados*/
///router.post('/', marketsController.create);


/* Editar mercados*/
//router.put('/:id', marketsController.update);

/* Eliminar mercados */
//router.delete('/:id', marketsController.delete);

/* Listar todos los mercados */
//router.get('/findOneMercado/:id', marketsController.findOneMercado);

router.get('/:start:limit', function(req, res) {
    var data = {};
    if (req.params) { data = req.params }
    marketsController.getMarkets(data, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Listar todos los mercados */
router.get('/', function(req, res) {
    var data = {};
    marketsController.getMarkets(data, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Adicionar mercados*/
router.post('/', function(req, res) {
    var data = {};
    if (req.body) { data = req.body }
    marketsController.create(data, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Editar mercados*/
router.put('/:id', function(req, res) {
    marketsController.update(req.params, req.body, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Eliminar mercados */
router.delete('/:id', function(req, res) {
    marketsController.delete(req.params, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Listar todos los mercados */
router.get('/findOneMercado/:id', function(req, res) {
    marketsController.findOneMercado(req.params, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Buscar */
router.get('/search/:search', function(req, res) {
    marketsController.searchMarkets(req.params, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

/* Exportar a pdf */
router.post('/createPdf', function(req, res) {
    pdf.create(req.body, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.status(200).json({
                message: row
            });
        }
    });
});

module.exports = router;
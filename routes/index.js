var express = require('express');
var router = express.Router();
var marketsController = require("../controllers/markets.controller");

/*Listar los mercados. */
router.get('/', function(req, res, next) {
    var data = {};
    if (req.body) { data = req.body }
    marketsController.getMarkets(data, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            res.render('index', {
                title: 'Listado de mercados',
                members: row
            });
        }
    });
});

/*Formulario  */
router.get('/form', function(req, res, next) {
    if (req.query.id == "null") {
        res.render('form', {
            name: "New item",
            action: "/addItem"
        });
    } else {
        marketsController.findOneMercado(req.query, function(err, row) {
            if (err) {
                res.render('form', {
                    name: "New item",
                    action: "/addItem"
                });
            } else {
                var data = row.dataValues;
                data.action = "/editItem"
                res.render('form', data);
            }
        });
    }
});

/*Detalles de un mercado . */
router.get('/getItem', function(req, res, next) {
    marketsController.findOneMercado(req.query, function(err, row) {
        var data = row.dataValues;
        data.action = "none"
        res.render('form', data);
    });
});

/*Adicionar mercado . */
router.post('/addItem', function(req, res, next) {
    var aux = {};
    aux.nombre = req.body.name;
    aux.direccion = req.body.address;
    aux.descripcion = req.body.description;

    marketsController.create(aux, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            var data = {};
            marketsController.getMarkets(data, function(err, row) {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                } else {
                    res.render('index', {
                        title: 'Listado de mercados',
                        members: row
                    });
                }
            });
        }
    });
});

/*Listar los . */
router.post('/editItem', function(req, res, next) {
    var aux = {};
    aux.nombre = req.body.name;
    aux.direccion = req.body.address;
    aux.descripcion = req.body.description;
    var id = req.body.id;

    marketsController.update({ "id": id }, aux, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            var data = {};
            marketsController.getMarkets(data, function(err, row) {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                } else {
                    res.render('index', {
                        title: 'Listado de mercados',
                        members: row
                    });
                }
            });
        }
    });
});

/*Listar los . */
router.get('/deleteItem', function(req, res, next) {
    marketsController.delete(req.query, function(err, row) {
        if (err) {
            res.status(500).json({
                message: err
            });
        } else {
            var data = {};
            marketsController.getMarkets(data, function(err, row) {
                if (err) {
                    res.status(500).json({
                        message: err
                    });
                } else {
                    res.render('index', {
                        title: 'Listado de mercados',
                        members: row
                    });
                }
            });
        }
    });
});

module.exports = router;
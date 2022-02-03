const db = require("../models");
const Markets = db.Markets;
const Op = db.Sequelize.Op;

// Obtiene el listado de los mercados.
exports.getMarkets = (req, res) => {
    var obj = {};
    if (req.params.start != undefined && req.params.limit != undefined) {
        console.warn("req.params.limit", req.params.limit)
        console.warn("req.params.start", req.params.start)
        obj.limit = req.params.limit.split(":")[1];
        obj.offset = req.params.start;
    }
    console.warn("obj", obj)
    Markets.findAll(obj)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error buscando los mercados."
            });
        });
};

// Crear y salvar nuevo mercado
exports.create = (req, res) => {
    // Validar request
    if (!req.body.nombre || !req.body.direccion) {
        res.status(400).send({
            message: "El contenido no puede estar vacio!"
        });
        return;
    }

    // Crear mercado
    const market = {
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        descripcion: req.body.descripcion ? req.body.descripcion : ""
    };

    // Salvar mercado en la bd
    Markets.create(market)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error al crear el mercado."
            });
        });
};

//Actualizar datos de un mercado por id por id
exports.update = (req, res) => {
    if (req.params.id != undefined) {
        const id = req.params.id;
        Markets.update(req.body, {
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    res.send({
                        message: "Datos actulizados correctamente."
                    });
                } else {
                    res.send({
                        message: `No se pudo actualizar los datos del mercado con id=${id}. No se encontro el mercado!`
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error actualizando el mercado con id=" + id
                });
            });
    } else {
        res.status(500).send({
            message: "Error actualizando el mercado"
        });
    }

};

//Eliminar datos de un mercado por id
exports.delete = (req, res) => {
    const id = req.params.id;

    Markets.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Mercado eliminado correctamente!"
                });
            } else {
                res.send({
                    message: `No se pudo eliminar el mercado con id=${id}. No se encontro el mercado!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error eliminando el mercado con id=" + id
            });
        });
};

// Obtiene un mercado.
exports.findOneMercado = (req, res) => {
    const id = req.params.id;
    Markets.findByPk(id)
        .then(data => {
            if (data == null) {
                res.send([]);
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error buscando el mercado."
            });
        });
};
/*
// Obtiene todas las personas con la cantidad de hijos.
exports.findAllCountChildren = (req, res) => {
    Person.findAll({
            attributes: {
                include: [
                    [
                        db.sequelize.literal(`(
                    SELECT COUNT(*)
                    FROM children AS hijos
                    WHERE
                        hijos.personId = Person.id
                )`),
                        "cantidadHijos"
                    ]
                ]
            }
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Ocurrio un error buscando las personas."
            });
        });
};*/
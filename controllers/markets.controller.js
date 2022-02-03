const db = require("../models");
const Markets = db.Markets;
const Op = db.Sequelize.Op;

// Obtiene el listado de los mercados.
exports.getMarkets = function(data, callback) {
    var obj = {};
    if (data.start != undefined && data.limit != undefined) {
        obj.limit = data.limit.split(":")[1];
        obj.offset = data.start;
    }
    Markets.findAll(obj)
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback("Ocurrio un error buscando los mercados.", null);
        });
};

// Crear y salvar nuevo mercado
exports.create = (data, callback) => {
    // Validar request
    if (!data.nombre || !data.direccion) {
        callback("El contenido no puede estar vacio!", null);
    }

    // Crear mercado
    const market = {
        nombre: data.nombre,
        direccion: data.direccion,
        descripcion: data.descripcion ? data.descripcion : ""
    };

    // Salvar mercado en la bd
    Markets.create(market)
        .then(row => {
            callback(null, row);
        })
        .catch(err => {
            callback("Ocurrio un error al crear el mercado.", null);
        });
};

//Actualizar datos de un mercado por id por id
exports.update = (params, data, callback) => {
    if (params.id != undefined) {
        const id = params.id;
        Markets.update(data, {
                where: { id: id }
            })
            .then(num => {
                if (num == 1) {
                    callback(null, "Datos actulizados correctamente.")
                } else {
                    callback(`No se pudo actualizar los datos del mercado con id=${id}. No se encontro el mercado!`, null)
                }
            })
            .catch(err => {
                callback("Error actualizando el mercado con id=" + id, null)
            });
    } else {
        callback("Error actualizando el mercado", null)
    }
};

//Eliminar datos de un mercado por id
exports.delete = (data, callback) => {
    const id = data.id;
    Markets.destroy({
            where: { id: id }
        })
        .then(num => {
            if (num == 1) {
                callback(null, "Mercado eliminado correctamente!")
            } else {
                callback(`No se pudo eliminar el mercado con id=${id}. No se encontro el mercado!`, null)
            }
        })
        .catch(err => {
            callback("Error eliminando el mercado con id=" + id, null)
        });
};

// Obtiene un mercado.
exports.findOneMercado = (data, callback) => {
    const id = data.id;
    Markets.findByPk(id)
        .then(row => {
            if (row == null) {
                callback(null, []);
            } else {
                callback(null, row);
            }
        })
        .catch(err => {
            callback("Ocurrio un error buscando el mercado.", null);
        });
};

// Buscar.
exports.searchMarkets = function(data, callback) {
    var filter = {};
    filter.nombre = {
        [Op.like]: "%" + data.search + "%"
    };
    filter.direccion = {
        [Op.like]: "%" + data.search + "%"
    };
    filter.descripcion = {
        [Op.like]: "%" + data.search + "%"
    };

    Markets.findAll({
            where: {
                [Op.or]: filter
            }
        })
        .then(data => {
            callback(null, data);
        })
        .catch(err => {
            callback("Ocurrio un error buscando los mercados.", null);
        });
};
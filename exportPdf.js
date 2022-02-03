var pdf = require('html-pdf');
var marketsController = require("./controllers/markets.controller");

exports.create = function(data, callback) {
    data.limit = ":" + data.limit;
    marketsController.getMarkets(data, function(err, row) {
        if (err) {
            callback(err, null);
        } else {
            exports.createPdf(row, function(e, r) {
                if (e) {
                    callback(err, null);
                } else {
                    callback(null, r);
                }
            })
        }
    });
}

exports.createPdf = function(data, callback) {
    var contenido = `
<h1>Listado de mercados</h1>
<div class="box-content">
                        <table class="table table-striped table-bordered bootstrap-datatable datatable responsive">
                            <thead>
                                <tr>
                                    <th>Nombre</th>
                                    <th>Direccion</th>
                                    <th>Descripcion</th>
                                </tr>
                            </thead>
                            <tbody>`;

    for (let index = 0; index < data.length; index++) {
        contenido += `<tr>
    <td>` + data[index].nombre + `</td>
    <td class="center">` + data[index].direccion + `</td>
    <td class="center">` + data[index].descripcion + `</td>
</tr>`

    }

    contenido += `</tbody>
                        </table>
                    </div>
                </div>
            </div>
`;

    var options = {
        "format": 'A4',
        "header": {
            "height": "60px"
        },
        "footer": {
            "height": "22mm"
        },
        "base": 'file:./public/'
    };

    pdf.create(contenido, options).toFile('./salida.pdf', function(err, res) {
        if (err) {
            callback(err, null);
        } else {
            callback(null, res);
        }
    });
}
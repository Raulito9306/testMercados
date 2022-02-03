module.exports = (sequelize, Sequelize) => {
    const Markets = sequelize.define("markets", {
        nombre: {
            type: Sequelize.STRING,
            validate: { len: [8, 50] },
            allowNull: false
        },
        direccion: {
            type: Sequelize.STRING,
            validate: { max: 150 },
            allowNull: false
        },
        descripcion: {
            type: Sequelize.BOOLEAN
        }
    });

    return Markets;
};
module.exports = (sequelize, DataTypes) => { 
    return sequelize.define('produto_favorito', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        fk_id_produto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        fk_id_usuario: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'produtos_favoritos',
		timestamps: true
    });
}

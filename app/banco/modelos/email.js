module.exports = (sequelize, DataTypes) => { 
    return sequelize.define('email', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true 
        },
        fk_id_usuario: {
            type: DataTypes.UUID,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }, {
        table_name: 'emails',
        timestamp: true
    });
}

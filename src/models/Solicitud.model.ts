import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'solicitudes' })
export class Solicitud extends Model {
    @Column({ type: DataType.STRING, allowNull: false })
    declare email: string; // Agrega 'declare'

    @Column({ type: DataType.STRING, allowNull: false })
    declare folio: string; // Agrega 'declare'

    @Column({ type: DataType.STRING, defaultValue: 'Pendiente' })
    declare estatus: string; // Agrega 'declare'
}

export default Solicitud;
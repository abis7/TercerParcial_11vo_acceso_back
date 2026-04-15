import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'pagos_referencia' })
export class PagoReferencia extends Model {
    @Column({ type: DataType.STRING, allowNull: false, unique: true })
    folio: string;
}

export default PagoReferencia;
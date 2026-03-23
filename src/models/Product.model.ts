import { Table, Column, Model, DataType, Default } from "sequelize-typescript";

@Table({
    tableName: "products"
})
class Product extends Model {

    @Column({ type: DataType.STRING })
    name!: string;

    @Column({ type: DataType.STRING })
    image!: string;

    @Column({ type: DataType.TEXT })
    description!: string;

    @Column({ type: DataType.DECIMAL(10, 2) })
    price!: number;

    @Column({ type: DataType.INTEGER })
    quantity!: number;

    @Default(true)
    @Column({ type: DataType.BOOLEAN })
    availability!: boolean;
}

export default Product;
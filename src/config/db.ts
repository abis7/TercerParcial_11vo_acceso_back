import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";

dotenv.config();
const db = new Sequelize(process.env.DB_URL, {
    models: [__dirname + "/../models"],
    modelMatch: (filename) => filename.endsWith(".model.ts") || filename.endsWith(".model.js"),
})



export default db;
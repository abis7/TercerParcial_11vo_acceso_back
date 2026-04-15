import server from './server';
import db from './config/db';

async function main() {
    try {
        await db.authenticate();
        await db.sync();
        console.log('Conexion a la base de datos exitosa');
        server.listen(4000, () => {
            console.log('REST api en puerto 4000');
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1);
    }
}

main().catch(err => {
    console.error("Error fatal:", err);
});
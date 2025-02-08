import { createPool, Pool, PoolOptions } from "mysql2/promise";

let db: Pool | null = null;

export default async function getDbConnection() {

    if(!db) {
        if(
            !process.env.MYSQL_HOST || 
            !process.env.MYSQL_PORT ||
            !process.env.MYSQL_PASSWORD ||
            !process.env.MYSQL_USER ||
            !process.env.MYSQL_DATABASE
        )  { 
            throw new Error("Database config env variables are missing!");
        }

        const connectionParams: PoolOptions = {
            host: process.env.MYSQL_HOST,
            port: parseInt(process.env.MYSQL_PORT || "3306"),
            password: process.env.MYSQL_PASSWORD,
            user: process.env.MYSQL_USER,
            database: process.env.MYSQL_DATABASE,
            connectionLimit: 4
        }
        
        db = createPool(connectionParams);

    }

    return db;

}

process.on("SIGINT",
    async function() {

        console.log("Received signal interrupt");

        try {
            if(db) await db.end();
            console.log("Database connection has been ended");
        } catch (error) {
            console.error("Error closing db connection", error);
        } finally {
            process.exit(0);
        }

    }

);


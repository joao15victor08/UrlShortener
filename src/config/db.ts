import { Dialect, Sequelize } from "sequelize";
import "dotenv/config";

const db_name: string = process.env.DB_NAME || "postgres";
const db_user = process.env.DB_USER || "postgres";
const db_pass = process.env.DB_PASS || "postgres";
const db_host = process.env.DB_HOST || "postgres";
const db_dialect = (process.env.DB_DIALECT || "postgres") as Dialect;

const sequelize = new Sequelize(db_name, db_user, db_pass, {
	host: db_host,
	dialect: db_dialect,
	dialectOptions: {
		useUTC: false,
	},
});

export default sequelize;

import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	NonAttribute,
	ForeignKey,
	DataTypes,
} from "sequelize";
import sequelize from "../config/db";

import Category from "./Category";

class Url extends Model<InferAttributes<Url>, InferCreationAttributes<Url>> {
	declare id: CreationOptional<number>;
	declare originalUrl: string;
	declare path: string | null;
	declare thumbnail: string | null;
	declare totalVisits: number;
	declare active: boolean;
	declare maxVisits: number;
	declare maxTimeActive: Date;

	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	declare categoryId: ForeignKey<Category["id"]>;

	get original_url(): NonAttribute<string> {
		return this.originalUrl;
	}
}

Url.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		originalUrl: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		path: {
			type: DataTypes.STRING,
			allowNull: true,
			unique: true,
		},
		thumbnail: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		totalVisits: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
		},
		active: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
		maxVisits: {
			type: DataTypes.BIGINT,
			allowNull: false,
			defaultValue: Number.MAX_SAFE_INTEGER,
		},
		maxTimeActive: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: new Date(8640000000000000),
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "urls",
		sequelize,
	}
);

Url.belongsTo(Category, { targetKey: "id", foreignKey: "categoryId" });
Category.hasOne(Url, { sourceKey: "id", foreignKey: "categoryId" });

export default Url;

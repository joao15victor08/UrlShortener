import {
	Model,
	InferAttributes,
	InferCreationAttributes,
	CreationOptional,
	NonAttribute,
	DataTypes,
} from "sequelize";
import sequelize from "../config/db";

class Category extends Model<
	InferAttributes<Category>,
	InferCreationAttributes<Category>
> {
	declare id: CreationOptional<number>;
	declare name: string;
	declare createdAt: CreationOptional<Date>;
	declare updatedAt: CreationOptional<Date>;

	get categoryName(): NonAttribute<string> {
		return this.name;
	}
}

Category.init(
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		createdAt: {
			type: DataTypes.DATE,
		},
		updatedAt: {
			type: DataTypes.DATE,
		},
	},
	{
		tableName: "categories",
		sequelize,
	}
);

export default Category;

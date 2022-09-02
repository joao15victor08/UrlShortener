import { Request, Response } from "express";
import Category from "../models/Category";

// Create category
export const createCategory = async (req: Request, res: Response) => {
	const { name } = req.body;

	if (!name) res.status(400).send({ error: "Empty name" });

	const [category] = await Category.findOrCreate({
		where: {
			name: name,
		},
	});

	res.status(200).send(category);
};

export const getAllCategorys: any = async (req: Response, res: Response) => {
	const categorys = await Category.findAll();

	res.status(200).send(categorys);
};

export const updateCategory = async (req: Request, res: Response) => {
	const { id, name } = req.body;

	if (!name) res.status(400).send({ error: "Empty name" });

	const rowAffecteds = await Category.update(
		{
			name: name,
		},
		{
			where: {
				id: id,
			},
		}
	);

	res.status(200).send({ msg: `${rowAffecteds[0]} rows changed` });
};

export const deleteCategory = async (req: Request, res: Response) => {
	const { id } = req.params;

	const rowAffecteds = await Category.destroy({
		where: {
			id: id,
		},
	});

	res.status(200).send({ msg: `${rowAffecteds} rows deleted` });
};

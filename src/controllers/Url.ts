import { Request, Response } from "express";
import Category from "../models/Category";
import Url from "../models/Url";
import dns from "dns";
import urlparse from "url";

export const createUrl = async (req: Request, res: Response) => {
	const { originalUrl, path, maxVisits, maxTimeActive, categoryId } =
		req.body;

	if (!originalUrl) return res.status(400).send({ error: "Empty Url" });

	const parsedUrl = urlparse.parse(originalUrl);

	if (!parsedUrl.protocol || !parsedUrl.host) {
		return res.status(400).send({ error: "Invalid Url" });
	}

	// dns.lookup(parsedUrl.hostname, (err, address) => {
	// 	if (!address) return res.status(400).send({ error: "Invalid Url" });
	// });

	if (!isNaN(Number(path))) {
		return res.status(400).send({ error: "Path cannot be a number" });
	}

	const prevUrl = await Url.findOne({
		where: {
			path: path,
		},
	});

	if (prevUrl) return res.status(400).send({ error: "Path already exists" });

	const [url] = await Url.findOrCreate({
		where: {
			originalUrl: originalUrl,
		},
		defaults: {
			originalUrl: originalUrl,
			categoryId: categoryId,
			path: path,
			maxVisits: maxVisits,
			maxTimeActive: maxTimeActive,
			totalVisits: 0,
			active: true,
		},
	});

	res.status(200).send(url);
};

export const getAllUrl = async (req: Request, res: Response) => {
	const urls = await Url.findAll({
		include: [{ model: Category }],
	});

	res.status(200).send(urls);
};

export const updateUrl = async (req: Request, res: Response) => {
	const {
		id,
		originalUrl,
		active,
		path,
		maxVisits,
		maxTimeActive,
		thumbnail,
		categoryId,
	} = req.body;

	const rowAffecteds = await Url.update(
		{
			originalUrl: originalUrl,
			path: path,
			active: active,
			maxVisits: maxVisits,
			maxTimeActive: maxTimeActive,
			thumbnail: thumbnail,
			categoryId: categoryId,
		},
		{
			where: {
				id: id,
			},
		}
	);

	res.status(200).send({ msg: `${rowAffecteds[0]} rows changed` });
};

export const deleteUrl = async (req: Request, res: Response) => {
	const { id } = req.params;

	const rowAffecteds = await Url.destroy({
		where: {
			id: id,
		},
	});

	res.status(200).send({ msg: `${rowAffecteds} rows deleted` });
};

export const getUrl = async (req: Request, res: Response) => {
	const { id } = req.params;

	// console.log(isNaN(Number(id)));
	var url = null;

	if (!isNaN(Number(id))) {
		// if id is a number
		url = await Url.findOne({
			where: {
				id: id,
			},
		});
	}

	if (!url) {
		url = await Url.findOne({
			where: {
				path: id,
			},
		});
	}

	if (!url) {
		return res.status(404).send({ error: "Url not found" });
	}

	if (url.active === false) {
		return res.status(404).send({ error: "Url deactivated" });
	}

	if (url.maxVisits !== null && url.totalVisits >= url.maxVisits) {
		return res.status(404).send({ error: "Url max visits reached" });
	}

	if (url.maxTimeActive !== null && url.maxTimeActive < new Date()) {
		return res.status(404).send({ error: "Url max time active reached" });
	}

	const rowAffecteds = await Url.update(
		{
			totalVisits: url.totalVisits + 1,
		},
		{
			where: {
				id: url.id,
			},
		}
	);

	res.redirect(url.originalUrl);
};

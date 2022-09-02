import { Application } from "express";
import categoryRoute from "./Category.routes";
import urlRoute from "./Url.routes";

export const setRoutes = (app: Application) => {
	app.use("/category", categoryRoute);
	app.use("/url", urlRoute);
};

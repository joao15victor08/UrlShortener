import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { setRoutes } from "./routes";

const app = express();

const port = process.env.PORT || 3000;
console.log(port);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
	return res.send({ status: "sucesso" });
});

setRoutes(app);

app.listen(3000, () => {
	console.log(`Server running on port localhost:${port}`);
});

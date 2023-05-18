// express and preconfiguration
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongo";
dotenv.config();
// routes
import routes from "./routes";
// documentation
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger";

// configuration
const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// documentation - swagger

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// import all the routes to the app
app.use("/api", routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// connect to mongoDb
dbConnect();

export default app;

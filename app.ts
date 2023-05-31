// express and preconfiguration
import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./config/mongo";
import path from 'path';
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

const storageRouter = express.Router();
// Serve the static files from the React app
storageRouter.use(express.static(path.join(__dirname, '/../storage')));
storageRouter.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+req.path));
});
app.use('/storage', storageRouter);

// documentation - swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// import all the routes to the app
app.use("/api", routes);

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '/../client/dist')));

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/../client/dist/index.html'));
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});

// connect to mongoDb
dbConnect();

export default app;
module.exports = app;

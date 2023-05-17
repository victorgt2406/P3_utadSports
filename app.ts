import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes';
dotenv.config();

// configuration
const app: Express = express();
app.use(cors());
app.use(express.json());
const port = process.env.PORT;

// import all the routes to the app
app.use('/api', routes);


app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
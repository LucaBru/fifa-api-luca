import type { Application, Request, Response } from 'express';

import * as express from 'express';
import mongoose from 'mongoose';

import { playerRouter } from './src/routes/route';

const app: Application = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const port: number = 8080;

console.log();

async function main(): Promise<void> {
  const { DB_CONN_STRING } = process.env;
  if (DB_CONN_STRING === undefined)
    throw new Error('API failed');
  await mongoose.connect(DB_CONN_STRING);
  app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!-1s');
  });

  app.use('/api/player', playerRouter);

  app.listen(port, () => {
    console.log(`Example app listening on port ${port} 🚀`);
  });
}

main().then(() => {
  console.log('Server terminated with no error');
},
).catch((e: Error) => {
  console.error('Server terminated with error', e);
});

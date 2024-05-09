import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router } from './router';
import { errorHandler } from './middlewares/errorHandler';
import { notFoundHandler } from './middlewares/notFoundHandler';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/api', router);
app.use(errorHandler);
app.use(notFoundHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

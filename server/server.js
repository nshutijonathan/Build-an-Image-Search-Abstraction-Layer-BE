import express from 'express';
import router from './routes/routes';
const app = express();
app.use(express.json());
app.use(router);
app.get('/', (req, res) => {
  return res.status(200).send({
    status: 200,
    message: 'Welcome to Image Search Abstraction Layer',
  });
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});

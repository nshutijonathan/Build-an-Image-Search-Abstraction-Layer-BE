import '@babel/polyfill/noConflict';
import express from 'express';
import router from './routes/routes';
import dotenv from 'dotenv';
import path from 'path';
const app = express();
app.use(express.json());
app.use(router);
dotenv.config();
app.get('/', (req, res) => {
  return res.sendFile(path.join(__dirname + '/public/index.html'));
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
export default app;

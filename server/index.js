
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';
import generalRoutes from './routes/general.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
app.use('/api/general', generalRoutes)
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    
  })
  .catch((error) => console.log(`${error} did not connect`));
// import express from "express";
// import bodyParser from "body-parser";
// import mongoose from "mongoose";
// import cors from "cors";
// import dotenv from "dotenv";
// import helmet from "helmet";
// import morgan from "morgan";

// import generalRoutes from "./routes/general.js";
// import kebunRoutes from "./routes/kebun.js";
// import tugasRoutes from "./routes/tugas.js";
// import inventarisRoutes from "./routes/inventaris.js";
// import keuanganRoutes from "./routes/keuangan.js";
// import kelolaRoutes from "./routes/kelola.js";

// import userRoutes from "./routes/user.js";


// /* CONFIGURATION */
// dotenv.config();
// const app = express();
// app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

// // app.get('/api/data', (req, res) => {
// //   const data = { name: 'John Doe', age: 30 };
// //   res.json(data);
// // });

// /* ROUTES */
// app.use("/general", generalRoutes);
// app.use("/kebun", kebunRoutes);
// app.use("/tugas", tugasRoutes);
// app.use("/inventaris", inventarisRoutes);
// app.use("/keuangan", keuanganRoutes);
// app.use("/kelola", kelolaRoutes);

// app.use('/api/user', userRoutes);

/* MONGOOSE SETUP */
// const PORT = process.env.PORT || 9000;
// mongoose
//   .connect(process.env.MONGO_URL)
//   .then(() => {
//     app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

//     /* ONLY ADD DATA ONE TIME */
//     // AffiliateStat.insertMany(dataAffiliateStat);
//     // OverallStat.insertMany(dataOverallStat);
//     // Product.insertMany(dataProduct);
//     // ProductStat.insertMany(dataProductStat);
//     // Transaction.insertMany(dataTransaction);
//     // User.insertMany(dataUser);
//   })
//   .catch((error) => console.log(`${error} did not connect`));

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/user.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);
  })
  .catch((error) => console.log(`${error} did not connect`));
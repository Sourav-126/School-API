import express from "express";
import { schoolRouter } from "./routes/schoolRouter";

const app = express();

app.use(express.json());

app.use("/api/v1", schoolRouter);

app.listen(3000, () => {
  console.log("Backend is live");
});

import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDb } from "./utils/features.js";
import authRouter from "./routes/user-router.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT;

connectDb(mongoURI);

const allowedOrigins = ["https://*", process.env.CLIENT_URL];

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// Route for testing
app.get("/", (req, res) => {
  res.send("Hello world");
});

// Define __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  "/uploads/avatars",
  express.static(path.join(__dirname, "uploads/avatars"))
);

app.use("/api/auth", authRouter);

app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});

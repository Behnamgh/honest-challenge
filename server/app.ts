import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import geoRoutes from "./routes/geo";

const app = express();
const publicFolderPath = path.join(__dirname, "../public");
const clientPath = path.join(__dirname, "../client/build");

app.set("port", process.env.PORT || 3000);
app.use(
  bodyParser.json({
    limit: "5mb",
  }),
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.static(publicFolderPath, { maxAge: 31557600000 }));
app.use(express.static(clientPath));

app.use("/geo", geoRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/../client/build/index.html"));
});

export default app;

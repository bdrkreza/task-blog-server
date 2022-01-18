const express = require("express");
const cors = require("cors");

const connectMongoDB = require("./src/config/database");
const { handlerError, notFound } = require("./src/utils/errorHandler");

require("dotenv").config();

app = express();

const middleware = [
  express.json(),
  express.urlencoded({ limit: "30mb", extended: true }),
  cors(),
]

//server middleware use
app.use(middleware);


const start = async () => {
  //database connect 
  await connectMongoDB();



  app.get("/", (req, res) => {
    res.json({message:"server is running"})
  })

//Error handler route
  app.use(notFound);

  //Error handler
  app.use((error, req, res, next) => {
    handlerError(error, res)
  });
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    // tslint:disable-next-line:no-console
    console.log(`api is ready on http://localhost:${PORT}`);
  });


}

start();
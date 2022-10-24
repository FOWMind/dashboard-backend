if (process.env.NODE_ENV !== "production") require("dotenv").config();
require("./database/connection");
require("./cloudinary/config");
const cors = require("cors");
const express = require("express");

// User controllers
const RegisterUserController = require("./controller/RegisterUser.Controller");
const LoginUserController = require("./controller/LoginUser.Controller");

// Work controllers
const GetWorksController = require("./controller/GetWorks.Controller");
const GetSingleWorkBySlugController = require("./controller/GetSingleWorkBySlug.Controller");
const GetSingleWorkByIdController = require("./controller/GetSingleWorkById.Controller");
const CreateWorkController = require("./controller/CreateWork.Controller");
const EditWorkController = require("./controller/EditWork.Controller");
const DeleteWorkController = require("./controller/DeleteWork.Controller");

// Middlewares
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// User routes
app.post("/register", RegisterUserController);
app.post("/login", LoginUserController);

// Works CRUD routes
app.get("/api/works", GetWorksController);
app.post("/api/works", CreateWorkController);

app.put("/api/work/:id", EditWorkController);
app.delete("/api/work/:id", DeleteWorkController);
app.get("/api/work/id/:id", GetSingleWorkByIdController);
app.get("/api/work/:slug", GetSingleWorkBySlugController);

// Handlers Middlewares
app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

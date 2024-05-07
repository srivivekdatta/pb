import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import connectDB from "./config/database.js";
import BudgetRoute from "./routes/BudgetRoute.js";
import UserRoute from "./routes/UserRoute.js";
import expenseRoute from "./routes/ExpenseRoute.js";
import incomeRoute from "./routes/IncomeRoute.js";
import BudgetsRoute from "./routes/BudgetsRoute.js";

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    console.log("Welcome to the server");
    res.send("Welcome to the server");
});

// Connect to the database
connectDB();

// Mount the routes
app.use("/budget", BudgetRoute);
app.use("/user", UserRoute);
app.use("/expenses", expenseRoute);
app.use("/income", incomeRoute);
app.use("/budgets", BudgetsRoute);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
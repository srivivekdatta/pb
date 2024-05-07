import IncomeModel from "../models/income.js";
import express, { json } from "express";
const ierouter = express.Router();


ierouter.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const income = await IncomeModel.find({ user: userId });

    const totalAmount = income.reduce((total, currentIncome) => total + currentIncome.Amount, 0);

    res.send({totalAmount });
});

ierouter.get("/", async (req, res) => {
    const budget = await IncomeModel.find();
    res.send(budget);
});

ierouter.get("/view/:userId", async (req, res) => {
    const userId = req.params.userId;
    const income = await IncomeModel.find({ user: userId });

    res.send({income });
});



ierouter.post("/add", async (req, res) => {
    const income = new IncomeModel(req.body);

    try {
        await income.save();
        res.send(income);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default ierouter;
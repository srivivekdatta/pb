import BudgetsModel from "../models/budget.js";
import express, { json } from "express";
const router = express.Router();

router.get("/:userId", async (req, res) => {
    const userId = req.params.userId;
    const budgets = await BudgetsModel.find({ user: userId });
    res.send(budgets);
});

router.get("/total/:userId", async (req, res) => {
    const userId = req.params.userId;
    const budgets = await BudgetsModel.find({ user: userId });

    const totalAmount = budgets.reduce((total, budget) => total + budget.amount, 0);

    res.json({ totalAmount });
});

router.post("/add", async (req, res) => {
    const budget = new BudgetsModel(req.body);

    try {
        await budget.save();
        res.send(budget);
    } catch (error) {
        res.status(400).send(error);
    }
});

export default router;
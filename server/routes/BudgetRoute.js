import BudgetModel from "../models/budget.js";
import express, { json } from "express";
const router = express.Router();


router.get("/", async (req, res) => {
    const budget = await BudgetModel.find();
    res.send(budget);
});

router.post("/add", async (req, res) => {
    const budget = new BudgetModel(req.body);

    try {
        await budget.save();
        res.send(budget);
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get("/total/:userId", async (req, res) => {
    const userId = req.params.userId;
    const budgets = await BudgetModel.find({ user: userId });

    const totalAmount = budgets.reduce((total, budget) => total + budget.budget, 0);

    res.json({ totalAmount });
});
export default router;
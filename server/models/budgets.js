import mongoose from "mongoose";

const BudgetSchemas = new mongoose.Schema(
    {
        Description: { type: String, required: true },
        Category: { type: String, required: true },
        Amount: {type: Number, required: true },
        Date: { type: Date, required: true, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { collection: "budgets" }
);

const BudgetsModel = mongoose.model("Budgets", BudgetSchemas);
export default BudgetsModel;
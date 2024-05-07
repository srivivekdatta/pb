import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        budget: { type: Number, required: true },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    },
    { collection: "budgetData" }
);

const BudgetModel = mongoose.model("Budget", BudgetSchema);
export default BudgetModel;
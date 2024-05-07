import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema(
    {
        Description: { type: String, required: true },
        Category: { type: String, required: true },
        Amount: {type: Number, required: true },
        Date: { type: Date, required: true, default: Date.now },
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    { collection: "expense" }
);

const ExpenseModel = mongoose.model("Expense", ExpenseSchema);
export default ExpenseModel;
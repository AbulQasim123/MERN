import { useState, useEffect } from "react";
import ExpenseForm from "./ExpenseForm";
import ExpenseList from "./ExpenseList";

function ExpenseTracker() {
    const [expenses, setExpenses] = useState(() => {
        const saved = localStorage.getItem('expenses');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }, [expenses]);

    const addExpense = (expense) => {
        setExpenses((prev) => [...prev, expense]);
    }

    const deleteExpense = (id) => {
        setExpenses((prev) => prev.filter((item) => item.id != id));
    }

    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3">💰 Expense Tracker</h4>
            <ExpenseForm onAddExpense={addExpense} />
            <h6 className="total mb-4">Total Expense: ₹{totalExpenses.toFixed(2)}</h6>
            <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>
    );
}
export default ExpenseTracker
import { useState, useRef } from "react"

function ExpenseForm({ onAddExpense }) {
    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [loading, setLoading] = useState(false);
    const titleRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !amount) return alert("Please fill both fields");
        setLoading(true);

        setTimeout(() => {
            const newExpenses = {
                id: Date.now(),
                title,
                amount: parseFloat(amount)
            }



            onAddExpense(newExpenses);
            setTitle("");
            setAmount("");
            titleRef.current.focus();
            setLoading(false);
        }, 600);
    }
    return (
        <form className="expense-form" onSubmit={handleSubmit}>
            <input type="text" name="title" id="amount" placeholder="Enter Title" value={title} className="form-control mb-2" onChange={(e) => setTitle(e.target.value)} ref={titleRef} />
            <input type="text" name="amount" id="amount" placeholder="Enter Amount" value={amount} className="form-control mb-2" onChange={(e) => setAmount(e.target.value)} />
            
            <button className="btn btn-primary btn-sm" disabled={loading}>
                {loading ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-1"></span>
                        Adding...
                    </>
                ) : (
                    "Add Expense"
                )}
            </button>
        </form>
    )
}

export default ExpenseForm 
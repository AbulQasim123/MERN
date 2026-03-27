function ExpenseItem({ expense, onDelete }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <span>{expense.title}</span>
      <span className="fw-bold">₹{expense.amount}</span>
      <button
        className="btn btn-danger btn-sm"
        onClick={() => onDelete(expense.id)}
      >
        Delete
      </button>
    </li>
  );
}

export default ExpenseItem;

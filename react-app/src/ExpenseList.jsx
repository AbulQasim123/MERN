import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return (
      <ul className="list-group">
        <li className="list-group-item text-center text-secondary">
          Expense List is empty
        </li>
      </ul>
    );
  }

  return (
    <ul className="list-group">
      {expenses.map((expense) => (
        <ExpenseItem
          key={expense.id}
          expense={expense}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default ExpenseList;

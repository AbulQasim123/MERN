import { useState, useEffect } from "react";

function ToDoLocalStorage() {
    const [newTodo, setNewTodo] = useState("");

    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    // Save todos to localStorage on change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            setTodos([...todos, { text: newTodo.trim(), completed: false }]);
            setNewTodo("");
        }
    };

    const handleToggle = (index) => {
        const updated = [...todos];
        updated[index].completed = !updated[index].completed;
        setTodos(updated);
    };

    const handleDelete = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    return (
        <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "500px", background: "#fff", border: "1px solid black" }}>
            <h4 className="text-center mb-3"> Todo App Using LocalStorage</h4>

            <form onSubmit={handleSubmit} className="input-group mb-3">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    className="form-control"
                    placeholder="Add a new task..."
                />
                <button className="btn btn-primary" type="submit">Add</button>
            </form>

            <ul className="list-group">
                {todos.length === 0 && (
                    <li className="list-group-item text-center text-secondary">
                        No tasks added yet 
                    </li>
                )}

                {todos.map((todo, index) => (
                    <li
                        key={index}
                        className="list-group-item d-flex justify-content-between align-items-center"
                    >
                        <div
                            style={{
                                textDecoration: todo.completed ? "line-through" : "none",
                                cursor: "pointer"
                            }}
                            onClick={() => handleToggle(index)}
                        >
                            {todo.text}
                        </div>

                        <button
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => handleDelete(index)}
                        >
                            ✂
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ToDoLocalStorage;

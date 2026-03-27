import { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
    }, []);

    return (
        <div>
            <h2 className="mb-3 text-center">Users List</h2>

            <table className="table table-bordered table-striped">
                <TableHeader />
                <TableBody usersData={users} />
            </table>
        </div>
    );
}

export default Users;

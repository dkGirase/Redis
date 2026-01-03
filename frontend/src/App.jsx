import { useEffect, useState } from "react";
import { api } from "./api";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  // Load users
  const loadUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data.data);
    } catch (err) {
      console.error("Frontend error:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Add user
  const addUser = async () => {
    if (!name || !email || !age) return alert("Fill all fields");

    try {
      await api.post("/users", { name, email, age: Number(age) });
      setName("");
      setEmail("");
      setAge("");
      loadUsers(); // refresh list
    } catch (err) {
      console.error("Add user error:", err.response?.data || err.message);
    }
  };

  // Delete user
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      loadUsers();
    } catch (err) {
      console.error("Delete user error:", err.response?.data || err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Users</h2>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Age"
          value={age}
          type="number"
          onChange={(e) => setAge(e.target.value)}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      <div>
        {users.map((u) => (
          <div key={u.id} style={{ marginBottom: "5px" }}>
            {u.name} - {u.email} - {u.age}{" "}
            <button onClick={() => deleteUser(u.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

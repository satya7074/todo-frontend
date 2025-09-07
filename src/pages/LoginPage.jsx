import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // 👈 import your hook

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuth } = useAuth();  // 👈 correct way to get setAuth from context

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const { login } = useAuth();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", {
      username: form.username,
      password: form.password,
    });

    console.log("saving in localstorage token: " + res.data.token);

    // Save token in both context + localStorage
    login({ username: form.username, token: res.data.token });

    navigate("/tasks");
  } catch (err) {
    alert("Login failed!");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

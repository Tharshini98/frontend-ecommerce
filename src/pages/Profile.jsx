import React, { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const { token, user, login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "" });
  const [success, setSuccess] = useState("");

  useEffect(() => {
    setForm({ name: user.name, email: user.email });
  }, [user]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put("/users/profile", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      login(res.data, token); // Update local user
      setSuccess("Profile updated!");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white mt-6 shadow rounded">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      {success && <p className="text-green-600 mb-2">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default Profile;

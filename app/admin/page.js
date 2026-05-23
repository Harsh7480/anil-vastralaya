"use client";

import { useState } from "react";

export default function AdminPage() {
  const [form, setForm] = useState({
    name: "",
    review: "",
    rating: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form); // for now just check data
    alert("Form Submitted!");

    setForm({
      name: "",
      review: "",
      rating: "",
    });
  };

  return (
    <section className="min-h-screen bg-[#FFF8E7] flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white p-8 rounded-2xl shadow-lg">

        {/* Heading */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Admin Panel - Add Testimonial
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />

          {/* Review */}
          <textarea
            name="review"
            placeholder="Customer Review"
            value={form.review}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            rows={4}
            required
          />

          {/* Rating */}
          <input
            type="number"
            name="rating"
            placeholder="Rating (1 to 5)"
            value={form.rating}
            onChange={handleChange}
            min="1"
            max="5"
            className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-black"
            required
          />

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition"
          >
            Add Testimonial
          </button>
        </form>
      </div>
    </section>
  );
}
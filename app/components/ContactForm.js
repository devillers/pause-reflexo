//app/api/contact/page.js

"use client";
import { useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";

import Link from "next/link";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  
    if (res.ok) {
      setStatus("Message envoyé");
      setFormData({
        name: "",
        surname: "",
        email: "",
        message: "",
      });
  
      setTimeout(() => setStatus(null), 5000); // Réinitialise le message après 5s
    } else {
      setStatus("Oups !! erreur.");
      setTimeout(() => setStatus(null), 5000);
    }
  };
  

  return (
    <div className="max-w-5xl mx-auto relative grid grid-cols-1 md:grid-cols-2 gap-4 py-6 p-4">
      <section className="mb-4 sm:max-w-md">
        <h1 className="uppercase text-2xl font-thin text-[#009992] mb-4">
          Contactez moi
        </h1>
        <p className="text-sm font-thin text-justify leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin quis
          augue commodo, faucibus massa eu, iaculis urna. Proin et quam at est
          feugiat ultricies. Pellentesque commodo, velit non fermentum
          condimentum, lacus felis varius mi, et pharetra quam sapien eget
          lectus.
        </p>
        <br/>
        <Link
          href="https://www.crenolibre.fr/moteur/124911_durindel-cecile"
          target="_blank"
          rel="noopener noreferrer"
          className="relative font-thin"
        >
          Ou prenez
          <span className=" text-[#009992]  cursor-pointer"> rendez-vous </span>
          sur crenolibre.fr
        </Link>

        <div className="flex gap-4 mt-6">
          {/* Téléphone */}
          <a
            href="tel:+33612345678"
            className="inline-flex items-center justify-center w-9 h-9 border border-[#009992] text-[#009992] rounded-full hover:bg-[#009992] hover:text-white transition"
            aria-label="Téléphone"
          >
            <FiPhone size={18} />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 bg-[#1877f2] text-white rounded-full hover:bg-[#145dbf] transition"
            aria-label="Facebook"
          >
            <FaFacebookF size={16} />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white rounded-full hover:opacity-90 transition"
            aria-label="Instagram"
          >
            <FaInstagram size={16} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/tonprofil"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center w-9 h-9 bg-[#0077b5] text-white rounded-full hover:bg-[#005582] transition"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn size={16} />
          </a>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 text-[12px] font-light leading-6"
      >
        <div className="flex gap-2">
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Prénom"
            className="w-full border-0 border-b border-gray-400 bg-transparent rounded-none p-2 focus:outline-none focus:border-teal-600"
            required
          />
          <input
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Nom"
            className="w-full border-0 border-b border-gray-400 bg-transparent rounded-none p-2 focus:outline-none focus:border-teal-600"
            required
          />
        </div>

        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Votre email"
          type="email"
          className="w-full border-0 border-b border-gray-400 bg-transparent rounded-none p-2 focus:outline-none focus:border-teal-600"
          required
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Votre message"
          rows={7}
          className="w-full border-0 border-b border-gray-400 bg-transparent rounded-none p-2 focus:outline-none focus:border-teal-600"
          required
        />

        <button
          type="submit"
          className="bg-[#009992] text-white px-4 py-2 rounded uppercase hover:bg-[#007f7f] transition"
        >
          envoyer
        </button>
      </form>

      {status && (
        <p className="mt-4 text-sm text-[#009992] uppercase col-span-2">
          {status}
        </p>
      )}
    </div>
  );
}

'use client';

import { useState } from 'react';
import { GoChevronDown } from 'react-icons/go';
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import HeroHeaderContact from '../components/HeroHeaderCcontact';

export default function Example() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    country: 'FR',
    phoneNumber: '',
    message: '',
    agreed: false,
  });
  // status = { type: 'success' | 'error' | 'loading', message: string }
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: 'Envoi en cours…' });

    try {
      const res = await fetch('/api/sendMail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          message: `
            Company: ${form.company}
            Country: ${form.country}
            Phone: ${form.phoneNumber}
            Message: ${form.message}
            Agreed privacy policy: ${form.agreed}
          `,
        }),
      });

      if (res.ok) {
        setStatus({ type: 'success', message: 'Message envoyé avec succès !' });
        setForm({
          firstName: '',
          lastName: '',
          company: '',
          email: '',
          country: 'FR',
          phoneNumber: '',
          message: '',
          agreed: false,
        });
      } else {
        const { error } = await res.json();
        setStatus({ type: 'error', message: `Erreur : ${error || 'échec de l’envoi'}` });
      }
    } catch (err) {
      setStatus({ type: 'error', message: `Erreur réseau : ${err.message}` });
    }
  };

  return (
    <main className="relative">
      <HeroHeaderContact />
      <section className="max-w-5xl mx-auto">
        <div className="container px-4 py-8">
          <ul>
            <li>
              <h3 className="text-5xl sm:text-5xl uppercase font-thin">Contactez moi</h3>
            </li>
            <li>
              <h2 className="text-xl sm:text-4xl my-4 uppercase font-thin">
                Prenez rendez-vous en ligne
              </h2>
            </li>
            <li>
              <h4 className="my-4 text-md sm:text-3xl uppercase font-thin">
                Offrez-vous un moment de détente
              </h4>
            </li>
          </ul>
        </div>
      </section>

      <section className="px-4">
        <form
          onSubmit={handleSubmit}
          className="mx-auto max-w-xl mt-10 mb-10 space-y-6"
        >
          {/* First & Last Name */}
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {[
              { id: 'firstName', label: 'Nom', auto: 'given-name' },
              { id: 'lastName', label: 'Prénom', auto: 'family-name' },
            ].map(({ id, label, auto }) => (
              <div key={id}>
                <label htmlFor={id} className="block text-sm font-thin text-gray-900">
                  {label}
                </label>
                <div className="mt-2.5">
                  <input
                    id={id}
                    name={id}
                    type="text"
                    autoComplete={auto}
                    value={form[id]}
                    onChange={handleChange}
                    className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:outline-gray-600"
                    required
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Company */}
          <div>
            <label htmlFor="company" className="block text-sm font-thin text-gray-900">
              Entreprise
            </label>
            <div className="mt-2.5">
              <input
                id="company"
                name="company"
                type="text"
                autoComplete="organization"
                value={form.company}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:outline-gray-600"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-thin text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:outline-gray-600"
                required
              />
            </div>
          </div>

          {/* Phone + Country */}
          <div>
            <label htmlFor="phone-country" className="block text-sm font-thin text-gray-900">
              Téléphone
            </label>
            <div className="mt-2.5 flex rounded-md bg-white outline-1 outline-gray-300 focus-within:outline-1 focus-within:outline-gray-600">
              <div className="relative">
                <select
                  id="country"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="appearance-none rounded-l-md py-2 pl-3 pr-8 text-base text-gray-500 focus:outline-none"
                  aria-label="Country"
                >
                  <option>FR</option>
                  <option>UK</option>
                  <option>BE</option>
                </select>
                <GoChevronDown
                  className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                  size={20}
                />
              </div>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="text"
                placeholder="06 07 89 78 88"
                value={form.phoneNumber}
                onChange={handleChange}
                className="flex-1 rounded-r-md px-3 py-2 text-base text-gray-900 outline-none"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-thin text-gray-900">
              Message
            </label>
            <div className="mt-2.5">
              <textarea
                id="message"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-1 focus:outline-gray-600"
              />
            </div>
          </div>

          {/* Agree checkbox */}
          <div className="flex items-center gap-x-3">
            <input
              id="agreed"
              name="agreed"
              type="checkbox"
              checked={form.agreed}
              onChange={handleChange}
              className="h-5 w-5 rounded border-gray-300 accent-[#009992] focus:ring-[#009992] disabled:opacity-50"
              required
            />
            <label htmlFor="agreed" className="text-sm text-gray-600">
              En sélectionnant ceci, vous acceptez notre <a href="#" className="font-thin text-[#009992]">privacy policy</a>.
            </label>
          </div>

          {/* Submit button */}
          <div>
            <button
              type="submit"
              disabled={!form.agreed || status.type === 'loading'}
              className="w-full rounded-md bg-[#009992] px-3.5 py-2.5 text-center text-sm font-thin text-white shadow hover:bg-[#008b7f] disabled:opacity-50"
            >
              {status.type === 'loading' ? 'Envoi…' : 'Contactez-moi'}
            </button>
          </div>

          {/* Alert */}
          {status.message && status.type !== 'loading' && (
            <div
              className={
                `mt-6 flex items-center gap-2 rounded-md px-4 py-3 ` +
                (status.type === 'success'
                  ? 'bg-green-50 border border-green-400 text-green-800'
                  : 'bg-red-50 border border-red-400 text-red-800')
              }
              role="alert"
            >
              {status.type === 'success' ? (
                <FiCheckCircle size={20} />
              ) : (
                <FiAlertCircle size={20} />
              )}
              <span className="text-sm">{status.message}</span>
            </div>
          )}
        </form>
      </section>
    </main>
  );
}
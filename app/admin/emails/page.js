'use client';

import { useEffect, useState } from 'react';
import { FiX } from 'react-icons/fi';

export default function AdminEmailsPage() {
  const [msgs, setMsgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showViewModal, setShowViewModal] = useState(false);
  const [viewMsg, setViewMsg] = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch('/api/messages');
        if (!res.ok) throw new Error(`Erreur ${res.status}`);
        const data = await res.json();
        setMsgs(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchMessages();
  }, []);

  const handleView = (msg) => {
    setViewMsg(msg);
    setShowViewModal(true);
  };

  const closeView = () => {
    setShowViewModal(false);
    setViewMsg(null);
  };

  const askDelete = (id) => setConfirmId(id);
  const cancelDelete = () => setConfirmId(null);

  const confirmDelete = async () => {
    setMsgs(msgs.filter((m) => m._id !== confirmId));
    try {
      await fetch(`/api/messages/${confirmId}`, { method: 'DELETE' });
    } catch (err) {
      console.error('Delete error:', err);
    }
    setConfirmId(null);
  };

  if (loading) return <main className="p-8">Chargement...</main>;
  if (error) return <main className="p-8 text-red-600">Erreur : {error}</main>;

  return (
    <main className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center mb-6">
        <div className="sm:flex-auto">
          <h1 className="text-3xl font-thin text-gray-900">Messages</h1>
          <p className="mt-2 text-sm text-gray-500">
            Liste de tous les messages reçus via le formulaire de contact.
          </p>
        </div>
      </div>

      {/* Grid for mobile, sm, md */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:hidden">
        {msgs.map((m) => (
          <div key={m._id} className="bg-white p-4 shadow rounded-lg flex flex-col justify-between">
            <div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{new Date(m.sentAt).toLocaleDateString()}</span>
                <span>{new Date(m.sentAt).toLocaleTimeString()}</span>
              </div>
              <div className="mt-2 text-sm text-gray-900 font-medium">{m.name}</div>
              <div className="mt-1 text-sm text-gray-500">{m.email}</div>
              <div className="mt-2 text-sm text-gray-700">
                {m.message.length > 100 ? m.message.slice(0, 100) + '…' : m.message}
              </div>
            </div>
            <div className="mt-4 flex gap-4 justify-center">
              <button
                onClick={() => handleView(m)}
                className="w-20 inline-flex items-center justify-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-700/10"
              >
                Voir
              </button>
              <button
                onClick={() => askDelete(m._id)}
                className="w-20 inline-flex items-center justify-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-700/10"
              >
                Effacer
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop: Table visible from lg */}
      <div className="hidden lg:block mt-8 ">
        <div className="-my-2 overflow-x-auto">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    {['Date','Nom','Email','Message','Actions'].map((h) => (
                      <th
                        key={h}
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-light text-gray-900"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {msgs.map((m) => (
                    <tr key={m._id}>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(m.sentAt).toLocaleString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                        {m.name}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {m.email}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {m.message.length > 80 ? m.message.slice(0, 80) + '…' : m.message}
                      </td>
                      <td className="px-3 py-4 text-sm text-center flex gap-4 justify-center">
                        <button
                          onClick={() => handleView(m)}
                          className="w-20 inline-flex items-center justify-center rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-700/10"
                        >
                          Voir
                        </button>
                        <button
                          onClick={() => askDelete(m._id)}
                          className="w-20 inline-flex items-center justify-center rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-red-700/10"
                        >
                          Effacer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* View Modal */}
      {showViewModal && viewMsg && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
          onClick={closeView}
        >
          <div
            className="relative bg-white rounded-lg shadow-lg max-w-lg w-full p-6 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeView}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FiX size={20} />
            </button>
            <h2 className="text-xl uppercase font-thin">Message complet</h2>
          
            <div className="mt-4 whitespace-pre-wrap text-sm text-gray-800">
              {viewMsg.message}
            </div>
         
          </div>
        </div>
      )}

      {/* Confirm Delete Modal */}
      {confirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/25"
          onClick={cancelDelete}
        >
          <div
            className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold mb-4">Confirmer la suppression</h2>
            <p className="mb-6 text-sm text-gray-600">
              Voulez-vous vraiment supprimer ce message ?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                Annuler
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-500"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

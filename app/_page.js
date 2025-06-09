'use client';
import { useEffect } from 'react';

export default function MaintenancePage() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = 'https://www.crenolibre.fr/prendre-rdv/124911_durindel-cecile';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Site en maintenance</h1>
      <p className="text-2xl font-thin text-gray-600">Vous allez être redirigé dans quelques secondes...</p>
    </div>
  );
}

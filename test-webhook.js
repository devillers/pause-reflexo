// test-webhook.js

import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000'; // ou ton URL Vercel
const slug = 'yoga_aux_choseaux'; // remplace par un slug réel existant en DB

const payload = {
  slug,
  nbPlaces: 2,
  email: 'test@example.com',
  nom: 'Jean',
  prenom: 'Dupont',
};

async function runTest() {
  try {
    const res = await fetch(`${BASE_URL}/api/paiement/stripe-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    console.log('✅ Session créée :', data.url);

    if (data.url) {
      console.log('🧪 Ouvre ce lien pour tester le paiement :', data.url);
    } else {
      console.error('❌ Erreur :', data);
    }
  } catch (err) {
    console.error('💥 Échec création session :', err.message);
  }
}

runTest();

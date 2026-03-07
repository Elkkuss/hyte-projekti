import '../css/style.css';
import '../css/diary-card.css';

import {getEntries} from './entries.js';


// Etsii get_entries napin
const getEntriesBtn = document.querySelector('.get_entries');
getEntriesBtn.addEventListener('click', getEntries);


// avaa ja sulkee formin
document.getElementById("open-entry-form").addEventListener("click", () => {
  const form = document.getElementById("entry-form-container");
  form.style.display = form.style.display === "none" ? "block" : "none";
});

// Lähettää uuden merkinnän backendille
document.getElementById("new-entry-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  // kerää formin tiedot
  const data = {
    entry_date: document.getElementById("entry-date").value,
    mood: document.getElementById("entry-mood").value,
    weight: Number(document.getElementById("entry-weight").value),
    sleep_hours: Number(document.getElementById("entry-sleep").value),
    notes: document.getElementById("entry-notes").value
  };

  const token = localStorage.getItem("token");

  // POST-pyyntö backendille
  const response = await fetch("http://localhost:3000/api/entries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (response.ok) {
    alert("Merkintä lisätty!");

    // Tyhjennä formi
    e.target.reset();

    // Piilota formi
    document.getElementById("entry-form-container").classList.add("hidden");

  } else {
    const errorText = await response.text();
    console.log("Backend error:", errorText);
    alert("Virhe lisättäessä merkintää.");
  }
});


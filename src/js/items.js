// import { createElement } from "react";
import {fetchData} from "./fetch.js";

// Render Item in a List in the UI
const renderFruitList = (items) => {

  console.log('Teen kohta listan');
  // haetaan fruitlist UL
  // ja lisätään loopissa kaikki yksittäiset hedelmät listaan
  const list = document.querySelector('.fruitlist');
  list.innerHTML = '';

  items.forEach((item) => {
    console.log(item.name);
    let li = document.createElement('li');
    li.textContent = `Hedelmän id ${item.id} ja nimi ${item.name}`;
    list.appendChild(li);
  });


};



// GET items
// ensinmäinen oma kutsu backend puolelle
const getItems = async () => {

  const items = await fetchData('http://localhost:3000/api/items');

  // jos BE puolelta tulee virhe niin
  // informoidaan joko consoleen tai käyttäjälle virheestä
  if (items.error) {
    console.log(items.error);
    return;
}

// tai jatketaan ja tehdään datalla jotain
// items.forEach((item) => {
//  console.log(item.name);
// });

renderFruitList(items);
};

// getitembyid
const getItemById = async (event) => {
  console.log('Haetaan IDn avulla')

  event.preventDefault();

  // const idInput = document.getElementById('itemId');
  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  const url = `http://localhost:3000/api/items/${itemId}`;

  const options = {
    method: 'GET'
  };

  const items = await fetchData(url, options);

  // jos BE puolelta tulee virhe niin
  // informoidaan joko consoleen tai käyttäjälle virheestä

  if (items.error) {
    console.log(items.error);
    return;
}

// 1. kehittäjälle virheet ja onnistumiset
console.log(items)
// 2. käyttäjälle tieto näkyviin ja mahdolliset virheet näkyviin
alert(`Item found :) ${items.name}`);
};

// DeleteItemById
const deleteItemById = async (event) => {
  console.log('Deletoidaan IDn avulla');

  const idInput = document.querySelector('#itemId');
  const itemId = idInput.value;
  console.log(itemId);

  // Muista tarkastaa että käyttäjä lähettää oikean datan
  if(!itemId) {
    console.log('Item ID missing!!')
    return;
  }

  const confirmed = confirm(
    `Oletko varma että haluat poistaa itemin: ${itemId}`
  );
  if (!confirmed) return;

  const url = `http://localhost:3000/api/items/${itemId}`;

  const options = {
    method: 'DELETE'
  };

  const items = await fetchData(url, options);

  if (items.error) {
    console.log(items.error);
    return;
}

// 1. kehittäjälle virheet ja onnistumiset
console.log(items)
// 2. käyttäjälle tieto näkyviin ja mahdolliset virheet näkyviin
alert(items.message);

// päivitä ui niin käyttäjä tietää että hedelmä poistui
await getItems();

};

// POST item
const addItem = async (event) => {
  event.preventDefault();

  const form = document.querySelector('add-item-form');
  const fruitName = document.querySelector('#newItemName').value.trim();
  const fruitWeight = document.querySelector('#newItemWeight').value.trim();

  if (!fruitName) {
    alert('Nimi puuttuu!!')
    return;
  }

  const url = `http://localhost:3000/api/items`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: fruitName,
      weight: fruitWeight,
    }),
  };

  const items = await fetchData(url, options);

  if (items.error) {
    console.log(items.error);
    return;
}

await getItems();
console.log(items);
};



export {getItems, getItemById, deleteItemById, addItem};

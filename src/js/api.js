import '../css/api.css';
import {getItems, getItemById, deleteItemById, addItem} from './items.js';

console.log('Scripti aukeaa');

// sync ja async demo
  function synchronousFunction() {
      let number = 1;
      for(let i = 1; i < 100000; i++){
        number += i;
        console.log('synchronousFunction running');
      }
      console.log('regular function complete', number);
    }

    // synchronousFunction();

    console.log('1');
    console.log('2');
    console.log('3');

    // async suoritus
    console.log('1');
    setTimeout(() => {
      console.log('2');
    }, 2000);

    console.log('3');

    // GET haku ulkoiseen rajapintaan
    // tämä on fetch käyttäen promisea
    // ja on asycnkroninen
fetch('https://api.restful-api.dev/objects')
	.then((response) => {
    console.log(response);
		if (!response.ok) {
			throw new Error('Verkkovastaus ei ollut kunnossa');
		}
		return response.json();
	})
	.then((data) => {
		console.log(data);
	})
	.catch((error) => {
		console.error('Fetch-operaatiossa ilmeni ongelma:', error);
	});

  // yksinkertaistetaan ja modernisoidaan haku
  // käytetään async ja await avainsanaa
  async function getData() {
	try {
		const response = await fetch('https://api.restful-api.dev/objects');
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.error('Virhe:', error);
	}
}

getData();


// ensinmäinen oma kutsu backend puolelle
// const consoleLogItems = async () => {
//  try {
    // default on GET kutsu ilman optioita
//		const response = await fetch('http://localhost:3000/api/items');
//		const data = await response.json();
//    console.log('Haetaan omasta rajapinnasta')
//		console.log(data);
//
//    data.forEach((rivi) => {
//      console.log(rivi);
//      console.log(rivi.name);
//    });
//	} catch (error) {
//		console.error('Virhe:', error);
//	}
// };

// getItems();

// hakekaa nappula
// lisätkää kuuntelija, suorittakaa klikattaessa getItems funktio
const getItemsBtn = document.querySelector('.get_items');
getItemsBtn.addEventListener('click', getItems);

const getForm = document.querySelector('.get-item-form');
getForm.addEventListener('submit', getItemById);

const deleteBtn = document.querySelector('.delete-item');
deleteBtn.addEventListener('click', deleteItemById);

const addItemForm = document.querySelector('.add-item-form');
addItemForm.addEventListener('submit', addItem);



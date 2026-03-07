// importit
import '../css/api.css';
import '../css/forms.css';
import { fetchData } from './fetch.js';

// console.log('Moi luodaan nyt tokeneita ja kirjaudutaan sisään');

// Esimerkin takia haut ovat nyt suoraan tässä tiedostossa, jotta harjoitus ei sekoita
// teidän omaa projektin rakennetta

const registerUser = async (event) => {
	event.preventDefault();

	// Haetaan oikea formi
	const registerForm = document.querySelector('.registerForm');

	// Haetaan formista arvot
	const username = registerForm.querySelector('#username').value.trim();
	const password = registerForm.querySelector('#password').value.trim();
	const email = registerForm.querySelector('#email').value.trim();

	// Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
	const bodyData = {
		username: username,
		password: password,
		email: email,
	};

	// Endpoint
	const url = 'http://localhost:3000/api/users';

	// Options
	const options = {
		body: JSON.stringify(bodyData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	};
	console.log(options);

	// Hae data
	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error adding a new user:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
	}

	console.log(response);
	registerForm.reset(); // tyhjennetään formi
};

const loginUser = async (event) => {
	event.preventDefault();

	// Haetaan oikea formi
	const loginForm = document.querySelector('.logIn');

	// Haetaan formista arvot
	const username = loginForm.querySelector('#logInName').value;
	const password = loginForm.querySelector('#logInPassword').value;

	// Luodaan body lähetystä varten taustapalvelun vaatimaan muotoon
	const bodyData = {
		username: username,
		password: password,
	};

	// Endpoint
	const url = 'http://localhost:3000/api/users/login';

	// Options
	const options = {
		body: JSON.stringify(bodyData),
		method: 'POST',
		headers: {
			'Content-type': 'application/json',
		},
	};
	console.log(options);

	// Hae data
	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error login in:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
		localStorage.setItem('token', response.token);
		localStorage.setItem('name', response.user.username);
		logResponse('loginResponse', `localStorage set with token value: ${response.token}`);
		setTimeout(function () {
		 window.location.href = 'users.html';
		}, 3000);
	}

	console.log(response);
	loginForm.reset(); // tyhjennetään formi
};

const checkUser = async (event) => {
	const url = 'http://localhost:3000/api/users/me';
	let headers = {};
	let token = localStorage.getItem('token');
	console.log(token);
	if (token) {
		headers = { Authorization: `Bearer ${localStorage.token}` };
	}
	const options = {
		headers: headers,
	};

	const response = await fetchData(url, options);

	if (response.error) {
		console.error('Error login in:', response.error);
		return;
	}

	if (response.message) {
		console.log(response.message, 'success');
		logResponse('meResponse', `Authorized user info: ${JSON.stringify(response)}`);
		setTimeout(function () {
			// window.location.href = 'users.html';
		}, 3000);
	}

	console.log(response);
	loginForm.reset(); // tyhjennetään formi
};

// Delete user esimerkki
const deleteUser = async (event) => {
	console.log(evt);
	console.log(evt.target);
	console.log(evt.target.attributes['data-id'].value);
	const id = evt.target.attributes['data-id'].value;
	const url = `http://localhost:3000/api/users/${id}`;
	const options = { method: 'DELETE' };

	const answer = confirm(`Are you sure you want to delete user with ID: ${id}`);
	if (answer) {
		try {
			const response = await fetch(url, options);
			console.log(response);
			getAllUsers();
		} catch (error) {
			console.error(error);
		}
	}
};

function clearLocalStorage() {
	localStorage.removeItem('token');
  localStorage.removeItem('name');
	logResponse('clearResponse', 'localStorage cleared!');
}

function logResponse(codeblock, text) {
	document.getElementById(codeblock).innerText = text;
}

// Rekisteröinti
const registerForm = document.querySelector('.registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', registerUser);
}

// Login
const loginForm = document.querySelector('.logIn');
if (loginForm) {
    loginForm.addEventListener('submit', loginUser);
}

// "Me" request
const meRequest = document.querySelector('#meRequest');
if (meRequest) {
    meRequest.addEventListener('click', checkUser);
}

// Clear localStorage
const clear = document.querySelector('#clearButton');
if (clear) {
    clear.addEventListener('click', clearLocalStorage);
}
// Navin login formissa käytetty apuna tekoälyn koodi esimerkkejä
// Login formi navigaatioon
// Haetaan nav-auth div ja korvataan sen sisältö
// HTML-lomakkeella kun käyttäjä ei ole kirjautunut sisään.
function renderLoginForm() {
  const navAuth = document.getElementById('nav-auth');
  navAuth.innerHTML = `
    <form id="nav-login-form">
      <input type="text" id="nav-username" placeholder="Käyttäjänimi" required>
      <input type="password" id="nav-password" placeholder="Salasana" required>
      <button type="submit">Login</button>
    </form>
  `;

  document.getElementById('nav-login-form').addEventListener('submit', loginUserFromNav);
}

// Tervetuloa teksti navigaatiossa
// Haetaan nimi localStoragesta ja näytetään se navigaatiossa
function renderWelcome() {
  const name = localStorage.getItem('name');
  const navAuth = document.getElementById('nav-auth');

  navAuth.innerHTML = `
    <span>Tervetuloa: <strong>${name}</strong></span>
    <button id="logout-btn">Logout</button>
  `;

  // Logout-nappi
  // Logoutissa poistetaan token ja nimi,
  // piilotetaan päiväkirja linkki ja palautetaan login formi
  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');

    document.getElementById("diary-link").style.display = "none";

    renderLoginForm();
  });
}

async function loginUserFromNav(event) {
  event.preventDefault();

  const username = document.getElementById('nav-username').value.trim();
  const password = document.getElementById('nav-password').value.trim();

  const bodyData = { username, password };

  const url = 'http://localhost:3000/api/users/login';
  const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(bodyData),
  };

  const response = await fetchData(url, options);

  if (response.error) {
    console.error('Login error:', response.error);
    return;
  }

  localStorage.setItem('token', response.token);
  localStorage.setItem('name', response.user.username);

  renderWelcome();

  // Päiväkirja linkki piilossa kunnes käyttäjä sisäänkirjautunut
  const diaryLink = document.getElementById("diary-link");
  if (diaryLink) {
    diaryLink.style.display = "block";
  }

}

window.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('token')) {
    renderWelcome();

    const diaryLink = document.getElementById("diary-link");
    if (diaryLink) diaryLink.style.display = "block";

  } else {
    renderLoginForm();

    const diaryLink = document.getElementById("diary-link");
    if (diaryLink) diaryLink.style.display = "none";
  }
});









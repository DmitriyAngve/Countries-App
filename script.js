'use strict';

const btn = document.querySelector('.btn-country');

const countriesContainer = document.querySelector('.countries');

// const listContainer = function (data) {
//   const list = document.getElementById('list');

//   data.forEach(item => {
//     let li = document.createElement('li');
//     li.innerText = item;
//     list.appendChild(li);
//   });
// };

const renderCountry = function (data, className = '') {
  const name = data.name.common;
  const flag = data.flags.svg;
  const region = data.subregion;
  const capital = data.capital;
  const language = Object.values(data.languages)[0];
  const currency = Object.values(data.currencies)[0].name;
  // const side = data.borders;

  console.log(data);

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flag}" alt="Country" />
    <div class="country__data">
        <h3 class="country__name">${name}</h3>
        <h4 class="country__capital">${capital}</h4>
        <h5 class="country__region">${region}</h5>
        <p class="country__row"><span>👨‍👦‍👦</span>
        ${
          +data.population > 1000000
            ? `${(+data.population / 1000000).toFixed(1)}M people`
            : `${(+data.population / 1000).toFixed(2)}K people`
        }</p>
        <p class="country__row"><span> 🗣️</span>${language}</p>
        <p class="country__row"><span> 💰</span>${currency}</p>
      </div>
      </article>
      <ul class="list"></ul>
  `;

  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  btn.style.opacity = 0;
  btn.style.cursor = 'default';
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const countryName = 'USA';

// Variant 1 (working)
const getCountryData = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(response => response.json())
    .then(data => renderCountry(data[0]));
};
getCountryData(countryName);

const listOfCountries = function (country) {
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(res => {
      return res.json();
    })
    .then(data => {
      data.forEach(data => {
        console.log(data.borders);
        let side = data.borders;
        for (let i = 0; i < side.length; i++) {
          const neighbour = `<li class="list__element"><a href="#" class="list__side">${side[i]}</a></li>`;
          document
            .querySelector('ul')
            .insertAdjacentHTML('beforeend', neighbour);
        }
      });
    });
};
listOfCountries(countryName);

// let listElement = document.querySelector('.list__side');
// console.log(listElement);

// for (let i = 0; i < listElement.length; i++) {
//   listElement[i].addEventListener('click', function (e) {
//     console.log(e.target.innerHTML);
//   });
// }

let listElement = document.createElement('list');
listElement.classList.add('.list__element');

document.body.appendChild(listElement);
console.log(listElement);

btn.addEventListener('click', function () {
  getCountryData(countryName);
});

// Variant 2 (try to accumalate 2 functions in one)
// const listOfCountries = function (data) {
//   console.log(data);
//   // const side = data.altSpellings[1];
//   let side = data.borders;
//   console.log(side);
//   for (let i = 0; i < side.length; i++) {
//     const neighbour = `<li class="list__side">${side[i]}</li>`;
//     document.querySelector('ul').insertAdjacentHTML('beforeend', neighbour);
//   }
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res => res.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const list = data[0].borders;
//       console.log(data[0]);
//       console.log(list);
//       if (!list) return;
//       return list.forEach(code => {
//         fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`)
//           .then(res => res.json())
//           .then(data => listOfCountries(data[0], 'list'));
//       });
//     });
// };
// getCountryData('russia');

// const countryListOfSides = function () {};

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       console.log(neighbour);
//       if (!neighbour) return;
//       return neighbour.forEach(code => {
//         console.log(code);
//         fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`)
//           .then(response => response.json())
//           .then(data => renderCountry(data[0], 'neighbour'))
//           // trying
//           // return neighbour.forEach(code => {
//           //   console.log(code);
//           //   fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`)
//           //     .then(response => response.json())
//           //     .then(data => listContainer(data[0], 'list'))
//           // TRYING
//           .catch(err => {
//             console.error(`${err} 💥💥💥`);
//             renderError(
//               `Something went wrong 💥💥💥 ${err.message}. Try again!`
//             ).finally(() => (countriesContainer.style.opacity = 1));
//           });
//       });
//     });
// };

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders;
//       console.log(neighbour);
//       if (!neighbour) return;
//       return neighbour.forEach(code => {
//         console.log(code);
//         fetch(`https://restcountries.com/v3.1/alpha?codes=${code}`)
//           .then(response => response.json())
//           .then(data => renderCountry(data[0], 'neighbour'))
//           .catch(err => {
//             console.error(`${err} 💥💥💥`);
//             renderError(
//               `Something went wrong 💥💥💥 ${err.message}. Try again!`
//             ).finally(() => (countriesContainer.style.opacity = 1));
//           });
//       });
//     });
// };

btn.addEventListener('click', function () {
  getCountryData('USA');
});

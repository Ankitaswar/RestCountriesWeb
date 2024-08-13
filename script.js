const countriesContainer = document.querySelector(".countries-container");
const filter = document.querySelector('.filter-by-region');
const searchContainer = document.querySelector('.search-container input');
const themeChange = document.querySelector('.theme-change');
console.log(themeChange);

let savedTheme = localStorage.getItem('theme');

if (!savedTheme) {
    savedTheme = 'light';
    localStorage.setItem('theme', savedTheme);
}

document.body.classList.add(savedTheme);
themeChange.innerHTML = savedTheme === 'dark' 
        ? '<i class="fa-regular fa-sun"></i> Light Mode'
        : '<i class="fa-regular fa-moon"></i> Dark Mode';


        themeChange.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        
            let theme;
            if (document.body.classList.contains('dark')) {
                theme = 'dark';
            } else {
                theme = 'light';
            }
        
            // Update the theme in localStorage
            localStorage.setItem('theme', theme);
        
            // Update the button text based on the current theme
            themeChange.innerHTML = theme === 'dark' 
                ? '<i class="fa-regular fa-sun"></i> Light Mode'
                : '<i class="fa-regular fa-moon"></i> Dark Mode';
        });

let AllCountryName;

fetch('https://restcountries.com/v3.1/all')
.then((res)=> res.json())
.then((data)=>{
    renderCountries(data);
    AllCountryName = data;
    renderCountryOptions(data);   
    });

filter.addEventListener('change', (e)=>{
    console.log(e.target.value)
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res)=> res.json())
    .then((data)=>{
        renderCountries(data);
});
})

function renderCountries(data){
    countriesContainer.innerHTML = '';
    data.forEach((country)=> {
        const countryCard = document.createElement("a");
        countryCard.classList.add('country-card');
        countryCard.href = `/country.html?name=${country.name.common}`;
        
        countryCard.innerHTML =`<img src="${country.flags.svg}" alt="${country.name.common}">
                        <div class="card-text">
                            <h3 class="card-title">${country.name.common}</h3>
                            <p class="card-para"><b>Population: </b>${country.population.toLocaleString()}</p>
                            <p class="card-para"><b>Region: </b>${country.region}</p>
                            <p class="card-para"><b>Capital: </b>${country.capital?.[0]}</p>
                        </div>`;
        
        countriesContainer.append(countryCard);
    })
}

searchContainer.addEventListener('input', (e)=>{
    const targetName = AllCountryName.filter(country => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()));
    renderCountries(targetName);
})

function renderCountryOptions(countries) {
    const selectElement = document.getElementById('countrySelect');
    console.log(selectElement);
    
    countries.sort((a, b) => a.name.common.localeCompare(b.name.common));

    countries.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.region.toLowerCase(); 
        option.textContent = country.region;
        selectElement.appendChild(option);

        console.log(selectElement);
    });
}


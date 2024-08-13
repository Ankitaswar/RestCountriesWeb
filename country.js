// fetch param from URL.
const countryName = new URLSearchParams(window.location.search).get('name');
const flagImage = document.querySelector('.country-details img');
const countryHeading = document.querySelector('.country-details h1');
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const domain = document.querySelector(".domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".language");
const borderCountries = document.querySelector('.border-countries')
const title = document.querySelector('.title');
const themeChange = document.querySelector('.theme-change');

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((resp)=>resp.json())
.then(([country])=>{
    flagImage.src = country.flags.svg;
    countryHeading.innerText = country.name.common;
    population.innerText = country.population.toLocaleString()
    region.innerText =country.region;

    domain.innerText = country.tld.join(", ");

    if(country.subregion){
        subRegion.innerHTML = country.subregion;
    }

    if(country.capital){
        capital.innerText = country.capital?.[0];
    }

    if(country.currencies){
    currency.innerText = Object.values(country.currencies).map((currency)=>currency.name).join(', ');
}

    if(country.name.nativeName){
        nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    }else{
        nativeName.innerText= country.name.common;
    }

    if(country.languages){
        language.innerText = Object.values(country.languages).join(", ");
    }

    //Border Country fetching

    if(country.borders){
        country.borders.forEach(border => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then(resp =>resp.json())
            .then(([country]) => {
                const borderCountryTag = document.createElement('a');
                borderCountryTag.innerText = country.name.common;
                borderCountryTag.href = `country.html?name=${country.name.common}`;
                borderCountries.append(borderCountryTag);
            })
        });
    }
});

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
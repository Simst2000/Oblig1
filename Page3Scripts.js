

const sted = [
    { navn: 'Gjøvik', latitude: 60.7957, longitude: 10.6915 },
    { navn: 'Hamar', latitude: 60.7945, longitude: 11.068 },
    { navn: 'Skarnes', latitude: 60.2539, longitude: 11.6849 },
    { navn: 'Hest', latitude: 36.8959, longitude: -92.6813 },
    { navn: 'Obligado', latitude: -27.0555, longitude: -55.6273 },
    { navn: 'Nordkjosbotn', latitude: 69.8, longitude: 21.05}
];

// Henter data fra open-meteo og displayer
function fetchVaer() {
    const vaerContainer = document.getElementById('vaerContainer');
    // tømmer innholdet, så det ikke lages nye elementer ved update.
    vaerContainer.innerHTML = '';

    sted.forEach(sted => {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${sted.latitude}&longitude=${sted.longitude}&current_weather=true`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                const weather = data.current_weather;
                const weatherHTML = `
                    <div class="vaer-boks">
                        <h3>${sted.navn}</h3>
                        <p>Temperatur: ${weather.temperature} °C</p>
                        <p>Vind: ${weather.windspeed} km/t</p>
                        
                    </div>
                `;
                vaerContainer.innerHTML += weatherHTML;
            })
            .catch(error => {
                console.error('Kunne ikke hente værdata', error);
            });
    });
}

// Oppdater værdata hvert minutt
setInterval(fetchVaer, 60000);

// Henter værdata ved innlasting av siden
fetchVaer();
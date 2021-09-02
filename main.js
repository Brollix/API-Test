let api_key = '23e5c3a9a64c8efd5db1881b5e59251b';
let lat, lon;
let periods = [];

let url = `http://127.0.0.1:5500/api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

const tabla = document.getElementById('tabla');

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition((position) => {
		lat = position.coords.latitude;
		lon = position.coords.longitude;

		get_temperature(url);

		async function get_temperature(url) {
			const response = await fetch(url);
			const data = await response.json();

			console.log(lat, lon);

			for (let period of data.list) {
				periods.push(period);
			}
			for (let i = 0; i < periods.length; i++) {
				let div_info = document.createElement('tr');
				div_info.className = 'info';

				let dia = document.createElement('td');
				dia.className = 'dia';
				dia.innerHTML = new Date(periods[i].dt * 1000);

				let temperatura = document.createElement('td');
				temperatura.className = 'temp';
				temperatura.innerHTML = periods[i].main.temp + ' °C';

				div_info.appendChild(dia);
				div_info.appendChild(temperatura);

				tabla.appendChild(div_info);
			}
		}
	});
} else console.error('Location not available');

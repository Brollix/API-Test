let api_key = '23e5c3a9a64c8efd5db1881b5e59251b';
let periods = [];

let lat, lon;

const tabla = document.getElementById('tabla');

if ('geolocation' in navigator) {
	navigator.geolocation.getCurrentPosition(position => {
		lat = position.coords.latitude;
		lon = position.coords.longitude;

		let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api_key}`;

		get_temperature(url);

		const options = {
			weekday: 'long',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		};

		async function get_temperature(url) {
			const response = await fetch(url);
			const data = await response.json();

			console.log(url);

			let locacion = document.getElementById('locacion');

			locacion.innerHTML = 'Locacion: ' + data.city.name

			for (let period of data.list) {
				periods.push(period);
			}
			for (let i = 0; i < periods.length; i++) {
				let date = new Date(periods[i].dt * 1000);

				if (date.getHours() == 12) {
					let div_info = document.createElement('tr');
					div_info.className = 'info';

					let dia = document.createElement('td');
					dia.className = 'dia';
					dia.innerHTML = date.toLocaleDateString('es', options);

					let temperatura = document.createElement('td');
					temperatura.className = 'temp';
					temperatura.innerHTML = periods[i].main.temp + ' °C';

					div_info.appendChild(dia);
					div_info.appendChild(temperatura);

					tabla.appendChild(div_info);
				}
				
			}
		}
	});
} else console.error('Location not available');

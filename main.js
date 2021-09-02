let api_key = '23e5c3a9a64c8efd5db1881b5e59251b';

let city_name = 'Buenos+Aires';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&units=metric&appid=${api_key}`;

let periods = [];

get_temperature(url);

async function get_temperature(url) {
	const response = await fetch(url);
	const data = await response.json();

	for (let period of data.list) {
		periods.push(period);
	}
	for (let i = 0; i < periods.length; i++) {
		console.log(new Date(periods[i].dt * 1000));
		console.log(periods[i].main.temp);
	}
}

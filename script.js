const key = "fe3e0ddb24269ad9aa0bd4304a64b0f9"
async function getData(location) {
	const img= document.querySelector('img')
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${key}&units=metric`
	let response = await fetch(url)
	let data = await response.json()
	
	let cleanData = {
		country: data.sys.country,
		city: data.name,
		weather: data.weather[0].main,
		description: data.weather[0].description,
		temp: data.main.temp,
		feelsLike: data.main.feels_like,
		humidity: data.main.humidity,
		windSpeed: data.wind.speed,
		icon: data.weather[0].icon
	}

	return cleanData
}

document.addEventListener('DOMContentLoaded', () => {
	
	const content = document.querySelector('#content')
	const input = document.querySelector('input')
	const submit = document.querySelector('button')
	const header = document.querySelector('#header')
	const headerText = document.querySelector('#header-text')
	const main = document.querySelector('#main')

	async function displayData(location) {
		const h1 = document.createElement('h1')
		const h3 = document.createElement('h3')
		const h5 = document.createElement('h5')
		const img = document.createElement('img')
		const div = document.createElement('div')
		const div1 = document.createElement('div')
		const div2 = document.createElement('div')
		const div3 = document.createElement('div')
		const p = document.createElement('p')
		const p1 = document.createElement('p')
		const p2 = document.createElement('p')
		
		let data = await getData(location)
		console.log(data)
		h5.innerHTML = data.weather	
		h3.innerHTML = `${data.city}, ${data.country}`
		div.className = 'header-text'
		div.append(h5)
		div.append(h3)
		div1.className = 'header'
		img.setAttribute('src', `http://openweathermap.org/img/wn/${data.icon}@2x.png`)
		div1.append(img)
		div1.append(div)
		content.append(div1)
		div3.className = 'stats'
		p.innerHTML = `Feels like: ${data.feelsLike}<sup>&deg</sup>C`
		p1.innerHTML = `Wind speed: ${data.windSpeed} MPH`
		p2.innerHTML = `Humidity: ${data.humidity}%`
		div3.append(p)
		div3.append(p1)
		div3.append(p2)
			
		h1.innerHTML = `${Math.round(data.temp)}<sup class="big">&degC</sup>`
		div2.setAttribute('id', 'main')
		div2.append(h1)
		div2.append(div3)
		content.append(div2)
	}
	
	displayData('tokyo')

	submit.onclick = () => {
		content.innerHTML = ''
		displayData(input.value)
		input.value = ''
	}

})
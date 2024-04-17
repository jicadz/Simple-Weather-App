const inputText = document.getElementById("location");
const inputLabel = document.getElementById("location-label");
const getLocation = document.getElementById("get-loc-frame");
const getResult = document.getElementById("result-frame");

const apiKey = '85f85ebc07001704aeb33c6ac2d9dad9';

async function getData() {

    try {

        const inputValue = inputText.value;
        const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${apiKey}&units=metric`;

        const response = await fetch(apiURL);

        if(!response.ok) {
            throw new Error("Could not fetch resource");
        }

        const data = await response.json();

        // console.log(data)

        const icon = document.getElementById("icon");
        const temp = document.getElementById("temp");
        const tempDesc = document.getElementById("temp-desc");
        const locDesc = document.getElementById("location-desc");
        const feelsLike = document.getElementById("feels-like");
        const humidity = document.getElementById("humidity");

        icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        temp.innerText = Math.round(data.main.temp)+ " °C";
        tempDesc.innerText = capitalizeWord(data.weather[0].description);
        locDesc.innerText = capitalizeWord(data.name);
        feelsLike.innerText = Math.round(data.main.feels_like) + " °C";
        humidity.innerText = data.main.humidity + " %"

    } catch(error) {
        console.error(error);
    }
}

function capitalizeWord(input) {

    const words = input.split(" ");   // split(separator) - returns an array

    for(let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1); // slice(start index of the word)
    }

    const joinWords = words.join(" "); // join(separator) joins the array with separator

    return joinWords;

}

inputText.addEventListener('keydown', function(event) {

    if(event.key === 'Enter') {
        event.preventDefault();

        if(inputText.value == '') {
            inputLabel.style.color = "red";
            inputLabel.style.fontWeight = "600";
        } else {
            inputLabel.style.color = "black";
            inputLabel.style.fontWeight = "normal";
            getLocation.style.display = "none";
            getResult.style.display = "block";
            getData();
        }
    }
});

function toggle() {
    getLocation.style.display = "block";
    getResult.style.display = "none";
}




function getDeviceLoc() {

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            // console.log(position);

            getLocation.style.display = "none";
            getResult.style.display = "block";
            
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                const icon = document.getElementById("icon");
                const temp = document.getElementById("temp");
                const tempDesc = document.getElementById("temp-desc");
                const locDesc = document.getElementById("location-desc");
                const feelsLike = document.getElementById("feels-like");
                const humidity = document.getElementById("humidity");

                icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
                temp.innerText = Math.round(data.main.temp)+ " °C";
                tempDesc.innerText = capitalizeWord(data.weather[0].description);
                locDesc.innerText = capitalizeWord(data.name);
                feelsLike.innerText = Math.round(data.main.feels_like) + " °C";
                humidity.innerText = data.main.humidity + " %"
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            })
        });
    } else {
        alert("User denied access");
    }
}

// const apiKey = '85f85ebc07001704aeb33c6ac2d9dad9';

// fetch(`https://api.openweathermap.org/data/2.5/weather?q=Iloilo&appid=${apiKey}&units=metric`)
// .then(response => response.json())
// .then(data => {
//     console.log(data);
// })
// .catch(error => {
//     console.error('Error fetching data:', error);
// });
// Retrieve the task list element
const taskList = document.getElementById("taskList");
const randomBg = ["https://cdn.pixabay.com/photo/2023/06/27/10/51/man-8091933_1280.jpg",
"https://cdn.pixabay.com/photo/2023/06/23/19/34/campfire-8084064_1280.jpg",
"https://cdn.pixabay.com/photo/2023/05/12/19/59/maidens-tower-7989254_1280.jpg",
"https://cdn.pixabay.com/photo/2023/07/11/13/28/mountain-8120620_1280.jpg",
"https://cdn.pixabay.com/photo/2023/06/04/16/27/margaret-8040217_1280.jpg",
"https://cdn.pixabay.com/photo/2023/06/21/15/31/harvest-8079596_1280.jpg",
"https://cdn.pixabay.com/photo/2023/04/09/06/18/explosion-7910812_1280.jpg"
]

function setRandomBg(){
    console.log("aaa");
    const body = document.querySelector("body");
    const randNum = Math.floor(Math.random() * randomBg.length);
    body.style.backgroundImage = `url(${randomBg[randNum]})`;
}
function updateClock(){
    const time =new Date();
    const clock = document.querySelector("#clock");
    clock.innerText = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
}
function loadTodolist(){
    const todoStr = localStorage.getItem("todolist");
    if(todoStr){
        const todolist = JSON.parse(todoStr);
        console.log(todolist);
        todolist.forEach(str => {
            addTodolist(str);
        });
    }
}
function loadUsername(){
    const user = localStorage.getItem("username");
    if(user){
        const login = document.querySelector("#login");
        login.classList.add("hidden");
    }
}

function login(){
    const loginText = loginInput.value.trim();
    if (loginText === "") return;
    localStorage.setItem("username", loginText);
    taskInput.value = "";
    loadUsername();
}
const loginInput = document.getElementById("loginInput");
loginInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        login();
    }
});

// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    addTodolist(taskText);
    taskInput.value = "";
}

const todolistArray = []
function addTodolist(str){
    const listItem = document.createElement("li");
    listItem.textContent = str;
    listItem.idx = todolistArray.length;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.onclick = function () {
        todolistArray.splice(listItem.idx, 1);
        listItem.remove();
        localStorage.setItem("todolist", JSON.stringify(todolistArray));
    };

    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    todolistArray.push(str);
    localStorage.setItem("todolist", JSON.stringify(todolistArray));
}

// Event listener for the "Enter" key press
const taskInput = document.getElementById("taskInput");
taskInput.addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

const weatherData = document.getElementById("weatherData");
const geolocationData = document.getElementById("geolocationData");

function getWeatherData(latitude, longitude) {
    const apiKey = "76313a3fdd851ac144c0ca2cf7716fc2";
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            const weatherInfo = `
                <p><strong>도시:</strong> ${data.name}</p>
                <p><strong>기온:</strong> ${data.main.temp} °C</p>
                <p><strong>날씨:</strong> ${data.weather[0].description}</p>
            `;
            weatherData.innerHTML = weatherInfo;
        })
        .catch((error) => {
            weatherData.innerHTML = `<p id="error">날씨 데이터를 불러오는데 에러가 발생했습니다: ${error.message}</p>`;
        });
}

function getGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                const geolocationInfo = `
                    <p><strong>위도:</strong> ${latitude}</p>
                    <p><strong>경도:</strong> ${longitude}</p>
                `;
                geolocationData.innerHTML = geolocationInfo;

                getWeatherData(latitude, longitude); 
            },
            (error) => {
                geolocationData.innerHTML = `<p id="error">위치 정보를 가져오는데 에러가 발생했습니다: ${error.message}</p>`;
            }
        );
    } else {
        geolocationData.innerHTML = "<p>이 브라우저는 위치 정보를 지원하지 않습니다.</p>";
    }
}

getGeolocation();


setRandomBg();
updateClock();
setInterval(updateClock, 1000);
loadTodolist();
loadUsername();
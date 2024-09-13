const countdownButton = document.getElementById('start-countdown');
const resetButton = document.getElementById('reset-countdown');
const dateInput = document.querySelector('#dateInput');
const modal = document.querySelector('.modal')
const modalBody = document.querySelector('.modal-body')
const apiKey = 'rWyh8jYCPFnHKXDecEshw3swHb0gkxlk';
let timer;
let year
let month
let day



function renderHolidayData(holidayData) {
  modalBody.innerHTML = '';
console.log(holidayData);
const holidayInfo = holidayData.response.holidays
for (let index = 0; index < holidayInfo.length; index++) {
  const info = holidayInfo[index];
const name = info.name;
const description = info.description;
console.log(name,description)
const nameEl = document.createElement('div')
const descriptionEl = document.createElement('div')
nameEl.textContent = name
descriptionEl.textContent = description
modalBody.append(nameEl,descriptionEl)
}
}

async function getData(year, month, day) {
  const url = `https://calendarific.com/api/v2/holidays?&api_key=${apiKey}&country=US&year=${year}&day=${day}&month=${month}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const holidayData = await response.json();
    renderHolidayData(holidayData);
  } catch (error) {
    console.error(error.message);
  }
}


function updateTimer() {
  let days = document.getElementById('days')
  let hours = document.getElementById('hours')
  let minutes = document.getElementById('minutes')
  let seconds = document.getElementById('seconds')
  if (seconds.textContent === "0") {
    minutes.textContent = parseInt(minutes.textContent) - 1;
    if (minutes.textContent === "-1") {
      hours.textContent = parseInt(hours.textContent) - 1;
      if (hours.textContent === "-1") {
        days.textContent = parseInt(days.textContent) - 1;
        if (days.textContent === "-1") {
          console.log("Today's the Day!")
        }
        hours.textContent = 24;
      }
      minutes.textContent = 60;
    }
    seconds.textContent = 60;
  }
  seconds.textContent = parseInt(seconds.textContent) - 1;
}

function updateCountdown(year, month, day) {
  const now = new Date();
  const nextHoliday = new Date(year, month - 1, day);


  if (now > nextHoliday) {
    nextHoliday.setFullYear(nextHoliday.getFullYear() + 1);
  }

  const diff = nextHoliday - now;
  console.log(diff);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);


  document.getElementById('days').textContent = days;
  document.getElementById('hours').textContent = hours;
  document.getElementById('minutes').textContent = minutes;
  document.getElementById('seconds').textContent = seconds;
  timer = setInterval(updateTimer, 1000);
}

function setDate () {
  const storedDate =   localStorage.getItem("date") || "";
  console.log(storedDate);
  dateInput.value = storedDate
}

countdownButton.addEventListener('click', async function () {
  const storedDate =  localStorage.getItem("date");
  if (storedDate){
    const [yearValue, monthValue, dayValue] = storedDate.split("-")
    year = yearValue
    month = monthValue
    day = dayValue
  }

  await getData(year, month, day)
  clearInterval(timer);
  const newModal = new bootstrap.Modal(modal);
  newModal.show()
  updateCountdown(year, month, day);
});

dateInput.addEventListener('change', function (event) {
  localStorage.setItem("date", event.target.value);

  const [yearValue, monthValue, dayValue] = event.target.value.split('-');
  year = yearValue
  month = monthValue
  day = dayValue
});

window.addEventListener('load', function() {
    const headerH1 = document.querySelector('header > h1');
    headerH1.classList.add('visible');
});

setDate();
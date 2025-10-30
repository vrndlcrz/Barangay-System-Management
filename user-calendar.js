// Events storage
let events = [];

// Clock
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;
  const timeString = `${hours}:${minutes}:${seconds} ${ampm}`;
  document.getElementById("clock").textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// Burger Menu
const burgerMenu = document.getElementById("burgerMenu");
const sidebar = document.getElementById("sidebar");

burgerMenu.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !burgerMenu.contains(e.target)) {
    sidebar.classList.remove("active");
  }
});

// Format time to 12-hour format
function formatTime(time24) {
  const [hours, minutes] = time24.split(":");
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minutes}${ampm}`;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString + "T00:00:00");
  const options = { year: "numeric", month: "long", day: "numeric" };
  return date.toLocaleDateString("en-US", options);
}

// Calendar functionality
let currentDate = new Date();

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  document.getElementById(
    "monthYear"
  ).textContent = `${monthNames[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const calendarDates = document.getElementById("calendarDates");
  calendarDates.innerHTML = "";

  // Previous month's trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date other-month";
    dateDiv.textContent = daysInPrevMonth - i;
    calendarDates.appendChild(dateDiv);
  }

  // Current month's days
  const today = new Date();
  for (let day = 1; day <= daysInMonth; day++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date";

    if (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    ) {
      dateDiv.classList.add("today");
    }

    // Check if this date has events
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;
    const hasEvent = events.some((event) => event.date === dateString);
    if (hasEvent) {
      dateDiv.classList.add("has-event");
    }

    dateDiv.textContent = day;
    calendarDates.appendChild(dateDiv);
  }

  // Next month's leading days
  const totalCells = calendarDates.children.length;
  const remainingCells = 42 - totalCells;
  for (let day = 1; day <= remainingCells; day++) {
    const dateDiv = document.createElement("div");
    dateDiv.className = "calendar-date other-month";
    dateDiv.textContent = day;
    calendarDates.appendChild(dateDiv);
  }
}

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

// Initial render
renderCalendar();
renderEvents();

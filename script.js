let timerInterval;
let elapsedTime = 0; // Elapsed time in milliseconds
let running = false;

const timeDisplay = document.getElementById("time");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resetButton = document.getElementById("reset");
const lapButton = document.getElementById("lap");
const lapList = document.getElementById("lapList");

// Format time as HH:MM:SS
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Start the stopwatch
startButton.addEventListener("click", () => {
  if (!running) {
    running = true;
    timerInterval = setInterval(() => {
      elapsedTime += 1000;
      timeDisplay.textContent = formatTime(elapsedTime);
    }, 1000);
  }
});

// Pause the stopwatch
pauseButton.addEventListener("click", () => {
  running = false;
  clearInterval(timerInterval);
});

// Reset the stopwatch
resetButton.addEventListener("click", () => {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  timeDisplay.textContent = "00:00:00";
  lapList.innerHTML = ""; // Clear lap times
});

// Record a lap
lapButton.addEventListener("click", () => {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement("li");
    lapItem.classList.add("lap-item");

    // Create lap text and delete button
    const lapText = document.createElement("span");
    lapText.textContent = lapTime;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-btn");

    // Delete lap when the delete button is clicked
    deleteButton.addEventListener("click", () => {
      lapList.removeChild(lapItem);
    });

    // Append elements to the lap item
    lapItem.appendChild(lapText);
    lapItem.appendChild(deleteButton);

    // Add the lap item to the list
    lapList.appendChild(lapItem);
  }
});

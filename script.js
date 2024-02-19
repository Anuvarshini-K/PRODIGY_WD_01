let isRunning = false;
let startTime;
let laps = [];
let lapIndex = 1;

function startStop() {
    const startStopBtn = document.getElementById("startStopBtn");

    if (!isRunning) {
        startTime = new Date();
        isRunning = true;
        startStopBtn.textContent = "Stop";
        updateDisplay();
        updateButtons();
    } else {
        isRunning = false;
        startStopBtn.textContent = "Start";
        updateButtons();
    }
}

function recordLap() {
    if (isRunning) {
        const lapTime = calculateElapsedTime();
        const formattedLapTime = formatTime(lapTime);

        laps.push({ time: formattedLapTime, index: lapIndex });
        lapIndex++;

        const lapsList = document.getElementById("laps");
        const lapItem = document.createElement("li");
        lapItem.textContent = `${laps[laps.length - 1].index} lap: ${laps[laps.length - 1].time}`;
        lapItem.style.color = getLapColor(laps.length);
        lapsList.appendChild(lapItem);
    }
}

function reset() {
    isRunning = false;
    laps = [];
    lapIndex = 1;
    document.getElementById("startStopBtn").textContent = "Start";
    document.getElementById("display").textContent = "00:00:00:000";
    
    // Remove old laps from the screen
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = ""; // Clear laps container
    
    updateButtons();
}


function updateDisplay() {
    if (isRunning) {
        const elapsed = calculateElapsedTime();
        document.getElementById("display").textContent = formatTime(elapsed);
        setTimeout(updateDisplay, 10); // Update every 10 milliseconds for accuracy
    }
}

function updateButtons() {
    const lapBtn = document.getElementById("lapBtn");
    lapBtn.disabled = !isRunning;

    const resetBtn = document.getElementById("resetBtn");
    resetBtn.disabled = isRunning && laps.length === 0;
}

function calculateElapsedTime() {
    const currentTime = new Date();
    return currentTime - startTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const millisecondsFormatted = String(milliseconds % 1000).padStart(3, '0');
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${millisecondsFormatted}`;
}

function getLapColor(index) {
    const colors = ['#0000FF', '#800000', '#FF0000'];
    return colors[(index - 1) % colors.length];
}

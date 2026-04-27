(function() {
    const DURATIONS = {
        pomodoro: 25 * 60,
        shortBreak: 5 * 60,
        longBreak: 15 * 60
    };

    let currentMode = "pomodoro";
    let timeLeft = DURATIONS.pomodoro;
    let timerInterval = null;
    let isActive = false;
    let completedPomodoros = 0;
    let pomodoroCycleCount = 0;

    const timerDisplayEl = document.getElementById("timerDisplay");
    const startBtn = document.getElementById("startBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const resetBtn = document.getElementById("resetBtn");
    const statusMsgEl = document.getElementById("statusMsg");
    const sessionCounterDisplay = document.getElementById("sessionCounterDisplay");
    const timerProgress = document.getElementById("timerProgress");
    const sessionLabel = document.getElementById("sessionLabel");
    const modeBtns = document.querySelectorAll(".mode-btn");
    const fishDisplay = document.getElementById("fishImage"); 
    const alarmSound = new Audio('sounds/notification.mp3'); 

    const fishMoods = {
        excited: [
            "images/fishExcited1.jpeg", 
            "images/fishExcited2.jpeg"
        ],
        normal: [
            "images/fishNormal1.jpeg", 
            "images/fishNormal2.jpeg"
        ],
        sad: [
            "images/fishSad.jpeg",
            "images/fishSad.jpeg" // Repeat for wiggle logic
        ],
        sleep: [
            "images/fishSleep1.jpeg",
            "images/fishSleep2.jpeg"
        ],
        happy: [
            "images/fishHappy1.jpeg",
            "images/fishHappy2.jpeg"
        ]
    };

    let currentMood = fishMoods.normal; 
    let frameIndex = 0;

    // --- ANIMATION ENGINE ---
    function updateAnimation() {
        frameIndex = (frameIndex === 0) ? 1 : 0;
        if (fishDisplay && currentMood) {
            fishDisplay.src = currentMood[frameIndex];
        }
    }

    // Start the constant 1-second wiggle
    setInterval(updateAnimation, 1000);

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timerDisplayEl.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        const totalDuration = DURATIONS[currentMode];
        const percent = totalDuration > 0 ? ((totalDuration - timeLeft) / totalDuration) * 100 : 0;
        timerProgress.value = percent;
        
        if (currentMode === "pomodoro") {
            sessionLabel.textContent = "🐟 Studying with Mr.Dim";
        } else if (currentMode === "shortBreak") {
            sessionLabel.textContent = "🌿 Short Break · Rest your eyes";
        } else {
            sessionLabel.textContent = "🧘 Long Break · Stretch & breathe. Snacks perhaps?";
        }
    }

    function updateStatusMessage(customMsg = null) {
        if (customMsg) {
            statusMsgEl.innerHTML = customMsg;
            return;
        }
        if (!isActive && timerInterval === null) {
            statusMsgEl.innerHTML = "⏸ Paused · Mr. Dim is waiting";
        } 
        else if (isActive) {
            if (currentMode === "pomodoro") statusMsgEl.innerHTML = "Mr.Dim is cheering on you!";
            else statusMsgEl.innerHTML = "🌿 Time to recharge!";
        }
    }

    function switchMode(newMode, fromCompletion = false) {
        if (newMode === currentMode && !fromCompletion) return;
        
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isActive = false;
        currentMode = newMode;
        timeLeft = DURATIONS[currentMode];

        // MOOD CHANGE: Happy on breaks, Normal on Pomodoro
        if (currentMode === "pomodoro") {
            currentMood = fishMoods.normal;
        } else {
            currentMood = fishMoods.happy;
        }
        
        modeBtns.forEach(btn => {
            const modeAttr = btn.getAttribute("data-mode");
            if (modeAttr === currentMode) btn.classList.add("active");
            else btn.classList.remove("active");
        });
        
        updateDisplay();
        updateStatusMessage();
    }

    function onTimerComplete() {
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        isActive = false;

        // --- PLAY SOUND HERE ---
    alarmSound.play().catch(error => {
        console.log("Audio playback failed:", error);
    });
        
        if (currentMode === "pomodoro") {
            completedPomodoros++;
            pomodoroCycleCount++;
            currentMood = fishMoods.happy; // Happy when finished
            if (pomodoroCycleCount % 4 === 0) switchMode("longBreak", true);
            else switchMode("shortBreak", true);} 
        else {
            currentMood = fishMoods.normal;
            switchMode("pomodoro", true);
        }
        updateDisplay();
    }

    function tick() {
        if (!isActive) return;
        if (timeLeft <= 0) {
            onTimerComplete();
        } else {
            timeLeft--;
            
            // MOOD LOGIC DURING STUDY
            if (currentMode === "pomodoro") {
                if (timeLeft < 60) { // Last 1 minute
                    currentMood = fishMoods.sad;
                } else if (timeLeft < 600) { // Under 10 minutes
                    currentMood = fishMoods.normal;
                }
            }
            updateDisplay();
        }
    }

    function startTimer() {
        if (isActive) return;
        isActive = true;
        
        // MOOD CHANGE: Excited when working
        if (currentMode === "pomodoro") {
            currentMood = fishMoods.excited;
        }

        timerInterval = setInterval(tick, 1000);
        updateStatusMessage();
    }

    function pauseTimer() {
        isActive = false;
        if (timerInterval) {
            clearInterval(timerInterval);
            timerInterval = null;
        }
        currentMood = fishMoods.sleep; // Sleepy when paused
        updateStatusMessage();
    }

    function resetTimer() {
        pauseTimer();
        timeLeft = DURATIONS[currentMode];
        currentMood = fishMoods.normal;
        updateDisplay();
        updateStatusMessage("↺ Reset successful");
    }

    // Button Listeners
    modeBtns.forEach(btn => {
        btn.addEventListener("click", () => switchMode(btn.getAttribute("data-mode")));
    });

    startBtn.addEventListener("click", startTimer);
    pauseBtn.addEventListener("click", pauseTimer);
    resetBtn.addEventListener("click", resetTimer);

    function init() {
        currentMood = fishMoods.normal;
        updateDisplay();
        updateStatusMessage("🐟 Ready to focus? Press Start.");
    }
    
    init();
})();

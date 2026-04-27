# dim the fish pomodoro timer

A cozy, animated Pomodoro timer featuring **Mr. Dim**, a fish who reacts to your productivity! This web-based tool helps you stay focused using the Pomodoro technique (25 minutes of work followed by short and long breaks).



## Features
* **Dynamic Moods:** Mr. Dim changes his mood based on your timer status!
    * **Excited:** When you start your focus session.
    * **Sleepy:** When the timer is paused.
    * **Happy:** When you finish a session or take a break.
    * **Sad:** When the focus session is almost over.
* **Notification Sound:** To remind that you have finish one session and it's time for break.
* **Automatic Cycles:** Tracks your progress and automatically switches between Focus, Short Breaks, and Long Breaks.
* **Progress Bar:** A visual indicator of how much time is left in your current session.
* **Pixel Art Aesthetic:** Clean, soft UI designed for a calm working environment.

## How to Use
1. **Focus:** Click **Start** to begin a 25-minute study session. Mr. Dim will cheer you on!
2. **Short Break:** After one session, Mr. Dim gets happy and you get a 5-minute break.
3. **Long Break:** After 4 focus sessions, enjoy a 15-minute break.
4. **Pause:** If you need to step away, Mr. Dim will take a nap until you return.

## Live Demo
https://nattchoyanqi.github.io/Dim-the-Fish-Pomodoro-Timer/

## Built With
* **HTML5** - Structure and layout.
* **CSS3** - Styling, effects, and responsiveness.
* **JavaScript** - Timer logic and state-based animation engine.

## Folder Structure
```text
├── index.html      # Main structure
├── style.css       # Visual styling and layout
├── script.js       # Timer and mood logic
├── images/         # Mr. Dim's mood assets (.jpeg files)
   ├── fishExcited1.jpeg
   ├── fishExcited2.jpeg
   ├── fishHappy1.jpeg
   ├── fishHappy2.jpeg
   ├── fishNormal1.jpeg
   ├── fishNormal2.jpeg
   ├── fishSad.jpeg
   ├── fishSleep1.jpeg
   └── fishSleep2.jpeg
└── sounds/         # Sound assets (.mp3 files)
   └── notification.mp3

// DOM ELEMENTS
const message = document.getElementById('message');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const stopPause = document.getElementById('stopPause');
const messageTodo = document.getElementById('messageTodo');

//---------------- TIMER / COUNTDOWN -------------------//
//GLOBAL VARIABLES
/* hasBeenReset = whether the reset button was used.
 hasBeenPaused = if type pause was already done or not.
 It is different from stopPause which relates to the checkbox to pause before the pause (stopping the start of pause) */
let timer;
let work = 1500;
let pause = 300;
let hasBeenReset = false;
let hasBeenPaused = false;
let audio = new Audio('gong_audio.mp3');

//TIME FORMAT IN MINUTES
function timeFormat(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    // Add a 0 before the number if not 2 digits with padStart
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = seconds.toString().padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
}

//GROUP THE BUTTONS
function buttonDisactivated(disactivated) {
    resetBtn.disabled = disactivated;
    startBtn.disabled = disactivated;
    pauseBtn.disabled = disactivated;
}


//MAIN COUNTDOWN/TIMER FUNCTION
function countdown(type) {
    pauseBtn.disabled = false;
    stopPause.disabled = false;
    if (type === 'work') {
        if (hasBeenPaused = true){
        audio.play(); // Play audio only if there was a break before.
        }
        hasBeenPaused = false;
        message.style.fontSize = ''; // Resets the size of the timer numbers which changes with the pause message.
        work--;
        message.innerHTML = timeFormat(work);
        updateProgressBar(((1500 - work) / 1500) * 100, 'work');


        if (work < 0) {
            if (!hasBeenPaused) { //Checks if there was no break without that it will do break only once then infinitely repeat work.
                pause = 300; // Restarts the pause timer
                countdown('pause');
            } else {
                breakTimer(); // Starts the break immediately
            }
            return;
        }
        timer = setTimeout(() => countdown('work'), 1000); // Continues timer work if nothing applies
    }
    else if (type === 'pause') {
        //Written here to verify only once if the checkbox is checked to start the break.
        if (stopPause.checked) {
            handlePauseInterruption();
            return;
        }

        // Same logic as work countdown
        stopPause.disabled = true;
        message.style.fontSize = '';
        pause--;
        message.innerHTML = timeFormat(pause);
        updateProgressBar(((300 - pause) / 300) * 100, 'pause');

        if (pause < 0) {
            // Indicates that the break was done
            hasBeenPaused = true;
            // Back to work type. Need to write again the work value or it will stay negative.
            work = 1500;
            countdown('work');
            return;
        }

        timer = setTimeout(() => countdown('pause'), 1000);
    }
}

// If the Pause checkbox is checked this function is executed.
function handlePauseInterruption() {
    clearTimeout(timer)
    message.innerHTML = 'Press play when ready';
    message.style.fontSize = '25px'
    buttonDisactivated(true);
    startBtn.disabled = false;
    hasBeenPaused = true; // To understand check the "play button action" part of the script.
    return;
}


//THE BREAK 
function breakTimer() {
    clearTimeout(timer)// Clear old timer
    message.innerHTML = timeFormat(pause);
    countdown('pause')
}

//---------------- BUTTONS AND PROGRESS BAR-------------------//
//PROGRESS BAR
/* I retrieve all the bean class elements of the html and check the length (here 5) which is totalBeans. Then I have a formula to calculate the value of activeBeans and then a loop changes the opacity depending on where we are at in the timer and activeBeans. It all depends on the number of totalBeans. For example here there is opacity change at 20-15-10-5-0 minutes in work mode but if I added a html bean it would change automatically. */
function updateProgressBar(percentage, type) {
    const beans = document.querySelectorAll('.bean');
    const totalBeans = beans.length; // This number varies depending on the number of beans.
    const activeBeans = Math.floor((percentage / 100) * totalBeans);

    /* Depending on the type, reset all beans then activate them one by one in a loop to make them the needed opacity. Pause has the same logic with different opacity. */
    if (type === 'work') {
        beans.forEach(bean => bean.style.opacity = 0.3);
        for (let i = 0; i < activeBeans; i++) {
            beans[i].style.opacity = 1;
        }
    } else if (type === 'pause') {
        beans.forEach(bean => bean.style.opacity = 1);
        for (let i = 0; i < activeBeans; i++) {
            beans[i].style.opacity = 0.3;
        }
    }
}


//PLAY BUTTON ACTION
/* I put back the normal size of the font for the timer. Then if it was reset by the button reset it starts a new cycle of work with instantly the work countdown starting. Second scenario is about the checkbox. When I check the stop the break checkbox the function sets hasBeenPaused as true and here is why. So when I click play the script knows that it has to start a pause from zero and not a work countdown. Last scenario is starting the work countdown if nothing else applies. */
function startTimer() {
    messageTodo.innerHTML = "";
    if (hasBeenReset) {
        work = 1500;
        hasBeenReset = false;
        countdown('work');
    }
    else if (hasBeenPaused) {
        hasBeenPaused = false;
        stopPause.checked = false;
        pause = 300;
        countdown('pause');
    }
    else {
        countdown('work');
    }
    buttonDisactivated(false);
    startBtn.disabled = true;
}



//PAUSE BUTTON ACTION
/* Pause and Reset are self explanatory. They pause the timer. Reset replaces the timer message with 25:00 and add a boleen to know it was reset. */
function pauseTimer() {
    clearTimeout(timer)
    buttonDisactivated(false);
    pauseBtn.disabled = true;
}

//RESET BUTTON ACTION
function resetTimer() {
    clearTimeout(timer)
    message.innerHTML = '25:00';
    hasBeenReset = true;
    buttonDisactivated(false);
    resetBtn.disabled = true;
}


//------------------------ TO DO TASKLIST ---------------------------------//

//GLOBAL VARIABLES
let task = []
const resultSection = document.getElementById('resultSection');
const taskList = document.getElementById('taskList');
const sessionInput = document.getElementById('sessionInput');

// SUBMIT WITH ENTER
document.getElementById("sessionInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendTask();
    }
});

//SHOW/HIDE TASKLIST
/* It shows or hides the list of tasks depending on the length of the array named task. It's a cleaner look. */
function showResultSection() {
    if (task.length > 0) { resultSection.style.display = 'block' }
    else if (task.length <= 0) { resultSection.style.display = 'none' }
}


//ADD TASKS
/* This is the most important function of this section of the script. It adds tasks to the list. First it retrieves what was written in the html field. Then trims extra spaces. 
If it is empty it shows a message. If there are 5 tasks in the list (array task) it shows a message.
If the "if" statements don't apply, the written value is added to the array "task" with the format Upper case then Lower case for the rest. And the field is cleared, ready for a new input by the user. At the end the function showResultSection is called to check if there are enough tasks to show (block) that part of the script to the user. The rest of the script is HTML format into a checkbox list and a cleaner look.
The written order is important: first modify the data, then check if it has to show it, finally in what format.*/
function sendTask() {
    const input = document.getElementById('sessionInput');
    const inputValue = input.value.trim();

    if (inputValue === '') {
        messageTodo.innerHTML = 'Please write your task first!';
        return;
    }

    if (task.length >= 5) {
        messageTodo.innerHTML = 'Please, take care of yourself. 5 tasks is the limit per session.';
        return;
    }

    task.push(inputValue.charAt(0).toUpperCase() + inputValue.slice(1).toLowerCase());
    input.value = '';

    showResultSection();

    taskList.innerHTML = task.map((taskItem) => `<li><input type="checkbox">${taskItem}</li>`).join('');  //The format in which the list is shown in HTML to make the array into a list with checkboxes.

    messageTodo.innerHTML = "";
}

//ERASE TASKS
/* Script finds all checkbox elements inside the task list and stores them in an array in checkbox.
Then filters the array task with a loop where "i" is the current task element and "index" is the position in the array then the script returns only the unchecked elements. 
So checkbox[index].checked is to access the boolean property of each DOM element.
    
Task is an array with the values (string). 
Checkbox contains an array with only if input is checked or not (DOM elements).
Index helps to make the link between the two. */
function eraseTask() {
    const checkbox = Array.from(document.querySelectorAll("#taskList li  input[type='checkbox']"));
    task = task.filter((i, index) => {
        return !checkbox[index].checked;
    });

    /*  Shows the taskList in HTML with the proper format. Clears message if there is one. Calls the function to show or not the ResultSection depending on its new length. */
    taskList.innerHTML = task.map((taskItem) => `<li><input type="checkbox">${taskItem}</li>`).join('');
    messageTodo.innerHTML = "";
    showResultSection();
}


//BUTTONS EVENT LISTENERS
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

//------------------------THE END------------------------------------//
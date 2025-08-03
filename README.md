# Pixel Pomo
This is my take on the « *simple timer/to do list app* ». A silent Pomodoro for those who don’t like to be interrupted during their focus mode. There is a checkbox to delay the break. A to do list limited to 5 tasks to not overwhelm oneself. Cozy, mindful and (obviously) productive.

Try it out ! https://pixel-pomo.vercel.app

### What is a Pomodoro? 
The Pomodoro Technique is a time management strategy designed to reduce procrastination. It involves working in the format of 25 minutes of a focused session, followed by 5 minutes of break. This cycle repeats until the tasks are done.

### The ideal user
This app was developed keeping in mind my experience with pomodoro games/mobile apps and the testimonies heard in productivity communities over the years. 

Personna: Student used to pomodoros but unsatisfied by current apps, takes time to go into focus mode, easily overwhelm by tasks and distracted by design, is motivated by seeing progress.

That's why I created a minimalistic design but with a heart. The theme is coffee, giving a cozy vibe reinforced by the pixel design to differenciate the pomodoro in the market. Pixel coffee beans are loading, reminding the user of the incoming coffee break.  

## The code
### Little context on my work
I started this project after 2 months of React theory so I was really rusty in JS and CSS. I wanted to use this opportunity to familiarise myself with the languages again and gave myself a loose deadline. It really wasn’t a nice sensation to be in front of a blank page and realize I forgot how to code. I learned A LOT. I played around and tried different logics, reading the documentation I didn’t have the energy when learning the theory. All in all it was a fun project and I was able to create something ambitious and close to my vision.

### What went right?
A timer, a loading bar, pixel art, a lot of new things. 

A responsive design with the help of adequate units. This project can be resized to put in the corner of the screen.

It was my first time implementing time related elements in my creations. So the timer and the loading bar that changes during the break are elements that I am proud of. 

I specially created cozy pixel art (buttons and progress bar) on the coffee theme. It was my first time doing pixel art, but as a 90's kid who grew up playing Pokemon, I had to do it at least once. The design is simple and minimalist without being soulless it is the wanted effect.

I annotated a lot my code because that was lacking in my last project, also it will help me understand my writing choices in a few months.

### What were the challenges? 
As I did this on a long time period, I forgot what things meant and the logics. It made me understand the importance of annotations.

For every big part of the JS script I erased all my code once and rewrote it trying to implement the KISS method. It was a good practice to understand JS and trying different logics.

I wasn’t able to cut the JS script into parts as I wanted, the function eraseTask blocked the to do list section to be on a separate JS files. It should probably be is rewritten in a different logic but I don’t know how yet. I am leaving the JS folder for that.

### Future features? 
* A signal that the break is done (sound?) [Added 15/07]
* A help button with explications on what is a Pomodoro & how to use it.
* A loading bar that progress slowly and not by blocks. (More motivating but more distracting)
* A checkbox to make appear a pixel animation that changes during break/work mode. The animation would be between the presentation text and the timer.
* Open to new ideas: I made the decision to not add a text to signal « work mode » because I think the loading bar is explicit enough but real life testing with users would help me to understand the needs. I added the option to add a task to the task list with the enter key on the keyboard because of a test I did with a user.


### Lessons for next time
1. Commit more often: after each feature. 
2. Test all the app before starting working on it each day (my erase task function didn’t always work but I wasn’t aware of it.)
3. Cut the app parts into several JS files from the start. 
4. Don’t be afraid to find an easier logic. And code daily. 
5. Implement error management and develop better debugging skills (using only console.log has its limits). 
- Bonus: Implement a more accessibility focused code.

### Final Notes?
This project helped me believe in my coding skills again. It was also an eye opener about some of my weaknesses.


# Snake Game

Do you remember playing Snake on Nokia 3210? I do!
That's why I decided to recreate Snake Game.

This project is build in React. Tailwind CSS is used for styling.
Highscores are stored in Firebase.

## Play 🎮

You can play it here [https://snake.wiwoproduction.com/](https://snake.wiwoproduction.com/)

PS: Don't forget to save your score 😄

## About

This is a fun project I made for my developer portfolio.

### Game loop

I decided to build it fully in React without any gaming oriented liblaries. It made me struggle a bit with Web Api `setInterval()` as it is working a bit strange with React. This blog post helped me https://overreacted.io/making-setinterval-declarative-with-react-hooks/

### Interface

I designed the interface in Figma and coded it with Tailwind CSS. All the graphics are SVG elements and are implemented as separate components so I can easilly reuse and alter them in the code.

Look and feel was inspired by some other Snake Game implementations I've found online and by my memory of playing Snake on Nokia 3210 when I was a kid.

I didn't design every single view fully in Figma. I've been creating some elements to have a nice overwiev of how it will look after coding. That definitelly helped with speeding up the coding process and let me split design decisions from actual code writing.

You can see my Figma project here: https://www.figma.com/file/tjj7QDjwTS66kcEQIP9tXA/Snake-Game?node-id=4%3A3

## Settings

Players can change the sizes of the playing board and turn the wall teleport on/off. Those settings are available in the "Instructions & Settings" subpage. Everything is being saved in react's context so there is no need to confirm. Changes are visible in the game.

## Scoring & scores saving

Scoring is based on the level. The higher the level, the faster the snake moves and each star gives more points.

Bonuses (apples) apear in random positions on every 5th element eaten by the snake. The faster an apple is eaten, the more points it gives.

Result of the game can be saved. User just need to type their name. Score is saved in Firebase.

## Even better if...

As with every coding projects, thare is always something that can be done differentlly or better. In this one, there is no backend. Firebase is handled fully by the front end. That makes the game vulnerable to score manipulation.
A solution to make it cheating proof would be to implement some sort of backend that receives the course of the game and calculates the score on BE side, and then save it...

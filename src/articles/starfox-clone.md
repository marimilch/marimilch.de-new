# Star Fox in Unity

After finishing Petra & The Wolves I did indeed learn a lot from
the mistakes I made. But I wanted to present something with a little more
action and variety.

## Motivation

It was not only about the lacking experience in Unity required
for the bachelor thesis I applied for. 
I didn't want my work to look like it was built in a day.
I needed something more interesting. But the interview was
only a month away. That meant I needed something I could
program fast with the modest skillset I had in Game Development.

## Opting for Star Fox

I played it on ZSNES the first time and
was fascinated with the graphics it offered on the very limited hardware.
The developers were forced to keep the models and effects simple. 
That meant remodeling the assets would be quick.
Also there were lasers, explosions, cool characters, kick-ass music and
fun gameplay giving me the action and appeal I wanted. The choice was obvious.

## The models

Contrary to the usual workflow, I started with building
the models instead of programming. The ship, then some enemies 
and then the obstacles. As expected, I finished it quickly.

## Mechanics, visuals and logic

After that I invested most of the time in camera and player controls.
I wanted to make sure it felt "right".

The ship never flies forward but instead all the enemies and
obstacles fly toward the camera. Objects far away or not visible
would be disabled. I did this to keep all coordinates
of the objects below 100 - a recommendation by Unity probably
to prevent numerical errors.

To give an additional perception of depth the original version on 
Super Nintendo had either white dots on the ground or if in free space
stars in-game. When I implemented the star emission for the controls
screen I liked the effect so much I added it to the stage as well.

## What I learned

Player and enemy are very similar in terms of movement and actions.
The only difference is where both of them receive their input controls.

The funniest "mistake" was probably once the game started to get its
shape I kind of lost track by playing what I'd done so far over and 
over again. I didn't have this problem with Petra & The Wolves. To
me, that's a sign that I should always get inspiration for gameplay
from the most fun classics.

A lot of times I wanted to implement things quick and dirty 
just to rethink and rewrite them later because they
didn't work. I think it's better to opt for a smaller set of things that
actually work than to clash together a buggy mess. It's a lesson I learn and 
probably will always learn again and again:
*Good things take time*.

Thank you for reading this ❤️.

## Links And Media








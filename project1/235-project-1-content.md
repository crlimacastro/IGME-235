# Project 1 Content File

<img src="images/hamsterLogo.png" alt="Logo" width=100px/>

## Rico Chet

### Concept

The player is a hamster equipped with a rubber ball that must bounce around
walls to build up momentum and smash into enemies in order to defeat them.

### Genre

Action-Adventure

### Platform

Desktop

### Story

In the mysterious lands of the *Grand Grassland* food has become quite scarce.
Different races of animals have found their way of life disturbed and need to
create new societies in order to survive the harsh environment. One of the most
successful societies to come out of this situation is the nomadic tribe of Hamster
Warriors. Led by the incredible intuition of a wise sage who understands the 
alchemic properties of the elements, this tribe of hamsters have found success in
dividing its numbers into three different groups.
1. **Gatherers**, who do exactly as their name suggests, find food and water at every
stop in the tribe's journey.
2. **Alchemists**, who collect various natural materials such as dirt,
leaves, sticks, etc... to assist the grand sage so that he may spend more time
thinking about how to invent new creations or optimizing old ones.
3. Lastly there are the **Bouncers**, the tribe's scouts and powerful defense line. They are called that way
because they have been equipped by the sage with special hamster balls made of rubber
that store elastic energy built up by bouncing around between surfaces. The Bouncers
train each other in the art of using this incredible weapon to defeat foes much larger
in size. Snakes, eagles, foxes, many have fallen short to the expertise of the Bouncers
before. The biggest hero of the tribe, warrior *Rico Chet*, is the most dexterous and
courageous fighter of them all. The game will center around the legend of how Rico
escorted his tribe across the Grand Grassland and into greener pastures so that they may
return to their burrow settlement lifestyle. 

### Aesthetics

The game will have a cartoony art style. The story is an epic tale sprinkled with the
fantasy and humor that comes with a tribe of nomad hamsters fighting epic wars against
predators ten times their size.

The music will be fast paced to match the action displayed on screen.

The UI will be minimalistic. Most information displayed to the player, such as momentum
charge, will be expressed through color change and intensity as well as through sound.
The game will have a lot of screen shake and impact sounds to sell the action of hamsters
in rubber balls bouncing around between walls to land one gigantic hit on their foes.

### Gameplay

#### Mechanics

##### Player Interaction
The player will face off enemies in different arenas filled with surfaces all around them (rocks, trees, logs, etc...). These surfaces will be used to crash the hamster ball into them. Before completely crashing into the surface or wall, the player can hold the **Momentum Charge** button in order to pause the game for a few seconds and shoot off in the direction that they are pointing in once they release. These bounces are the way to build up speed and momentum in order to deal more damage to enemies. When the player is satisfied with the amount of momentum they have built up or cannot control the speed they are going in anymore, they can point towards the enemy and charge at them with all the speed they have built up. Damage will be dealt based on the momentum the player has accumulated. It is important to note that the faster the player goes, the harder it will be to control. Faster reaction speeds will be needed to pick the direction on time without losing the charge.

##### Surfaces & Obstacles
- Rocks: These surfaces will have different shapes and sizes and will be scattered about in an arena so that the player can bounce off of them. Rocks will allow for a lot of intricate shapes to make walls out of. There can be L-shaped rock formations, triangles, etc... 
- Logs: These will be rectangular surfaces that the player can bounce off of. They will be simpler walls and more common than rocks. 
- Trees: Circular surfaces for the player to bounce off of. The trees will be represented by a cut down stump, this is just a representation of the tree drawn at a lower y-plane. In reality they will be whole trees and shadows will be drawn below them to communicate this.
- Bushes: Bouncing on these surfaces will result in the player losing all momentum as they are soft and cushioned. The player will have to avoid bushes in order to keep a momentum combo going.
- Water: The player will be able to charge through water puddles on the ground if they have enough speed built up. Running up to a puddle without enough momentum will result in the player moving at an incredibly slow rate and floating around. The player will be susceptible to an enemy attack when coming out of a puddle.

##### Enemy types
The player will face off different enemies. Small ones like weasels and feral cats will be fast but have less health and will require lower minimum momentum to actually damage them. Bigger enemies such as foxes, jackals, and snakes will have tougher skin and require the player to build up a certain amount of momentum to even be able to damage them. Bouncing towards them will less than the required speed will cause the player to just bounce off of them harmlessly and fall as easy prey to a claw swipe attack or a bite. Snakes will be especially tough as they will require the player to hit them in the head to damage them, making them a very tough skinned and small target.

##### Health and Enemy Attacks
The player will have a health bar attached to the condition of the rubber hamster ball. Having enough damage dealt to the ball will break it and Rico will fall easy prey to the animals he is facing. Dying will result in a **Game Over** and requires the player to start the level over again. Enemies can deal damage to Rico in several different ways. For example:
- Swiping their claws in front of them. 
- Performing a lunge attack.
- Biting in front of them.

The player will have to make sure to keep moving constantly to avoid these attacks. When the player is hit, they will be thrown with some momentum in the opposite direction.

**Birds of prey planned as a stretch goal:**

Eagles and owls planned as possible predators for the player to face off. They will require the implementation of a z-axis and a way for the player to bounce off into the air. They will be even harder to hit than small weasels and cats and will be more aggressive than them. However, they will be very fragile and thus have very low health.

#### Controls

**WASD (Movement)** - Roll around in a hamster ball in 8 directional movement.

**Left Mouse Hold (Momentum Charge)** - When heading towards a wall, hold to build up momentum for the next bounce. Game will slow down to sell the effect of speed and to give the player a few seconds to think of where they are going to bounce towards (Holding down the mouse button for too long will cause all elastic energy to be lost. Time frame is reduced the more energy is built up, making it harder to keep a big combo of bounces for higher damage). When charging up an arrow will point in the direction of the mouse, this is the direction the hamster will shoot off in when the **Left Mouse Button** is released.

**Left Mouse Release (Momentum Release)** - When building up momentum in a wall, release the **Left Mouse Button** to shoot in the direction that the mouse is pointing.

**Right Mouse Click (Momentum Cancel)** - If pressed in the middle of momentum charge up, cancels all elastic energy and the hamster does not bounce off.

**Spacebar** - Can be used to the same effect as the **Left Mouse Button**, it is an alternative key.

**P** - Pause and display the Pause Menu to Continue, tweak the Options, or quit to the Main Menu.

**Controller support planned as a stretch goal:**

**Left Analog Stick** - Movement.
**Right Analog Stick** - Replaces the mouse, point to choose what direction to shoot the hamster off to.

**L2, R2, LT, RT Hold** - Momentum Charge.
**L2, R2, LT, RT Release** - Momentum Release. Shoot off in the **Right Analog Stick**'s direction.

##### Note
The big difference between Mouse and Controller is that for Controller, if the player does not point in any direction the elastic energy will be lost and the hamster will not bounce off, whereas with the mouse the hamster will always blast off in the direction of the pointer unless canceled.

#### Teaching Game Mechanics

At the beginning of the game, the player will be taken to a flashback into Rico's past. They will have to pass the Warrior Training Regiment he had to go through in order to join the great Hamster Warrior tribe's famous Bouncers. It will be a tutorial level where a veteran drill sergeant hamster will explain the game mechanics to the player.

#### Learning and Mastery

The difficulty curve of the game will be found in the unconventional and hard-to-master combat system. Attacking is attached to the movement of the player, so they will have to get comfortable building up high speeds to deal massive damage to their foes. Different spikes in the curve will also be encountered when the player meets a new enemy type and they have to learn their movement and attack patterns, as well as the specific way to defeat that enemy type.

### Screenshots

### Developer Info
| Info   |                                            |
| :----: | -----------------------------------------  |
| Name   | Camilo Lima                                |
| Major  | Game Design & Development                  |
| Year   | Sophomore/2nd                              |
| Skills | Programming, Game Design, Photoshop, Music |

# Taiyaking!
## Participants
Yoo, Miri
Lee, Jinbaek

## Roadmap
* Brainstorming and Debating
* Setting technical specs
* Making presentation of the project planning
* Define game scenes and layout
* Making assets
* Game functions
* Timer system
* Profit system
* Cooking
* Serving
* Guest appearance
* Goal system and win/lose result
* Implement high score menu using Firebase Database
* Deploy
* Make presentation

## Schedule
### Common Schedule
| Date        | Milestone                                                                                     | Remarks |
|-------------|-----------------------------------------------------------------------------------------------|---------|
| 1/7 - 1/8   | Requirement gathering and design (basically, come up with what kind of game you want to make) |         |
| 1/9         | Present what you will be making to mentors                                                    |         |
| 1/10        | Fix the requirements and design Begin development                                             |         |
| 1/10 - 1/25 | Development                                                                                   |         |
| 1/25 - 1/29 | Test                                                                                          |         |
| 1/29 - 1/31 | Create presentation slides Final review by mentors                                            |         |
| 2/5         | Make a presentation to all members Play!                                                      |         |

### Detailed Schedule
|Date|To do|Actual progress|Remarks|
|--- |--- |--- |--- |
|1/7|Discussion: Set the target subject
UI Design (Just idea)
Asking the mentor which library is recommended|Done||
|1/8|Make simple assets
Specify the detailed technical process and find out examples
Form the presentation|Done||
|1/9|Presentation: Plans||by mentors (Kamitani-san, Tsutsui-san)|
|1/10 - 1/11|Development * Split the game scene * Place game objects by plans * GameManager time managing|* Scene structure is formed first time. * Designed game layout and several game functions. * Git repository initial push and merge went well. * GameManager, TimeManager works well. * VO introduced: GameInfo||
|1/14-1/16|* Work on cooking system
* Guest appearing system
* Check-up finished taiyakis quantities|[x] Cooking tools
[x] Taiyaki Changing texture
[x] Guest appears
[x] Guest orders
[x] Hiding mouse pointer||
|1/16|Second Presentation: in-progress check||by mentor (Kamitani-san)|
|1/17-1/18|* Animating
* Smoke appears|[x] Cooked taiyaki checking routine
[x] Animating (Guest)
[x] AnimatedSprite
[x] Guest time calculation added
[x] Guest z-order fix
[x] Life
[x] Score
[x] Guest collision (drag drop)
[x] Basket counting
[x] Basket drag event
[x] Guest away
[x] AnimatedSprite: smoke, happy, nervous, raged
[x] Rank scene
[x] Main scene rebuild
[x] Renew graphics||
|1/21-1/24||[x] Game Over screen
[x] Recording score
[x] Putting name
[x] Firebase database integration
[x] Displaying ranking
[x] Smoke feedback
[x] Readjust cooking balance
[x] Make burn for other steps
[x] Integrating Database (Highscore)
[x] Added sound effect (button)||
|1/23 - 1/25|Test & Bug fix
[x] Time adjusting|1. Bug Test
2. User Test||
|1/28 - 1/29|Preparing final review||Jinbaek Day off|
|1/30|Create presentation slides
Final review by mentors|||
|2/5|Presentation day|||




Idea and Plan
Taiyaking
Cook Taiyaki for customers
Target
Specific income
Specific accuracy
Orders
Duplicated customers
Requests more types of Taiyaki (choco, creams...)
Requests only if player bought new type of inside before
Game Points
Requirements for players
Fast speed, best time (cooking time)
Clicking accurately
Counting numbers
Controlling types (special Taiyaki order)
Requirements for developer
Well prepared for using game framework
UI Scene
Game start menu
High score panel
Game screen
Shop screen
Assets
Referenced below
Game Design
Rakuten Recipe > 2019 Project for new grads > P_20190109_164935.jpg

Taiyaki Cooking System

Pot slots: 9(3x3) → 16(4x4) (Expandable by purchasing)
Types: Anko → +Cream → +Choco (by purchasing)
Life: 5
Score
earns
100 : Anko Taiyaki
300 : Cream Taiyaki
500 : Choco Taiyaki
Coin: Not earned by game, earned by daily attendance(+5), playing(+1)
Cooking step: First Kiji → Insert Inside → Upside down 2 times → Pull out → Serve
cannot pull over when it does not meet minimum time
when miss the time
1-3rd step: smoke - burns
4th step: burns (cannot sell)
Cooking time
Tools
Spliting Kiji
Inside Types (1-3)
Hand tool (Turn over and pull out)
Early - Cannot pull out!
Late(Overcook) - Will be moved to trash
OK - Pull out to the paper bag
Clicking paper bag : Serving
Customers
Men or Women or VIP (gives x2 score)
Requests Cooked Taiyaki
Random Quantities
Random Inside Types (Anko, Cream, Choco)
Score
Earns when serve completed
Random target appears up to difficulty (the game goal)
Life
Life cuts when
Not match with requested quantities or type.
Not served within time each guest willing to wait.
Wins when
Continuous (Target: More Score, More Profit!)
Loses when
Life reaches zero
Rakuten Recipe > 2019 Project for new grads > P_20190109_161831.jpg
We have discontinued developing shopping feature.

Shop (Spends Coin)
$10 → $30 → $50 → $80 → $110 → $150 → $200 : Open more molds (up to 7 times)
$50 : Cream
$100 : Choco
Technical Specifications
Before Game Screen
Single Page Login (ID/PW)
Game framework: Pixi.js
Required Game Scenes: 5
Game Menu
Play Screen
Shop Screen
Game Clear Screen
Game Over Screen
High-score screen
Assets
Background
Game menu
Playing screen
Shop screen
High score screen
Menu Items
Game Button (Simple)
Start
Score
Game Items
Taiyaki
Taiyaki mold
Taiyaki cooked #1 (first status - differs by cooked status each side)
Taiyaki-Kiji + Inside (1 type)
Taiyaki cooked #1 - Flipped (has texture)
Taiyaki cooked #2 - Flipped (has texture)
Taiyaki cooked #3 - Flipped (has texture)
Taiyaki burned
Smoke (independent overlay for time-over)
Kiji-kettle (used for Button, Cursor)
Normal state
Rotated (if it is able to specify rotated angle, it would not be needed)
Spoon
3 types
Shop
Purchase button
Cancel button
Inside
Anko (not melted maroon)
Cream (not melted light yellow)
Choco (melted dark brown)
People
Boy
Normal
Angry #1
Angry #2
Satisfied
Girl - 
Normal
Angry #1
Angry #2
Satisfied
VIP - Wearing suit and glasses
Normal
Angry #1
Angry #2
Satisfied
Speech Bubble
Game Panel
Life
Score
Sound
BGM
Menu
Playing
Effects
Button
dough
inside
flipping
game over
game clear (high score)
Firestore

Highscores
user
score
posted
KPT
Keep
(1/7) We've fixed the idea of the game we'll going to make.
(1/8) Wacom Pen Tablet and Krita Software is cool to make visual assets.
(1/10)
Scene structure is formed first time.
Designed game layout and several game functions.
Git repository initial push and merge went well.
GameManager, TimeManager works well.
(1/11)
Splitted each classes
Sprite state change with status
(1/14)
Added cook stage by grabbing (partial)
Introduced typescript type checking
(1/16)
Succeed presenting but still in working. The progress is in a quite ideal status.
(1/17)
Many parts improved.
Pixi.js z-order problem fixed! (lack of compatibility on official page)
(1/21)
Heart animation
Highscore, Game over scene
Firestore data integration (READ) 
(1/22)
Fixed bugs grabbing, animation X-axis bug, destroying after animation
Implemented High score feature
(1/23)
Readjusted cooking time
Added user manual
Added sound effect
(1/24)
Mute function, game timer
(1/25)
deployed
(1/31)
Final version deployed
Test done by friends
Problems
(1/7) What is the best suitable web page game framework for this project?
(1/8) Firebase asks me if I gonna use TypeScript. I'm using JavaScript yet, but is it useful eventually?
(1/9) Kamitani-san asked: Is there enough time to finish? Why don't you pick up core functions?
(1/11) JavaScript referencing: is it ok to call at index.html at once? (with script tag) 
(1/16) How to change Pixi.js mouse cursor? 
(1/17) We have to create many animatedsprites....
(1/18) Sometimes it crashes because of accessing properties of destroyed objects.
(1/21) Animation affects X-axis only.
(1/23) No problem. Test time?
Try
(1/7) We'll gonna use Pixi.js which wrapped using WebGL.
(1/8) I'm working on strict mode by using 'use strict' so that it alerts me frequently for unintended operations.
(1/9~) We have splitted the phase so that we can expand functions in stages.
(1/10) Random guest creating system, Refactoring main game scene, Captualize frequently used functions
(1/14~) Miri: Hand grabbing event, Rick: Creating guest and make order
(1/16) The property 'anchor' helped solving it.
(1/17) MAKE IT.
(1/18) Find specific part the problem occurs.
(1/21) Review logics next time.
(1/22) Create HOWTO manual.
(1/25) Add SE more for cooking steps.
Impression
Not completed yet.

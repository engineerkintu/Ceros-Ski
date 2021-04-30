# Ceros Ski Code Challenge

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    1. Crash into an obstacle
    1. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)
  
* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:**

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over
* Provide a way to pause and resume the game
* Add a score that increments as the skier skis further
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!

# Changes that I have managed to make

## Fixing of the bug as requested
I identified the following:
* The skier was moving left to right
* Crash was also an included direction, which was to the left of left.
* I observed that making the skier to move to the left direction after a crash, puts the skier in a direction that is not available.
### Solution to the bug
The obvious solution will be to monitor the skier, if he has crashed and he is not allowed to turn left.
The solution that I implemented was to tracking of the crashed state and direction are completely different.
"So far, that is where I am, but let me look for more bugs and do unit tests"

### Unit test
I wrote unit tests to verify the left and right direction during skier movement.
I wrote some more tests for the skier jump and collision detection code as well.  Running tests with the `--watch` flag definitely helps. As I went through later and made changes to code
that I had tested, I knew right away when I had broken something, and I also knew right away when it was working again.

### Extend existing functionality
I added a mechanism to keep track of whether the skier was jumping or not. I have used an array constant to include various images for the jump animation. I have added `SKIER_JUMP_TIME` to controll animation. 
To make the skier enjoy, I added the jump ramp asset as another possible
obstacle, it also has the same opportunity as other objects to appear on the map. When the skier detects a collision, the asset type of the obstacle is checked. If it's a jump ramp, the skier is put into a jumping state, and an animation counter is started to progress through each animation step. After the last step is completed, the skier is no longer in a jumping state. To add on, while the skier is jumping and he meets a rock or a collission, the collision is ignored. The skier can not change directions while he is jumping. I have added a rhino whose speed increases slightly as time passes.

### Build something new
I made a rhino class, by extending from Entity class. In rhino movement, I did spawn the rhino off screen and have him slowly increase his speed so he would eventually catch up to the skier. The Rhino has three states: chasing, eating, and celebrating. He starts in chase state, moving at his current speed directly toward the skier. The main game loop triggers the rhino to detect his own collision with the skier, just like the skier detects his own collisions with any obstacles. Once the rhino collides with the skier, he enters eating mode, also triggering the skier to hide and setting the skier's state to eaten. A skier in an eaten state can't move,ending the game. Once the rhino plays through the eating animation, it enters celebrate mode.

### Documentation
To run the project locally, after getting the repo from https://github.com/engineerkintu/Ceros-Ski.git  and enter these commands `npm install && npm run dev` and open http://localhost:8080/ in the browser will have to
suffice. 





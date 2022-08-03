# Mastermind
 You are going to make an on-screen version of the board game “Mastermind”. The computer will automatically generate 4 colours from a list of possible colours (it should be possible for the computer to randomly select the same colour more than once from the list). For instance, the computer may choose “red”, “blue”, “red”, “green”. This section should not be displayed to the user. After this is done the user should enter their choices for the 4 colours from the same list the computer used. For instance, they may choose “pink”, “blue”, “yellow” and “red” After the user has made their selection, the program should display how many colours they got right and how many colours they got right but in the wrong position. In the example above it should display the message “Correct colour in the correct place: 1” and “Correct colour but in the wrong place: 1”. The user continues guessing until they correctly enter the 4 colours in the order they should be in. At the end of the game it should display a suitable message and tell them how many guesses they took.

## Skills
 In this challenge, you will need to use the following skills:
 <ul>
<li> Input and display data </li>
<li> Lists </li>
<li>Random choice from a list </li>
<li>If statements </li>
<li>Loops (while and for)</li>
<li>Functions </li>
 </ul>


<br>

## Problems you will have to overcome
The hardest part of this game is working out the logic for checking how many they have correct and how many are in the wrong place. “Using the example above if the user enters "blue", "blue", "blue", "blue", they should see the message “Correct colour in the correct place: 1” and “Correct colour but in the wrong place: 0”. Decide if there is an easier way of allowing the user to enter their section (i.e. using a code or a letter to represent the colour). If using the first letter, make sure you only use colours which have a unique first letter (i.e. avoid using blue, black and brown as options and select just one of these as a possibility). Make your instructions clear to the user. Decide if you want to allow upper and lowercase or if it is easier to convert everything to the same case. Make sure you build in validation checks to make sure the user is only entering valid data and display a suitable message if they make an incorrect selection. If they do make an incorrect selection you may want to allow them to enter the data again.

<br>

# Psuedocode
```js
CLASS MASTERMIND
    CONSTRUCTOR
        SET self.counter
        SET self.colours

        self.counter = 0
        
        self.colours = CREATE-LIST
    
    CREATE-LIST
        SET colourArray
        SET colours

        colourArray = ["red","green","blue","yellow","orange","purple","cyan"]
        colours = [RANDOM from colourArray, RANDOM from colourArray, RANDOM from colourArray, RANDOM from colourArray]

        RETURN colours

    INPUT-CHECK
        SET guess
        SET index
        guess = INPUT array from user

        IF guess == self.colours
            RETURN GAME-WIN
        
        index = 0
        FOR EACH guess
            IF guess[index] == self.colours[index]
                OUTPUT "Correct at index " + STR index+1
            ELIF guess[index] in self.colours
                OUTPUT STR index+1 " in incorrect position"
        self.counter +=1

        INPUT-CHECK

    GAME-WIN
        OUTPUT "You have won the game!"
        OUTPUT "It only took you " + STR self.counter + " tries!"
```

<br>

# Python
``` py
import random

class MASTERMIND:
    def __init__(self):
        self.counter = 0
        self.colours = self.CREATE_LIST()

        self.INPUT_CHECK()

    def CREATE_LIST(self):
         colourArray = ["red","green","blue","yellow","orange","purple","cyan"]
         colours = [random.choice(colourArray),random.choice(colourArray),random.choice(colourArray),random.choice(colourArray)]

         return colours

    def INPUT_CHECK(self):
        guess = input("slay colours? yessss: ")
        guess = guess.split()

        if guess == self.colours:
            return self.GAME_WIN()

        index = 0
        for check in guess:
            if check == self.colours[index]:
                print("Correct at index: " + str(index+1))
            elif check in self.colours:
                print(str(index+1) + " is in the wrong position!")
            else:
                print(str(index+1) + " is not correct at all :(")
            index+=1
            
        self.counter+=1
        self.INPUT_CHECK()
        
    def GAME_WIN(self):
        print("You have won the game!")
        print("It only took you " + str(self.counter) + " tries!")

MASTERMIND()
```
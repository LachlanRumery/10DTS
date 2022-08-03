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
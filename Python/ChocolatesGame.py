class Player:
    def __init__(self,activeGame):
        self.holds = 0

    def play(self):
        take = int(input('How many?'))
        if take > 3:
            return 3
        elif take < 1:
            return 1
        return take

class Computer:
    def __init__(self,activeGame):
        self.holds = 0

    def play(self,activeGame):
        if activeGame.moves == 0:
            return 1
        if activeGame.chocolates-3 == 0:
            return 3
        return(4-activeGame.prevMove)


class game:
    def __init__(self):
        self.chocolates = 13
        self.computer = Computer(0)
        self.player = Player(0)
        self.prevMove = 0
        self.moves = 0
        self.active = True
        
        self.run()
    def run(self):
        player = True
        print('There are 13 chocolates')
        while self.active:
            player = not player
            if player:
                taken = self.player.play()
                self.prevMove = taken
                self.chocolates = self.chocolates - taken
                if self.chocolates <= 0:
                    self.lost(0)
                    
            else:
                taken = self.computer.play(self)
                self.chocolates = self.chocolates - taken
                if self.chocolates <= 0:
                    self.lost(1)
                print('You took ' + str(self.prevMove) + ', so I took ' + str(taken) + '. There are now ' + str(self.chocolates) + ' chocolates left.')
                self.prevMove = taken
            self.moves+=1
    
    def lost(self,player):
        self.active = False
        if 0:
            print('The computer lost!!!! You wonn!!!!')
        else:
            print('The computer took the w.')
        
if __name__ == "__main__":
    active = game()

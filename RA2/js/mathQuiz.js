const equation = document.getElementById('equation')
var currentInput = ''

class mathProblems {
    constructor() {
        /*
        Creates initial objects and quiz conditions
        */
        this.results = {
            multiply: {
                correct: 0,
                wrong: 0
            },
            add: {
                correct: 0,
                wrong: 0
            },
            sub: {
                correct: 0,
                wrong: 0
            },
            attempts: 0,
            totalCorrect: 0
        }
        this.settings = {
            /*
            If the condition has been set then use that, otherwise don't use it
            */
            onlyMultiply: localStorage.getItem('onlyMultiply') || false, 
            onlyAdd: localStorage.getItem('onlyAdd') || false,
            onlySub: localStorage.getItem('onlySub') || false,
            noEquations: 10
        }
        this.equationNo = 0;
        this.newEquation();
        this.displayProgress(100);
    }

    newEquation() {
        this.numbers = [Math.round(Math.random()*10), Math.round(Math.random()*10)] // Generates two random numbers.
        switch(true) {
            /*
            Use settings if set, otherwise, choose a random one.
            */
            case this.settings.onlyMultiply: {
                this.cache = {
                    solution: this.numbers[0]*this.numbers[1],
                    textEquation: this.numbers.join(' x ') + ' = ',
                    operation: '*'
                }
                return this.parseEquation()
            }

            case this.settings.onlyAdd: {
                this.cache = {
                    solution: this.numbers[0]+this.numbers[1],
                    textEquation: this.numbers.join(' + ') + ' = ',
                    operation: '+'
                }
                return this.parseEquation()
            }

            case this.settings.onlySub: {
                this.cache = {
                    solution: this.numbers[0]-this.numbers[1],
                    textEquation: this.numbers.join(' - ') + ' = ',
                    operation: '-'
                }
                return this.parseEquation()
            }

            default: {
                if (Math.random()>0.66) {
                    this.settings.onlyAdd=true; 
                    return this.newEquation();
                };
                if (Math.random()>0.5) {
                    this.settings.onlySub=true;
                    return this.newEquation();
                }
                this.settings.onlyMultiply = true;
                return this.newEquation()
            }
        }
    }

    parseEquation() {
        equation.innerText=this.cache.textEquation // Displays equation
    }

    checkSolution() {
        this.results.attempts++;
        if (this.equationNo>=this.settings.noEquations) {
            this.end()
        }
        if(parseInt(currentInput)!=this.cache.solution) {
            this.displayWrong()
            switch (this.cache.operation) {
                case '*': {this.results.multiply.wrong++; break}
                case '+': {this.results.add.wrong++; break}
                case '-': {this.results.sub.wrong++; break}
            }    
            return;
        }
        // Add stats
        this.results.totalCorrect++;
        switch (this.cache.operation) {
            case '*': {this.results.multiply.correct++; break}
            case '+': {this.results.add.correct++; break}
            case '-': {this.results.sub.correct++; break}
        }

        this.equationNo++;
        this.displayProgress((10-(this.equationNo-1))*10)
        this.newEquation()
        currentInput=''
        document.getElementById('answer').innerText = ''
    }

    skip() {
        this.equationNo++;
        this.results.attempts++;
        switch (this.cache.operation) {
            case '*': {this.results.multiply.wrong++; break}
            case '+': {this.results.add.wrong++; break}
            case '-': {this.results.sub.wrong++; break}
        }    
        this.newEquation();
        this.displayProgress((10-(this.equationNo-1))*10);
    }

    displayProgress(percent) {
        document.getElementById('selfResults').style.width = `${percent}%`
    }

    displayWrong() {
        document.getElementById('answer').classList.add('wrong')
        setTimeout(()=>document.getElementById('answer').classList.remove('wrong'), 501)
    }

    end() {
        document.getElementById('quizEnd').style.visibility = "visible";
        document.getElementById("quizContent").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "hidden";

        document.getElementById('resultScore').innerText = Math.round((this.settings.noEquations/this.results.attempts)*100) // Generates score
    }
}

function main() {
    x = new mathProblems()
    document.getElementById("quizContent").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("quizEnd").style.visibility = "hidden";
}

function restart() {
    document.getElementById("quizContent").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("quizEnd").style.visibility = "hidden";
}

function focusButton(focus) {
    /*
    Sets what type of quiz the user will do.
    */
    switch(focus) {
        case "+": {
            localStorage.setItem('onlyAdd', true)
            localStorage.setItem('onlySub', false)
            localStorage.setItem('onlyMultiply', false)
        }
        case '-': {
            localStorage.setItem('onlyAdd', false)
            localStorage.setItem('onlySub', true)
            localStorage.setItem('onlyMultiply', false)
        }
        case "*": {
            localStorage.setItem('onlyAdd', false)
            localStorage.setItem('onlySub', false)
            localStorage.setItem('onlyMultiply', true)
        }
    }
}

document.addEventListener("keydown", function(event) {
    /*
    Gets the user input
    */
    if (event.key=="Enter") {
        x.checkSolution()
    }
    if (isFinite(event.key)) {
        currentInput+=event.key
        document.getElementById('answer').innerText = currentInput
    }
    if (event.key == "Backspace") {
        currentInput = currentInput.slice(0,-1)
        document.getElementById('answer').innerText = currentInput
    }
    if (event.key=="-") {
        currentInput+="-"
        document.getElementById('answer').innerText = currentInput
    }
})
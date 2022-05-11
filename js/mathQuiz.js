const equation = document.getElementById('equation')
var currentInput = ''

class mathProblems {
    constructor() {
        this.difficulty; this.correct=0; this.onlyMultiply; this.onlyAdd; this.noEquations = 10; this.equationNo = 0;
        this.newEquation()
    }

    newEquation() {
        this.numbers = [Math.round(Math.random()*10), Math.round(Math.random()*10)]
        if (this.onlyMultiply || Math.random()>0.5 & !this.onlyAdd) {
            this.solution=this.numbers[0]*this.numbers[1]
            this.textEquation = this.numbers.join(' x ') + ' = '
            return this.parseEquation()
        }
        this.solution=this.numbers[0]+this.numbers[1]
        this.textEquation = this.numbers.join(' + ') + ' = '
        return this.parseEquation()
    }

    parseEquation() {
        equation.innerText=this.textEquation
    }

    checkSolution() {
        if (this.equationNo==this.noEquations) {
            this.end()
        }
        if(parseInt(currentInput)!=this.solution) {
            this.displayWrong()
            return;
        }
        this.correct++;
        this.equationNo++;
        this.displayProgress((10-this.equationNo)*10)
        this.newEquation()
        currentInput=''
        document.getElementById('answer').innerText = ''
    }

    displayProgress(percent) {
        document.getElementById('selfResults').style.width = `${percent}%`
    }

    displayWrong() {
        document.getElementById('answer').classList.add('wrong')
        setTimeout(()=>document.getElementById('answer').classList.remove('wrong'), 501)
    }

    restart() {
        x = new mathProblems()
        x.displayProgress(100)
    }

    end() {
        localStorage.setItem('score', this.correct);
        this.restart()
    }
}

function main() {
    x = new mathProblems()
    document.getElementById("quizContent").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden"
}

document.addEventListener("keydown", function(event) {
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
})
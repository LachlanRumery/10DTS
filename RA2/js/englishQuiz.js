var words = ["able","about", "absolute", "accept", "account", "achieve", "across", "act", "active", "actual", "add", "address", "admit", "advertise", "affect", "afford", "after", "afternoon", "again", "against", "age", "agent", "ago", "agree", "air", "all", "allow", "almost", "along", "already", "alright", "also", "although", "always", "america", "amount", "and", "another", "answer", "any", "apart", "apparent", "appear", "apply", "appoint", "approach", "appropriate", "area", "argue", "arm", "around", "arrange", "art", "as", "ask", "associate", "assume", "at", "attend", "authority", "available", "aware", "away", "awful", "baby", "back", "bad", "bag", "balance", "ball", "bank", "bar", "base", "basis", "be", "bear", "beat", "beauty", "because", "become", "bed", "before", "begin", "behind", "believe", "benefit", "best", "bet", "between", "big", "bill", "birth", "bit", "black", "bloke", "blood", "blow", "blue", "board", "boat", "body", "book", "both", "bother", "bottle", "bottom", "box", "boy", "break", "brief", "brilliant", "bring", "britain", "brother", "budget", "build", "bus", "business", "busy", "but", "buy", "by", "cake", "call", "can", "car", "card", "care", "carry", "case", "cat", "catch", "cause", "cent", "centre", "certain", "chair", "chairman", "chance", "change", "chap", "character", "charge", "cheap", "check", "child", "choice", "choose", "Christ", "Christmas", "church", "city", "claim", "class", "clean", "clear", "client", "clock", "close", "closes", "clothe", "club", "coffee", "cold", "colleague", "collect", "college", "colour", "come", "comment", "commit", "committee", "common", "community", "company", "compare", "complete", "compute", "concern", "condition", "confer", "consider", "consult", "contact", "continue", "contract", "control", "converse", "cook", "copy", "corner", "correct", "cost", "could", "council", "count", "country", "county", "couple", "course", "court", "cover", "create", "cross", "cup", "current", "cut", "dad", "danger", "date", "day", "dead", "deal", "dear", "debate", "decide", "decision", "deep", "definite", "degree", "department", "depend", "describe", "design", "detail", "develop", "die", "difference", "difficult", "dinner", "direct", "discuss", "district", "divide", "do", "doctor", "document", "dog", "door", "double", "doubt", "down", "draw", "dress", "drink", "drive", "drop", "dry", "due", "during", "each", "early", "east", "easy", "eat", "economy", "educate", "effect", "egg", "eight", "either", "elect", "electric", "eleven", "else", "employ", "encourage", "end", "engine", "english", "enjoy", "enough", "enter", "environment", "equal", "especial", "europe", "even", "evening", "ever", "every", "evidence", "exact", "example", "except", "excuse", "exercise", "exist", "expect", "expense", "experience", "explain", "express", "extra", "eye", "face", "fact", "fair", "fall", "family", "far", "farm", "fast", "father", "favour", "feed", "feel", "few", "field", "fight", "figure", "file", "fill", "film", "final", "finance", "find", "fine", "finish", "fire", "first", "fish", "fit", "five", "flat", "floor", "fly", "follow", "food", "foot", "for", "force", "forget", "form", "fortune", "forward", "four", "france", "free", "friday", "friend", "from", "front", "full", "fun", "function", "fund", "further", "future", "game", "garden", "gas", "general", "germany", "get", "girl", "give", "glass", "go", "god", "good", "goodbye", "govern", "grand", "grant", "great", "green", "ground", "group", "grow", "guess", "guy", "hair", "half", "hall", "hand", "hang", "happen", "happy", "hard", "hate", "have", "he", "head", "health", "hear", "heart", "heat", "heavy", "hell", "help", "here", "high", "history", "hit", "hold", "holiday", "home", "honest", "hope", "horse", "hospital", "hot", "hour", "house", "how", "however", "hullo", "hundred", "husband", "idea", "identify", "if", "imagine", "important", "improve", "in", "include", "income", "increase", "indeed", "individual", "industry", "inform", "inside", "instead", "insure", "interest", "into", "introduce", "invest", "involve", "issue", "it", "item", "jesus", "job", "join", "judge", "jump", "just", "keep", "key", "kid", "kill", "kind", "king", "kitchen", "knock", "know", "labour", "lad", "lady", "land", "language", "large", "last", "late", "laugh", "law", "lay", "lead", "learn", "leave", "left", "leg", "less", "let", "letter", "level", "lie", "life", "light", "like", "likely", "limit", "line", "link", "list", "listen", "little", "live", "load", "local", "lock", "london", "long", "look", "lord", "lose", "lot", "love", "low", "luck", "lunch", "machine", "main", "major", "make", "man", "manage", "many", "mark", "market", "marry", "match", "matter", "may", "maybe", "mean", "meaning", "measure", "meet", "member", "mention", "middle", "might", "mile", "milk", "million", "mind", "minister", "minus", "minute", "miss", "mister", "moment", "monday", "money", "month", "more", "morning", "most", "mother", "motion", "move", "mrs", "much", "music", "must", "name", "nation", "nature", "near"]
var alphabet = "abcdefghijklmnopqrstyvwxyz"

class englishProblems {
    constructor() {
        /*
        Sets initial variables/objects
        */
        this.results = {
            attempts: 0,
            totalCorrect: 0
        }
        this.settings = {
            noQuestions: 10,
            otherWords: document.getElementById('englishDiff').value
        }

        this.questionNo = 0;
        this.newQuestion();
        this.displayProgress(100);
    }

    newQuestion() {
        document.getElementById('input').innerHTML = ""
        this.cache = {solution: words[Math.round(Math.random()*words.length)], otherWords: []} // sets initial cache object and generates cache.solution
        for (let i=0; i<this.settings.otherWords; i++) {
            /*
            Generates the incorrectly spelt words and adds them to cache.otherWords
            */
            let word = words[Math.round(Math.random()*words.length)-1] || words[0]

            let index = Math.round(Math.random()*word.length)
            let updatedWord = word.substring(0,index) + alphabet[Math.round(Math.random()*alphabet.length)] + word.substring(index+1)
            this.cache.otherWords.push(updatedWord)
        }
        this.parseQuestion()
    }

    parseQuestion() {
        /*
        Function adds the actual word and the incorrect words to the page as buttons that can be clicked.
        */
        document.getElementById('input').innerHTML+=`<button type="button" class="btn btn-outline-primary" onclick="x.checkAnswer('${this.cache.solution}')">${this.cache.solution}</button>`
        this.cache.otherWords.forEach(word => {
            document.getElementById('input').innerHTML+=`<button type="button" class="btn btn-outline-primary" onclick="x.checkAnswer('${this.word}')">${word}</button>`
        })
    }

    checkAnswer(answer) {
        this.results.attempts++;
        if (this.questionNo>=this.settings.noQuestions) { // checks to see if the quiz should be ended
            this.end()
        }
        if(answer!=this.cache.solution) return false;

        this.questionNo++;
        this.displayProgress((10-(this.questionNo-1))*10)
        this.newQuestion()
        this.results.totalCorrect++;

    }

    skip() {
        this.questionNo++;
        this.results.attempts++; 
        this.newQuestion();
        this.displayProgress((10-(this.questionNo-1))*10);
    }

    displayProgress(percent) {
        document.getElementById('selfResults').style.width = `${percent}%`
    }

    end() {
        document.getElementById('quizEnd').style.visibility = "visible";
        document.getElementById("quizContent").style.visibility = "hidden";
        document.getElementById("start").style.visibility = "hidden";

        document.getElementById('resultScore').innerText = Math.round((this.settings.noQuestions/this.results.attempts)*100) // generates score
    }
}

function main() { // starts the quiz
    x = new englishProblems()
    document.getElementById("quizContent").style.visibility = "visible";
    document.getElementById("start").style.visibility = "hidden";
    document.getElementById("quizEnd").style.visibility = "hidden";
}

function restart() { // sends user back to the start of quiz page
    document.getElementById("quizContent").style.visibility = "hidden";
    document.getElementById("start").style.visibility = "visible";
    document.getElementById("quizEnd").style.visibility = "hidden";
}
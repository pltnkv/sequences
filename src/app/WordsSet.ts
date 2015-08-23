import Randomizer = require("app/utils/Randomizer")

class WordsSet {

    private sortedWords:string[]
    private randomWords:string[]


    constructor(words:string[]) {
        this.sortedWords = words
        this.randomWords = this.resortWords(this.getSortedWords())
    }

    private resortWords(words:string[]):string[] {
        return Randomizer.shuffle(words)
    }

    getSortedWords():string[] {
        return this.sortedWords.slice(0)
    }

    getRandomWords():string[] {
        return this.randomWords.slice(0)
    }

    checkWords(testingWords:string[]):boolean {
        for (var i = 0; i < this.sortedWords.length; i++) {
            if (this.sortedWords[i] != testingWords[i]) {
                return false
            }
        }
        return true
    }
}

export = WordsSet
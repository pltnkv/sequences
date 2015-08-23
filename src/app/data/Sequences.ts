import WordsSet = require("app/WordsSet")

var data = [
    new WordsSet(['Red1', 'Orange1', 'Yellow1', 'Green', 'Blue', 'Indigo', 'Violet']),
    new WordsSet(['Red2', 'Orange2', 'Yellow2', 'Green2', 'Blue2']),
    new WordsSet(['Red3', 'Orange3', 'Yellow3'])
]

export function getWordsSetByIndex(index:number):WordsSet {
    return data[index]
}

export function getCount():number {
    return data.length
}
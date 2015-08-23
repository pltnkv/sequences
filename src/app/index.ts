import Configurator = require("app/Configurator")
import Sequences = require("app/data/Sequences")
import Level = require("app/Level")
import Game = require("app/Game")

Configurator.init()
Game.init()
//var levelsCount = Sequences.getCount()

runLevel(0)

function runLevel(levelIndex:number) {
    Game.runLevel(getLevel(levelIndex))
    //app.createWords(level.wordsSet.getSortedWords())
}
/*
function onLevelCompleted() {
    console.log('onLevelCompleted')
}*/


function getLevel(levelIndex:number):Level {
    var words = Sequences.getWordsSetByIndex(levelIndex)
    return new Level(words)
}

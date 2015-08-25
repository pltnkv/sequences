import Level = require("app/Level")
import MainContainer = require("app/visuals/MainContainer")
import LevelVisual = require("app/visuals/LevelVisual")
import CompleteLevelVisual = require("app/visuals/CompleteLevelVisual")
import Sequences = require("app/data/Sequences")

var currentLevel:Level
var currentLevelIndex:number
var levelsCount:number

export function init() {
    console.log('init')
    MainContainer.init()
    LevelVisual.init(onSequenceSorted)
    CompleteLevelVisual.init(onLevelCompleted)
}

export function start() {
    levelsCount = Sequences.getCount()
    currentLevelIndex = 0
    runLevel(getLevel(currentLevelIndex))
}

function onSequenceSorted() {
    console.log('onSequenceSorted')
    CompleteLevelVisual.setFact(currentLevel.info.fact)
}

function onLevelCompleted() {
    console.log('onLevelCompleted')
    if (currentLevelIndex + 1 < levelsCount) {
        currentLevelIndex++
        runLevel(getLevel(currentLevelIndex))
    } else {
        alert('Game over!')
    }
}

export function runLevel(level:Level) {
    currentLevel = level
    LevelVisual.setWordsSet(level.info.wordsSet)
}

export function pause() {

}

function getLevel(levelIndex:number):Level {
    return new Level(Sequences.getWordsSetByIndex(levelIndex))
}
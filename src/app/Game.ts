import Level = require("app/Level")
import MainContainer = require("app/visuals/MainContainer")
import LevelVisual = require("app/visuals/LevelVisual")
import CompleteLevelVisual = require("app/visuals/CompleteLevelVisual")

export function init() {
    console.log('init')
    MainContainer.init()
    LevelVisual.init(onLevelCompleted)
    CompleteLevelVisual.init()
}

function onLevelCompleted() {
    console.log('onLevelCompleted')
}

export function runLevel(level:Level) {
    LevelVisual.setLevel(level)
}

export function pause() {

}
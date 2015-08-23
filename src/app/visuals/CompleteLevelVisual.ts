import MainContainer = require("app/visuals/MainContainer")

var template = '<div class="completeBox">Level completed</div>'

var completeLevelVisual:JQuery

export function init() {
    completeLevelVisual = $(template)
    MainContainer.getContainer().append(completeLevelVisual)
}
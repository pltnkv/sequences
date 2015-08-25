import refs = require("refs/refs")
import MainContainer = require("app/visuals/MainContainer")

var template = '<div class="completeBox">' +
    '<div class="completeBox_caption">Это интересно!</div>' +
    '<div class="completeBox_text"></div>' +
    '<div class="completeBox_submit">Продолжить</div></div>'

//todo Добавить название пройденной последовательности

var completeLevelVisual:JQuery
var levelCompletedListener:() => void

export function init(completeListener:() => void):void {
    levelCompletedListener = completeListener
    completeLevelVisual = $(template)
    completeLevelVisual.find('.completeBox_submit').on('touchend', () => {
        hide()
        levelCompletedListener()
    })
    MainContainer.getContainer().append(completeLevelVisual)
    hide()
}


export function setFact(factValue:string) {
    completeLevelVisual.find('.completeBox_text').html(factValue)
    show()
}

function hide() {
    completeLevelVisual.css({
        display: 'none',
        opacity: 0,
        transform: `translateY(-${window.innerHeight}px)`
    })
}

function show() {
    completeLevelVisual.css('display', 'block')
    setTimeout(() => requestAnimationFrame(() => {
        completeLevelVisual.css({
            opacity: 1,
            transform: `translateY(0px)`
        })
    }))
}
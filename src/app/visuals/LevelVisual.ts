import refs = require("refs/refs")
import WordVisual = require("app/visuals/WordVisual")
import MainContainer = require("app/visuals/MainContainer")
import Level = require("app/Level")

var SPACE_BETWEEN_WORDS = 5
var completeListener:() => void
var levelVisualContainer = $('<div/>')
var $document:JQuery
var docHeight:number

export function init(_completeListener) {
    completeListener = _completeListener
    MainContainer.getContainer().append(levelVisualContainer)
    $document = $(document)
    docHeight = window.innerHeight
}

export function setLevel(level:Level) {
    var randomWords = level.wordsSet.getRandomWords()
    var wordsCount = randomWords.length
    var visualHeight = docHeight / wordsCount - SPACE_BETWEEN_WORDS
    var currentWord:WordVisual = null
    var deltaY = 0
    var minYPosition = 0
    var maxYPosition = (visualHeight + SPACE_BETWEEN_WORDS) * (wordsCount - 1) + SPACE_BETWEEN_WORDS
    var sortedWords:WordVisual[] = []
    var currentWordPosition:number
    var positionsRanges = []
    var levelCompleted = false

    createPositionsRanges()
    createWords()
    redrawSortedWords()

    function createWords() {
        for (var i = 0; i < randomWords.length; i++) {
            var word = new WordVisual(randomWords[i], visualHeight)
            word.visual.on('touchstart', onTouchStart)
            levelVisualContainer.append(word.visual)
            sortedWords.push(word)
        }
    }

    function createPositionsRanges() {
        var offset = (visualHeight + SPACE_BETWEEN_WORDS) / 2
        for (var i = 0; i < wordsCount; i++) {
            positionsRanges.push({
                start: i * (visualHeight + SPACE_BETWEEN_WORDS) - offset,
                end: (i + 1) * (visualHeight + SPACE_BETWEEN_WORDS) - offset
            })
        }
    }

    function onTouchStart(e) {
        console.log('onTouchStart', e)
        var target = $(e.currentTarget)
        if (currentWord == null && !levelCompleted && target.hasClass('word')) {
            currentWordPosition = findWordIndexByVisual(target)
            currentWord = sortedWords[currentWordPosition]
            currentWord.setSelection(true)

            $document.on('touchmove', onTouchMove)
            $document.on('touchend', onTouchEnd)
            $document.on('touchcancel', onTouchEnd)
            $document.on('touchleave', onTouchEnd)

            var touch = e.originalEvent.touches[0]
            var offsetTop = currentWord.visual.offset().top
            deltaY = touch.screenY - offsetTop
        }
        e.preventDefault()
    }

    function findWordIndexByVisual(visual) {
        for (var i = 0; i < sortedWords.length; i++) {
            if (sortedWords[i].visual.is(visual)) {
                return i
            }
        }
        return null
    }

    function onTouchMove(e) {
        var curYPos = spanYToBorders(e.originalEvent.touches[0].screenY - deltaY, minYPosition, maxYPosition)
        currentWord.setY(curYPos)
        var newPos = getPotentialPosition(curYPos)
        if (newPos != currentWordPosition) {
            console.log('newPos', newPos)
            resortWords(newPos, currentWordPosition)
            currentWordPosition = newPos
        }
    }

    function getPotentialPosition(currentPos):number {
        for (var i = 0; i < positionsRanges.length; i++) {
            var range = positionsRanges[i];
            if (currentPos >= range.start && currentPos < range.end) {
                return i
            }
        }
    }

    function resortWords(newPos, prevPos) {
        var savedWord = sortedWords[newPos]
        sortedWords[newPos] = sortedWords[prevPos]
        sortedWords[prevPos] = savedWord
        redrawSortedWords()
    }

    function checkSortedWords() {
        var wordsValues = []
        sortedWords.forEach(wordVisual => wordsValues.push(wordVisual.value))
        if (level.wordsSet.checkWords(wordsValues)) {
            levelCompleted = true
            completeListener()
            hideWords()
        }
    }

    function redrawSortedWords() {
        for (var i = 0; i < sortedWords.length; i++) {
            var word = sortedWords[i]
            if (!word.selected) {
                word.setY(i * (visualHeight + SPACE_BETWEEN_WORDS))
            }
        }
    }

    function onTouchEnd(e) {
        console.log('onTouchEnd', e)
        stopMoving()
        checkSortedWords()
        currentWord = null
    }

    function stopMoving() {
        if (currentWord) {
            currentWord.setSelection(false)
            currentWord = null
        }
        redrawSortedWords()
        $document.off('touchmove', onTouchMove)
        $document.off('touchend', onTouchEnd)
    }

    //***************************
    // ANIMATIONS  **************
    //***************************

    function hideWords() {
        console.log('hideWords')
    }
}

function spanYToBorders(currentPos, minYPosition, maxYPosition) {
    if (currentPos < minYPosition) {
        return minYPosition
    } else if (currentPos > maxYPosition) {
        return maxYPosition
    } else {
        return currentPos
    }
}
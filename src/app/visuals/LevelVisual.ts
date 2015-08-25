import refs = require("refs/refs")
import WordVisual = require("app/visuals/WordVisual")
import MainContainer = require("app/visuals/MainContainer")
import WordsSet = require("app/WordsSet")

var SPACE_BETWEEN_WORDS = 5
var sequenceSortedListener:() => void
var levelVisualContainer = $('<div/>')
var $document:JQuery
var docHeight:number

export function init(completeListener) {
    sequenceSortedListener = completeListener
    MainContainer.getContainer().append(levelVisualContainer)
    $document = $(document)
    docHeight = window.innerHeight
}

export function setWordsSet(wordsSet:WordsSet) {
    var randomWords = wordsSet.getRandomWords()
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

    levelVisualContainer.empty()
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
        if (wordsSet.checkWords(wordsValues)) {
            levelCompleted = true
            runCompleteAnimation()
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
        console.log('onTouchEnd')
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

    function runCompleteAnimation() {
        var DELAY = 50
        for (var i = 0; i < sortedWords.length; i++) {
            var currentDelay = DELAY * (i + 1)
            setTimeout(i => {
                sortedWords[i].markAsCompleted()
            }, currentDelay, i)
        }
        showCompleteLabel(100)
    }

    function showCompleteLabel(showDelay) {
        var completeLabel = $('<div class="levelBox_completedLabel"><span>Level completed<br>Tap to continue</span></div>')
        levelVisualContainer.append(completeLabel)
        levelVisualContainer.one('touchstart', () => {
            completeLabel.css('opacity', 0)
            hideWords()
        })
        setTimeout(() => {
            completeLabel.css('opacity', 1)
        }, showDelay)
    }

    function hideWords() {
        var DELAY = 50
        for (var i = 0; i < sortedWords.length; i++) {
            var currentDelay = DELAY * (sortedWords.length - i)
            setTimeout(i => {
                sortedWords[i].hide(docHeight)
            }, currentDelay, i)
        }
        sequenceSortedListener()
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
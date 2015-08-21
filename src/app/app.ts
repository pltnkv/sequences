import refs = require("refs/refs")
import Word = require("app/Word")

var SPACE_BETWEEN_WORDS = 5
var mainContainer = $('#seqBox')
var wordsValues = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']

disableDocumentScrolling()
createWords(wordsValues)

//идеи
// подключить TS

//расставать через position absolute
function createWords(wordsValues) {
	var $document = $(document)
	var docHeight = window.innerHeight
	var wordsCount = wordsValues.length
	var visualHeight = (docHeight / wordsCount) - SPACE_BETWEEN_WORDS
	var currentWord:Word = null
	var deltaY = 0
	var minYPosition = 0
	var maxYPosition = (visualHeight + SPACE_BETWEEN_WORDS) * (wordsCount - 1) + SPACE_BETWEEN_WORDS
	var sortedWords = []
	var currentWordPosition:number
	var positionsRanges = []

	createPositionsRanges()
	createWords()
	redrawSortedWords()

	function createWords() {
		for (var i = 0; i < wordsValues.length; i++) {
			var word = new Word(wordsValues[i], visualHeight)
			word.visual.on('touchstart', onTouchStart)
			mainContainer.append(word.visual)
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
		//todo игнорировать остльные нажатия
		console.log('onTouchStart', e)
		var target = $(e.currentTarget)
		if (target.hasClass('word')) {
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

function disableDocumentScrolling() {
	document.addEventListener('touchstart', function (e) {
		e.preventDefault()
	})
}
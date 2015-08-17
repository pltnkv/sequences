var mainContainer = $('#seqBox')
var words = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet']


createWords(words)

//расставать через position absolute
function createWords(words) {
	var docHeight = window.innerHeight
	var wordsCount = words.length
	var elHeight = window.innerHeight / words.length
	words.forEach(function (word) {
		addWord(word)
	})


	function addWord(word) {
		var wordElement = $('<div class="word"><span>' + word + '</span></div>')
		wordElement.css('height', (elHeight - 5) + 'px')

		mainContainer.append(wordElement)
	}
}



import refs = require("refs/refs")

class Word {

	private _yPosition

	value
	height
	visual
	selected

	constructor(value, height) {
		this.value = value
		this.height = height
		this.visual = $('<div class="word"><span style="line-height: ' + Math.ceil(height) + 'px">' + value + '</span></div>')
		this.visual.css({height: Math.ceil(height)})
		this.selected = false
	}

	setY(y) {
		if (this._yPosition != y) {
			this._yPosition = y
			this.visual.css('top', y)
		}
	}

	getY(y) {
		this._yPosition = y
	}

	setSelection(value) {
		this.selected = value
		if (this.selected) {
			this.visual.addClass('word-selected')
		} else {
			this.visual.removeClass('word-selected')
		}
	}

	markAsCompleted() {
		this.visual.addClass('word-completed')
	}
}

export = Word
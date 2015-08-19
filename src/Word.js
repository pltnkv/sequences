function Word(value, height) {
	this.value = value
	this.height = height
	this.visual = $('<div class="word"><span style="line-height: ' + Math.ceil(height) + 'px">' + value + '</span></div>')
	this.visual.css({height: Math.ceil(height)})
	this.selected = false
}

Word.prototype.setY = function (y) {
	if (this._yPosition != y) {
		this._yPosition = y
		this.visual.css('top', y)
	}
}

Word.prototype.getY = function (y) {
	this._yPosition = y
}

Word.prototype.setSelection = function (value) {
	this.selected = value
	if (this.selected) {
		this.visual.addClass('word-selected')
	} else {
		this.visual.removeClass('word-selected')
	}
}
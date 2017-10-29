function Sprite() {
	this.symbols = [];
}

Sprite.prototype.add = function(image) {
	this.symbols.push(image);
};

Sprite.styles = ['position:absolute', 'width:0', 'height:0', 'visibility:hidden'];

Sprite.prototype.render = function() {
	return [
		`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="${Sprite.styles.join(
			';',
		)}">`,
		'<defs>',
		this.symbols.join(''),
		'</defs>',
		'</svg>',
	].join('');
};

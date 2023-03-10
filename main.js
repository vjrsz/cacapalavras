const display = document.getElementById("display");
const size = { w: 9, h: 9 };

class Word {
	static id = 0;

	constructor(text) {
		this.id = Word.id++;
		this.text = text;
		this.x = 0;
		this.y = 0;
		this.o = 0; // orientation
		this.w = text.length;
	}

	get x2() {
		if (this.o == 1) {
			return this.x + this.w;
		}
		return this.x;
	}
	get y2() {
		if (this.o == 2) {
			return this.y + this.w;
		}
		return this.y;
	}

	getAllPoints() {
		let points = [];

		if (this.o == 1) {
			for (let i = this.x; i < this.x2; i++) {
				points.push({ x: i, y: this.y });
			}
		}
		if (this.o == 2) {
			for (let i = this.y; i < this.y2; i++) {
				points.push({ x: this.x, y: i });
			}
		}

		return points;
	}

	atWord(word) {
		if (!this.o) return false;

		let collision = false;

		word.getAllPoints().forEach((coordWord) => {
			this.getAllPoints().forEach((coordThis) => {
				if (coordThis.x == coordWord.x && coordThis.y == coordWord.y) {
					collision = true;
					return;
				}
			});
		});

		return collision;
	}
}

const words = [new Word("vue"), new Word("rea"), new Word("ang")];

(function createCoordWords() {
	function wordAtWord(word) {
		collision = false;
		words.forEach((word_compare) => {
			if (word_compare.id != word.id) {
				if (word_compare.atWord(word)) {
					collision = true;
					return;
				}
			}
		});

		return collision;
	}

	words.forEach(function (word) {
		while (1) {
			x = Math.floor(Math.random() * size.w);
			y = Math.floor(Math.random() * size.h);
			o = Math.floor(Math.random() * 2) + 1; //orientation of word 1 - landscape | 2 - portrait
            
			if (
				(o == 1 && x + word.w < size.w) ||
				(o == 2 && y + word.w < size.h)
			) {
				word.x = x;
				word.y = y;
				word.o = o;

                if (!wordAtWord(word)) break;
			}
		}
	});
	console.log(words);
})();

(function show() {
	for (let y = 0; y <= size.h; y++) {
		for (let x = 0; x <= size.w; x++) {
			letter = wordAtPosition(x, y);
			addWord(letter, x, y);
		}
	}
})();

function wordAtPosition(x, y) {
    const characters = 'abcdefghijklmnopqrstuvwxyz';

	letter = characters.charAt(Math.floor(Math.random() * characters.length));
	words.forEach(function (word) {
		if (word.o == 1) { //landscape letter
			if (x >= word.x && x < word.x2 && y == word.y ) {
				pos = x - word.x;
                letter = word.text[pos];
			}
		} else if (word.o == 2) { //portrait letter
            if (y >= word.y && y < word.y2 && x == word.x ) {
				pos = y - word.y;
                letter = word.text[pos];
			}
		}
	});

	return letter;
}

function addWord(word, x, y) {
	let div = document.createElement("div");
	div.setAttribute("x", x);
	div.setAttribute("y", y);
	div.innerHTML = word;
	display.appendChild(div);
}


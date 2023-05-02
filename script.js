import {keyButtons} from './assets/jsons/keys.js';

if (!sessionStorage.getItem('language')) sessionStorage.setItem('language', 'En');

let textArea = document.createElement('textarea');
textArea.classList = 'textarea';
textArea.placeholder = 'Switch language Shift+Alt';
textArea.contentEditable = 'false';
textArea.autoFocus = 'true';
let createDiv = document.createElement('div');
createDiv.classList = 'keyboard';
let createRow = document.createElement('div');
createRow.classList = 'row';
let textCursor = 0;
let isActive = {
	shift: false,
	capsLock: false,
	ctrl: false,
	alt: false,
};

window.onload = function () {
	document.body.appendChild(createDiv);
	document.getElementsByClassName('keyboard')[0].appendChild(textArea);
	renderButton();
};

document.onkeydown = function (e) {
	e.preventDefault();

	if (e.key === 'Backspace') {
		textArea.value = textArea.value.substring(0, textCursor - 1) + textArea.value.substring(textCursor, textArea.value.length);
		if (textCursor === 0) return;
		textCursor--;
	} else if (e.key === 'Delete') {
		textArea.value = textArea.value.substring(0, textCursor) + textArea.value.substring(textCursor + 1, textArea.value.length);
		if (textCursor === 0) return;
	} else if (e.key === 'Enter') {
		textArea.value = textArea.value.substring(0, textCursor) + '\n' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.key === 'Space') {
		textArea.value = textArea.value.substring(0, textCursor) + ' ' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.key === 'Tab') {
		textArea.value = textArea.value.substring(0, textCursor) + '\t' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.key === 'Shift') {
		isActive.shift = !isActive.shift;
		if (isActive.alt) {
			if (sessionStorage.getItem('language') === 'En') sessionStorage.setItem('language', 'Ru');
			else if (sessionStorage.getItem('language') === 'Ru') sessionStorage.setItem('language', 'En');
			isActive.alt = !isActive.alt;
			isActive.shift = !isActive.shift;
		}
		renderButton();
	} else if (e.key === 'Alt') {
		isActive.alt = !isActive.alt;
		if (isActive.shift) {
			if (sessionStorage.getItem('language') === 'En') sessionStorage.setItem('language', 'Ru');
			else if (sessionStorage.getItem('language') === 'Ru') sessionStorage.setItem('language', 'En');
			isActive.shift = !isActive.shift;
			isActive.alt = !isActive.alt;
		}
		renderButton();
	} else if (e.key === 'Control') {
		isActive.ctrl = !isActive.ctrl;
		renderButton();
	} else if (e.key === 'CapsLock') {
		isActive.capsLock = !isActive.capsLock;
		renderButton();
		if (isActive.capsLock) document.getElementById('CapsLock').classList.add('active');
	} else if (e.key === 'ArrowUp') {
		textCursor = textArea.value.lastIndexOf('\n', textCursor - 1);
		if (textCursor <= 0) textCursor = 0;
	} else if (e.key === 'ArrowRight') {
		textCursor++;
		if (textCursor >= textArea.value.length) textCursor = textArea.value.length;
	} else if (e.key === 'ArrowDown') {
		textCursor = textArea.value.indexOf('\n', textCursor + 1);
		if (textCursor >= textArea.value.length || textCursor <= 0) textCursor = textArea.value.length;
	} else if (e.key === 'ArrowLeft') {
		textCursor--;
		if (textCursor <= 0) textCursor = 0;
	} else if (e.key !== 'Meta') {
		if (document.getElementById(e.code)) {
			textArea.value = textArea.value.substring(0, textCursor) + e.key + textArea.value.substring(textCursor, textArea.value.length);
			textCursor++;
		}
	}
	if (document.getElementById(e.code)) {
		document.getElementById(e.code).classList.add('pressed');
	}
	setTimeout(() => {
		textArea.setSelectionRange(textCursor, textCursor);
		textArea.focus();
	}, 10);
};

document.onkeyup = function (e) {
	if (document.getElementById(e.code)) {
		document.getElementById(e.code).classList.remove('pressed');
	}
};

function render(arr) {
	if (arr.type === 'functional') return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.keyValue + '</button>';
	if (sessionStorage.getItem('language') === 'En') {
		if (isActive.shift) return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.altValueEn + '</button>';
		if (isActive.capsLock) return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.keyValueEn.toUpperCase() + '</button>';
		return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.keyValueEn + '</button>';
	} else if (sessionStorage.getItem('language') === 'Ru') {
		if (isActive.shift) return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.altValueRu + '</button>';
		if (isActive.capsLock) return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.keyValueRu.toUpperCase() + '</button>';
		return '<button ' + 'id=' + arr.code + ' class=' + arr.type + '>' + arr.value.keyValueRu + '</button>';
	}
}

function symbolButtons(e) {
	textArea.value = textArea.value.substring(0, textCursor) + e.target.innerText + textArea.value.substring(textCursor, textArea.value.length);
	setTimeout(() => {
		textArea.setSelectionRange(textCursor, textCursor);
		textArea.focus();
	}, 10);
	textCursor++;
}

function functionalButtons(e) {
	if (e.target.id === 'Backspace') {
		textArea.value = textArea.value.substring(0, textCursor - 1) + textArea.value.substring(textCursor, textArea.value.length);
		if (textCursor === 0) return;
		textCursor--;
	} else if (e.target.id === 'Delete') {
		textArea.value = textArea.value.substring(0, textCursor) + textArea.value.substring(textCursor + 1, textArea.value.length);
		if (textCursor === 0) return;
	} else if (e.target.id === 'Enter') {
		textArea.value = textArea.value.substring(0, textCursor) + '\n' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.target.id === 'Space') {
		textArea.value = textArea.value.substring(0, textCursor) + ' ' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.target.id === 'Tab') {
		textArea.value = textArea.value.substring(0, textCursor) + '\t' + textArea.value.substring(textCursor, textArea.value.length);
		textCursor++;
	} else if (e.target.innerText === 'Shift') {
		isActive.shift = !isActive.shift;
		if (isActive.alt) {
			if (sessionStorage.getItem('language') === 'En') sessionStorage.setItem('language', 'Ru');
			else if (sessionStorage.getItem('language') === 'Ru') sessionStorage.setItem('language', 'En');
			isActive.alt = !isActive.alt;
			isActive.shift = !isActive.shift;
		}
		renderButton();
	} else if (e.target.innerText === 'Alt') {
		isActive.alt = !isActive.alt;
		if (isActive.shift) {
			if (sessionStorage.getItem('language') === 'En') sessionStorage.setItem('language', 'Ru');
			else if (sessionStorage.getItem('language') === 'Ru') sessionStorage.setItem('language', 'En');
			isActive.shift = !isActive.shift;
			isActive.alt = !isActive.alt;
		}
		renderButton();
	} else if (e.target.innerText === 'Ctrl') {
		isActive.ctrl = !isActive.ctrl;
		renderButton();
	} else if (e.target.id === 'CapsLock') {
		isActive.capsLock = !isActive.capsLock;
		renderButton();
		if (isActive.capsLock) document.getElementById('CapsLock').classList.add('active');
	} else if (e.target.id === 'ArrowUp') {
		textCursor = textArea.value.lastIndexOf('\n', textCursor - 1);
		if (textCursor <= 0) textCursor = 0;
	} else if (e.target.id === 'ArrowRight') {
		textCursor++;
		if (textCursor >= textArea.value.length) textCursor = textArea.value.length;
	} else if (e.target.id === 'ArrowDown') {
		textCursor = textArea.value.indexOf('\n', textCursor + 1);
		if (textCursor >= textArea.value.length || textCursor <= 0) textCursor = textArea.value.length;
	} else if (e.target.id === 'ArrowLeft') {
		textCursor--;
		if (textCursor <= 0) textCursor = 0;
	}
	setTimeout(() => {
		textArea.setSelectionRange(textCursor, textCursor);
		textArea.focus();
	}, 10);
}

function renderButton() {
	const rowElements = document.querySelectorAll('.row');
	if (rowElements) {
		for (const rowElement of rowElements) {
			rowElement.remove();
		}
	}
	let counter = 0;
	for (const row of keyButtons) {
		document.getElementsByClassName('keyboard')[0].appendChild(createRow.cloneNode(true));
		for (const rowElement of row) {
			document.getElementsByClassName('row')[counter].innerHTML += render(rowElement);
		}
		counter++;
	}
	for (const e of document.getElementsByClassName('symbol')) {
		e.addEventListener('mousedown', (e) => {
			symbolButtons(e);
			e.target.classList.add('pressed');
		});
		e.addEventListener('mouseup', (e) => {
			e.target.classList.remove('pressed');
		});
	}
	for (const e of document.getElementsByClassName('functional')) {
		e.addEventListener('mousedown', (e) => {
			functionalButtons(e);
			e.target.classList.add('pressed');
		});
		e.addEventListener('mouseup', (e) => {
			e.target.classList.remove('pressed');
		});
	}
	if (isActive.shift) {
		document.getElementById('ShiftLeft').classList.add('active');
		document.getElementById('ShiftRight').classList.add('active');
	}
	if (isActive.ctrl) {
		document.getElementById('ControlLeft').classList.add('active');
		document.getElementById('ControlRight').classList.add('active');
	}
	if (isActive.alt) {
		document.getElementById('AltLeft').classList.add('active');
		document.getElementById('AltRight').classList.add('active');
	}
	if (isActive.capsLock) document.getElementById('CapsLock').classList.add('active');
}
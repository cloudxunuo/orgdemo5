function onFocus(input) {
	if (input.value == input.defaultValue) {
		input.value = '';
		input.style.color = '#000';
	}
}

function onBlur(input) {
	if (!input.value) {
		input.value = input.defaultValue;
		input.style.color = '#999';
	}
}
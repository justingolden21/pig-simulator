function validate(name, defaultVal) {
	let elm = document.getElementById(name);
	let val = check(elm.value, elm.min, elm.max, defaultVal);
	elm.value = val;
	return val;
}
function check(num, min, max, defaultVal) {
	num = Math.max(Math.min(parseInt(num), max), min);
	return isNaN(num) ? defaultVal : num;
}

function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
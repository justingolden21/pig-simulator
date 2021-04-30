window.onload = ()=> {
	u('#start-btn').on('click', ()=> {
		u('#output').html('Calculating...');
		const aimFor = validate('aim-for', 20);
		const numSimulations = validate('num-simulations', 10000);

		let result = simulateMany(aimFor, numSimulations);

		u('#output').html(`Aimed for ${aimFor} and performed ${numSimulations} trials.
			<br>Total: ${result}
			<br>Average: ${result/numSimulations}`);
	});
};

function simulateMany(aimFor, numSimulations) {
	let total = 0;
	for(let i=0; i<numSimulations; i++) {
		total += simulate(aimFor);
	}
	return total;
}

function simulate(aimFor) {
	let roll = randomInt(1,6);
	let total = roll;
	while(roll != 1 && total < aimFor) {
		roll = randomInt(1,6);
		total += roll;
	}
	return roll==1 ? 0 : total;
}

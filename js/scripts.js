window.onload = ()=> {
	u('#start-btn').on('click', ()=> {
		const aimFor = validate('aim-for', 20);
		const numSimulations = validate('num-simulations', 10000);

		const result = simulateMany(aimFor, numSimulations);

		u('#output').html(`Aimed for <b>${aimFor}</b> and performed <b>${numSimulations}</b> trials.
			<br>Total: <b>${result}</b>
			<br>Average: <b>${result/numSimulations}</b>`);
	});

	u('#start-all-btn').on('click', ()=> {
		const numSimulations = validate('num-simulations', 10000);

		let results = [];
		let output = `Performed <b>${numSimulations}</b> trials.<br>`;
		for(let aimFor=2; aimFor<50; aimFor++) {
			const result = simulateMany(aimFor, numSimulations);
			results.push(result);
			output += `Aimed for <b>${aimFor}</b> and averaged <b>${result/numSimulations}</b> <div style="background: #0D47A1; height: 8px; width: ${result/numSimulations*100}px"></div>`;
		}

		u('#output').html(output);
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

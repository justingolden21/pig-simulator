let diceRolled;

window.onload = ()=> {

	u('#start-btn').on('click', ()=> {
		diceRolled = 0;
		const aimFor = validate('aim-for', 20);
		const numSimulations = validate('num-simulations', 10000);

		const diceSides = validate('dice-sides', 6);
		u('#lose-on').attr('max', diceSides);
		const loseOn = validate('lose-on', 1);

		const result = simulateMany(aimFor, numSimulations, diceSides, loseOn);
		u('#output').html(`Aimed for <b>${aimFor}</b> and performed <b>${numSimulations}</b> trials.
			<br>Total: <b>${result}</b>
			<br>Average: <b>${result/numSimulations}</b>
			<br>Settings: ${diceSides} sided dice, lose on ${loseOn}
			<br><small>(rolled ${diceRolled} dice)</small>`);
	});

	u('#start-all-btn').on('click', ()=> {
		diceRolled = 0;
		const numSimulations = validate('num-simulations', 10000);

		const diceSides = validate('dice-sides', 6);
		u('#lose-on').attr('max', diceSides);
		const loseOn = validate('lose-on', 1);

		let output = `Performed <b>${numSimulations}</b> trials.<br>`;
		for(let aimFor=2; aimFor<=100; aimFor++) {
			const result = simulateMany(aimFor, numSimulations, diceSides, loseOn);
			output += `Aimed for <b>${aimFor}</b> and averaged <b>${result/numSimulations}</b> <div style="background: #0D47A1; height: 8px; width: ${result/numSimulations*100}px"></div>`;
		}

		u('#output').html(output + `<br>Settings: ${diceSides} sided dice, lose on ${loseOn}
			<br><small>(rolled ${diceRolled} dice)</small>`);
	});

	u('#dice-sides').on('change', ()=> {
		const diceSides = validate('dice-sides', 6);
		u('#lose-on').attr('max', diceSides);
	});
};

function simulateMany(aimFor, numSimulations, diceSides, loseOn) {
		console.log(diceSides, loseOn)
	let total = 0;
	for(let i=0; i<numSimulations; i++) {
		total += simulate(aimFor, diceSides, loseOn);
	}
	return total;
}

function simulate(aimFor, diceSides, loseOn) {
	let total = 0, roll;
	do {
		roll = randomInt(1, diceSides);
		total += roll;
		diceRolled++;
	} while(roll != loseOn && total < aimFor);
	return roll == loseOn ? 0 : total;
}

function getRange() {
	let now = new Date();
	let then = new Date(now);
	if (rangeSel.value === "week1") {
		then.setDate(now.getDate() - 7); 
	}
	else if (rangeSel.value === "week2") {
		then.setDate(now.getDate() - 14); 
	}
	else if (rangeSel.value === "month1") {
		then.setMonth(now.getMonth() - 1);
		if (then.getDate() !== now.getDate()) {
			then.setDate(0); 
		}
	}
	else if (rangeSel.value === "month3") {
		then.setMonth(now.getMonth() - 3);
		if (then.getDate() !== now.getDate()) {
			then.setDate(0); 
		}
	}
	else if (rangeSel.value === "month6") {
		then.setMonth(now.getMonth() - 6);
		if (then.getDate() !== now.getDate()) {
			then.setDate(0); 
		}
	}
	else if (rangeSel.value === "year1") {
		then.setFullYear(now.getFullYear() - 1);
		if (then.getDate() !== now.getDate()) {
			then.setDate(0); 
		}
	}
	else if (rangeSel.value === "all") {
		then = new Date(1970, 0);
	}
	else if (rangeSel.value === "custom") {
		if (startDate.value) {
			then = new Date(startDate.value);
		}
		else {
			then = new Date(1970, 0);
		}
		if (endDate.value) {
			now = new Date(startDate.value);
		}
	}
	return [then, now];
}

function onRange() {
	if (rangeSel.value === "custom") {
		startLabel.style.display = "inline";
		startDate.style.display = "inline";
		endLabel.style.display = "inline";
		endDate.style.display = "inline";
	}
	else {
		startLabel.style.display = "none";
		startDate.style.display = "none";
		endLabel.style.display = "none";
		endDate.style.display = "none";
	}
	graph();
}
let minX = "2970-00-00T00:00:00";
let maxX = "1970-00-00T00:00:00";
let maxY = -1;
const size = 10;
const gridcolor = '#aaaaaa';

function emptyScatter(name, color) {
	return {
		x: [],
		y: [],
		mode: 'markers',
		type: 'scatter',
		name: name,
		text: [],
		marker: { 
			color: color,
			size: size
		},
		hovertemplate: '%{y}<br>%{text}' 
	};
}

function addToScatter(scatter, node, col, view) {
	if (node[col]) {
		if (node[col] > maxY) {
			maxY = node[col]
		}
		if (view === "day") {
			scatter["x"].push(node["hour"]);
		}
		else if (view === "week") {
			scatter["x"].push(node["weekday"]);
		}
		else {
			scatter["x"].push(node["time"]);
			if (node["time"] > maxX) {
				maxX = node["time"];
			}
			if (node["time"] < minX || minX === -1) {
				minX = node["time"];
			}
		}
		scatter["y"].push(node[col]);
		scatter["text"].push(node["time"]);
	}
	return scatter;
}

function buildLayout(view) {
	let xaxis = {
		fixedrange: true,
		gridcolor: gridcolor
	};
	if (view === "day") {
		xaxis.range = [0, 24];
		xaxis.dtick = 1;
	}
	if (view === "week") {
		xaxis.range = [0, 7];
		// tickvals: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5],
		// ticktext: ["Sunday", "12", "Monday", "12", "Tuesday", "12", "Wednesday", "12", "Thursday", "12", "Friday", "12", "Saturday", "12"],
		xaxis.tickvals = [0, 0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2, 2.25, 2.5, 2.75, 3, 3.25, 3.5, 3.75, 4, 4.25, 4.5, 4.75, 5, 5.25, 5.5, 5.75, 6, 6.25, 6.5, 6.75, 7];
		xaxis.ticktext = ["0", "6", "Sunday", "18", "0", "6", "Monday", "18", "0", "6", "Tuesday", "18", "0", "6", "Wednesday", "18", "0", "6", "Thursday", "18", "0", "6", "Friday", "18", "0", "6", "Saturday", "18", "0"];
	}
	else {
		xaxis.range = [minX, maxX];
	}
	const yaxis = {
		range: [0, maxY + size],
		fixedrange: true,
		gridcolor: gridcolor
	}
	return {
		xaxis: xaxis,
		yaxis: yaxis
	};
}

function graph() {
	let [start, end] = getRange();
	let view = displaySel.value;

	minX = "2970-00-00T00:00:00";
	maxX = "1970-00-00T00:00:00";
	maxY = -1;
	
	let ons = emptyScatter("on", '#2ca02c');
	let highs = emptyScatter("high", '#1f77b4');
	let lows = emptyScatter("low", '#ff7f0e');
	
	for (const sugar of sugars) {
		const sugarTime = new Date(sugar["epoch"] * 1000);
		if (sugarTime > start && sugarTime < end) {
			addToScatter(ons, sugar, "sugar", view);
			addToScatter(highs, sugar, "high", view);
			addToScatter(lows, sugar, "low", view);
		}
		else if (sugarTime < start) {
			break
		}
	}

	const data = [ons, highs, lows];
	const layout = buildLayout(view);
	const config = {displayModeBar: false};
	Plotly.newPlot(grapher, data, layout, config);
}

window.addEventListener('resize', (event) => {
    graph();
});
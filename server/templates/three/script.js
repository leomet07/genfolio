window.onload = async function () {
	let app = document.getElementById("typewriter_div");

	let typewriter = new Typewriter(app, {
		loop: true,
	});

	const span_elements = document.getElementsByClassName("hidden_span");
	const spans = [];
	for (const span of span_elements) {
		spans.push(span.innerHTML);
	}

	typewriter
		.typeString(spans[0])
		.pauseFor(2500)
		.deleteAll()
		.typeString(spans[1])
		.pauseFor(2500)
		.deleteAll()
		.typeString(spans[2])
		.pauseFor(2500)
		.start();
};

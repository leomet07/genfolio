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

	for(let i = 0; i < spans.length; i++) {
		typewriter.typeString(spans[i]);
		typewriter.pauseFor(1500);
		typewriter.deleteAll();
	}
	typewriter.start();
	
};

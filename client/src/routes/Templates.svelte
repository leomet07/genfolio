<div class="root">
	<div class="grid-container">
		<div class="item1">Header</div>
		<div class="item2">Template 1</div>
		<div class="item3">Template 2</div>
		<div class="item4">Template 3</div>
	</div>
</div>

<!--Working on styling for this page-->
<style>
	.root {
		height: 100vh;
		width: 100vw;
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
	}
	.item1 {
		grid-area: header;
	}
	.item2 {
		grid-area: t1;
	}
	.item3 {
		grid-area: t2;
	}
	.item4 {
		grid-area: t3;
	}

	.grid-container {
		height: 100vh;
		width: 100vw;
		display: grid;
		grid-template-areas:
			"header header header header header header"
			"t1 t1 t2 t2 t3 t3"
			"t1 t1 t2 t2 t3 t3"
			"t1 t1 t2 t2 t3 t3";
		gap: 10px;
		background-color: #2196f3;
	}

	.grid-container > div {
		background-color: rgba(255, 255, 255, 0.8);
		text-align: center;
		padding: 20px 0;
		font-size: 30px;
	}
	#templatebutton {
		background-color: #c25eff;
		border: none;
		color: white;
		padding: 15px 32px;
		text-align: center;
		text-decoration: none;
		display: inline-block;
		font-size: 16px;
		margin: 30px;
		border-radius: 7px;
	}
	.description {
		width: 50%;
		color: #b2bac2;
		font-family: "IBM Plex Mono", sans-serif;
	}
	.header {
		color: white;
		font-size: 2em;
		font-weight: bold;
		text-align: center;
	}

	.gradient {
		color: white;
		font-family: "Inter", sans-serif;
		font-weight: 800;
		font-size: 5rem;
	}
</style>

<script>
</script>

<div class="root">
	<div class="item1">Choose a Template</div>
	<div class="grid-container">
		<div class="grid-item">
			<p class="ttext">Template 1 Name</p>
			<button
				class="templatebutton"
				onclick="
			location.href='templates/1';
			">Use</button
			>
		</div>
		<div class="grid-item">
			<p class="ttext">Template 2 Name</p>
			<button
				class="templatebutton"
				onclick="
			location.href='templates/2';
			">Use</button
			>
		</div>
		<div class="grid-item">
			<p class="ttext">Template 3 Name</p>
			<button
				class="templatebutton"
				onclick="
			location.href='templates/3';
			">Use</button
			>
		</div>
	</div>
</div>

<!--
1. Style the title
2. Style the grid (90% should be preview image, and the other 10% should be the button, and a title) or anim (PAIN)
-->
<style>
	.root {
		height: 100vh;
		width: 100vw;
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}

	.grid-container {
		display: grid;
		width: 70%;
		grid-template-columns: 1fr 1fr 1fr;
		grid-gap: 10px;
		margin: 0;
		padding: 0;
	}
	.templatebutton {
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
		font-family: "Inter";
		font-weight: 500;
		opacity:0;
		transition: opacity 0.5s;
	}
	.grid-item:hover .ttext {
		opacity: 1;
	}
	.grid-item:hover .templatebutton {
		opacity: 1;
	}
	.ttext {
		opacity: 0;
		transition: opacity 0.5s;
	}

	.grid-item {
		height: 50vh;
		background-color: blue;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
</style>

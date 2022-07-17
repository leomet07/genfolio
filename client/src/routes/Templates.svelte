<script>
	import { templateid } from "../store";
	import { navigate } from "svelte-routing";
	function goToTemplate(where) {
		$templateid = where;
		console.log($templateid);
		navigate("/editor", { replace: true });
	}
</script>

<svelte:head>
	<title>Templates</title>
</svelte:head>

<div class="root">
	<div class="title">Choose a Template</div>
	<div class="grid-container">
		<div
			class="grid-item"
			style="background-image: url('/img/previews/one.png');"
		>
			<p class="ttext">Big background!</p>
			<button
				class="templatebutton"
				on:click={() => {
					goToTemplate("one");
				}}>Use</button
			>
		</div>
		<div
			class="grid-item"
			style="background-image: url('/img/previews/two.png');"
		>
			<p class="ttext">Solarized</p>
			<button
				class="templatebutton"
				on:click={() => {
					goToTemplate("two");
				}}>Use</button
			>
		</div>
		<div
			class="grid-item"
			style="background-image: url('/img/previews/three.png');"
		>
			<p class="ttext">Dracula</p>
			<button
				class="templatebutton"
				on:click={() => {
					goToTemplate("three");
				}}>Use</button
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
		min-height: 100vh;
		width: 100%;
		background-color: black;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 0;
		padding: 0;
	}
	button:hover {
		cursor: pointer;
	}
	.title {
		color: white;
		font-size: 2em;
		font-weight: bold;
		text-align: center;
		font-family: "Inter", sans-serif;
		font-weight: 800;
		font-size: 4rem;
		padding: 3%;
	}
	.grid-container {
		display: grid;
		width: 80%;
		margin: 0;
		padding: 0;
		justify-content: center;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		margin-bottom: 30px;
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
		opacity: 0;
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
		color: white;
	}

	.grid-item {
		height: 241px;
		width: 469px;
		background-color: blue;
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 10px;
		border: 1px solid rgb(39, 36, 36);
		border-radius: 3%;
		background-position: center;
	}
</style>

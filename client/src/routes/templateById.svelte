<script>
	let bio = "";
	let name = "";
	let githubLink = "";
	let currentString = "";
	let strings = [];
	import { github_username } from "../store";
	import About from "./About.svelte";
	// import A1 from "./templates/1.svelte";
	import fetch_user_data from "../helpers/fetch_user_data";
	import { onMount } from "svelte";
	$github_username = "Test";

	onMount(async () => {
		const user_data = await fetch_user_data("leomet07");

		console.log(user_data);
	});
</script>

<svelte:head>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="root">
	<div class="editor">
		<h1 class="header">Editor</h1>

		<div class="divider" />
		<div class="info">
			<label class="label">First Name</label>
			<input
				bind:value={name}
				class="input"
				type="text"
				placeholder="First Name"
			/>
			<label class="label">Bio</label>
			<textarea
				bind:value={bio}
				class="input"
				placeholder="ex. I'm a student as x and I am currently building y"
			/>
			<label class="label">Github Link</label>
			<input
				bind:value={githubLink}
				class="input"
				type="text"
				placeholder="ex. https://github.com/jmurphy5613"
			/>

			<label class="label">Animated Strings Input</label>
			<div class="strings-input">
				<input
					bind:value={currentString}
					class="input"
					type="text"
					placeholder="software engineer"
				/>
				<button
					class="add"
					on:click={() => {
						if (currentString.length > 0) {
							// strings.push(currentString);
							strings = [...strings, currentString];
							currentString = "";
							console.log(strings);
						}
					}}>+</button
				>
			</div>
			<div class="strings">
				{#each strings as string, index}
					<div style="display: flex; align-items: center">
						<span class="string-text">{string}</span>
						<button
							class="remove"
							on:click={() => {
								strings.pop(index);
								console.log(strings);
								strings = strings;
							}}>-</button
						>
					</div>
				{/each}
			</div>
			<button class="next-button">Next</button>
		</div>
	</div>
	<div class="preview">
		<!-- <h1 class="header">Preview</h1> -->
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Monodisplay=swap");

	.root {
		height: 100vh;
		width: 100vw;
		display: flex;
	}
	.editor {
		width: 50%;
		height: 100%;
		background-color: rgb(0, 0, 0);
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.preview {
		width: 50%;
		height: 100%;
		background-color: #212327;
		display: flex;
		justify-content: center;
	}
	.header {
		color: white;
		font-size: 2em;
		text-align: center;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 3rem;
	}
	.divider {
		width: 80%;
		height: 1px;
		background-color: #c25eff;
		margin-top: 1rem;
	}
	.info {
		width: 80%;
		display: flex;
		flex-direction: column;
		margin-top: 1rem;
	}
	.label {
		color: white;
		font-size: 1rem;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 1rem;
	}
	.input {
		/*create dark theme input*/
		background-color: #212327;
		color: white;
		font-size: 1rem;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 1rem;
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		width: 100%;
	}
	.strings-input {
		width: 100%;
		display: flex;
	}
	.add {
		background-color: #212327;
		color: white;
		border: none;
		margin-left: 1rem;
		width: 3rem;
		border-radius: 5px;
		margin-top: 1rem;
		font-family: "IBM Plex Mono", sans-serif;
	}
	.add:hover {
		background-color: #c25eff;
		cursor: pointer;
	}
	.string-text {
		color: white;
		width: 100%;
	}
	.strings {
		width: 100%;
		display: flex;
		margin-top: 1rem;
		flex-direction: column;
	}
	.remove {
		background-color: #212327;
		color: white;
		border: none;
		width: 3rem;
		border-radius: 5px;
		font-family: "IBM Plex Mono", sans-serif;
	}
	.remove:hover {
		background-color: #c25eff;
		cursor: pointer;
	}
	.next-button {
		position: absolute;
		bottom: 1rem;
		left: 25%;
		transform: translateX(-50%);
		width: 12rem;
		height: 2.5rem;
		background-color: #212327;
		border: none;
		color: white;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		border-radius: 1rem;
	}
	.next-button:hover {
		background-color: #c25eff;
		cursor: pointer;
	}

	textarea {
		resize:none;
	}
</style>

<script>
	let bio = "";
	let name = "";
	let githubLink = "";
	let currentString = "";
	let strings = [];
	let page = "page1";
	let repos = [];
	let repoSearch = "";
	let reposSelected = [];
	let sortedRepos = [];
	import { github_username, templateid } from "../store";
	import About from "./About.svelte";
	// import A1 from "./templates/1.svelte";
	import fetch_user_data from "../helpers/fetch_user_data";
	import { onMount } from "svelte";
	$github_username = "Test";

	const setSortedRepos = () => {
		console.log("sorting", repoSearch, repos);
		sortedRepos = repos.filter(element => {
			return element.name.toLowerCase().includes(repoSearch.toLowerCase());
		})
	}

	onMount(async () => {
		console.log($templateid)
		const user_data = await fetch_user_data("leomet07");
		repos = user_data.repos;
		sortedRepos = repos;
	});
</script>


<div class="root">
	<div class="editor">
		{#if page === "page1"}
			<button class="next-button" on:click={() => {page = "page2"}}>Next</button>

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
			</div>
		{/if}
		{#if page === "page2"}
			<h1 class="header">Select Projects</h1>
			<div class="divider" />
			<div class="info">
				<h2 class="repo-select-info"><spans style="color: #c25eff">{reposSelected.length}</spans> of 6 repos selected</h2>
				<input
					on:keyup={(e) => {
						repoSearch = e.target.value;
						setSortedRepos();
					}}
					class="input"
					type="text"
					placeholder="Search for your repo"
				/>
				<div class="repo-grid"> 
					{#each sortedRepos as repo, index}
						{#if index < 8}
						<!-- svelte-ignore a11y-mouse-events-have-key-events -->
						<div class="grid-item" 
							on:click={() => {
								if(reposSelected.includes(index)) {
									let id = reposSelected.indexOf(index);
									reposSelected.splice(id, 1);
									reposSelected = reposSelected;
								}
								else {
									reposSelected = [...reposSelected, index];
								}
							}}
						>
							<h3 class="repo-title">{repo.name}</h3>
							{#if reposSelected.includes(index)}
								<h4 style="color: #c25eff">selected</h4>
							{/if}
						</div>
						{/if}
					{/each}
				</div>
			</div>
			<button class="next-button" on:click={() => {page = "page2"}}>Next</button>
		{/if}


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
	.repo-grid {
		width: 100%;
		margin-top: 2rem;
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 2rem;
	}
	.grid-item {
		height: 10vh;
		background-color: rgb(18, 19, 30);
		display: flex;
		justify-content: center;
		align-items: center;
		border-radius: 1rem;
		transition: 0.25s;
		flex-direction: column;
	}
	.grid-item:hover {
		cursor: pointer;
		transform: scale(1.05);
	}
	.repo-title {
		color: white;
		font-size: 1rem;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
	}
	.repo-select-info {
		color: white;
		font-size: 1rem;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 1rem;
	}
	textarea {
		resize:none;
	}
</style>

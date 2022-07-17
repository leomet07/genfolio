<script>
	let bio = "";
	let name = "";
	let currentString = "";
	let strings = [];
	let page = "page1";
	let repos = [];
	let repoSearch = "";
	let reposSelected = [];
	let sortedRepos = [];
	import { navigate } from "svelte-routing";
	import {
		github_username,
		templateid,
		devpost_username,
		instagram_username,
		linkedin_username,
	} from "../store";

	import fetch_user_data from "../helpers/fetch_user_data";
	import submit_changes from "../helpers/submit_changes";
	import { onMount } from "svelte";

	const setSortedRepos = () => {
		console.log("sorting", repoSearch, repos);
		sortedRepos = repos.filter((element) => {
			return element.name
				.toLowerCase()
				.includes(repoSearch.toLowerCase());
		});
	};
	async function send_data() {
		console.log("Repos selected: ", reposSelected);
		const send_repos = reposSelected.map((v) => repos[v]);
		const data = {
			bio,
			name,
			tags: strings,
			repos: send_repos,
		};
		const site_url = await submit_changes(
			$github_username,
			$templateid,
			data
		);

		console.log(site_url);
		document.getElementById("preview_iframe").src += "";
	}
	onMount(async () => {
		console.log($templateid);
		if (!$templateid) {
			navigate("/templates", { replace: true });
		}

		// Handle the logic for when the user is typing
		let timer,
			timeoutVal = 1000;
		const handleKeyUp = async (e) => {
			window.clearTimeout(timer); // prevent errant multiple timeouts from being generated
			timer = window.setTimeout(async () => {
				console.log("All done typing!");
				await send_data();
			}, timeoutVal);
		};
		const handleKeyPress = async (e) => {
			window.clearTimeout(timer);
			console.log("Typing...");
		};
		const typer = document.getElementById("editor");
		typer.addEventListener("keypress", handleKeyPress);
		// triggers a check to see if the user is actually done typing
		typer.addEventListener("keyup", handleKeyUp);
	});
</script>

<svelte:head>
	<title>Editor</title>
</svelte:head>

<div class="root">
	<div id="editor">
		{#if page === "page1"}
			<button
				class="next-button"
				on:click={async () => {
					try {
						repos = (await fetch_user_data($github_username)).repos;
					} catch (e) {
						console.error(e);
						alert(
							"Something went wrong importing your github data! Check your username and try again."
						);
						return;
					}
					page = "page2";
					sortedRepos = repos;
				}}>Next</button
			>

			<h1 class="header">
				Editor for Template {$templateid.charAt(0).toUpperCase() +
					$templateid.slice(1)}
			</h1>
			<div class="divider" />
			<div class="info">
				<label for="first_name_form" class="label">First Name</label>
				<input
					bind:value={name}
					class="input"
					type="text"
					placeholder="First Name"
					id="first_name_form"
				/>
				<label for="bio_form" class="label">Bio</label>
				<textarea
					bind:value={bio}
					class="input"
					placeholder="ex. I'm a student as x and I am currently building y"
				/>
				<label for="username_form" class="label">Github Username</label>
				<input
					bind:value={$github_username}
					class="input"
					type="text"
					placeholder="ex. jmurphy5613"
				/>
				<label for="tag_form" class="label"
					>Animated Strings Input</label
				>
				<div class="strings-input">
					<input
						bind:value={currentString}
						class="input"
						type="text"
						placeholder="ex. software engineer"
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
				<h2 class="repo-select-info">
					<spans style="color: #c25eff">{reposSelected.length}</spans>
					repos selected, of up to 6
				</h2>
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
							<div
								class="grid-item"
								on:click={() => {
									if (reposSelected.includes(index)) {
										let id = reposSelected.indexOf(index);
										reposSelected.splice(id, 1);
										reposSelected = reposSelected;
									} else {
										reposSelected = [
											...reposSelected,
											index,
										];
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
			<button
				class="next-button"
				on:click={() => {
					if (reposSelected > 0) {
						send_data();
						page = "page3";
					} else {
						alert("You didn't select any of your Github repositories! Go back and add at least one.")
					}
				}}>Next</button
			>
		{/if}
		{#if page === "page3"}
			<h1 class="header">Other Platforms</h1>
			<div class="divider" />
			<h3 class="subheader">All of these are optional.</h3>
			<div class="info">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">Devpost Username</label>
				<input
					bind:value={$devpost_username}
					class="input"
					type="text"
					placeholder="ex. jmurphy5613"
				/>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">Instagram Username</label>
				<input
					bind:value={$instagram_username}
					class="input"
					type="text"
					placeholder="ex. jmurphy5613"
				/>
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="label">LinkedIn Username</label>
				<input
					bind:value={$linkedin_username}
					class="input"
					type="text"
					placeholder="ex. jmurphy5613"
				/>

				<button
					class="next-button"
					on:click={() => {
						console.log("The social media that was entered: ");
						send_data();
						page = "page4";
					}}>Finish</button
				>
			</div>
		{/if}
		{#if page === "page4"}
			<h1 class="header">Done!</h1>
			<h3 class="subheader">
				Your site is hosted, for free, at <a
					target="_blank"
					href={"https://genfolio.xyz/site/" + $github_username}
					>{"genfolio.xyz/site/" + $github_username}</a
				>
			</h3>
		{/if}
	</div>
	<div class="preview">
		<!-- <h1 class="header">Preview</h1> -->
		{#if $github_username}
			<iframe
				src={"https://genfolio.xyz/site/" + $github_username}
				title=""
				id="preview_iframe"
			/>
		{/if}
	</div>
</div>

<style>
	@import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Monodisplay=swap");

	.root {
		height: 100vh;
		width: 100vw;
		display: flex;
	}
	#editor {
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

	#preview_iframe {
		width: 100%;
		height: 98%;
	}

	.header {
		color: white;
		font-size: 2em;
		text-align: center;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 3rem;
	}
	.subheader {
		color: white;
		font-size: 1.4em;
		text-align: center;
		font-family: "IBM Plex Mono", sans-serif;
		font-weight: 400;
		margin-top: 1rem;
	}

	.subheader a {
		color: white;
		text-decoration: underline;
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
	.input:focus {
		outline: none;
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
		resize: none;
	}
</style>

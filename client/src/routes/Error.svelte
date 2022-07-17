<svelte:head>
	<title>Error</title>
</svelte:head>
<div class="root">
	<div class="title-container">
		<h1 class="title gradient">Error</h1>
		<h3 class="description">
			Looks like you're lost. <br />
			Would you like to go <a href="/">home</a>, or do you want to check
			out our <a href="/templates">templates</a>?
		</h3>
	</div>
</div>

<style>
	.root {
		display: flex;
		position: fixed;
		height: 100vh;
		width: 100vw;
		background-color: black;
		justify-content: center;
		align-items: center;
		margin: 0;
		padding: 0;
	}

	.description {
		width: 70%;
		color: #b2bac2;
		font-family: "IBM Plex Mono", sans-serif;
	}
	.title-container {
		width: 60%;
		text-align: center;
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
	}
	.title {
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

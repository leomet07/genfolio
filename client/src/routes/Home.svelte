<!-- The styling here is rough, but it doesn't matter right now (clean later)-->

<div class="root">
	<div class="title-container">
		<h1 class="title gradient" >
			create portfolio sites with ease
		</h1>
		<h3 class="description" >
			Don't waste your time creating a portfolio site. Use one of our
			templates and get your dream job.
		</h3>
		<a href="/templates" id="templatebutton" 
			>Templates</a
		>
	</div>
	<img src="/img/banner.jpg" class="logo" />
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
		font-family: "Inter", sans-serif;
		font-weight: 500;
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
	.logo {
		position: absolute;
		top: 0;
		left: 0;
		width: 10vw;
	}
</style>

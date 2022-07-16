<svelte:head>
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:wght@500;600;700;800&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@300;400&display=swap"
		rel="stylesheet"
	/>
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<script>
  import { firstName, bio } from '../store.js';
  import Typewriter from 'svelte-typewriter';
</script>

<div class="App">
	<a href="">
		<img alt="github" src="/img/github.png" class="github" />
	</a>

	<div class="main-content">
		<h1>
			<h3>Hey there, I'm {$firstName}.</h3>
      I'm a passionate 
      <Typewriter mode="loop">
          <span>web developer</span>
          <span>web designer</span>
          <span>web developer</span>
      </Typewriter>

			<h4>
        {$bio}
			</h4>
			<button class="projects-button">View Projects</button>
		</h1>
	</div>
</div>

<style>
	* {
		margin: 0;
	}

  span {
    position: relative;
    left: 22px;
  }

  span::after {
    width: 1px;
  }

	.App {
		background-color: #110912;
		width: 100%;
		min-height: 100vh;
		font-family: Inter;
		overflow-x: hidden;
		color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
	}

	.main-content {
		height: 100%;
		display: flex;
		max-width: 1200px;

		flex-direction: column;
		text-align: center;
	}

	h1 {
		min-width: 100%;
		height: 90%;
		min-width: 300px;
		padding: 0;
		display: flex;
		justify-content: center;
		flex-direction: column;
    align-items: center;
		font-size: 4rem;
		color: #eee;
		height: 100vh;
		z-index: 1;
	}

	canvas {
		position: absolute;
	}

	h3 {
		font-size: 2rem;
		padding: 0;
		margin: 0 0 1rem;
		color: #e879e9;
		font-family: "IBM Plex Mono", monospace;
		font-weight: 200;
	}

	h4 {
		color: #8892b0;
		font-size: 1.3rem;
		max-width: 80%;
		padding: 0;
		margin: 0;
		font-family: "IBM Plex Sans", sans-serif;
	}

	.projects-button {
		width: 25%;
		margin-top: 1rem;
		border: none;
		height: 2.5rem;
		background-color: white;
		color: black;
		font-family: "Inter";
		border-radius: 5px;
		font-weight: 700;
		transition: 0.5s;
		font-size: 1rem;
	}
	.projects-button:hover {
		background-color: #e879e9;
		color: white;
		cursor: pointer;
	}

	.project-container {
		height: 30vh;
		width: 30vw;
		border-radius: 5px;
		border: 1px solid white;
		background-image: url("/public/azol.png");
		background-size: cover;
		transition: 0.5s;
		margin-top: 2rem;
	}
	.project-container:hover {
		border: 1px solid #e879e9;
		cursor: pointer;
	}

	.projects-title {
		margin-bottom: 0;
	}

	.back {
		position: absolute;
		z-index: 999;
		top: 1rem;
		left: 1rem;
	}
	.back:hover {
		cursor: pointer;
	}

	.overlay {
		position: relative;
		background: rgba(0, 0, 0, 0.7);
		opacity: 0;
		transition: 0.3s;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.project-container:hover .overlay {
		opacity: 1;
	}

	.github {
		position: absolute;
		bottom: 1rem;
		height: 30px;
		width: 30px;
		left: 50%;
		transform: translateX(-50%);
		z-index: 999;
	}
	.github:hover {
		cursor: pointer;
	}

	.foward {
		position: absolute;
		top: 1rem;
		right: 1rem;
	}
	.foward:hover {
		cursor: pointer;
	}
</style>

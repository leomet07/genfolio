<!-- App.svelte -->
<script>
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import About from "./routes/About.svelte";
	import Templates from "./routes/Templates.svelte";
	import templateById from "./routes/templateById.svelte";
	import q1 from "./routes/q1.svelte";
	import preview from './routes/preview.svelte';
	export let url = "";
</script>

<Router {url}>
	<div id="render">
		<Route path="about" component={About} />
		<Route path="/"><Home /></Route>
		<Route path="templates" component={Templates} />
		<Route path="templates/:id" component={templateById} />
		<Route path="q1" component={q1} />
		<Route path="preview/:id" component={preview} />
	</div>
</Router>

<style>
	#navbar {
	}

	#render {
		width: 100%;
		height: 100%;
		margin: 0px;
		padding: 0px;
	}
</style>

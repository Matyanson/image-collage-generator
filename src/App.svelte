<script lang="ts">
import Gallery from "./components/Gallery/index.svelte";
import ImgUploader from "./components/ImgUploader.svelte";
import RedditUploader from "./components/RedditUploader/index.svelte";
import Collage from "./components/Collage/index.svelte";

</script>

<main>
	<h1>1. Choose images</h1>
	<RedditUploader />
	<ImgUploader />
	<h1>2. Manage images</h1>
	<Gallery />

	<h1>3. Generate Collage</h1>
	<Collage />
</main>

<style>
	main {
		text-align: center;
		padding: 0.9em;
		margin: 0 auto;
	}
	h1 {
		color: #ffdd00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
<script lang="ts">
import { xlink_attr } from "svelte/internal";

    import { images } from "../../store";
	import Item from "./Item.svelte";

	let selected: { [key: number]: boolean} = {};
    
	function deleteSelected() {
		const indexes = Object.entries(selected)
		.filter(x => x[1])
		.map(x => Number(x[0]));
		images.delete(...indexes);
		selected = {};
	}

	function invertSelection() {
		selected = Object.fromEntries($images.map((x, i) => [i, !selected[i]]));
	}
</script>

<div class="gallery">
    <div class="header">
		<button on:click={deleteSelected}>delete</button>
		<button on:click={() => selected = {}}>unselect</button>
		<button on:click={invertSelection}>invert selection</button>
    </div>
    <div class="content">
        {#each $images as image, i}
        <Item on:click={() => selected[i] = !selected[i]} data={image} selected={selected[i]} />
        {/each}
    </div>
</div>

<style>
    .content {
		display: flex;
		flex-flow: row wrap;
		justify-content: center;
		padding: 5px;
		background: hsl(348, 83%, 17%);
	}
</style>
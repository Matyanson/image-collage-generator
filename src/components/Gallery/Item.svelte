<script lang="ts">
import type { ImgData } from "../../models/ImgData";

    import { images } from "../../store";

    export let data: ImgData;
    export let selected: boolean;
</script>

<img class:selected on:click src={data.url} alt={data.name} />

<style>
    img {
		display: block;
		width: 150px;
		height: 150px;
		object-fit: cover;
		margin: 5px;
        cursor: pointer;
	}
    img:hover {
        outline: 5px solid crimson;
    }
    img.selected {
        outline: 5px solid hsl(43deg 74% 60%);
    }
</style>
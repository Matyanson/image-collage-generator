<script lang="ts">
import { onMount } from "svelte";

import { test } from "./generatorFunctions";
import { drawGridFit } from "./helper";

    let canvas: HTMLCanvasElement;
    let ctx: CanvasRenderingContext2D;
    onMount(() => {
        ctx = canvas.getContext("2d");
        ctx.imageSmoothingEnabled = true;
    });
    let width = 1280;//1201.6332651194605
    let height = 720;
    let margin = 5;
    let border = 10;

    let dimensions: [number, number] = [width, height];

    async function drawCollage() {
        canvas.width = width;
        canvas.height = height;
        ctx.clearRect(0, 0, width, height);
        const grid = await test(width / height);
        
        dimensions = drawGridFit(ctx, grid, border, border, width - (border * 2), height - (border * 2), margin);
    }

    async function snapshot1() {
        const [w, h] = dimensions;
        console.log(dimensions);
        const newCanvas = document.createElement('canvas');
        newCanvas.width = w;
        newCanvas.height = h;
        newCanvas.getContext('2d')    
        .drawImage(canvas, 0, 0);
        const url = newCanvas.toDataURL();
        let link = document.createElement('a');
        link.href = url;
        link.download = 'collage.png';
        link.click();
    }
    async function snapshot() {
        const [w, h] = dimensions;
        const bitmap = await createImageBitmap(canvas);
        canvas.width = w;
        canvas.height = h;
        ctx.drawImage(bitmap, 0, 0);
        const url = canvas.toDataURL();
        let link = document.createElement('a');
        link.href = url;
        link.download = 'collage.png';
        link.click();
    }

</script>


<div class="collagesContainer">
    <div class="settings">
        width: <input type="number" bind:value={width} />
        height: <input type="number" bind:value={height} />
        margin: <input type="number" bind:value={margin} />
        border: <input type="number" bind:value={border} />
        <button on:click={drawCollage}>generate</button>
    </div>
    <div class="display">
        <canvas bind:this={canvas} height={height} width={width}></canvas>
    </div>
    <button on:click={snapshot}>snapshot</button>
</div>


<style>
    .collagesContainer {
        display: flex;
        flex-flow: column;
    }
    canvas {
        max-width: 100%;
        background: wheat;
    }
</style>
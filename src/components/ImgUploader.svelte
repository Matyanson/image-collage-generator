<script lang="ts">
import { images } from "../store";
import * as idb from "idb-keyval";
import type { ImgData } from "../models/ImgData";
import { getImageUrl } from "../helper";


    const onUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const { files } = target;

        for(const file of files) {
            saveImage(file);
        }
    }

    async function saveImage(file: File) {
        let newImg: ImgData = { name: file.name, url: null };
        const maxArea = 300 * 300;
        const limit = 150000; //150kB
        const url = await getImageUrl(file);
        if(file.size > limit) {
            console.log(file.size);
            newImg.url = await resizeImg(url, maxArea);
            newImg.FullResKey = saveLargeImage(file);
        } else {
            newImg.url = url;
        }

        images.push(newImg);
    }

    async function resizeImg(url: string, targetArea: number): Promise<string> {

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const img = await getImageFromUrl(url);
        const area = img.width * img.height;
        const scale = Math.sqrt(targetArea / area);
        const width = Math.round(img.width * scale);
        const height = Math.round(img.height * scale);
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        return canvas.toDataURL();
    }

    function getImageFromUrl(url: string): Promise<HTMLImageElement> {
        return new Promise( resolve => {
            const img = new Image();
            img.src = url;
            img.onload = () => resolve(img);
        })
    }

    function saveLargeImage(file: File): string {
        const key = Date.now().toString();
        idb.set(key, file);
        return key;
    }
</script>

<input type="file" multiple accept="image/*" on:change={onUpload}/>
<script lang="ts">
import { images } from "../store";
import * as idb from "idb-keyval";
import type { ImgData } from "../models/ImgData";


    const onUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const { files } = target;

        for(const file of files) {
            saveImageURL(file);
        }
    }

    function saveImageURL(file: File) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            if(typeof(reader.result) == "string"){
                const url = reader.result;
                let newImg: ImgData = { name: file.name, url };
                const maxArea = 300 * 300;
                const limit = 150000; //150kB
                if(file.size > limit) {
                    console.log(file.size);
                    newImg.url = await resizeImg(url, maxArea);
                    newImg.FullResKey = saveLargeImage(url);
                }

                images.push(newImg);
            }
        }
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

    function saveLargeImage(url: string): string {
        const key = Date.now().toString();
        idb.set(key, url);
        return key;
    }
</script>

<input type="file" multiple accept="image/*" on:change={onUpload}/>
<script lang="ts">
import { images } from "../../store";
import * as idb from "idb-keyval";
import type { ImgData } from "../../models/ImgData";
import { getImageUrl } from "../../helper";
import type { WorkerMessage } from "../../models/WorkerMessage";
import type ProcessedImg from "./ProcessedImg";
import myWorker from "./worker2?worker";

    let w: Worker;

    const onUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const { files } = target;

        startWorker();

        console.log(files);
        for(const file of files) {
            postToWorker({
                type: 'process',
                data: file
            });
        }
    }

    const onProcessed = (imgProcessed: ProcessedImg) => {
        const newImg: ImgData = {
            name: imgProcessed.name,
            url: imgProcessed.thumbnail,
            FullResKey: saveLargeImage(imgProcessed.largeSize)
        }
        
        images.push(newImg);
    }

    const postToWorker = (mess: WorkerMessage) => {
        console.log("post message");
        if(typeof(Worker) == "undefined" || !w) return;
        console.log("ok");
        w.postMessage(mess);
    }

    const startWorker = () => {
        console.log("starting woker");
        if(typeof(Worker) == "undefined" || w) return;

        console.log("ok");
        //w = new Worker(new URL('./worker.js', import.meta.url));
        w = new myWorker();
        w.onmessage = onMessage;
        console.log("worker is:", w);
    }
    
    const resetWorker = () => {
        console.log('closing worker');
        if(w)
        w.terminate();
        w = undefined;
    }

    const onMessage = (e) => {
        const mess: WorkerMessage = e.data;
        console.log(mess);
        switch (mess.type) {
            case 'process':
                onProcessed(mess.data)
                break;
            default:
                console.log(mess.type, mess.data);
                break;
        }
    }

    // async function saveImage(file: File) {
    //     let newImg: ImgData = { name: file.name, url: null };
    //     const maxArea = 300 * 300;
    //     const limit = 150000; //150kB
    //     const limit2 = 5000000; //3MB
    //     const url = await getImageUrl(file);

        
    //     console.log(file.size);
    //     if(file.size > limit2) {
    //         console.log('1');
    //         //convert to jpeg
    //         let file2 = await imgToJPEG(url);
    //         console.log('jpeg',file2.size);
    //         if(file2.size > limit2) {
    //             console.log('1.1');
    //             //downscale image (power of 2)
    //             const scale = 1 / 2**Math.ceil(Math.log2(file2.size / limit2));

    //             const img = await getImageFromUrl(url);
    //             let canvas = await resizeImg(img, scale);
    //             file2 = await canvasToBlob(canvas, 'image/jpeg');
    //             console.log('jpeg+scaled', file2.size);
    //         }
    //         newImg.url = await resizeImgArea(url, maxArea);
    //         newImg.FullResKey = saveLargeImage(file2);
    //     }
    //     else if(file.size > limit) {
    //         console.log('2');
    //         newImg.url = await resizeImgArea(url, maxArea);
    //         newImg.FullResKey = saveLargeImage(file);
    //     } else {
    //         console.log('3');
    //         newImg.url = url;
    //     }

    //     images.push(newImg);
    // }

    // async function imgToJPEG(url: string): Promise<Blob> {
    //     return new Promise(async (res) => {
    //         const canvas = document.createElement('canvas');
    //         const ctx = canvas.getContext('2d');

    //         const img = await getImageFromUrl(url);
    //         canvas.width = img.width;
    //         canvas.height = img.height;

    //         ctx.drawImage(img, 0, 0);

    //         canvas.toBlob((blob) => res(blob), 'image/jpeg');
    //     });
    // }

    // async function canvasToBlob(canvas: HTMLCanvasElement, type: string = 'image/jpeg'): Promise<Blob> {
    //     return new Promise(async (res) => {
    //         canvas.toBlob((blob) => res(blob), type);
    //     });
    // }

    // async function resizeImgArea(url: string, targetArea: number): Promise<string> {
     
    //     const img = await getImageFromUrl(url);
    //     const area = img.width * img.height;
    //     const scale = Math.sqrt(targetArea / area);

    //     let canvas = await resizeImg(img, scale);
    //     return canvas.toDataURL();
    // }
    // async function resizeImg(img: HTMLImageElement, scale: number): Promise<HTMLCanvasElement> {

    //     const canvas = document.createElement('canvas');
    //     const ctx = canvas.getContext('2d');

    //     const width = Math.round(img.width * scale);
    //     const height = Math.round(img.height * scale);
    //     canvas.width = width;
    //     canvas.height = height;
    //     ctx.drawImage(img, 0, 0, width, height);

    //     return canvas;
    // }

    // function getImageFromUrl(url: string): Promise<HTMLImageElement> {
    //     return new Promise( resolve => {
    //         const img = new Image();
    //         img.src = url;
    //         img.onload = () => resolve(img);
    //     })
    // }

    function saveLargeImage(file: File|Blob): string {
        const key = Date.now().toString();
        idb.set(key, file);
        return key;
    }
</script>

<input type="file" multiple accept="image/*" on:change={onUpload}/>
import { getImageUrl } from "../../helper";
import type { ImgData } from "../../models/ImgData";
import type { WorkerMessage } from "../../models/WorkerMessage";
import type ProcessedImg from "./ProcessedImg";

self.addEventListener('message', e => {
    const mess: WorkerMessage = e.data;
    self.postMessage({ type: 'hello', data: 'hello world' });
    console.log(mess);
    switch(mess.type){
        case 'process':
            const img = processImg(mess.data)
            self.postMessage({ type: 'process', data: img });
            break;
        default:
            console.log("undefined command");
            break;
    }
});

async function processImg(file: File): Promise<ProcessedImg> {
    let res: ProcessedImg = { name: file.name, thumbnail: null };
    const maxArea = 300 * 300;
    const limit = 150000; //150kB
    const limit2 = 5000000; //3MB
    const url = await getImageUrl(file);

    
    console.log(file.size);
    if(file.size > limit2) {
        console.log('1');
        //convert to jpeg
        let file2 = await imgToJPEG(url);
        console.log('jpeg',file2.size);
        if(file2.size > limit2) {
            console.log('1.1');
            //downscale image (power of 2)
            const scale = 1 / 2**Math.ceil(Math.log2(file2.size / limit2));

            const img = await getImageFromUrl(url);
            let canvas = await resizeImg(img, scale);
            file2 = await canvasToBlob(canvas, 'image/jpeg');
            console.log('jpeg+scaled', file2.size);
        }
        res.thumbnail = await resizeImgArea(url, maxArea);
        res.largeSize = file2;
    }
    else if(file.size > limit) {
        console.log('2');
        res.thumbnail = await resizeImgArea(url, maxArea);
        res.largeSize = file;
    } else {
        console.log('3');
        res.thumbnail = url;
    }

    return res;
}

async function imgToJPEG(url: string): Promise<Blob> {
    return new Promise(async (res) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = await getImageFromUrl(url);
        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        canvas.toBlob((blob) => res(blob), 'image/jpeg');
    });
}

async function canvasToBlob(canvas: HTMLCanvasElement, type: string = 'image/jpeg'): Promise<Blob> {
    return new Promise(async (res) => {
        canvas.toBlob((blob) => res(blob), type);
    });
}

async function resizeImgArea(url: string, targetArea: number): Promise<string> {
 
    const img = await getImageFromUrl(url);
    const area = img.width * img.height;
    const scale = Math.sqrt(targetArea / area);

    let canvas = await resizeImg(img, scale);
    return canvas.toDataURL();
}
async function resizeImg(img: HTMLImageElement, scale: number): Promise<HTMLCanvasElement> {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
}

function getImageFromUrl(url: string): Promise<HTMLImageElement> {
    return new Promise( resolve => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(img);
    })
}
import { getImageUrl } from "../../helper";
import type { WorkerMessage } from "../../models/WorkerMessage";
import type ProcessedImg from "./ProcessedImg";

self.addEventListener('message', async (e) => {
    const mess: WorkerMessage = e.data;
    switch(mess.type){
        case 'process':
            const img = await processImg(mess.data)
            self.postMessage({ type: 'process', data: img });
            break;
        case 'process_batch':
            const batch: File[] = mess.data;
            for await(let file of batch){
                const img = await processImg(file);
                self.postMessage({ type: 'process', data: img });
            }
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
    const limit2 = 3000000; //3MB

    
    console.log(file.size);
    if(file.size > limit2) {
        console.log('1');
        const img = await getImageFromBlob(file);
        //downscale image (power of 2)
        const scale = Math.sqrt(limit2 / file.size);
        const scale2 = 2**-Math.ceil(-Math.log2(scale));

        let canvas = await resizeImg(img, scale2);
        let file2 = await canvasToBlob(canvas, 'image/jpeg');

        res.thumbnail = await resizeImgArea(img, maxArea);
        res.largeSize = file2;
    }
    else if(file.size > limit) {
        console.log('2');
        const img = await getImageFromBlob(file);
        res.thumbnail = await resizeImgArea(img, maxArea);
        res.largeSize = file;
    } else {
        console.log('3');
        res.thumbnail = await getImageUrl(file);
    }

    return res;
}

async function imgToJPEG(img: ImageBitmap): Promise<Blob> {
    const canvas = new OffscreenCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');

    ctx.drawImage(img, 0, 0);

    const newBlob = await canvas.convertToBlob({ type: 'image/jpeg' });
    return newBlob;
}

async function canvasToBlob(canvas: OffscreenCanvas, type: string = 'image/jpeg'): Promise<Blob> {
    return await canvas.convertToBlob({ type });
}

async function resizeImgArea(img: ImageBitmap, targetArea: number): Promise<string> {

    const area = img.width * img.height;
    const scale = Math.sqrt(targetArea / area);

    let canvas = await resizeImg(img, scale);
    const blob = await canvas.convertToBlob();
    return await getImageUrl(blob);
}
async function resizeImg(img: ImageBitmap, scale: number): Promise<OffscreenCanvas> {

    const width = Math.round(img.width * scale);
    const height = Math.round(img.height * scale);

    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');
    
    ctx.drawImage(img, 0, 0, width, height);

    return canvas;
}

async function getImageFromBlob(blob: Blob): Promise<ImageBitmap> {
    return await createImageBitmap(blob);
}

//const workerUrl = URL.createObjectURL(new Blob(["("+workerFunction.toString()+")()"], {type: 'text/javascript'}));
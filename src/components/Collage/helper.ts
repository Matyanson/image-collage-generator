import type Grid from "../../models/Grid";
import { images } from "../../store";
import Jimp from 'jimp/browser/lib/jimp';

export async function getJSONData(dir) {
    const response = await fetch(dir);
    const data = await response.json();
    return data;
}

export async function getImgFromUrl(url): Promise<HTMLImageElement> {
  return new Promise((res, reject) => {
    let i = new Image();
    i.src = url;
    i.onload = function() {
        res(i);
    }
    i.onerror = function(e, status) {
      reject();
    }
  });
}
export async function getImgDimensions(url): Promise<[number, number]> {
    const img = await getImgFromUrl(url);
    return [img.width, img.height];
}

export async function imgToGrid(index, url): Promise<Grid> {
  const [w, h] = await getImgDimensions(url);
  
  return {
    ratio: w / h,
    items: [index]
  }
}

async function drawImgFillJimp(ctx: CanvasRenderingContext2D, img: Jimp, x, y, width, height) {
    const mimeType = img.getMIME();
    
    const resized = await img.cover(width, height, Jimp.HORIZONTAL_ALIGN_CENTER | Jimp.VERTICAL_ALIGN_MIDDLE, Jimp.RESIZE_BICUBIC);
    // sharpen the image
    const amount = 0.5;
    const a = (0 - 1/5) * amount;
    const b = 1 + (1 - 1/5) * amount;
    const unsharpen = await resized.convolute([[0,a,0], [a,b,a], [0,a,0]]);
    // draw
    const buffer = await resized.getBufferAsync(mimeType);
    const bitmap = await createImageBitmap(new Blob([buffer]/*, {type: mimeType}*/))
    ctx.drawImage(bitmap, x, y);
}

export async function drawImg(ctx: CanvasRenderingContext2D, src: string | Blob, x, y, width, height) {
    try {
        let img: Jimp;
        if(typeof src == "string")
            img = await Jimp.read(src);
        else {
            const buffer = Buffer.from(await src.arrayBuffer());
            img = await Jimp.read(buffer);
        }
        drawImgFillJimp(ctx, img, x, y, width, height);
    } catch(e) {
        let img: ImageBitmap | HTMLImageElement;
        if(typeof src == "string") img = await getImgFromUrl(src);
        else img = await createImageBitmap(src);

        drawImgFill(ctx, img, x, y, width, height);
    }
}

export async function drawImgFill(ctx: CanvasRenderingContext2D, img: ImageBitmap | HTMLImageElement, x, y, width, height) {
    const imgRatio = img.width / img.height;
    const boxRatio = width / height;
    let cropWidth = imgRatio > boxRatio ? (boxRatio / imgRatio) * img.width : img.width;
    let cropHeight = imgRatio > boxRatio ? img.height : (imgRatio / boxRatio) * img.height;
    let centerX = (img.width - cropWidth) / 2;
    let centerY = (img.height - cropHeight) / 2;
    ctx.drawImage(img, centerX, centerY, cropWidth, cropHeight, x, y, width, height);
}

export function fitDimsToRatio(width, height, actualRatio): [number, number] {
    const desiredRatio = width / height;
    if(desiredRatio > actualRatio) width *= actualRatio / desiredRatio;
    else                           height *= desiredRatio / actualRatio;
    return [width, height];
}

export function drawGridFit(ctx: CanvasRenderingContext2D, grid: Grid, x, y, width, height, margin = 0): [number, number] {
    console.log(x, y, width, height);
    let [w, h] = fitDimsToRatio(width, height, grid.ratio);
    drawGrid(ctx, grid, x, y, w + margin, h + margin, margin);
    return [w, h];
}
  
export async function drawGrid(ctx: CanvasRenderingContext2D, grid, x, y, width, height, margin = 0) {

    if(grid.horizontal == undefined || typeof grid.items[0] == "number" ) {
        let index = grid.items[0];
        if(index < 0) return;
        const src = await images.getSrc(index);
        drawImg(ctx, src, x, y, width - margin, height - margin);
        return;
    }

    let offset = 0;
    if(grid.horizontal == true) {
        for(let item of grid.items) {
            let itemWidth = (item.ratio / grid.ratio) * width;
            await drawGrid(ctx, item, x + offset, y, itemWidth, height, margin);
            offset += itemWidth;
        }
    } else {
        for(let item of grid.items) {
            let itemHeight = (grid.ratio / item.ratio) * height;
            await drawGrid(ctx, item, x, y + offset, width, itemHeight, margin);
            offset += itemHeight;
        }
    }
}

/*function addMarginToGrid(grid, width: number, height: number, margin = 5) {
    if(grid.horizontal == undefined || typeof grid.items[0] == "number" )
        return grid;
    
    const count = grid.items.length;
    let newItems = [];
    let newRatio;
    if(grid.horizontal == true) {
        let spacePercenteage = margin / width;
        let spaceRatio = grid.ratio * spacePercenteage;
        for(let i = 0; i < count; i++) {
            let item = grid.items[i];
            let itemWidth = (item.ratio / grid.ratio) * width;
            if(i > 0) newItems.push({ ratio: spaceRatio, items: [-1]});
            newItems.push(
                addMarginToGrid(item, itemWidth, height, margin)
            );
        }
        newRatio = newItems.reduce((prev, curr) => prev + curr.ratio, 0);
    } else {
        //let spaceRatio = width / margin;
        let spacePercenteage = margin / height;
        let spaceRatio = grid.ratio * (1 / spacePercenteage);
        for(let i = 0; i < count; i++) {
            let item = grid.items[i];
            let itemWidth = (item.ratio / grid.ratio) * width;
            if(i > 0) newItems.push({ ratio: spaceRatio, items: [-1]});
            newItems.push(
                addMarginToGrid(item, itemWidth, height, margin)
            );
        }
        newRatio = 1 / newItems.reduce((prev, curr) => prev + 1 / curr.ratio, 0);
    }
    return {
        ratio: newRatio,
        horizontal: grid.horizontal,
        items: newItems
    }
}*/
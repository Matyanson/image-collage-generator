import type Grid from "../../models/Grid";
import { imgToGrid } from "./helper";
import { images } from "../../store";
import * as idb from "idb-keyval";

function primeFactors(n) {
    const factors = [];
    let divisor = 2;

    while (n >= 2) {
        if (n % divisor == 0) {
        factors.push(divisor);
        n = n / divisor;
        } else {
        divisor++;
        }
    }
    return factors;
}
  
function ratioDiff(ratio1, ratio2) {
ratio1 = ratio1 > 1 ? 1 / ratio1 : ratio1;
ratio2 = ratio2 > 1 ? 1 / ratio2 : ratio2;

return ratio1 > ratio2 ? 1 - ratio2 / ratio1 : 1 - ratio1 / ratio2;
}


export async function test(canvasRatio: number) {
  
  /*--- LOAD DATA ---*/
  let imagesData = images.get();
  
  const promises: Promise<any>[] = [];
  // convert images to grids
  
  for(let i = 0; i < imagesData.length; i++) {
    let img = imagesData[i];
    promises.push(imgToGrid(i, img.url));
  }
  const settled = await Promise.allSettled(promises);
  let imgGrids = (settled.filter(x => x.status == "fulfilled") as PromiseFulfilledResult<any>[])
  .map(x => x.value);
  
  
  
  /*--- PROCESS DATA (create grid structure) ---*/

  let grids = imgGrids;
  
  // determine number of rows
  const count = grids.length;
  grids = [...grids].sort((a, b) => a.ratio - b.ratio);
  let ratio = grids.reduce((prev, curr) => prev + curr.ratio, 0);
  const average = ratio / count;
  ratio = grids.reduce((prev, curr) => prev + Math.sqrt(average / curr.ratio) * curr.ratio, 0);
  const rows = Math.round(Math.sqrt(ratio / canvasRatio));
  const size = ratio / rows;
  
  // split into rows
  let pivots = [];
  let currSize = 0;
  let prevDiff = 0;
  let elCount = 0;
  
  
  for (let i = 0; i < grids.length; i++) {
    const averageRatio = currSize / elCount;
    let diff = size * Math.sqrt(averageRatio / average) - currSize;
    if(diff < 0) {
      let isPrevious = prevDiff < -diff;
      pivots.push(isPrevious ? i - 1 : i);
      currSize = isPrevious ? grids[i - 1].ratio : 0;
      elCount = 0;
    }
    currSize += grids[i].ratio;
    elCount++;
    prevDiff = diff;
  }
  
  
  // generate grid
  let previous = 0;
  let newGrids = [];
  pivots.push(grids.length);
  for (let pivot of pivots) {
    const row = grids.slice(previous, pivot);
    const ratios = row.map(x => x.ratio);
    const rowSize = ratios.reduce((prev, curr) => prev + curr, 0);
    
    newGrids.push({
      ratio: rowSize,
      horizontal: true,
      items: [...row]
    });
    previous = pivot;
  }
  
  const ratios = newGrids.map(x => x.ratio);
  const ColumnRatio = 1 / ratios.reduce((prev, curr) => prev + 1/curr, 0);

  const finalGrid = {
    ratio: ColumnRatio,
    horizontal: false,
    items: [...newGrids]
  }
  
  //sort images
  function avgRowPos(grid) {
    let sum = grid.items.reduce((prev, curr) => prev + curr.items[0], 0);
    return sum / grid.items.length;
  }
  finalGrid.items.sort((a, b) => avgRowPos(a) - avgRowPos(b));
  
  for(let grid of finalGrid.items) {
    grid.items.sort((a, b) => a.items[0] - b.items[0]);
  }
  
  return finalGrid;
}
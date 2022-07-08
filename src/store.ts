import type { ImgData } from "./models/ImgData";
import { wIDatabase, wStorage } from "./writable-stores";
import * as idb from "idb-keyval";
import { get } from "svelte/store";


export const images = createImagesCollection();

function createImagesCollection() {
    //const { subscribe, update, set } = wIDatabase<ImgData[]>('chosen-images', []);
    const { subscribe, update, set } = wIDatabase<ImgData[]>('chosen-images', []);

    return {
        subscribe,
        push: (...items: ImgData[]) => {
            console.log('push', items[0].url);
            update(old => [...old, ...items]);
        },
        delete: (...indexes: number[]) => {
            update(old => {
                for(let i of indexes) {
                    if(old[i]?.FullResKey)
                        idb.del(old[i].FullResKey);
                    old[i] = null;
                }
                return old.filter(x => x);
            });
        },
        get: () => {
            return get(images);
        },
        getLink: async (index: number): Promise<string> => {
            const item = get(images)[index];
            if(item.FullResKey)
                return await idb.get(item.FullResKey);
            return item.url;
        }
    }
}


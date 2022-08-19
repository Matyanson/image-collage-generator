import type { ImgData } from "./models/ImgData";
import { wIDatabase, wStorage } from "./writable-stores";
import * as idb from "idb-keyval";
import { get } from "svelte/store";
import { getImageUrl } from "./helper";


export const images = createImagesCollection();

function createImagesCollection() {
    const { subscribe, update, set } = wIDatabase<ImgData[]>('chosen-images', []);

    return {
        subscribe,
        push: (...items: ImgData[]) => {
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
            if(item.FullResKey){
                const file = await idb.get<File|Blob>(item.FullResKey);
                return await getImageUrl(file);
            }
            return item.url;
        }
    }
}


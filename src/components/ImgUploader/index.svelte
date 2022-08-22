<script lang="ts">
import { images } from "../../store";
import * as idb from "idb-keyval";
import type { ImgData } from "../../models/ImgData";
import { getImageUrl } from "../../helper";
import type { WorkerMessage } from "../../models/WorkerMessage";
import type ProcessedImg from "./ProcessedImg";
import myWorker from "./worker?worker";

    let w: Worker;

    const onUpload = async (e: Event) => {
        const target = e.target as HTMLInputElement;
        const { files } = target;

        startWorker();

        postToWorker({
            type: 'process_batch',
            data: [...files]
        });
    }

    const onProcessed = (imgProcessed: ProcessedImg) => {
        const newImg: ImgData = {
            name: imgProcessed.name,
            url: imgProcessed.thumbnail
        }
        if(imgProcessed.largeSize)
            newImg.FullResKey = saveLargeImage(imgProcessed.largeSize);
        
        images.push(newImg);
    }

    const postToWorker = (mess: WorkerMessage) => {
        if(typeof(Worker) == "undefined" || !w) return;
        w.postMessage(mess);
    }

    const startWorker = () => {
        if(typeof(Worker) == "undefined" || w) return;

        //w = new Worker(new URL('./worker.js', import.meta.url));
        w = new myWorker();
        w.onmessage = onMessage;
    }
    
    const resetWorker = () => {
        console.log('closing worker');
        if(w)
        w.terminate();
        w = undefined;
    }

    const onMessage = (e) => {
        const mess: WorkerMessage = e.data;
        switch (mess.type) {
            case 'process':
                onProcessed(mess.data)
                break;
            default:
                console.log('undefined message type');
                break;
        }
    }

    function saveLargeImage(file: File|Blob): string {
        const key = Date.now().toString();
        idb.set(key, file);
        return key;
    }
</script>

<input type="file" multiple accept="image/*" on:change={onUpload}/>
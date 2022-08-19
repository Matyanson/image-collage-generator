export function getImageUrl(file: File | Blob): Promise<string> {
    return new Promise((res) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = async () => {
            if(typeof(reader.result) == "string"){
                res(reader.result);
            }
        }
    });
}
export const checkImageUrl = (url: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => resolve(true);
        img.onerror = () => reject(new Error("Image failed to load"));

        img.src = url;
    });
}
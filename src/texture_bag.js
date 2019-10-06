const textureBag = {}

export const getTexture = (path) => {
    if (textureBag[path]){
        return textureBag[path]
    } else {
        const newTexture = PIXI.Texture.fromImage(path);
        textureBag[path] = newTexture;
        return newTexture;
    }
}

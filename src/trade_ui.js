import { processTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage, BGElem } from './base_ui';
import { MESSAGE_STYLE } from './styles';


export class TradeWindow extends PIXI.Container {

    constructor(tradeData){
        super();
        const WIDTH = 500
        const HEIGHT = 400
        const portraitHeight = 128;


        this.background = BGElem(0, 0, WIDTH, HEIGHT, 0xFFFFFF);
        this.addChild(this.background);

        this.portrait = new InspectableImage({image: './img/test_image.png', text:'flavor!'})
        this.portrait.width = this.portrait.width/this.portrait.height*portraitHeight
        this.portrait.height = portraitHeight
        this.addChild(this.portrait.sprite);



        // tradeData.itemsBuying.forEach((imagePath, i) => {
        //
        // }
        this.offerings = new PIXI.Container();

        tradeData.itemsSelling.forEach((itemData, i) => {
            const newItem = new InspectableImage(itemData);
            item.sprite.position.set(30 + i * 80, 0);
            this.offerings.addChild(newItem);
        });

        this.addChild(this.offerings)
    }

    update(tradeData){
        //TODO: go through and update all the things
        // this.portrait.update()
        this.offerings.forEach(offering => {
            // offering.update({})
        })
    }
}

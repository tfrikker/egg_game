import { processTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage } from './base_ui';
import { MESSAGE_STYLE } from './styles';


export class TradeWindow{

    constructor(tradeData){
        const WIDTH = 500
        const HEIGHT = 400
        const portraitHeight = 128;

        this.container = new PIXI.Container();
        this.background = new PIXI.Graphics();

        this.background.beginFill(0xffffff);
        this.background.drawRect(0, 0, WIDTH, HEIGHT);
        this.background.endFill();
        this.container.addChild(this.background);

        this.portrait = new InspectableImage({image: './img/test_image.png', text:'flavor!'})
        this.portrait.width = this.portrait.width/this.portrait.height*portraitHeight
        this.portrait.height = portraitHeight
        this.container.addChild(this.portrait.sprite);


        this.offerings = new PIXI.Container();

        // TODO: replace this with sensible data
        [
            './img/test_item.png',
            './img/test_item.png',
            './img/test_item.png'
        ].forEach((imagePath, i) => {
            const offering = new InspectableImage({image: imagePath, text:'flavor!'})
            offering.sprite.position.set(30 + i * 80,0);
            this.offerings.addChild(offering.sprite)
        })
        this.container.addChild(this.offerings)
    }

    update(tradeData){
        //TODO: go through and update all the things
        // this.portrait.update()
        this.offerings.forEach(offering => {
            // offering.update({})
        })
    }
}

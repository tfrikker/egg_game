import { processTrade, getTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage, BGRoundedElem } from './base_ui';
import { MESSAGE_STYLE } from './styles';


export class TradeWindow extends PIXI.Container {

    constructor(){
        super();
        const portraitHeight = 128;

        this.background = BGRoundedElem(5, 5, WIDTH - 10, 400, 0xBBBBDD);
        this.addChild(this.background);

        this.portrait = new InspectableImage({image: './images/items/egg.png', text:'flavor!'})
        // this.portrait.width = 100 //= this.portrait.width/this.portrait.height*portraitHeight
        // this.portrait.height = 100 //portraitHeight
        window.port = this.portrait;
        this.addChild(this.portrait);
        this.portrait.position.set(WIDTH/2 - (this.portrait.width / 2), 20);

        this.wants = new PIXI.Container();
        this.offerings = new PIXI.Container();
    }

    update(){
        var trade = getTrade()
        this.portrait.update(trade.buyer)
        console.log(WIDTH);
        console.log(WIDTH/2 - 64);
        this.portrait.position.set(WIDTH/2 - 64, 20);
        this.wants.removeChildren();
        this.offerings.removeChildren();

        this.portrait.width = 128 // NOTE: this shouldn't be necessary, final images can be saved at the correct size
        this.portrait.height = 128

        this.offerings = new PIXI.Container();
        this.offerings.position.set(20, 200)
        trade.trade.itemsSelling.forEach((itemData, i) => {
            const newItem = new InspectableImage(itemData);
            newItem.position.set(i * 80, 0)
            this.offerings.addChild(newItem);
        });
        this.addChild(this.offerings)

        this.wants = new PIXI.Container();
        this.wants.position.set(20, 300)
        trade.trade.itemsBuying.forEach((itemData, i) => { // TODO: change this to itemsBuying
            const newItem = new InspectableImage(itemData);
            newItem.position.set(i * 80, 0);
            this.wants.addChild(newItem);
        });
        this.addChild(this.wants)
    }
}

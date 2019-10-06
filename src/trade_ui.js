import { processTrade, getTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage, BGElem } from './base_ui';
import { MESSAGE_STYLE } from './styles';


export class TradeWindow extends PIXI.Container {

    constructor(){
        console.log("Constructing tradeWindow...");
        super();
        console.log("Called super");
        const portraitHeight = 128;


        this.background = BGElem(0, 0, WIDTH, 400, 0xFFFFFF);
        this.addChild(this.background);

        this.portrait = new InspectableImage({image: './images/items/egg.png', text:'flavor!'}, 10, 10)
        // this.portrait.width = 100 //= this.portrait.width/this.portrait.height*portraitHeight
        // this.portrait.height = 100 //portraitHeight
        window.port = this.portrait;
        this.addChild(this.portrait);

        this.offerings = new PIXI.Container();
        this.offerings.position.set(WIDTH/2, 20)

        this.addChild(this.offerings)
        console.log("Done constructing tradeWindow");
    }

    update(){
        var trade = getTrade()
        console.log("Updating tradeData");
        this.portrait.update(trade.buyer)

        this.portrait.width = 128 // NOTE: this shouldn't be necessary, final images can be saved at the correct size
        this.portrait.height = 128

        trade.trade.itemsSelling.forEach((itemData, i) => {
            const newItem = new InspectableImage(itemData);
            newItem.position.set(30 + i * 80, 0);
            this.offerings.addChild(newItem);
        });
        //TODO: go through and update all the things
        // this.portrait.update()
        //this.offerings.forEach(offering => {
            // offering.update({})
        //})
    }
}

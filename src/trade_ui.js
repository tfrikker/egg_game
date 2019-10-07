import { processTrade, getTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage, BGElem } from './base_ui';
import { MESSAGE_STYLE } from './styles';


export class TradeWindow extends PIXI.Container {

    constructor(){
        super();
        const portraitHeight = 128;


        this.background = BGElem(0, 0, WIDTH, 400, 0xFFFFFF);
        this.addChild(this.background);

        this.portrait = new InspectableImage({image: './images/items/egg.png', text:'flavor!'}, 10, 10)
        // this.portrait.width = 100 //= this.portrait.width/this.portrait.height*portraitHeight
        // this.portrait.height = 100 //portraitHeight
        window.port = this.portrait;
        this.addChild(this.portrait);

        this.wants = new PIXI.Container();
        this.offerings = new PIXI.Container();

    }

    update(){
        var trade = getTrade()
        this.portrait.update(trade.buyer)
        this.wants.removeChildren();
        this.offerings.removeChildren();

        this.portrait.width = 128 // NOTE: this shouldn't be necessary, final images can be saved at the correct size
        this.portrait.height = 128

        this.offerings = new PIXI.Container();
        this.offerings.position.set(WIDTH/2, 20)
        trade.trade.itemsSelling.forEach((itemData, i) => {
            const newItem = new InspectableImage(itemData);
            switch (i) {
              case 0:
                newItem.position.set(0, 0);
                break;
              case 1:
                newItem.position.set(64 + 10, 0);
                break;
              case 2:
                newItem.position.set(0, 64 + 10);
                break;
              default:
                newItem.position.set(64 + 10, 64 + 10);
            }
            this.offerings.addChild(newItem);
        });
        this.addChild(this.offerings)

        this.wants = new PIXI.Container();
        this.wants.position.set(15, 200)
        trade.trade.itemsBuying.forEach((itemData, i) => { // TODO: change this to itemsBuying
            const newItem = new InspectableImage(itemData);
            newItem.position.set(30 + i * 80, 0);
            this.wants.addChild(newItem);
        });
        this.addChild(this.wants)

    }
}

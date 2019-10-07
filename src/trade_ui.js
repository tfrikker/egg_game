import { processTrade, getTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';
import { InspectableImage, BGRoundedElem } from './base_ui';
import { MESSAGE_STYLE, MESSAGE_STYLE_LARGE } from './styles';


export class TradeWindow extends PIXI.Container {

    constructor(){
        super();
        const portraitHeight = 128;

        this.background = BGRoundedElem(5, 5, WIDTH - 10, 400, 0xcfc2b8);
        this.addChild(this.background);

        this.characterText = new PIXI.Container();
        var text = new PIXI.Text("", MESSAGE_STYLE_LARGE);
        this.characterText.addChild(text);
        text.anchor.set(0.5);
        text.position.set(WIDTH/2, 20);
        this.addChild(this.characterText);

        this.portrait = new InspectableImage({image: './images/items/egg.png', text:'flavor!'})
        // this.portrait.width = 100 //= this.portrait.width/this.portrait.height*portraitHeight
        // this.portrait.height = 100 //portraitHeight

        var wannaSell = new PIXI.Text("Offering...", MESSAGE_STYLE);
        this.addChild(wannaSell);
        wannaSell.position.set(30, 220);

        var wannaBuy = new PIXI.Text("in exchange for...", MESSAGE_STYLE);
        this.addChild(wannaBuy);
        wannaBuy.position.set(30, 310);

        window.port = this.portrait;
        this.addChild(this.portrait);
        this.portrait.position.set(WIDTH/2 - (this.portrait.width / 2), 40);

        this.wants = new PIXI.Container();
        this.offerings = new PIXI.Container();
    }

    update(){
        const portraitSize = 180;
        var trade = getTrade()
        this.portrait.update(trade.buyer)
        this.portrait.position.set(WIDTH/2 - portraitSize/2, 34);
        this.wants.removeChildren();
        this.offerings.removeChildren();

        this.portrait.width = portraitSize // NOTE: this shouldn't be necessary, final images can be saved at the correct size
        this.portrait.height = portraitSize

        this.offerings = new PIXI.Container();
        this.offerings.position.set(20, 240)
        trade.trade.itemsSelling.forEach((itemData, i) => {
            const newItem = new InspectableImage(itemData);
            newItem.position.set(i * 80, 0)
            this.offerings.addChild(newItem);
        });
        this.addChild(this.offerings)

        this.wants = new PIXI.Container();
        this.wants.position.set(20, 330)
        trade.trade.itemsBuying.forEach((itemData, i) => { // TODO: change this to itemsBuying
            const newItem = new InspectableImage(itemData);
            newItem.position.set(i * 80, 0);
            this.wants.addChild(newItem);
        });
        this.addChild(this.wants)

        this.characterText.removeChildren();
        var text = new PIXI.Text(trade.buyer.fullName, MESSAGE_STYLE_LARGE);
        this.characterText.addChild(text);
        text.anchor.set(0.5);
        text.position.set(WIDTH/2, 20);

        window.setMainDialoge(trade.buyer.name + ': ' + trade.buyer.text)
    }
}

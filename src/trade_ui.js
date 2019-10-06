import { processTrade } from './gameState';
import { getTexture } from './texture_bag';

const createSprite = (path, x = 0, y = 0) => {
    const sprite = new PIXI.Sprite(
        getTexture(path)
    );

    sprite.position.set(x,y)

    return sprite;
}

const createButton = (text, x, y, effect) => {
    const but = new PIXI.Text(text, MESSAGE_STYLE);

    but.position.set(x,y)
    but.interactive = true;
    but.on('pointerdown', effect);

    return but;
}

const MESSAGE_STYLE = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 20,
    fill: "#ff0099",
    // stroke: '#ff3300',
    // strokeThickness: 4
    wordWrap: true,
    wordWrapWidth: 200
});

class InspectableImage{
    constructor(data){
        this.sprite = new PIXI.Sprite(getTexture(data.image))
        this.messageText = data.text
        this.sprite.interactive = true;
        this.sprite.on('pointerdown', () => {
            console.log(this.messageText)
            //TODO: create this function
            // window.setMessage(this.messageText)
        });
    }
    update(data){
        this.sprite.texture = getTexture(data.image)
        this.messageText = data.text
    }
}


class TradeWindow{

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
        this.portrait.width = portrait.width/this.portrait.height*portraitHeight
        this.portrait.height = portraitHeight
        this.container.addChild(this.portrait);


        this.offerings = new PIXI.Container();

        // TODO: replace this with sensible data
        [
            './img/test_item.png',
            './img/test_item.png',
            './img/test_item.png'
        ].forEach((imagePath, i) => {
            const offering = new InspectableImage({image: imagePath, text:'flavor!'})
            container.addChild(offering);
            offering.position.set(30 + i * 80,0);
            this.offerings.addChild(offering)
        })
    }

    update(tradeData){
        //TODO: go through and update all the things
        // this.portrait.update()
        this.offerings.forEach(offering => {
            // offering.update({})
        })
    }
}

const createTradeWindow = (trade) => {
    const WIDTH = 500
    const HEIGHT = 400
    const portraitHeight = 128;

    const container = new PIXI.Container();
    const background = new PIXI.Graphics();

    background.beginFill(0xffffff);
    background.drawRect(0, 0, WIDTH, HEIGHT);
    background.endFill();
    container.addChild(background);

    const characterSprite = createSprite('./img/test_image.png')
    characterSprite.width = characterSprite.width/characterSprite.height*portraitHeight
    characterSprite.height = portraitHeight

    const offerings = [
        createSprite('./img/test_item.png'),
        createSprite('./img/test_item.png'),
        createSprite('./img/test_item.png')
    ]

    window.char = characterSprite;
    characterSprite.position.set(30, 10);
    // characterSprite.width = 150;

    container.addChild(characterSprite);

    offerings.forEach((offering, i) => {
        container.addChild(offering);
        offering.position.set(30 + i * 80, 220);
    })


    const message = new PIXI.Text("some placeholder message text", MESSAGE_STYLE); //TODO message text
    message.position = {x: 200, y: 10};
    container.addChild(message)

    const rejectButton = createButton("nahh", 40, 300, () => {
        console.log("rejectButtonClicked: Trade rejected");
        getNewTrade();
    });
    container.addChild(rejectButton)

    // TODO this is kinda janky and maybe causes a memory leak?
    const acceptButton = createButton("deal!", 200, 300, () => {
        console.log("acceptButtonClicked: Trade accepted")
        processTrade(trade);
        container.parent.removeChild(container);
        getNewTrade();
    })
    container.addChild(acceptButton)

    return container;
}

export { createTradeWindow }

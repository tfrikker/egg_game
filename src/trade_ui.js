import { processTrade } from './gameState';
import { getTexture } from './texture_bag';
import { WIDTH, HEIGHT } from './index';

const createSprite = (path, x = 0, y = 0) => {
    const sprite = new PIXI.Sprite(
        getTexture(path)
    );

    sprite.position.set(x,y)

    return sprite;
}

const MESSAGE_STYLE = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 14,
    fill: "#000000",
    // stroke: '#ff3300',
    // strokeThickness: 4
    wordWrap: true,
    wordWrapWidth: 200
});

const createTradeWindow = (trade) => {
    const container = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0XDDDDDD);
    background.drawRect(0, 0, WIDTH, HEIGHT);
    background.endFill();
    container.addChild(background);

    //const portraitHeight = 140;
    //const characterSprite = createSprite('./img/test_image.png')
    //characterSprite.width = characterSprite.width/characterSprite.height*portraitHeight
    //characterSprite.height = portraitHeight

    //const offerings = [
    //    createSprite('./img/test_item.png'),
    //    createSprite('./img/test_item.png'),
    //    createSprite('./img/test_item.png')
    //]

    //window.char = characterSprite;
    //characterSprite.position.set(30, 10);
    //container.addChild(characterSprite);

    //offerings.forEach((offering, i) => {
    //    container.addChild(offering);
    //    offering.position.set(30 + i * 80, 220);
    //})


    //const message = new PIXI.Text("some placeholder message text", MESSAGE_STYLE); //TODO message text
    //message.position = {x: 100, y: 10};
    //container.addChild(message)

    var buyingContainerElement = createBuyingContainerElement();
    container.addChild(buyingContainerElement);
    buyingContainerElement.position.set(0, HEIGHT - 150);

    var tradeButtonContainerElement = createTradeButtonContainerElement();
    container.addChild(tradeButtonContainerElement);
    tradeButtonContainerElement.position.set(0, HEIGHT - 50);

    return container;
}

function createBuyingContainerElement() {
    console.log("createBuyingContainerElement");
    const LEFT_OFFSET = 10;
    const container = new PIXI.Container();

    const text = new PIXI.Text("What they want", MESSAGE_STYLE);
    container.addChild(text);
    text.position.set(LEFT_OFFSET, 0);

    const buyingTableElement = createBuyingTableElement();
    container.addChild(buyingTableElement);
    buyingTableElement.position.set(LEFT_OFFSET, 20); //space for text

    return container;
}

function createBuyingTableElement() {
    console.log("createBuyingTableElement");
    const container = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0xAAAAAA);
    background.drawRoundedRect(0, 0, WIDTH - 20, 50); //TODO height
    background.endFill();
    container.addChild(background);

    return container;
}

function createTradeButtonContainerElement() {
    console.log("createTradeButtonContainerElement");
    const container = new PIXI.Container();

    const noButton = createTradeNoButtonElement();
    container.addChild(noButton);
    noButton.position.set(0, 0);

    const yesButton = createTradeYesButtonElement();
    container.addChild(yesButton);
    yesButton.position.set(WIDTH / 2, 0);

    return container;
}

function createTradeYesButtonElement() {
    console.log("createTradeYesButtonElement");
    const buttonWidth = WIDTH / 2;
    const buttonHeight = 50;
    //const but = new PIXI.Text(text, MESSAGE_STYLE);
    const button = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0x00FF00);
    background.drawRect(0, 0, buttonWidth, buttonHeight); //TODO height
    background.endFill();
    button.addChild(background);

    const text = new PIXI.Text("Let's do it!", MESSAGE_STYLE);
    button.addChild(text);
    text.position.set(buttonWidth / 2, buttonHeight / 2);

    button.interactive = true;
    button.on('pointerdown', () => {
        console.log("acceptButtonClicked: Trade accepted")
        processTrade(trade);
        container.parent.removeChild(container);
        getNewTrade();
    });

    return button;
}

function createTradeNoButtonElement() {
    console.log("createTradeNoButtonElement");
    const buttonWidth = WIDTH / 2;
    const buttonHeight = 50;
    //const but = new PIXI.Text(text, MESSAGE_STYLE);
    const button = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0xFF0000);
    background.drawRect(0, 0, buttonWidth, buttonHeight); //TODO height
    background.endFill();
    button.addChild(background);

    const text = new PIXI.Text("Nah...", MESSAGE_STYLE);
    button.addChild(text);
    text.position.set(buttonWidth / 2, buttonHeight / 2);

    button.interactive = true;
    button.on('pointerdown', () => {
        console.log("rejectButtonClicked: Trade rejected");
        getNewTrade();
    });

    return button;
}

export { createTradeWindow }

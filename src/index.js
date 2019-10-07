import { createTradeWindow } from './trade_ui';
import { getNewTrade, getInventory } from './gameState';
import {
  BGRoundedElem,
  DialogeElement,
  createInventoryContainerElement,
  createTradeButtonContainerElement,
  BGElem,
  WIDTH,
  HEIGHT
} from './base_ui';
import { TradeWindow } from './trade_ui';
import { FLAVOR_STYLE, MESSAGE_STYLE_LARGE, MESSAGE_STYLE_LARGE_WRAP, MESSAGE_STYLE_WRAP, MESSAGE_STYLE_TITLE, MESSAGE_STYLE_CREDITS} from './styles';
//iPhone 6

var tradeWindow;

function showStartScreen(appStage) {

    const buttonWidth = WIDTH / 2;
    const buttonHeight = 50;
    //const but = new PIXI.Text(text, MESSAGE_STYLE);
    const button = new PIXI.Container();

    const gameTitle = new PIXI.Text("EGG GAME", MESSAGE_STYLE_TITLE);
    appStage.addChild(gameTitle);
    gameTitle.anchor.set(0.5);
    gameTitle.position.set(WIDTH/2, 50);

    const gameDesc = new PIXI.Text("You're trapped in the sewer and need to trade your way out. Are you up to the challenge?", MESSAGE_STYLE_LARGE_WRAP);
    appStage.addChild(gameDesc);
    gameDesc.anchor.set(0.5);
    gameDesc.position.set(WIDTH/2, 150);

    const credits = new PIXI.Text("Built in 72 hours for Ludum Dare 2019 with love by Zach, Maryana, Sam, and Tom", MESSAGE_STYLE_CREDITS);
    appStage.addChild(credits);
    credits.anchor.set(0.5);
    credits.position.set(WIDTH/2, HEIGHT - 50);

    const image = new PIXI.Sprite(PIXI.Texture.fromImage('./images/title.jpg'));
    image.width = 300;
    image.height = 247;
    appStage.addChild(image);
    image.position.set(WIDTH/2 - (image.width / 2), HEIGHT - 450);



    button.addChild(BGElem(0, 0, buttonWidth, buttonHeight, 0x88FF88));

    const text = new PIXI.Text("Enter the sewer", MESSAGE_STYLE_LARGE);
    button.addChild(text);
    text.anchor.set(0.5);
    text.position.set(buttonWidth / 2, buttonHeight / 2);

    button.interactive = true;
    button.on('pointerdown', () => {
        image.parent.removeChild(image);
        button.parent.removeChild(button);
        credits.parent.removeChild(credits);
        gameTitle.parent.removeChild(gameTitle);
        gameDesc.parent.removeChild(gameDesc);
        showGame(appStage)
    });

    appStage.addChild(button);
    button.position.set(WIDTH/2 - (buttonWidth / 2), HEIGHT - 150);
}

function showGame(appStage) {
    tradeWindow = new TradeWindow();
    appStage.addChild(tradeWindow);
    tradeWindow.position.set(0, 0);
    getNewTrade();

    const dialogElement = new DialogeElement("Click on images for descriptions!", FLAVOR_STYLE);
    window.setMainDialoge = (message) => {
      dialogElement.setDialogue(message);
    }
    dialogElement.text.anchor.set(.5,0)
    dialogElement.text.setTransform(WIDTH/2,0)
    appStage.addChild(dialogElement);
    dialogElement.position.set(0, HEIGHT - 250);

    var inventoryTableContainer = createInventoryContainerElement();
    appStage.addChild(inventoryTableContainer);
    inventoryTableContainer.position.set(0, HEIGHT - 150);

    var tradeButtonContainerElement = createTradeButtonContainerElement();
    appStage.addChild(tradeButtonContainerElement);
    tradeButtonContainerElement.position.set(0, HEIGHT - 50);
}

function main(){
    let app = new PIXI.Application({
        width: WIDTH,
        height: HEIGHT,
        antialias: true,
        transparent: false,
        resolution: 1
      }
    )

    document.body.appendChild(app.view);

    app.stage.addChild(BGElem(0, 0, WIDTH, HEIGHT, 0xDDDDDD));

    showStartScreen(app.stage);

}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

export { WIDTH, HEIGHT, tradeWindow }

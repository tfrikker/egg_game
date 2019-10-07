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
import { FLAVOR_STYLE } from './styles';
//iPhone 6

var tradeWindow;

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

    tradeWindow = new TradeWindow();
    app.stage.addChild(tradeWindow);
    tradeWindow.position.set(0, 0);
    getNewTrade();

    const dialogElement = new DialogeElement("Click on images for descriptions!", FLAVOR_STYLE);
    window.setMainDialoge = (message) => {
      dialogElement.setDialogue(message);
    }
    dialogElement.text.anchor.set(.5,0)
    dialogElement.text.setTransform(WIDTH/2,0)
    app.stage.addChild(dialogElement);
    dialogElement.position.set(0, HEIGHT - 250);

    var inventoryTableContainer = createInventoryContainerElement();
    app.stage.addChild(inventoryTableContainer);
    inventoryTableContainer.position.set(0, HEIGHT - 150);

    var tradeButtonContainerElement = createTradeButtonContainerElement();
    app.stage.addChild(tradeButtonContainerElement);
    tradeButtonContainerElement.position.set(0, HEIGHT - 50);

}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

export { WIDTH, HEIGHT, tradeWindow }

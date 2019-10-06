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
//iPhone 6

var tradeWindow;

function main(){
    console.log("Starting up...");
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
    console.log("Added tradeWindow");
    getNewTrade();
    console.log("Gotten first trade");

    const dialogElement = new DialogeElement("some message");
    window.setMainDialoge = (message) => {
      dialogElement.setDialogue(message);
    }
    app.stage.addChild(dialogElement);
    dialogElement.position.set(0, HEIGHT - 250);
    console.log("Added dialog element");

    var inventoryContainerElement = createInventoryContainerElement(getInventory());
    app.stage.addChild(inventoryContainerElement);
    inventoryContainerElement.position.set(0, HEIGHT - 150);
    console.log("Added inventory container element");

    var tradeButtonContainerElement = createTradeButtonContainerElement();
    app.stage.addChild(tradeButtonContainerElement);
    tradeButtonContainerElement.position.set(0, HEIGHT - 50);
    console.log("Added inventory container element");

    //app.ticker.add(delta => gameLoop(delta));
    //function gameLoop(delta){
        // card.x += 1*delta;
    //}

}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

export { WIDTH, HEIGHT, tradeWindow }

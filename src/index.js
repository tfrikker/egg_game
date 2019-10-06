import { createTradeWindow } from './trade_ui';
import { getNewTrade } from './gameState';

//iPhone X
const WIDTH = 375
const HEIGHT = 667

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

    const tradeWindow = createTradeWindow(getNewTrade()); //TODO initial egg trade
    app.stage.addChild(tradeWindow);

    app.ticker.add(delta => gameLoop(delta));
    function gameLoop(delta){
        // card.x += 1*delta;
    }

}

document.addEventListener("DOMContentLoaded", function(event) {
    main();
});

export { WIDTH, HEIGHT }

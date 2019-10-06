import { test_function } from './test_module';
import { createTradeWindow } from './trade_ui';

const WIDTH = 400
const HEIGHT = 700

function main(){
    test_function();
    let app = new PIXI.Application({ 
        width: WIDTH, 
        height: HEIGHT,                       
        antialias: true, 
        transparent: false, 
        resolution: 1
      } 
    )

    document.body.appendChild(app.view);

    //render the moving frame
    var center_x = WIDTH/2;
    var center_y = HEIGHT/2;
    var frame_w = 100;
    var frame_h = 150;

    const tradeWindow = createTradeWindow();
    app.stage.addChild(tradeWindow);

    app.ticker.add(delta => gameLoop(delta));
    function gameLoop(delta){
        // card.x += 1*delta;
    }

}

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});
  
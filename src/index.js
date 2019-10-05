import { test_function } from './test_module';

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

    const texture = PIXI.Texture.fromImage('./img/test_image.png');

    window.text = texture;
    var card = new PIXI.Graphics();

    const test_image = new PIXI.Sprite(texture);

    let style = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: 36,
        fill: "#ff0099",
        // stroke: '#ff3300',
        // strokeThickness: 4
      });
    let message = new PIXI.Text("Hello ", style);
    message.position = {x: 54, y: 96};
      

    app.stage.addChild(message);

    test_image.y = 110;
    var background = new PIXI.Graphics();
    card.fill = "#ff0099"
    background.beginFill(0xffffff);
    background.drawRect(0,0,WIDTH,HEIGHT);
    background.endFill();

    card.lineStyle(30, 0xff0000, 1);
    card.drawRect(0, 0, frame_w, frame_h);
    app.stage.addChild(background);
    app.stage.addChild(test_image)
    app.stage.addChild(message);
    app.stage.addChild(card);
    app.ticker.add(delta => gameLoop(delta));
    
    function gameLoop(delta){
        card.x += 1*delta;
    }

}

document.addEventListener("DOMContentLoaded", function(event) { 
    main();
});
  
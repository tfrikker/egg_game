const createSprite = (path, x=0, y=0) => {
    const sprite = new PIXI.Sprite(
        PIXI.Texture.fromImage(path)
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
    wordWrapWidth: 200,
  });

const createTradeWindow = (
    messageText='blah blah blah blah blah blah blah blah blah blah blah blah, ya want it?',
    // offerings=[],
    onAccept,
    onReject
) => {
    const WIDTH = 500
    const HEIGHT = 400
    const portraitHeight = 140;

    const container = new PIXI.Container();

    const background = new PIXI.Graphics();
    background.beginFill(0xffffff);
    background.drawRect(0,0,WIDTH,HEIGHT);
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
    characterSprite.position.set(30,10);
    // characterSprite.width = 150;
    
    container.addChild(characterSprite);
    
    offerings.forEach((offering, i) => {
        container.addChild(offering);
        offering.position.set(30 + i*80, 220);
    })
    
    
    const message = new PIXI.Text(messageText, MESSAGE_STYLE);
    message.position = {x: 200, y: 10};
    container.addChild(message)

    const rejectButton = createButton("nahh", 40, 300, () => {})
    container.addChild(rejectButton)
    
    // this is kinda janky and maybe causes a memory leak?
    const acceptButton = createButton("deal!", 200, 300, () => {
        console.log("LDSKFJSDLFKJ")
        container.parent.removeChild(container);
    })
    container.addChild(acceptButton)

    return container;
}

export { createTradeWindow }
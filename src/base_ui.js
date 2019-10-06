import {
  MESSAGE_STYLE
} from './styles';
import { getTexture } from './texture_bag';

export const WIDTH = 375
export const HEIGHT = 667

export class InspectableImage extends PIXI.Sprite{
    constructor(data, x=0, y=0){
        super(getTexture(data.image));
        this.position.set(x,y)
        this.flavorText = data.text
        this.interactive = true;
        this.on('pointerdown', () => {
            console.log(this.flavorText)
            //TODO: create this function
            window.setMainDialoge(this.flavorText)
        });
        this.addChild(this);
    }
    update(data){
        this.texture = getTexture(data.image)
        this.flavorText = data.text
    }
}

export class DialogeElement extends PIXI.Container{
  constructor(message){
    super()
    console.log("createDialogElement");
    const TABLE_HEIGHT = 50;
    this.addChild(BGRoundedElem(10, 0, WIDTH - 20, TABLE_HEIGHT, 0xAAAAAA));
    this.text = new PIXI.Text(message, MESSAGE_STYLE);
    this.addChild(this.text);
    this.text.position.set(10, TABLE_HEIGHT / 2);
    window.tex = this.text
  }
  setDialogue(message){
    this.text.text = message;
  }
}


export function createInventoryContainerElement(inventory) {
    console.log("createInventoryContainerElement");
    const LEFT_OFFSET = 10;
    const container = new PIXI.Container();

    const text = new PIXI.Text("Your inventory", MESSAGE_STYLE);
    container.addChild(text);
    text.position.set(LEFT_OFFSET, 0);

    const inventoryTableElement = createInventoryTableElement(inventory);
    container.addChild(inventoryTableElement);
    inventoryTableElement.position.set(LEFT_OFFSET, 20); //space for text

    return container;
}

export function createInventoryTableElement(inventory) {
    console.log("createInventoryTableElement");
    const TABLE_HEIGHT = 50;
    const container = new PIXI.Container();

    container.addChild(BGRoundedElem(0, 0, WIDTH - 20, TABLE_HEIGHT, 0xAAAAAA));

    const IMAGE_SIZE = 32;
    const VERT_SPACING = (TABLE_HEIGHT - IMAGE_SIZE) / 2;
    const HORIZ_SPACING = 5;
    var curX = HORIZ_SPACING;
    inventory.forEach(function(element) {
        var data = {
            image: element.image,
            messageText: element.text
        }
        var sprite = InspectableImage(data);
        container.addChild(sprite);
        sprite.position.set(curX, VERT_SPACING);
        curX += IMAGE_SIZE + HORIZ_SPACING;
    });

    return container;
}

export function createTradeButtonContainerElement() {
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

    button.addChild(BGElem(0, 0, buttonWidth, buttonHeight, 0x00FF00));

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

    button.addChild(BGElem(0, 0, buttonWidth, buttonHeight, 0xFF0000));

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

export function BGRoundedElem(x, y, w, h, fill) {
    const background = new PIXI.Graphics();
    background.beginFill(fill);
    background.drawRoundedRect(x, y, w, h);
    background.endFill();

    return background;
}

export function BGElem(x, y, w, h, fill) {
    const background = new PIXI.Graphics();
    background.beginFill(fill);
    background.drawRect(x, y, w, h);
    background.endFill();

    return background;
}

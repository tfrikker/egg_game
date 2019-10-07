import {
  MESSAGE_STYLE,
  MESSAGE_STYLE_LARGE
} from './styles';
import { getTexture } from './texture_bag';
import { processTrade, getNewTrade, getInventory } from './gameState';

export const WIDTH = 375
export const HEIGHT = 667

var inventoryTable = new PIXI.Container();

export function getInventoryTable() {
    return inventoryTable;
}

export class InspectableImage extends PIXI.Sprite{
    constructor(data){
        super(getTexture(data.image));
        this.flavorText = data.text
        this.interactive = true;
        this.on('pointerdown', () => {
            //TODO: create this function
            window.setMainDialoge(this.flavorText)
        });
    }
    update(data){
        this.texture = getTexture(data.image)
        this.flavorText = data.text
    }
}

export class DialogeElement extends PIXI.Container{
  constructor(message){
    super()
    const TABLE_HEIGHT = 50;
    this.addChild(BGRoundedElem(10, 0, WIDTH - 20, TABLE_HEIGHT, 0xAAAAAA));
    this.text = new PIXI.Text(message, MESSAGE_STYLE);
    this.addChild(this.text);
    this.text.anchor.set(0, 0.5);
    this.text.position.set(20, TABLE_HEIGHT / 2);
    window.tex = this.text
  }
  setDialogue(message){
    this.text.text = message;
  }
}


export function createInventoryContainerElement() {
    const LEFT_OFFSET = 10;
    const container = new PIXI.Container();

    const text = new PIXI.Text("Your inventory", MESSAGE_STYLE);
    container.addChild(text);
    text.position.set(LEFT_OFFSET, 0);

    inventoryTable = createInventoryTableElement();
    container.addChild(inventoryTable);
    inventoryTable.position.set(LEFT_OFFSET, 20); //space for text

    return container;
}

export function createInventoryTableElement() {
    const TABLE_HEIGHT = 50;
    const container = new PIXI.Container();

    container.addChild(BGRoundedElem(0, 0, WIDTH - 20, TABLE_HEIGHT, 0xAAAAAA));

    updateInventoryTable();

    return container;
}

export function updateInventoryTable() {
    if (inventoryTable.children.length > 1) {
        inventoryTable.removeChildren(1); //remove all the images
    }
    const TABLE_HEIGHT = 50;
    const IMAGE_SIZE = 32;
    const VERT_SPACING = (TABLE_HEIGHT - IMAGE_SIZE) / 2;
    const HORIZ_SPACING = 5;
    var curX = HORIZ_SPACING;
    getInventory().forEach(function(element) {
        var scaledDown = element.image.substr(0, element.image.indexOf('.')) + "_1x.png";
        var data = {
            image: scaledDown,
            messageText: element.text
        }
        var sprite = new InspectableImage(data);
        inventoryTable.addChild(sprite);
        sprite.position.set(curX, VERT_SPACING);
        curX += IMAGE_SIZE + HORIZ_SPACING;
    });
}

export function createTradeButtonContainerElement() {
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
    const buttonWidth = WIDTH / 2;
    const buttonHeight = 50;
    //const but = new PIXI.Text(text, MESSAGE_STYLE);
    const button = new PIXI.Container();

    button.addChild(BGElem(0, 0, buttonWidth, buttonHeight, 0x00FF00));

    const text = new PIXI.Text("Let's do it!", MESSAGE_STYLE_LARGE);
    button.addChild(text);
    text.anchor.set(0.5);
    text.position.set(buttonWidth / 2, buttonHeight / 2);

    button.interactive = true;
    button.on('pointerdown', () => {
        processTrade();
        getNewTrade();
    });

    return button;
}

function createTradeNoButtonElement() {
    const buttonWidth = WIDTH / 2;
    const buttonHeight = 50;
    //const but = new PIXI.Text(text, MESSAGE_STYLE);
    const button = new PIXI.Container();

    button.addChild(BGElem(0, 0, buttonWidth, buttonHeight, 0xFF0000));

    const text = new PIXI.Text("Nah...", MESSAGE_STYLE_LARGE);
    button.addChild(text);
    text.anchor.set(0.5);
    text.position.set(buttonWidth / 2, buttonHeight / 2);

    button.interactive = true;
    button.on('pointerdown', () => {
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

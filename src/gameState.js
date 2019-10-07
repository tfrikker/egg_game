import { tradeWindow } from './index';
import { updateInventoryTable } from './base_ui';

var inventory = [];
var trade;
var numTrades = 0;

const getInventory = () => {
    return inventory;
}

const getTrade = () => {
    return trade;
}

const processTrade = () => {
    //remove all items being bought by buyer
    trade.trade.itemsBuying.forEach(function(item) {
        for (var i = 0; i < inventory.length; i++) {
            if (inventory[i].id == item.id) {
                inventory.splice(i, 1);
                break;
            }
        }
    });
    //add all items being sold by buyer
    trade.trade.itemsSelling.forEach(function(item) {
        inventory.push(item);
    });
    numTrades++;
    updateInventoryTable();
}

const getNewTrade = () => {
    $.post( location.protocol + "/newTrade", { inventory: JSON.stringify(inventory) }, function(data) {
        trade = data;
        tradeWindow.update();
        if (numTrades == 0) {
            window.setMainDialoge("\"Aw, you poor kid – y'ain't got nothin? Here, have an egg. You'll need it in this economy.\"");
        }
    });
}


export { processTrade, getNewTrade, getInventory, getTrade }

import { createTradeWindow } from './trade_ui';

var inventory = [];

const getInventory = () => {
    return inventory;
}

const processTrade = (trade) => {
    console.log("processTrade: Processing trade");
    //remove all items being bought by buyer
    trade["itemsBuying"].forEach(function(item) {
        var index = inventory.indexOf(item);
        if (index !== -1) array.splice(index, 1);
    });
    console.log("processTrade: after removing sold items, inventory: " + inventory);
    //add all items being sold by buyer
    trade["itemsSelling"].forEach(function(item) {
        inventory.push(item);
    });
    console.log("processTrade: after adding bought items, inventory: " + inventory);
}

const getNewTrade = () => {
    console.log("getNewTrade: ask server for new trade");
    console.log("   inventory: " + inventory);
    $.post( location.protocol + "/newTrade", { inventory: JSON.stringify(inventory) }, function(data) {
        console.log("getNewTrade: new trade returned from server");
        console.log(data);
        createTradeWindow(data)
    });
}


export { processTrade, getNewTrade, getInventory }

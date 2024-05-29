const items = require("./fakeDb");
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  static getItemList() {
    return items;
  }

  static findItem(name) {
    const itemToFind = items.find((item) => item.name === name);
    if (itemToFind === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    return itemToFind;
  }

  static updateItem(name, newData) {
    let itemToUpdate = Item.findItem(name);

    if (newData.name !== undefined) {
      itemToUpdate.name = newData.name;
    }
    if (newData.price !== undefined) {
      itemToUpdate.price = newData.price;
    }
    return itemToUpdate;
  }

  static deleteItem(name) {
    let itemToDelete = Item.findItem(name);
    if (itemToDelete !== undefined) {
      let itemIndex = items.findIndex((item) => item.name === name);
      items.splice(itemIndex, 1);
    }
    return { message: `${name} deleted successfully` };
  }
}

module.exports = Item;

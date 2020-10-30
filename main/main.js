module.exports = function main(input) {
    return printInventory(input);
};
function printInventory(input) {
    let productsOrders = CreateProductsOrders(CreateProductNameAndPrice(input), input);
    let total = CalculateTotal(productsOrders).toFixed(2);
    let printer = "***<store earning no money>Receipt ***\n";
    for(let i = 0; i < productsOrders.length; i ++){
        printer += "Name: " + productsOrders[i].Name + ", Quantity: " + productsOrders[i].Quantity;
        if(productsOrders[i].Name != "Battery"){
            if(productsOrders[i].Quantity > 1){ printer += " bottles";}
            else {printer += " bottle";}
        }
        printer += ", Unit price: " + productsOrders[i].UnitPrice.toFixed(2) + " (yuan), Subtotal: " + productsOrders[i].Subtotal.toFixed(2) + " (yuan)\n";
    }
    printer += "----------------------\n" + "Total: " + total + " (yuan)\n" + "**********************\n";
    return printer;
};

class productsOrder {
    constructor(name, unitPrice){
        this.Name = name;
        this.UnitPrice = unitPrice;
        this.Quantity = 0;
        this.Subtotal = 0;
    }
    CalculateSubtotal(){
        this.Subtotal = this.UnitPrice * this.Quantity;
    }
}

function CreateProductNameAndPrice(input){
    let productNameAndPrice = {};
    for(let i = 0; i < input.length; i ++){
        productNameAndPrice[input[i].Name] = input[i].Price;
    }
    return productNameAndPrice;
}

function CreateProductsOrders(productNameAndPrice, input){
    let productName = Object.keys(productNameAndPrice);
    let productsOrders = [];
    for(let i = 0; i < productName.length; i ++){
        productsOrders.push(new productsOrder(productName[i], productNameAndPrice[productName[i]]));
    }
    for(let i = 0; i < input.length; i ++){
        for(let j = 0; j < productName.length; j ++){
            if(input[i].Name == productsOrders[j].Name) {
                productsOrders[j].Quantity += 1; 
            }
        }
    }
    return productsOrders;
}

function CalculateTotal(productsOrders){
    let total = 0;
    for(let i = 0; i < 3; i ++){
        productsOrders[i].CalculateSubtotal();
        total += productsOrders[i].Subtotal;
    }
    return total;
}
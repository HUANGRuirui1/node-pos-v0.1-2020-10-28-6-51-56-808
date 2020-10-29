module.exports = function printInventory(products) {
    CreateProductsOrders(products, productsOrders);
    let total = CalculateTotal(productsOrders).toFixed(2);
    let printer = "***<store earning no money>Receipt ***\n";
    for(let i = 0; i < 3; i ++){
        printer += "Name: " + productsOrders[i].Name + ", Quantity: " + productsOrders[i].Quantity;
        if(productsOrders[i].Name != "Battery"){
            if(productsOrders[i].Quantity > 1){ printer += " bottles";}
            else {printer += " bottle";}
        }
        printer += ", Unit price: " + productsOrders[i].UnitPrice.toFixed(2) + " (yuan), Subtotal: " + productsOrders[i].Subtotal.toFixed(2) + "\n";
    }
    printer += "----------------------\n" + "Total: " + total + "(yuan)\n" + "**********************\n";
    return printer;
};

let productsOrder = {
    Name : "",
    Quantity : 0,
    UnitPrice : 0,
    Subtotal : 0,
    CalculateSubtotal(){
        this.Subtotal = this.UnitPrice * this.Quantity;
    }
}
let productsOrders = [
    { __proto__ : productsOrder },
    { __proto__ : productsOrder },
    { __proto__ : productsOrder }
]

function CreateProductsOrders(products, productsOrders){
    productsOrders[0].Name = "Coca-Cola";
    productsOrders[1].Name = "Sprite";
    productsOrders[2].Name = "Battery";
    let i = 0;
    for(; i < products.length; i ++){
        if(products[i].Name == "Coca-Cola") { productsOrders[0].Quantity += 1;
            productsOrders[0].UnitPrice = products[i].Price;
            let a = products[i].Price;
        }
        if(products[i].Name == "Sprite") { productsOrders[1].Quantity += 1;
            productsOrders[1].UnitPrice = products[i].Price;
        }
        if(products[i].Name == "Battery") { productsOrders[2].Quantity += 1;
            productsOrders[2].UnitPrice = products[i].Price;
        }
    }
}

function CalculateTotal(productsOrders){
    let total = 0;
    for(let i = 0; i < 3; i ++){
        productsOrders[i].CalculateSubtotal();
        total += productsOrders[i].Subtotal;
    }
    return total;
}
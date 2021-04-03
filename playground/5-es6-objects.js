// Object property shorthand
const name = "Daisuke";
const userAge = 40;
const user =
{
    name,
    age: userAge,
    location: "Marietta"
};

console.log(user);

// Object destructuring
const product =
{
    label: "Red notebooks",
    price: 3,
    stock: 201,
    salePrice: undefined   
};

const { label: productLabel, price, stock, salePrice } = product;

console.log(productLabel);
console.log(price);
console.log(stock);
console.log(salePrice);

const transaction = (type, { label, stock }) =>
{
    console.log(type, label, stock);
}

transaction("order", product);
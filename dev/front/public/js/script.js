async function getVersion(){
    const version = await fetch('http://localhost:3000/version')
                        .then(res => res.text())
                        .then(text => JSON.parse(text)["version"]);
    return version;
}

async function getPizzas(){
    const pizzas = await fetch('http://localhost:3000/pizzas')
                        .then(res => res.text())
                        .then(text => JSON.parse(text));
    return pizzas;
}

async function getPizza(name){
    const pizza = await fetch(`http://localhost:3000/pizzas?name=${name}`)
                        .then(res => res.status)
    return pizza;
}
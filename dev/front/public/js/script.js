async function getVersion(){
    console.log("getVersion()");
    const version = await fetch('http://localhost:3000/version')
                        .then(res => res.text())
                        .then(text => JSON.parse(text)["version"]);
    return version;
}

async function getPizzas(){
    console.log("getPizzas()");
    const pizzas = await fetch('http://localhost:3000/pizzas')
                        .then(res => res.text())
                        .then(text => JSON.parse(text));
    return pizzas;
}
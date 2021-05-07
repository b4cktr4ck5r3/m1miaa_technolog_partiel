async function getVersion(){
    const version = await fetch('http://localhost:3000/version')
                        .then(res => res.text())
                        .then(text => JSON.parse(text)["version"]);
    return version;
}

async function getTestModel(){
    const model = await fetch('')
}
async function getVersion(){
    const version = await fetch('http://localhost:3000/version')
                        .then(res => res.text())
                        .then(text => JSON.parse(text)["version"]);
    return version;
}

async function getTestModel(){
    const model = await fetch('')
}

async function addNewEntry(){
    const result = await fetch('http://localhost:3000/create', {
        headers :{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        method: 'post',
        body: JSON.stringify({name:'FromScript'})
    }).then(res => res.text());
    return result;
}
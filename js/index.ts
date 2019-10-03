import axios, { AxiosResponse, AxiosError} from "../../node_modules/axios/index";

let getbutton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("getButton");
getbutton.addEventListener("click", ()=>{
    let inputElement : HTMLInputElement = <HTMLInputElement> document.getElementById("getInputId");
    

    if(inputElement.value === "" || inputElement.value === " " || inputElement.value === null){
        getAll();
    }
    else{
        let ID : Number = Number(inputElement.value);
        getWithId2(ID);
    }
});

function getWithId(ID : Number) : void{
    let resultElement : HTMLDivElement = <HTMLDivElement> document.getElementById("getIdResult");

    axios.get("http://democlassrestservice.azurewebsites.net/api/Items/" + ID)
        .then(function(response){
            resultElement.innerHTML = JSON.stringify(response.data);
        })
        .catch(function(error){
            resultElement.innerHTML = "Failed... " + error;
        })
}

function getWithId2(ID : Number) : void{
    let resultElement : HTMLDivElement = <HTMLDivElement> document.getElementById("getIdResult");

    axios.get<Item>("http://democlassrestservice.azurewebsites.net/api/Items/" + ID)
        .then(function(response){
            let data: Item = response.data;
            resultElement.innerHTML = JSON.stringify(data);
        })
        .catch(function(error){
            resultElement.innerHTML = "Failed... " + error;
        })
}

function getAll() : void{
    let resultElement : HTMLDivElement = <HTMLDivElement> document.getElementById("getIdResult");

    axios.get("http://democlassrestservice.azurewebsites.net/api/Items/")
        .then(function(response){
            resultElement.innerHTML = JSON.stringify(response.data);
        })
        .catch(function(error){
            resultElement.innerHTML = "Failed... " + error;
        })
}

let postbutton : HTMLButtonElement = <HTMLButtonElement> document.getElementById("postButton");
postbutton.addEventListener("click", post);

function post() : void{
    let postinputElement : HTMLInputElement = <HTMLInputElement> document.getElementById("postInput");
    let postResult : HTMLDivElement = <HTMLDivElement> document.getElementById("postResult");


    let itemInfo : string[] = postinputElement.value.split(";");

    let postItem = new Item(Number(itemInfo[0]), itemInfo[1], itemInfo[2], Number(itemInfo[3]));

    axios.post("http://democlassrestservice.azurewebsites.net/api/Items", postItem)
    .then(function(response){
        postResult.innerHTML = response.status.toString();
    })
    .catch(function(error){
        postResult.innerHTML = error;
    });
}

class Item{
    id : number;
    name : string;
    quality : string;
    quantity : number;
    constructor(id : number, name : string, quality : string, quantity : number){
        this.id = id;
        this.name = name;
        this.quality = quality;
        this.quantity = quantity;
    }
}
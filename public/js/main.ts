// import landing from '../styles/landing.module.css';

export {}

// types:
// - general datatype
// - chiplet store
// - card store

type Card = {
    title: string,
    img: string
};

type Chiplet = {
    name: string,
    highlightColor: string,
    icon?: string
}

type Content = {
    name: string,
    img: string,
    tags: string[]
}

var contentStore: Content[] = [];

console.log("stage 1");

async function getContent() {
    console.log("testy fart");
    var a = await fetch("/.netlify/functions/content");
    console.log(a);
    var b = await a.json();
    console.log(b);
    console.log("testy fart 2");
    for(var i = 0; i < b.length; i++) {
        let content: Content = {
            name: b[i].name,
            img: b[i].img,
            tags: b[i].tags
        }
        contentStore.push(content);
    }
    console.log(contentStore);
    console.log("test!!! BRUH");
    getTags();
    render();
}

var cardContainer: any = document.getElementById("card-container"), chipletContainer: any = document.getElementById("chiplet-container");
if(cardContainer != undefined) {
    cardContainer.set = function(content: string) {
        if(cardContainer != undefined) cardContainer.innerHTML = content;
    }
}

if(chipletContainer != undefined) {
    chipletContainer.set = function(content: string) {
        if(cardContainer != undefined) chipletContainer.innerHTML = content;
    }
}
var processor = {
    chip: function(name: string) {
        return '<a class="chiplets">' + name + '</a>';
    },
    card: function(c: Card) {
        return '<a class="cards"><img class="card_thumbnail" src="' + c.img + '"></img><div class="card_title">' + c.title + '</div></a>';
    }
}

function render_cards(content: string) {
    if(cardContainer != null) cardContainer.innerHTML = content;
}

// MAIN CODE


var tagsAggregate : Map<any, any> | undefined | null = new Map<string, string>();
function getTags() {
    tagsAggregate = new Map<string, string>();
    if(tagsAggregate == null || tagsAggregate == undefined) {
        return;
    }
    for(var i = 0; i < contentStore.length; i++) {
        console.log(contentStore[i]);
        console.log(contentStore[i].tags);
        for(var j = 0; j < contentStore[j].tags.length; j++) {
            console.log("tag: " + contentStore[i].tags[j]);
            tagsAggregate.set(contentStore[i].tags[j], contentStore[i].tags[j]);
        }
    }
}

function render() {
    clear();
    var tags: string = "";

    tagsAggregate?.forEach((key: string, value: string) => {
        console.log("key: " + key + ", value: " + value);
        let elem: any = document.createElement('a');
        let chippy: any = document.querySelector("#chiplet-container");
        elem.className = "chiplets";
        elem.innerHTML = key;
        elem.highlightColor = "red";
        chippy.appendChild(elem);
    });
    console.log(tags);
    var content: string = "";
    for(var i = 0; i < contentStore.length; i++) {
        let elem: any = document.createElement('a');
        let cardy: any = document.querySelector("#card-container");
        elem.className = "cards";
        elem.innerHTML = '<img class="card_thumbnail" src="' + contentStore[i].img + '"></img><div class="card_title">' + contentStore[i].name + '</div>';
        elem.tags = contentStore[i].tags;
        console.log(elem.tags);
        cardy.appendChild(elem);
        elem.addEventListener("mouseover", function() {
            console.log("moused over");
            card_hover(elem);
        });
    }
    window.addEventListener("mousemove", function() {
        window_onMove();
    });
    console.log("rendered!");


}

function clear() {
    if(cardContainer != null) cardContainer.innerHTML = "";
    if(chipletContainer != null) chipletContainer.innerHTML = "";
}

console.log("stage 2");

getContent();

// HOVER CODE

function card_hover(elem: any) {
    if(elem.matches(':hover')) {
        elem.hovered = true;
        elem.classList.add("hover");
        elem.classList.remove("unhover");
        let cards = document.querySelectorAll("a.cards");
        for(var i = 0; i < cards.length; i++) {
            if(cards[i] != elem) {
                cards[i].classList.add("unhover");
                cards[i].classList.remove("hover");
            }
        }
    } else {
        elem.hovered = false;
        elem.classList.add("unhover");
        elem.classList.remove("hover");
    }
}

function window_onMove() {

}
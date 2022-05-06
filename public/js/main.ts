export {}

console.log("test! just want to know if this runs! :)");

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

var tagsAggregate: Map<string, number> = new Map();

var chipletStore: Chiplet[] = [];
var cardStore: Card[] = [];
var contentStore: Content[] = [];

console.log("stage 1");

async function getContent() {
    console.log("testy fart");
    var a = await fetch("/.netlify/functions/content");
    console.log(a);
    var b = await a.json();
    console.log(b);
    console.log("testy fart 2");
    for(var item in b) {
        let content: Content = {
            name: b.name,
            img: b.img,
            tags: b.tags
        };
        contentStore.push(content);
    }
    console.log(contentStore);
    getTags();
    render();
}

var cardContainer = document.getElementById("card-container"), chipletContainer = document.getElementById("chiplet-container");

var processor = {
    chip: function(c: Chiplet) {
        return '<a className={landing.chiplets}>' + c.name + '</a>';
    },
    card: function(c: Card) {
        return '<a className={landing.cards}><img className={landing.card_thumbnail} src={"' + c.img + '"}></img><div className={landing.card_title}>' + c.title + '</div></a>';
    }
}

function render_cards(content: string) {
    if(cardContainer != null) cardContainer.innerHTML = content;
}

function render_chips(chips: string) {
    if(chipletContainer != null) chipletContainer.innerHTML = chips;
}

// MAIN CODE


function getTags() {
    if(tagsAggregate == null || tagsAggregate == undefined) {
        return;
    }
    // var tag_map = new Map();
    var count: number = 0;
    tagsAggregate = new Map<string, number>();
    for(var i = 0; i < contentStore.length; i++) {
        for(var tag in contentStore[i].tags) {
            if(typeof tagsAggregate.get(tag) == 'undefined') {
                return;
            }
            if(tagsAggregate.get(tag) === undefined) {
                return;
            }
            if(tagsAggregate === undefined) {
                break;
            }
            console.log("BOOB!!! TEST LOL");
            if(tagsAggregate.get(tag) >= 1) {
                tagsAggregate.set(tag, tagsAggregate.get(tag) + 1);
            } else {
                tagsAggregate.set(tag, 1);
            }
        }
    }
}

function render() {
    
}

console.log("stage 2");

getContent();
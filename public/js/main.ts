// import landing from '../styles/landing.module.css';

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

// var tagsAggregate = new Map<string, number>();

// var chipletStore: Chiplet[] = [];
// var cardStore: Card[] = [];
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
    // var tag_map = new Map();
    // var count: number = 0;
    for(var i = 0; i < contentStore.length; i++) {
        console.log(contentStore[i]);
        console.log(contentStore[i].tags);
        for(var j = 0; j < contentStore[j].tags.length; j++) {
            console.log("tag: " + contentStore[i].tags[j]);
            tagsAggregate.set(contentStore[i].tags[j], contentStore[i].tags[j]);
        }
        // for(var tag in contentStore[i].tags) {
        //     console.log("tag: " + tag);
        //     tagsAggregate.set(tag, tag);
        //     console.log("tagsAggregate: " + tagsAggregate);
            // if(tagsAggregate.get(tag) >= 1) {
            //     tagsAggregate.set(tag, tagsAggregate.get(tag) + 1);
            // } else {
            //     tagsAggregate.set(tag, 1);
            // }
            // if(typeof tagsAggregate.get(tag) == 'undefined') return;
            // if(tagsAggregate["get"](tag) === undefined) return;
            // if(tagsAggregate === undefined) break;
            // if(tagsAggregate.size == 0) break;
            // console.log("BOOB!!! TEST LOL");
            // if(tagsAggregate != undefined) {
            //     if(tagsAggregate !== undefined) {

            //         if(tagsAggregate.get(tag) >= 1) {
            //             tagsAggregate.set(tag, tagsAggregate.get(tag) + 1);
            //         } else {
            //             tagsAggregate.set(tag, 1);
            //         }    
            //     }
            // }
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
        // tags = tags + processor.chip(key);
    });
    console.log(tags);
    var content: string = "";
    for(var i = 0; i < contentStore.length; i++) {
        // var card: Card = {
        //     title: contentStore[i].name,
        //     img: contentStore[i].img
        // };

        let elem: any = document.createElement('a');
        let cardy: any = document.querySelector("#card-container");
        elem.className = "cards";
        elem.innerHTML = '<img class="card_thumbnail" src="' + contentStore[i].img + '"></img><div class="card_title">' + contentStore[i].name + '</div>';
        cardy.appendChild(elem);
        // let cardy: any = document.querySelector("#card-container");

        // content = content + processor.card(card);
    }
    // cardContainer.innerHTML = content;
    // chipletContainer.innerHTML = tags;
    console.log("rendered!");
    // chipletContainer?.set(content);
    // cardContainer?.set(content);


    // for(var a of tagsAggregate) {
    //     tags = tags + processor.chip(a[0])
    // }
    // for(var i: number = 0; i < tagsAggregate.size; i++) {
    //     tags = tags + processor.chip(tagsAggregate);
    // }
}

function clear() {
    if(cardContainer != null) cardContainer.innerHTML = "";
    if(chipletContainer != null) chipletContainer.innerHTML = "";
}

console.log("stage 2");

getContent();
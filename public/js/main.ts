declare global {
    interface Window { hoverX: any; hoverY: any; }
}
// import landing from '../styles/landing.module.css';

import { isJSDocThisTag } from "typescript";

export {}

window.hoverX = -20;
window.hoverY = 10;

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
    var a = await fetch("/.netlify/functions/content");
    var b = await a.json();
    for(var i = 0; i < b.length; i++) {
        let content: Content = {
            name: b[i].name,
            img: b[i].img,
            tags: b[i].tags
        }
        contentStore.push(content);
    }
    console.log(contentStore);
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
        for(var j = 0; j < contentStore[i].tags.length; j++) {
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
        elem.className = "chips";
        elem.innerHTML = key;
        elem.highlightColor = "red";
        elem.tag = key;
        elem.toggled = false;
        elem.addEventListener("click", (event:any) => {
            let elem = event.currentTarget;
            if(elem.toggled) {
                filter.remove(elem.tag);
                elem.classList.remove("hover");
                elem.classList.add("unhover");
                elem.classList.remove("selected");
                elem.toggled = false;
            } else {
                filter.add(elem.tag);
                elem.classList.remove("unhover");
                elem.classList.add("hover");
                elem.classList.add("selected");
                elem.toggled = true;
            }
        });
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
    }
    window.addEventListener("mousemove", function(event) {
        window_onMove(event);
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

function window_onMove(event:any) {
    console.log("mouse moved");

    let elem:any = document.querySelector("a:hover");
    let chips = document.querySelectorAll("a.chips");
    let cards = document.querySelectorAll("a.cards");
    // window.hoverX = 20;
    if(elem?.matches("a.chips")) {
        console.log("hovering over a chip");
        filter.highlight_search(elem.tag);
    } else if(elem?.matches("a.cards")) {
        for(var i = 0; i < cards.length; i++) {
            var card: any;
            card = cards[i];
            
            if(cards[i] != elem) {
                cards[i].classList.add("unhover");
                cards[i].classList.remove("hover");
                card.style.transform = "unset";
            } else {
                card.style.transition = "transform 0.01s ease";
                let mouseX = event.clientX, mouseY = event.clientY;
                let offX = card.offsetLeft, offY = card.offsetTop;
                let cardWidth = card.offsetWidth, cardHeight = card.offsetHeight;
                let x = mouseX - offX - cardWidth * 0.5, y = mouseY - offY - cardHeight * 0.5;
                let rotX = -1 * (x / (cardWidth * 0.5)), rotY = -1 * (y / (cardHeight * 0.5));
                // card.style.transform = "rotate3d(" + 45 * rotY + ", " + 45 * rotX + ", 0, 1deg) scale(1.2)";
                card.style.transform = "rotateX(" + window.hoverX * rotY + "deg) rotateY(" + window.hoverY * rotX + "deg) scale(1.2)";
                cards[i].classList.add("hover");
                cards[i].classList.remove("unhover");
            }

        }
    }
    else {
        for(var i = 0; i < cards.length; i++) {
            let card:any = cards[i];
            card.style.transition = "transition 0.15s ease";
            card.classList.add("unhover");
            card.style.transform = "unset";
            card.classList.remove("hover");
            card.classList.remove("highlight");

        }
        for(var i = 0; i < chips.length; i++) {
            chips[i].classList.remove("hover");
        }
    }
}

// FILTER FUNCTIONALITY

var filter = {
    tags: Array<string>(),
    add: function(tag: string) {
        if(this.tags.indexOf(tag) == -1) {
            this.tags.push(tag);
            this.update();
        }    
    },
    remove: function(tag: string) {
        let i = this.tags.indexOf(tag);
        if(i != -1) {
            this.tags.splice(i, 1);
            this.update();
        }
    },
    clear: function() {
        this.tags = new Array<string>();
        this.update();
    },
    update: function() {
        console.log("current tags: " + this.tags);
        let cards: any = document.querySelectorAll("a.cards");
        for(var i = 0; i < cards.length; i++) {
            cards[i].classList.remove("forced_hidden");
        }
        for(var i = 0; i < cards.length; i++) {
            for(var tag in this.tags) {
                if(cards[i].tags.indexOf(this.tags[tag]) == -1) {
                    cards[i].classList.add("forced_hidden");
                } 
            }
        }
    },
    highlight_search: function(tag: string) {
        let elems = document.querySelectorAll("a.cards");
        for(var i = 0; i < elems.length; i++) {
            let elem: any = elems[i];
            if(elem.tags.indexOf(tag) != -1) {
                elem.classList.add("highlight");
            } else {
                elem.classList.remove("highlight");
            }
        }
    },
    unhighlight: function() {
        let elems = document.querySelectorAll("a.cards");
        for(var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("highlight");
        }
    }
}

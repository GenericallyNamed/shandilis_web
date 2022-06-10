"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
window.hoverX = -20;
window.hoverY = 10;
var contentStore = [];
console.log("stage 1");
function getContent() {
    return __awaiter(this, void 0, void 0, function () {
        var a, b, i, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("/.netlify/functions/content")];
                case 1:
                    a = _a.sent();
                    return [4 /*yield*/, a.json()];
                case 2:
                    b = _a.sent();
                    for (i = 0; i < b.length; i++) {
                        content = {
                            name: b[i].name,
                            img: b[i].img,
                            tags: b[i].tags
                        };
                        contentStore.push(content);
                    }
                    console.log(contentStore);
                    getTags();
                    render();
                    return [2 /*return*/];
            }
        });
    });
}
var cardContainer = document.getElementById("card-container"), chipletContainer = document.getElementById("chiplet-container");
if (cardContainer != undefined) {
    cardContainer.set = function (content) {
        if (cardContainer != undefined)
            cardContainer.innerHTML = content;
    };
}
if (chipletContainer != undefined) {
    chipletContainer.set = function (content) {
        if (cardContainer != undefined)
            chipletContainer.innerHTML = content;
    };
}
// MAIN CODE
var tagsAggregate = new Map();
function getTags() {
    tagsAggregate = new Map();
    if (tagsAggregate == null || tagsAggregate == undefined) {
        return;
    }
    for (var i = 0; i < contentStore.length; i++) {
        console.log(contentStore[i]);
        console.log(contentStore[i].tags);
        for (var j = 0; j < contentStore[i].tags.length; j++) {
            console.log("tag: " + contentStore[i].tags[j]);
            tagsAggregate.set(contentStore[i].tags[j], contentStore[i].tags[j]);
        }
    }
}
function render() {
    clear();
    var tags = "";
    tagsAggregate === null || tagsAggregate === void 0 ? void 0 : tagsAggregate.forEach(function (key, value) {
        console.log("key: " + key + ", value: " + value);
        var elem = document.createElement('a');
        var chippy = document.querySelector("#chiplet-container");
        elem.className = "chips";
        elem.innerHTML = key;
        elem.highlightColor = "red";
        elem.tag = key;
        elem.toggled = false;
        elem.addEventListener("click", function (event) {
            var elem = event.currentTarget;
            if (elem.toggled) {
                filter.remove(elem.tag);
                elem.classList.remove("hover");
                elem.classList.add("unhover");
                elem.classList.remove("selected");
                elem.toggled = false;
            }
            else {
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
    var content = "";
    for (var i = 0; i < contentStore.length; i++) {
        var elem = document.createElement('a');
        var cardy = document.querySelector("#card-container");
        elem.className = "cards";
        elem.innerHTML = '<img class="card_thumbnail" src="' + contentStore[i].img + '"></img><div class="card_title">' + contentStore[i].name + '</div>';
        elem.tags = contentStore[i].tags;
        console.log(elem.tags);
        cardy.appendChild(elem);
    }
    window.addEventListener("mousemove", function (event) {
        window_onMove(event);
    });
    console.log("rendered!");
}
function clear() {
    if (cardContainer != null)
        cardContainer.innerHTML = "";
    if (chipletContainer != null)
        chipletContainer.innerHTML = "";
}
console.log("stage 2");
getContent();
// HOVER CODE
function window_onMove(event) {
    console.log("mouse moved");
    var elem = document.querySelector("a:hover");
    var chips = document.querySelectorAll("a.chips");
    var cards = document.querySelectorAll("a.cards");
    // window.hoverX = 20;
    if (elem === null || elem === void 0 ? void 0 : elem.matches("a.chips")) {
        console.log("hovering over a chip");
        filter.highlight_search(elem.tag);
    }
    else if (elem === null || elem === void 0 ? void 0 : elem.matches("a.cards")) {
        for (var i = 0; i < cards.length; i++) {
            var card;
            card = cards[i];
            if (card != elem) {
                card.classList.add("unhover");
                card.classList.remove("hover");
                card.hoverEnabled = false;
                console.log("card hover disabled");
                card.style.transform = "unset";
            }
            else {
                if (card.classList.contains("unhover")) {
                    card.classList.remove("unhover");
                    card.classList.add("hover");
                    setTimeout(function () {
                        if (card.classList.contains("hover")) {
                            console.log("hover enabled");
                            card.style.transition = "0.0s ease";
                            card.hoverEnabled = true;
                            console.log("card hover enabled");
                        }
                    }, 150, card);
                    // card.style.transition = "0.0s ease";
                }
                if (card.hoverEnabled) {
                    card.style.transition = "transform 0.0s ease";
                    var mouseX = event.clientX, mouseY = event.clientY;
                    var offX = card.offsetLeft, offY = card.offsetTop;
                    var cardWidth = card.offsetWidth, cardHeight = card.offsetHeight;
                    var x = mouseX - offX - cardWidth * 0.5, y = mouseY - offY - cardHeight * 0.5;
                    var rotX = -1 * (x / (cardWidth * 0.5)), rotY = -1 * (y / (cardHeight * 0.5));
                    // card.style.transform = "rotate3d(" + 45 * rotY + ", " + 45 * rotX + ", 0, 1deg) scale(1.2)";
                    card.style.transform = "rotateX(" + (window.hoverX * rotY) + "deg) rotateY(" + (window.hoverY * rotX + window.hoverY) + "deg) scale(1.2)";
                }
            }
        }
    }
    else {
        for (var i = 0; i < cards.length; i++) {
            var card_1 = cards[i];
            // card.style.transition = "transition 0.01s ease";
            if (card_1.classList.contains("hover")) {
                card_1.classList.remove("hover");
                card_1.classList.add("unhover");
                card_1.style.transition = "0.15s ease";
            }
            // card.classList.add("unhover");
            card_1.style.transform = "unset";
            // card.classList.remove("hover");
            card_1.classList.remove("highlight");
        }
        for (var i = 0; i < chips.length; i++) {
            chips[i].classList.remove("hover");
        }
    }
}
// FILTER FUNCTIONALITY
var filter = {
    tags: Array(),
    add: function (tag) {
        if (this.tags.indexOf(tag) == -1) {
            this.tags.push(tag);
            this.update();
        }
    },
    remove: function (tag) {
        var i = this.tags.indexOf(tag);
        if (i != -1) {
            this.tags.splice(i, 1);
            this.update();
        }
    },
    clear: function () {
        this.tags = new Array();
        this.update();
    },
    update: function () {
        console.log("current tags: " + this.tags);
        var cards = document.querySelectorAll("a.cards");
        for (var i = 0; i < cards.length; i++) {
            cards[i].classList.remove("forced_hidden");
        }
        for (var i = 0; i < cards.length; i++) {
            for (var tag in this.tags) {
                if (cards[i].tags.indexOf(this.tags[tag]) == -1) {
                    cards[i].classList.add("forced_hidden");
                }
            }
        }
    },
    highlight_search: function (tag) {
        var elems = document.querySelectorAll("a.cards");
        for (var i = 0; i < elems.length; i++) {
            var elem = elems[i];
            if (elem.tags.indexOf(tag) != -1) {
                elem.classList.add("highlight");
            }
            else {
                elem.classList.remove("highlight");
            }
        }
    },
    unhighlight: function () {
        var elems = document.querySelectorAll("a.cards");
        for (var i = 0; i < elems.length; i++) {
            elems[i].classList.remove("highlight");
        }
    }
};

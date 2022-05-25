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
console.log("test! just want to know if this runs! :)");
// var tagsAggregate = new Map<string, number>();
// var chipletStore: Chiplet[] = [];
// var cardStore: Card[] = [];
var contentStore = [];
console.log("stage 1");
function getContent() {
    return __awaiter(this, void 0, void 0, function () {
        var a, b, i, content;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log("testy fart");
                    return [4 /*yield*/, fetch("/.netlify/functions/content")];
                case 1:
                    a = _a.sent();
                    console.log(a);
                    return [4 /*yield*/, a.json()];
                case 2:
                    b = _a.sent();
                    console.log(b);
                    console.log("testy fart 2");
                    for (i = 0; i < b.length; i++) {
                        content = {
                            name: b[i].name,
                            img: b[i].img,
                            tags: b[i].tags
                        };
                        contentStore.push(content);
                    }
                    console.log(contentStore);
                    console.log("test!!! BRUH");
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
var processor = {
    chip: function (name) {
        return '<a className={landing.chiplets}>' + name + '</a>';
    },
    card: function (c) {
        return '<a className={landing.cards}><img className={landing.card_thumbnail} src={"' + c.img + '"}></img><div className={landing.card_title}>' + c.title + '</div></a>';
    }
};
function render_cards(content) {
    if (cardContainer != null)
        cardContainer.innerHTML = content;
}
// function render_chips(chips: string) {
//     if(chipletContainer != null) chipletContainer.innerHTML = chips;
// }
// MAIN CODE
var tagsAggregate = new Map();
function getTags() {
    tagsAggregate = new Map();
    if (tagsAggregate == null || tagsAggregate == undefined) {
        return;
    }
    // var tag_map = new Map();
    // var count: number = 0;
    for (var i = 0; i < contentStore.length; i++) {
        for (var tag in contentStore[i].tags) {
            if (tagsAggregate.get(tag) >= 1) {
                tagsAggregate.set(tag, tagsAggregate.get(tag) + 1);
            }
            else {
                tagsAggregate.set(tag, 1);
            }
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
}
function render() {
    clear();
    var tags = "";
    tagsAggregate === null || tagsAggregate === void 0 ? void 0 : tagsAggregate.forEach(function (value, key) {
        tags = tags + processor.chip(key);
    });
    var content = "";
    for (var i = 0; i < contentStore.length; i++) {
        var card = {
            title: contentStore[i].name,
            img: contentStore[i].img
        };
        content = content + processor.card(card);
    }
    cardContainer.innerHTML = content;
    chipletContainer.innerHTML = tags;
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
    if (cardContainer != null)
        cardContainer.innerHTML = "";
    if (chipletContainer != null)
        chipletContainer.innerHTML = "";
}
console.log("stage 2");
getContent();

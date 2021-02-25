"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chance_1 = __importDefault(require("chance"));
const colors_1 = __importDefault(require("./data/colors"));
const animals_1 = __importDefault(require("./data/animals"));
class Animal {
    constructor(options) {
        this.options = {
            theme: "default",
            animals: animals_1.default,
        };
        this.animal = "pig";
        this.doc = {};
        if (options)
            this.options = Object.assign({}, this.options, options);
    }
    create(seed) {
        const base = "sonidissoawesomeyoucantevenimaginehowcoolitis";
        // create buffer from seed
        let uri = Buffer.from(seed + base || base, "utf8")
            .toString("hex")
            .split("");
        // pick animal based on uri
        this.animal = this.pickAnimal(uri);
        // import correct svg and parse as doc
        this.doc = this.svg();
        // theme the svg
        // colorize body
        this.styleBody(uri);
        // set attributes
        this.pickGlasses(uri);
        this.styleHair(uri);
        // turn into base64 data and return
        var s = new XMLSerializer().serializeToString(this.doc);
        return "data:image/svg+xml;base64," + btoa(s);
    }
    svg() {
        const svg = require(`./svg/${this.animal}.svg`);
        const xml = atob(svg.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
        let parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        return doc;
    }
    svgEl(base) {
        const xml = atob(base.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
        let parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        return doc;
    }
    pickAnimal(uri) {
        const segment1 = uri.slice(0, 40).join();
        const chance1 = new chance_1.default(segment1);
        return chance1.shuffle(this.options.animals)[0];
    }
    /**
     * Colorize body by seed or color value
     * @param uri string seed to chance on
     * @param color hex value color
     */
    styleBody(uri) {
        const segment1 = uri.slice(2, 12).join();
        const chance1 = new chance_1.default(segment1);
        let bodyColor = chance1.shuffle(colors_1.default[this.options.theme])[0];
        const body = this.doc.querySelector(`#body #outer`);
        if (body)
            body.style.fill = bodyColor;
        const earL = this.doc.querySelector(`#ears #outerL`);
        if (earL)
            earL.style.fill = bodyColor;
        const earR = this.doc.querySelector(`#ears #outerR`);
        if (earR)
            earR.style.fill = bodyColor;
    }
    styleHair(uri) {
        const segment1 = uri.slice(10, 30).join();
        const integer = new chance_1.default(segment1).bool({ likelihood: 50 });
        const hair = require(`./svg/hair/${this.animal}.svg`);
        const hairEl = this.svgEl(hair).querySelector('#hair');
        const mainEl = this.doc.getElementById('main');
        if (integer && mainEl && hairEl) {
            mainEl.appendChild(hairEl);
        }
    }
    pickGlasses(uri) {
        const segment1 = uri.slice(5, 25).join();
        const integer = new chance_1.default(segment1).bool({ likelihood: 50 });
        const hair = require(`./svg/sunglasses/${this.animal}.svg`);
        const hairEl = this.svgEl(hair).querySelector('#sunglasses');
        const mainEl = this.doc.getElementById('main');
        if (integer && mainEl && hairEl) {
            mainEl.appendChild(hairEl);
        }
    }
}
exports.default = Animal;
//# sourceMappingURL=index.js.map
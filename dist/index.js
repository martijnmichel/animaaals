"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const animals_svg_1 = __importDefault(require("./svg/animals.svg"));
const chance_1 = __importDefault(require("chance"));
const colors_1 = __importDefault(require("./data/colors"));
const animals_1 = __importDefault(require("./data/animals"));
class Animal {
    constructor(options) {
        this.options = {
            theme: 'default'
        };
        this.animal = 'mouse';
        this.doc = this.svg();
        console.log(options);
        if (options)
            this.options = Object.assign({}, this.options, options);
    }
    create(seed) {
        const base = 'sonidissoawesomeyoucantevenimaginehowcoolitis';
        // create bugger
        let uri = Buffer.from(seed + base || base, 'utf8').toString('hex').split('');
        console.log(uri);
        this.pickAnimal(uri);
        // colorize body
        this.styleBody(uri);
        console.log(this.doc);
        var s = new XMLSerializer().serializeToString(this.doc);
        return "data:image/svg+xml;base64," + btoa(s);
    }
    svg() {
        const xml = atob(animals_svg_1.default.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
        let parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        return doc;
    }
    pickAnimal(uri) {
        animals_1.default.forEach(a => {
            const el = this.doc.getElementById(a);
            if (el)
                el.style.display = 'none';
        });
        const segment1 = uri.slice(0, 10).join();
        const chance1 = new chance_1.default(segment1);
        this.animal = chance1.shuffle(animals_1.default)[0];
        const el = this.doc.getElementById(this.animal);
        if (el)
            el.style.display = 'block';
    }
    styleBody(uri) {
        const segment1 = uri.slice(2, 12).join();
        const chance1 = new chance_1.default(segment1);
        const bodyColor = chance1.shuffle(colors_1.default[this.options.theme])[0];
        const body = this.doc.querySelector(`#${this.animal} #body #outer`);
        if (body)
            body.style.fill = bodyColor;
        const earL = this.doc.querySelector(`#${this.animal} #ears #outerL`);
        if (earL)
            earL.style.fill = bodyColor;
        const earR = this.doc.querySelector(`#${this.animal} #ears #outerR`);
        if (earR)
            earR.style.fill = bodyColor;
    }
}
exports.default = Animal;
//# sourceMappingURL=index.js.map
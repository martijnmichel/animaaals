"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        return __awaiter(this, void 0, void 0, function* () {
            const base = "sonidissoawesomeyoucantevenimaginehowcoolitis";
            // create buffer from seed
            let uri = Buffer.from(seed + base || base, "utf8")
                .toString("hex")
                .split("");
            // pick animal based on uri
            this.animal = this.pickAnimal(uri);
            // import correct svg and parse as doc
            this.doc = yield this.svg();
            console.log(this.doc);
            // theme the svg
            // colorize body
            this.styleBody(uri);
            // set attributes
            this.styleAttributes(uri);
            this.styleHair(uri);
            // turn into base64 data and return
            var s = new XMLSerializer().serializeToString(this.doc);
            return "data:image/svg+xml;base64," + btoa(s);
        });
    }
    svg() {
        return __awaiter(this, void 0, void 0, function* () {
            const svg = yield Promise.resolve().then(() => __importStar(require(`./svg/${this.animal}.svg`)));
            console.log(svg.default);
            const xml = atob(svg.default.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
            let parser = new DOMParser();
            const doc = parser.parseFromString(xml, "application/xml");
            return doc;
        });
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
        const glassesEl = this.doc.querySelector(`#hair`);
        if (integer && glassesEl)
            glassesEl.style.display = 'block';
        else if (glassesEl)
            glassesEl.style.display = 'none';
    }
    styleAttributes(uri) {
        // pick glasses
        const segment1 = uri.slice(5, 25).join();
        const integer = new chance_1.default(segment1).bool({ likelihood: 20 });
        const glassesEl = this.doc.querySelector(`#attributes #sunglasses`);
        if (integer && glassesEl)
            glassesEl.style.display = 'block';
        else if (glassesEl)
            glassesEl.style.display = 'none';
        const segment2 = uri.slice(15, 35).join();
        const chance2 = new chance_1.default(segment1);
    }
}
exports.default = Animal;
//# sourceMappingURL=index.js.map
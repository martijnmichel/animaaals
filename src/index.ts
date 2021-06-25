import Chance from "chance";
import colors from "./data/colors";
import animals from "./data/animals";

export default class Animal {
  options = {
    theme: "default",
    animals,
  };

  animal = "pig";

  doc = {} as Document;

  constructor(options: Options) {
    if (options) this.options = Object.assign({}, this.options, options);
  }

  create(seed?: string) {
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

  svgEl(base: string) {
    const xml = atob(base.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
    let parser = new DOMParser();
    const doc = parser.parseFromString(xml, "application/xml");
    return doc;
  }

  pickAnimal(uri: string[]) {
    const segment1 = uri.slice(0, 40).join();
    const chance1 = new Chance(segment1);
    return chance1.shuffle(this.options.animals)[0];
  }

  /**
   * Colorize body by seed or color value
   * @param uri string seed to chance on
   * @param color hex value color
   */
  styleBody(uri: string[]) {
    const segment1 = uri.slice(2, 12).join();
    const chance1 = new Chance(segment1);
    let bodyColor = chance1.shuffle(colors[this.options.theme])[0];
    const body: SVGElement | null = this.doc.querySelector(`#body #outer`);
    if (body) body.style.fill = bodyColor;
    const earL: SVGElement | null = this.doc.querySelector(`#ears #outerL`);
    if (earL) earL.style.fill = bodyColor;
    const earR: SVGElement | null = this.doc.querySelector(`#ears #outerR`);
    if (earR) earR.style.fill = bodyColor;
  }

  styleHair(uri: string[]) {
    const segment1 = uri.slice(10, 30).join();
    const integer = new Chance(segment1).bool({ likelihood: 50 });

    const hair = require(`./svg/hair/${this.animal}.svg`);
    const hairEl: SVGElement | null = this.svgEl(hair).querySelector("#hair");
    //if (hairEl) hairEl.style.fill = "#000";
    const mainEl = this.doc.getElementById("main");

    if (integer && mainEl && hairEl) {
      mainEl.appendChild(hairEl);
    }
  }

  pickGlasses(uri: string[]) {
    const segment1 = uri.slice(5, 25).join();
    const integer = new Chance(segment1).bool({ likelihood: 50 });

    const hair = require(`./svg/sunglasses/${this.animal}.svg`);
    const hairEl = this.svgEl(hair).querySelector("#sunglasses");
    const mainEl = this.doc.getElementById("main");

    if (integer && mainEl && hairEl) {
      mainEl.appendChild(hairEl);
    }
  }
}

export interface Options {
  theme?: string;
  animals?: string[];
}

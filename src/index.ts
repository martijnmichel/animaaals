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

    async create(seed?: string) {
        const base = "sonidissoawesomeyoucantevenimaginehowcoolitis";
        // create buffer from seed
        let uri = Buffer.from(seed + base || base, "utf8")
            .toString("hex")
            .split("");

        // pick animal based on uri
        this.animal = this.pickAnimal(uri);
        // import correct svg and parse as doc
        this.doc = await this.svg();

        console.log(this.doc)
        // theme the svg
        // colorize body
        this.styleBody(uri);
        // set attributes
        this.styleAttributes(uri)

        this.styleHair(uri)

        // turn into base64 data and return
        var s = new XMLSerializer().serializeToString(this.doc);
        return "data:image/svg+xml;base64," + btoa(s);
    }

    async svg() {
        const svg = await import(`./svg/${this.animal}.svg`)
        console.log(svg.default)
        const xml = atob(svg.default.replace(/^.+base64,/, "").replace(/\"?\)$/, ""));
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
        const body: SVGElement | null = this.doc.querySelector(
            `#body #outer`
        );
        if (body) body.style.fill = bodyColor;
        const earL: SVGElement | null = this.doc.querySelector(
            `#ears #outerL`
        );
        if (earL) earL.style.fill = bodyColor;
        const earR: SVGElement | null = this.doc.querySelector(
            `#ears #outerR`
        );
        if (earR) earR.style.fill = bodyColor;
    }

    styleHair(uri: string[]) {
        const segment1 = uri.slice(10, 30).join();
        const integer = new Chance(segment1).bool({ likelihood: 50 })

        const glassesEl: SVGElement | null = this.doc.querySelector(
            `#hair`
        );
        if (integer && glassesEl) glassesEl.style.display = 'block'
        else if (glassesEl) glassesEl.style.display = 'none'
    }

    styleAttributes(uri: string[]) {
        // pick glasses
        const segment1 = uri.slice(5, 25).join();
        const integer = new Chance(segment1).bool({ likelihood: 20 })

        const glassesEl: SVGElement | null = this.doc.querySelector(
            `#attributes #sunglasses`
        );
        if (integer && glassesEl) glassesEl.style.display = 'block'
        else if (glassesEl) glassesEl.style.display = 'none'


        const segment2 = uri.slice(15, 35).join();
        const chance2 = new Chance(segment1);
    }

}

export interface Options {
    theme?: string;
    animals?: string[];
}

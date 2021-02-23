import svg from './svg/animals.svg'


import Chance from 'chance'
import colors from './data/colors'
import animals from './data/animals'


export default class Animal {

    options = {
        theme: 'default',
        animals
    }

    animal = 'mouse'

    doc = this.svg()

    constructor(options: Options) {

        console.log(options)

        if (options) this.options = Object.assign({}, this.options, options)
    }

    create(seed?: string) {
        const base = 'sonidissoawesomeyoucantevenimaginehowcoolitis'
        // create bugger
        let uri = Buffer.from(seed + base || base, 'utf8').toString('hex').split('')



        this.pickAnimal(uri)
        // colorize body
        this.styleBody(uri)



        var s = new XMLSerializer().serializeToString(this.doc)

        return "data:image/svg+xml;base64," + btoa(s)
    }



    svg() {

        console.log(svg)
        const xml = atob(svg.replace(/^.+base64,/, "").replace(/\"?\)$/, ""))
        let parser = new DOMParser()
        const doc = parser.parseFromString(xml, "application/xml")

        return doc;
    }

    pickAnimal(uri: string[]) {

        animals.forEach(a => {
            const el = this.doc.getElementById(a)
            if (el) el.style.display = 'none'
        })

        const segment1 = uri.slice(0, 20).join()
        const chance1 = new Chance(segment1)
        this.animal = chance1.shuffle(this.options.animals)[0]
        const el = this.doc.getElementById(this.animal)
        if (el) el.style.display = 'block'
    }

    /**
     * Colorize body by seed or color value
     * @param uri string seed to chance on
     * @param color hex value color
     */
    styleBody(uri: string[]) {
        const segment1 = uri.slice(2, 12).join()
        const chance1 = new Chance(segment1)
        console.log(this.options)
        let bodyColor = chance1.shuffle(colors[this.options.theme])[0]
        const body: SVGElement | null = this.doc.querySelector(`#${this.animal} #body #outer`)
        if (body) body.style.fill = bodyColor
        const earL: SVGElement | null = this.doc.querySelector(`#${this.animal} #ears #outerL`)
        if (earL) earL.style.fill = bodyColor
        const earR: SVGElement | null = this.doc.querySelector(`#${this.animal} #ears #outerR`)
        if (earR) earR.style.fill = bodyColor
    }


}


export interface Options {
    theme?: string;
    animals: string[]
}

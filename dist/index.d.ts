export default class Animal {
    options: {
        theme: string;
        animals: string[];
    };
    animal: string;
    doc: Document;
    constructor(options: Options);
    create(seed?: string): string;
    svg(): Document;
    svgEl(base: string): Document;
    pickAnimal(uri: string[]): string;
    /**
     * Colorize body by seed or color value
     * @param uri string seed to chance on
     * @param color hex value color
     */
    styleBody(uri: string[]): void;
    styleHair(uri: string[]): void;
    styleAttributes(uri: string[]): void;
}
export interface Options {
    theme?: string;
    animals?: string[];
}

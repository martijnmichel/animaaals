export default class Animal {
    options: {
        theme: string;
        animals: string[];
    };
    animal: string;
    doc: any;
    constructor(options: Options);
    create(seed?: string): string;
    svg(): any;
    pickAnimal(uri: string[]): void;
    /**
     * Colorize body by seed or color value
     * @param uri string seed to chance on
     * @param color hex value color
     */
    styleBody(uri: string[]): void;
}
export interface Options {
    theme?: string;
    animals: string[];
}

export default class Animal {
    options: {
        theme: string;
    };
    animal: string;
    doc: Document;
    constructor(options: Options);
    create(seed?: string): string;
    svg(): Document;
    pickAnimal(uri: string[]): void;
    styleBody(uri: string[]): void;
}
export interface Options {
    theme?: string;
}

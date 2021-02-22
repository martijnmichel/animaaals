let colors: Map = {
    default: ["#b9fc9c", "#bdf6fa", "#e4d2f4", "#f7abd1", "#f8eec3"],
    bright: [
        "#f94144",
        "#f3722c",
        "#f8961e",
        "#f9844a",
        "#f9c74f",
        "#90be6d",
        "#43aa8b",
        "#4d908e",
        "#577590",
        "#277da1",
    ]
};

export default colors

interface Map {
    [key: string]: string[]
}
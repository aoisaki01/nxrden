const Jimp = require("jimp");
console.log("Type:", typeof Jimp);
console.log("Keys:", Object.keys(Jimp));
if (Jimp.default) {
    console.log("Default Keys:", Object.keys(Jimp.default));
}
try {
    const j = new Jimp();
    console.log("Constructible");
} catch (e) { console.log("Not constructible"); }

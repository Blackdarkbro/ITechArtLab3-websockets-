const fs = require("fs");

let data = "";
for (let i = 0; i < 10000000; i++) {
    data += "KtoMolodec?YaMolodec!!!";
}

fs.writeFileSync("./clientFile.txt", data);
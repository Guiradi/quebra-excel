const xlsx = require('node-xlsx');
const fs = require('fs');

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);

const limit = process.argv[2] || 2000;

// workSheetsFromFile => array de "pastas" na planilha (sheets)
// workSheetsFromFile[0] => primeira pasta de nome "name" e com um array (linhas) de arrays (colunas)
// Quantidade de linhas = workSheetsFromFile[0].data.length

const lines = workSheetsFromFile[0].data.length;

let i, j;

for (i = 0; i < lines/limit; i++) {
  let txt = "";
  for (j = 0; j < limit; j++) {
    if (i*limit + j === lines) {
      break;
    }
    
    if (j !== 0) {
      txt += "\n"
    }

    txt += workSheetsFromFile[0].data[i*limit + j].join("");
  }
  
  fs.writeFile(`./output/arquivo-${i+1}.txt`, txt, (res, err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}
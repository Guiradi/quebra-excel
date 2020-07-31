const xlsx = require('node-xlsx');
const fs = require('fs');

// Parse a file
const workSheetsFromFile = xlsx.parse(`${__dirname}/myFile.xlsx`);

// workSheetsFromFile => array de "pastas" na planilha (sheets)
// workSheetsFromFile[0] => primeira pasta de nome "name" e com um array (linhas) de arrays (colunas)
// Quantidade de linhas = workSheetsFromFile[0].data.length

const lines = workSheetsFromFile[0].data.length;

let i, j;

for (i = 0; i < lines/2000; i++) {
  let txt = "";
  for (j = 0; j < 2000; j++) {
    if (i*2000 + j === lines) {
      break;
    }
    
    if (j !== 0) {
      txt += "\n"
    }

    txt += workSheetsFromFile[0].data[i*2000 + j].join("");
  }
  
  fs.writeFile(`./output/arquivo-${i+1}.txt`, txt, (res, err) => {
    if (err) {
      console.log(err);
      throw err;
    }
  });
}
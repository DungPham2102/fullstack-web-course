/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer";
import qr from "qr-image";

import fs from "node:fs"

inquirer
  .prompt([
    {
      name: 'qrCodeGenerator',
      message: 'Type the link you want to generate to a qr code:'
    },
  ])
  .then(answers => {
    var qr_png = qr.image(answers.qrCodeGenerator, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('yourLink.png'));
    fs.writeFile("mySolution.txt", answers.qrCodeGenerator, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });

  });
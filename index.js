// take input using inquirer
// convert input to qr code
// save the text
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";
inquirer
  .prompt([
    {
      /* Pass your questions in here */
      message: "Enter the Link :",
      name: "URL",
    },
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream("i_love_qr.png"));

    fs.writeFile('message.txt', url, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    }); 

    console.log(`${url} created successfully`);
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment");
    } else {
      console.log("Something else went wrong");
    }
  });

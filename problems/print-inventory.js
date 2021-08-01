// Version 1
/* function printFarmInventory(cows, chickens) {
  let cowString = String(cows);
  let chickenString = String(chickens);

  while (cowString.length < 3) {
    cowString = "0" + cowString;
  }

  while (chickenString.length < 3) {
    chickenString = "0" + chickenString;
  }

  console.log(`${cowString} Cows`);
  console.log(`${chickenString} Chickens`);
}

printFarmInventory(7, 11); */

// Version 2
/* function printFarmInventory(cows, chickens, pigs) {
  printZeroPaddedWithLabel(cows, "Cows");
  printZeroPaddedWithLabel(chickens, "Chickens");
  printZeroPaddedWithLabel(pigs, "Pigs");
}

function printZeroPaddedWithLabel(number, label) {
  let numberString = String(number);

  while (numberString.length < 3) {
    numberString = "0" + numberString;
  }

  console.log(`${numberString} ${label}`);
}

printFarmInventory(7, 11, 88); */

// Version 3
function printFarmInventory(cows, chickens, pigs) {
  console.log(`${zeroPad(cows, 3)} Cows`);
  console.log(`${zeroPad(chickens, 3)} Chickens`);
  console.log(`${zeroPad(pigs, 3)} Pigs`);
}

function zeroPad(number, width) {
  let string = String(number);

  while (string.length < width) {
    string = "0" + string;
  }

  return string;
}

printFarmInventory(7, 11, 88);

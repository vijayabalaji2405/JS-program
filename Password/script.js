const resultEl = document.querySelector(".result");
const lengthEl = document.querySelector(".length");
const uppercaseEl = document.querySelector(".uppercase");
const lowercaseEl = document.querySelector(".lowercase");
const numbersEl = document.querySelector(".numbers");
const symbolsEl = document.querySelector(".symbols");
const generateEl = document.querySelector("#generate");
const clipboard = document.querySelector("#clipboard");

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

clipboard.onclick = () => {
  const textArea = document.createElement("textarea");
  const password = resultEl.innerText;

  if (!password) {
    return alert("No result to copy");
  }
  console.log(password);
  textArea.value = password;
  document.body.appendChild(textArea);
  //selecting the text in textarea
  textArea.select();
  //copying whatever selected
  document.execCommand("copy");
  textArea.remove();
  alert("Password copied to clipboard");
};

generateEl.onclick = () => {
  const length = +lengthEl.value;
  //.checked will return a boolean whether it is checked or not
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;
  //we are fetched into genpass function and returning will be set to result html
  resultEl.innerHTML = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
};

function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = "";
  //actually we are counting the false and true value (false = 0 , true = 1)
  const typesCount = lower + upper + number + symbol;
  //false will have value of 0 and true will have value of 1
  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount == 0) {
    return alert("No Selected Value");
  }

  for (let i = 0; i < length; i += typesCount) {
    typesArr.forEach((type) => {
      const funcName = Object.keys(type)[0];
      generatedPassword += randomFunc[funcName]();
    });
  }
  const finalPassword = generatedPassword.slice(0, length);
  console.log(finalPassword);

  return finalPassword;
}

function getRandomLower() {
  //from charcode will return alphabet from a number and *26 +97 will create a random number between 123 asii code
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}
function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}
function getRandomNumber() {
  return +String.fromCharCode(Math.floor(Math.random() * 10) + 48); // 0 - 48 number also has ascii code
}
function getRandomSymbol() {
  const symbols = "!@#$%^&*(){}[]=<>,.";
  return symbols[Math.floor(Math.random() * symbols.length)];
}

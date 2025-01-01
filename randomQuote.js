


function random(min,  max) {
  return Math.floor((Math.random())*(max-min+1))+min;
}

async function getRandomQuote() {
  const jsonPath = "Templater Scripts/quotes.json";  
  const jsonTFile = await app.vault.getFileByPath(jsonPath); // Get the TFile of the json
  const json = await app.vault.read(jsonTFile); // Read the json TFile
  const data = await JSON.parse(json); // JSON parse method 
  const n = random(0, data.length)

  quote = data[n].quote;
  cite  = data[n].author;

  return `>[!quote] Quote of the Day
>${quote}
>— ${cite}`;

}

module.exports = getRandomQuote;


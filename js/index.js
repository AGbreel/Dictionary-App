const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");
const result = document.getElementById("result");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async function () {
  try {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.length) {
          result.innerHTML = `
            <div class="word">
                <h3>${data[0].word}</h3>
                <button onclick="playSound()">
                    <i class="fas fa-volume-up"></i>
                </button>
            </div>

            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${
                  data[0].phonetic
                    ? data[0].phonetic
                    : data[0].phonetics[0].text
                    ? data[0].phonetics[0].text
                    : data[0].phonetics[1].text
                }</p>
            </div>

            <p class="word-meaning">${
              data[0].meanings[0].definitions[0].definition
            }</p>

            <p class="word-example">${
              data[0].meanings[0].definitions[0].example || ""
            }</p>`;

          sound.setAttribute(
            "src",
            `${
              data[0].phonetics[0].audio
                ? data[0].phonetics[0].audio
                : data[0].phonetics[1].audio
            }`
          );

        } else {
          result.innerHTML = `<h3 class="main-error">${data.title}</h3>
            <h4 class="error">${data.message}</h4>
            <p>${data.resolution}</p>`;
        }
      });

  } catch (e) {
    console.log("error => ", e);
  }
});



function playSound() {
  sound.play();
  console.log(sound);
}

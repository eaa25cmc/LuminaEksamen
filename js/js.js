/*produktsektion hvor js bruther fetch og json giver response*/
document.addEventListener("DOMContentLoaded", () => {
  const farvePrikker = document.getElementById("farvePrikker");
  const produktBillede = document.getElementById("produktBillede");
  const farveNavn = document.getElementById("farveNavn");

  // Tjek om vi er på DarkMode.html
  const path = window.location.pathname.toLowerCase();
  const isDarkMode = path.endsWith("darkmode.html");

  fetch("produktfarve.json")
    .then((response) => response.json())
    .then((farver) => {
      let valgteFarver;

      if (isDarkMode) {
        /*Darkmode farver med id 1-5*/
        // Filtrer farver til dark mode (kun ID 1–5)
        valgteFarver = farver.filter((f) => f.id >= 1 && f.id <= 5);
      } else {
        /*Daymode farver med id 6-10*/
        valgteFarver = farver.filter((f) => f.id >= 6 && f.id <= 10);
      }

      valgteFarver.forEach((farve, index) => {
        const prik = document.createElement("img");
        prik.src = farve.farveprik;
        prik.alt = farve.navn + " farvePrik";
        prik.classList.add("farvePrik");

        /*første farve er valgt fra start */
        if (index === 0) {
          prik.classList.add("valgt");
          produktBillede.src = farve.img;
          farveNavn.textContent = farve.navn;
        }

        prik.addEventListener("click", () => {
          /*Skift billede + tekst */
          produktBillede.src = farve.img;
          farveNavn.textContent = farve.navn;

          /*Gør alle prikker små */
          document
            .querySelectorAll(".farvePrik")
            .forEach((p) => p.classList.remove("valgt"));

          /*Gør den klik prik stor */
          prik.classList.add("valgt");
        });

        farvePrikker.appendChild(prik);
      });
    })
    .catch((error) => console.error("Fejl ved indlæsning af farver:", error));
});

/*produksektion slut */

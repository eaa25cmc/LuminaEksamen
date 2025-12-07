/* 
  Denne fil styrer:
  - Day/Night mode og skifter mellem darkmode.html og index.html
  - Produktets farvevælger (farveprikker, billeder af højtaler og tekst bliver hentet fra produktfarve.json)
  - Åbne/lukke funktion i feature-sektionen
*/

/* 
  Der bliver brugt flere DOMContentLoaded-events fordi, hver sektion (switch, produkt, features) er uafhængig, 
  koden bliver mere overskuelig, 
  og alle HTML-elementer er garanteret at eksistere, før JS kører
*/

/*Switch knap til at skift mellem day/night mode */
/* HTML bliver indlæst og checkbox bliver hentet, som bliver brugt til at skifte mellem nat og dag versioner*/
document.addEventListener("DOMContentLoaded", function () {
  const toggle = document.getElementById("toggleSwitch");

  /* Finder nu navnet på den aktuelle HTML fil, og der kan blive bestemt om man er i index.html eller darkmode.html */
  const filename = window.location.pathname.split("/").pop().toLowerCase();

  /* Gør at slideren står rigtigt, så ved darkmode.html, skal den være true og ved index.html skal den være false*/
  if (filename === "darkmode.html") {
    toggle.checked = true;
  } else {
    toggle.checked = false;
  }

  /* Når der bliver klikket på switch, hvis det er slået til så går den til darkmode.html,
  og hvis det er slået fra, så går den til index.html */
  toggle.addEventListener("change", function () {
    if (this.checked) {
      window.location.href = "darkmode.html";
    } else {
      window.location.href = "index.html";
    }
  });
});
/*Switch knap slutter */

/* produktsektion hvor farveprikker hentes via. fetch fra produktfarve.json*/
/* Der bliver hentet HTML elementer, som bliver bruger, når man skrifter farve på højtaler */
document.addEventListener("DOMContentLoaded", () => {
  const farvePrikker = document.getElementById("farvePrikker");
  const produktBillede = document.getElementById("produktBillede");
  const farveNavn = document.getElementById("farveNavn");

  /* Her finder den ud af hvilken html vi er i, så de rigtige farver kan hentes fra json-fil */
  const path = window.location.pathname.toLowerCase();
  const isdarkmode = path.endsWith("darkmode.html");

  /* Her pliver produktfarve.json loadet, da den indeholder array med objekter og attributter til de forskellige varianter */
  fetch("produktfarve.json")
    .then((response) => response.json())
    .then((farver) => {
      /* Her bliver farverne filtreret, så index.html kun får vist id 6-10, og darkmode.html kun får vist id 1-5 */
      let valgteFarver;

      if (isdarkmode) {
        /*Darkmode farver med id 1-5*/
        // Filtrer farver til dark mode (kun ID 1–5)
        valgteFarver = farver.filter((f) => f.id >= 1 && f.id <= 5);
      } else {
        /*Daymode farver med id 6-10*/
        valgteFarver = farver.filter((f) => f.id >= 6 && f.id <= 10);
      }
      /* Der bliver lavet 1 farveprik for hver farve der er i produktfarve.json */
      valgteFarver.forEach((farve, index) => {
        const prik = document.createElement("img");
        prik.src = farve.farveprik;
        prik.alt = farve.navn + " farvePrik";
        prik.classList.add("farvePrik");

        /*første farve er valgt fra start, så der allerede er en farve, inden man overhovedet har trykket */
        if (index === 0) {
          prik.classList.add("valgt");
          produktBillede.src = farve.img;
          farveNavn.textContent = farve.navn;
        }
        /* Når der bliver klikket på en farveprik, så bliver billede af højtaler og farvens navn opdateret, så det passer */
        prik.addEventListener("click", () => {
          /*Skift billede + tekst */
          produktBillede.src = farve.img;
          farveNavn.textContent = farve.navn;

          /* Her bliver dr sikret at kun 1 af de 5 farveprikker at stor(den valgte), mens de andre er små */
          /*Gør alle prikker små */
          document
            .querySelectorAll(".farvePrik")
            .forEach((p) => p.classList.remove("valgt"));

          /*Gør den klik prik stor, altså .valgt, gør prikken stor */
          prik.classList.add("valgt");
        });

        /* Opretter farveprikker og tilføjer dem til HTML'en (DOM), 
        og den fanger fejl hvis produktfarve.json ikke indlæses, så du får man en fejlbesked i konsollen */
        farvePrikker.appendChild(prik);
      });
    })
    .catch((error) => console.error("Fejl ved indlæsning af farver:", error));
});
/*produksektion slut */

/*Features sektion*/
/* Features-sektionen – fold ud/ind ved klik. Den henter alle de features, der kan åbnes */
document.addEventListener("DOMContentLoaded", () => {
  const features = document.querySelectorAll(".feature");

  /* Finder det element, man skal klikke på for at åbne funktionen */
  features.forEach((feature) => {
    const header = feature.querySelector(
      ".featureSound, .featureDesign, .featurePower, .featureSocial"
    );

    /* Finder plus-ikonet, så det kan skiftes det til minus */
    const plusIcon = feature.querySelector(".PlusUhover");

    /* Åbner og lukker feature-beskrivelsen ved at tilføje og fjerne klassen "".open" */
    header.addEventListener("click", () => {
      feature.classList.toggle("open");

      /* Skifter ikonet alt efter om den enkelte feature er åben eller lukket */
      if (feature.classList.contains("open")) {
        plusIcon.src = "images/billeder-fra-figma/ikoner/minus-u-hover.svg";
      } else {
        plusIcon.src = "images/billeder-fra-figma/ikoner/plus-u-hover.svg";
      }
    });
  });
});
/*Feature sektion slutter*/

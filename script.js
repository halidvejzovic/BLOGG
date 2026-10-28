"use strict";
/*
Därefter kan TypeScript-kompilatorn npx tsc användas.

class som en mall

construktor

TypeScript
↓
kompilering  npx tsc
↓
JavaScript
↓
webbläsare


Arv
Innebär att en klass kan bygga vidare på en annan klass. Det gör att man kan återanvända kod och skapa mer specialiserade
varianter av något som redan finns. Om man till exempel har en generell klass för användare kan man låta en administratör vara en
särskild typ av användare som har extra funktioner.

Exempel i TypeScript

class User {
  constructor(public name: string, public email: string) {}
  present(): string {
    return `${this.name} (${this.email})`;
  }
}
class Admin extends User {
  deleteUser(userName: string): string {
    return `${this.name} tog bort användaren ${userName}.`;
  }
}
const admin = new Admin("Sara", "sara@example.com");
console.log(admin.present());
console.log(admin.deleteUser("Ali"));
Här är Admin en klass som ärver från User med hjälp av extends. Det betyder att Admin får tillgång till egenskaper och
metoder från User, men kan också lägga till egen funktionalitet. Arv kan vara kraftfullt, men det bör användas med eftertanke.
I verkliga projekt händer det ofta att man i stället föredrar att kombinera objekt med hjälp av komposition, alltså att bygga upp
funktionalitet av mindre delar i stället för att skapa långa arvskedjor. Det är ändå viktigt att förstå arv,
eftersom det är ett klassiskt OOP-begrepp och förekommer i många kodbaser.
-------------------------------------------------------------------------------
Ett blogginlägg ska innehålla följande information

Titel
Användare
Text
Datum för inlägg
--? Eventuell kommentar
? Datum för kommentar (om kommentar)
? Författare av kommentar (om kommentar)
-----------------------------------------------------------------

class person {
    namn : string;
    adress : string;
    telefonnummer: number;

    constructor (
        namn : string,
        adress : string,
        telefonnummer : number
    ) {
        this.namn = namn;
        this.adress = adress;
        this.telefonnummer = telefonnummer;
    }

    skrivUt(): void{
        console.log(this.namn);
        console.log(this.adress);
        console.log(this.telefonnummer);
    }
}

const person1 = new person(
    "Halid",
    "Kalvshällavägen 42",
    704564464
);

person1.skrivUt();

*/



// variabler för menyknappen och navigeringslänkarna
const menuBtn = document.getElementById("menu-btn");
const navLinks = document.getElementById("nav-links");
const rensaListanBtn = document.getElementById("clear-btn");

// variabler för container till svampkort och särskiljande egenskaper
const allaSvamparContainer = document.getElementById("svamp-grid");
const egenskaperContainer = document.getElementById("risk-grid");

// Skapar en sparaFynd Function
function sparaFynd(svamp) {
  let hittadeSvamparna; // lokal variabel undefind
  let finnsRedan; // lokal variabel undefind

  hittadeSvamparna = JSON.parse(localStorage.getItem("hittadeSvamparna")); // Kollar om det finns något sparat på localstorage
  // If-sats som gemför om hittadesvamparna är tom dvs igen data finns sparad i den, om det inte finns skapar den en tom array.
  if (hittadeSvamparna === null) {
    hittadeSvamparna = [];
  }
  // Går igenom svamparna och kollar om den redan är sparad.
  finnsRedan = hittadeSvamparna.find(
    (hittadSvamp) => hittadSvamp.svenskt_namn === svamp.svenskt_namn,
  );

  //  om if-satsen är true så skriver den ut alert meddelandet.
  if (finnsRedan) {
    return;
  }

  hittadeSvamparna.push(svamp); // svamp som väljs pushas in till array, den hanmnar sist i kön.

  localStorage.setItem("hittadeSvamparna", JSON.stringify(hittadeSvamparna)); // sparar dom valda svamparna i localstorage samt gör om dom till en sträng
}

// Skapar en functiion
function visaSvamp() {
  // Hämtar alla sparade svamparna från localstorage och sparar värdet i kollarSvamparna.
  const kollarSvamparna = JSON.parse(localStorage.getItem("hittadeSvamparna"));
  // Sparar/Hittar elementet med id found-mushrooms. där ceateSvampKort ska visas.
  const visaSvampar = document.getElementById("found-mushrooms");

  // Här gemförst variabeln med null dvs om inga svampar är sparade så avslutas functionen.
  if (kollarSvamparna === null) {
    return;
  }

  // Kollar om elementet finns,omden inte finns avslutas functionen
  if (visaSvampar === null) {
    return;
  }

  // Går igenom all svamparna en efter en som finns i variabeln kollarSvamparna. och sparar dom i parametern svamp.
  kollarSvamparna.forEach((svamp) => {
    // Här körs functionen createSvampKort med parametrar svamp och visaSvampar är där dom svamparna visas dvs  i det elemetet som sparats i den variabeln.
    createSvampKort(svamp, visaSvampar);
  });
}

function rensaHistorik() {
  localStorage.removeItem("hittadeSvamparna");

  const visaSvampar = document.getElementById("found-mushrooms");
  if (visaSvampar) {
    visaSvampar.innerHTML = "";
  }
}

// Skapar ett element med textinnehåll. Tar emot tag och textinnehåll som argument.
function createElement(tag, textContent) {
  const element = document.createElement(tag);
  element.textContent = textContent;
  return element;
}

// Skapar ett img element med src och alt attribut.
function createBildElement(src, alt) {
  const bild = document.createElement("img");
  bild.src = src;
  bild.alt = alt;
  return bild;
}

// Skapar ett svampkort med information om svampen och lägger till den i rätt container. Tar emot svamp objektet och container elementet som argument.
function createSvampKort(svamp, container) {
  const article = document.createElement("article");
  article.classList.add("svamp-card");

  const bild = createBildElement(`./img/${svamp.bild}`, svamp.svenskt_namn);
  article.appendChild(bild);

  const div = createElement("div");
  div.classList.add("card-content");
  article.appendChild(div);

  const namn = createElement("h3", svamp.svenskt_namn);
  div.appendChild(namn);

  const latinsktNamn = createElement(
    "p",
    `Latinskt namn: ${svamp.latinskt_namn}`,
  );
  div.appendChild(latinsktNamn);

  const ätlig = createElement("p", `Ätlighet: ${svamp.ätlig}`);
  div.appendChild(ätlig);

  const beskrivning = createElement("p", `Beskrivning: ${svamp.beskrivning}`);
  div.appendChild(beskrivning);

  const fyndPlats = createElement("p", `Fyndplats: ${svamp.fyndplats}`);
  div.appendChild(fyndPlats);

  if (allaSvamparContainer) {
    const btn = createElement("button", "Jag har hittat denna svamp!");
    btn.addEventListener("click", () => {
      sparaFynd(svamp);
    });
    div.appendChild(btn);
  }

  container.appendChild(article);
}

// Skapar en element för varje särskiljande egenskap och lägger till den i rätt container. Tar emot egenskap objektet och container elementet som argument.
function createEgenskaper(egenskap, container) {
  const artikel = document.createElement("article");

  const par = createElement("h3", egenskap.par);
  artikel.appendChild(par);

  const risk = createElement("p", `Risk: ${egenskap.risk}`);
  artikel.appendChild(risk);

  const särskiljande = createElement("h4", `Särskiljande:`);
  artikel.appendChild(särskiljande);

  const särskiljandeList = document.createElement("ul");
  egenskap.särskiljande.forEach((skillnad) => {
    const li = createElement("li", skillnad);
    särskiljandeList.appendChild(li);
  });
  artikel.appendChild(särskiljandeList);

  container.appendChild(artikel);
}

async function fetchData() {
  try {
    const responceSvampar = await fetch("./json/svampar.json");
    const responceEgenskaper = await fetch("./json/speciellaEgenskaper.json");

    if (!responceSvampar.ok) {
      throw new Error("Fetch svampar is failed!");
    }

    if (!responceEgenskaper.ok) {
      throw new Error("Fetch egenskaper is failed!");
    }

    const dataSvampar = await responceSvampar.json();
    const dataEgenskaper = await responceEgenskaper.json();

    if (egenskaperContainer) {
      //skapar artilel för varje särskiljande egenskap i speciellaegenskaper.json
      dataEgenskaper.särskiljande_egenskaper.forEach((egenskap) => {
        createEgenskaper(egenskap, egenskaperContainer);
      });
    }

    if (allaSvamparContainer) {
      //skapar svampKort för alla svampar i svampar.json
      dataSvampar.svampar.forEach((svamp) => {
        createSvampKort(svamp, allaSvamparContainer);
      });
    }
  } catch (error) {
    console.error(error);
  }
}

function init() {
  // Event listener för menyknappen
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });

  if (rensaListanBtn) {
    rensaListanBtn.addEventListener("click", () => {
      rensaHistorik();
    });
  }

  fetchData();
  visaSvamp();
}











const userName = "Halid";      // variabel const går inte att ändra
const userPassword = "qwe123"  // variabel const går inte att ändra
let formRef; // variabel.


//  funktion init lokaliserar min form element.
function initInloggning() { 
    formRef = document.querySelector("form");
    console.log(formRef);
    
    const namnInput = document.getElementById("namn"); // hittar element med id =namn
    const lösenordInput = document.getElementById("lösenord"); // hittar element med id = lösenord

    formRef.addEventListener("submit", function(event) { // övervakar submit knappen DVS om någon klickar på den så kör den functionen
        event.preventDefault(); // förhindrar att sidan laddas om utan prioriter händelsen efter att sumbit har tryckt.

        if (namnInput.value === userName && lösenordInput.value === userPassword) {  // jämför ddet duu skriver in med const variablerna
            
          localStorage.setItem("användare", namnInput.value);
          localStorage.setItem("inloggad", "true");
         
         formRef.style.display = "none";

         const meddelande = document.createElement("p");
         meddelande.textContent =
               "Du är nu inloggad som " + namnInput.value;

   
          document.body.appendChild(meddelande);



            formRef.style.display = "none"; // tar bort display form 
          

            const loginLink = document.getElementById("loginLink");

            if (loginLink) {

                const användare = localStorage.getItem("användare");

                if(användare) {
                    loginLink.textContent = "Logga ut ("+ användare+ ")";

                    loginLink.addEventListener("click", (event) => {

                        event.preventDefault();

                        localStorage.removeItem("användare");
                        localStorage.removeItem("inloggad");

                        loginLink.textContent ="Logga in";

                        window.location.href = "logga_in.html";
                    });
                }
            }

            namnInput.value = "";     // texten försviner du kan skriva in på nytt utan att raderar den.sker automatiskt
            lösenordInput.value = ""; // texten försviner du kan skriva in på nytt utan att raderar den.sker automatiskt
        }        

        else {  // else function vad som händer när användaren skriver fel lösenord och namn. 

            const meddelande = document.createElement("p");  // skapar en variabel const som har en create element "P"

            meddelande.innerHTML = "Felaktiga inloggningsuppgifter!"; // skriver i p elementet texten ""
            meddelande.remove(); // tar bort const medelandert , variabel med texten
            document.body.appendChild(meddelande); //lägger in const variabel.
            namnInput.value = "";     // texten försviner du kan skriva in på nytt utan att raderar den.sker automatiskt
            lösenordInput.value = ""; // texten försviner du kan skriva in på nytt utan att raderar den.sker automatiskta
            
        }
        
    })

}

window.addEventListener("load", () => {
    if(document.getElementById("menu-btn")) {
        init();
    }

    if(document.querySelector("form")) {
        initInloggning();
    }

});












// BLOGG KODEN

// Hämtar elemeten från html och spara dom i globala variablar.
const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const blogg = document.getElementById("blogg");
const knapp = document.getElementById("btn7");

// If-sats om knappen finns och man klickar påden så körs funktionen vissablogginlägg().
if (knapp) {
    knapp.addEventListener("click", () => {
        visablogginlägg();
    });
};

// Funktiionen visablogginlägg().
function visablogginlägg() {
    
    // Hämtar det som är spara i localstorage. I det här fallet användaren.
    const användareInloggad = localStorage.getItem("användare");

    // If-sats kontrollerar att Elemtenen 
    if (titleInput instanceof HTMLInputElement &&  // Kontrollerar att titleInput är en input element.
        textInput instanceof HTMLTextAreaElement && // Kontrollerar att textInput är en input element.
        blogg) {  // Kontrolerar att blogg-container finns.

        // skapar dagens datum
        const datumNew = new Date();

        
        const blogginlägg1 = new blogginlägg(användareInloggad || "Okänd", titleInput.value, textInput.value, datumNew.toLocaleDateString("sv-SE"));

        const nyttInlägg = document.createElement("div");
        nyttInlägg.classList.add("blogg-inlägg");

        const titel = document.createElement("h2");
        titel.classList.add("blogg-titel");
        titel.textContent = blogginlägg1.title;

        const användaretext = document.createElement("p");
        användaretext.classList.add("blogg-användaretext");
        användaretext.textContent = "Användare: " + blogginlägg1.användare;

        const textIn = document.createElement("p");
        textIn.classList.add("blogg-textIn");
        textIn.textContent = blogginlägg1.text;

        const datum = document.createElement("p");
        datum.classList.add("blogg-datum");
        datum.textContent = blogginlägg1.datum;

        nyttInlägg.appendChild(användaretext);
        nyttInlägg.appendChild(titel);
        nyttInlägg.appendChild(textIn);
        nyttInlägg.appendChild(datum);

        // kommetars fältet
        const kommentarInput = document.createElement("textarea");
        kommentarInput.placeholder = "Skriv kommentar";
        kommentarInput.classList.add("blogg-kommentarInput");

        const författareInput = document.createElement("input");
        författareInput.placeholder = "Författare";
        författareInput.classList.add("blogg-författareInput");

        const kommentarKnapp = document.createElement("button");
        kommentarKnapp.textContent = "Kommentera";
        kommentarKnapp.classList.add("blogg-kommentarKnapp");

        const kommenteraContainer = document.createElement("div");

        kommentarKnapp.addEventListener("click", () => {
            
            const kommentar = document.createElement("p");
            kommentar.textContent = "Kommentar: " + kommentarInput.value;
            kommentar.classList.add("blogg-kommentar");

            const författare = document.createElement("p");
            författare.textContent = "Författare: " + författareInput.value;
            författare.classList.add("blogg-författare");

            const kommentarDatum = document.createElement("p");
            kommentarDatum.textContent = "Datum " + new Date().toLocaleDateString("sv-SE");
            kommentarDatum.classList.add("blogg-kommentarDatum");

            kommenteraContainer.appendChild(kommentar);
            kommenteraContainer.appendChild(författare);
            kommenteraContainer.appendChild(kommentarDatum);
        });

        nyttInlägg.appendChild(kommentarInput);
        nyttInlägg.appendChild(författareInput);
        nyttInlägg.appendChild(kommentarKnapp);
        nyttInlägg.appendChild(kommenteraContainer);
        blogg.appendChild(nyttInlägg);

    }
}
;
class blogginlägg {
    användare;
    title;
    text;
    datum;
    constructor(användare, title, text, datum) {
        this.användare = användare;
        this.title = title;
        this.text = text;
        this.datum = datum;
    }
}

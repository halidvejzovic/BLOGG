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






const userName = "Halid";      // variabel const går inte att ändra
const userPassword = "qwe123"  // variabel const går inte att ändra
let formRef; // variabel.

//  funktion init lokaliserar min form element.
function init() { 
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
          

            const loggaUt = document.createElement("button"); // skappar en Button element

            loggaUt.innerHTML = ("Logga ut"); // lägger in text i button
            document.body.appendChild(loggaUt); //lägger in elementet 
            loggaUt.addEventListener("click", function() { // övervakar button knappen ochser vad som händer när någon clickar på den så
                formRef.style.display = "grid";             // går den tillbaks till grid stylingen
                meddelande.remove();                        // tar bort const medelandert , variabel med texten
                loggaUt.remove();                           // tar bor button elementtet.
            })

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

// Skriver ut min function "init".
window.onload = init;









const titleInput = document.getElementById("title");
const textInput = document.getElementById("text");
const blogg = document.getElementById("blogg");
const knapp = document.getElementById("btn7");
const användareInloggad = localStorage.getItem("användare");
if (knapp) {
    knapp.addEventListener("click", () => {
        visablogginlägg();
    });
}
;
function visablogginlägg() {
    if (titleInput instanceof HTMLInputElement &&
        textInput instanceof HTMLTextAreaElement &&
        blogg) {
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

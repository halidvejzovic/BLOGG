


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


const titleInput = document.getElementById("title");
const textInput = document.getElementById("text")

const blogg = document.getElementById("blogg");

const knapp = document.getElementById("btn7");

if (knapp) {
   knapp.addEventListener("click", () => {
    visablogginlägg();
})
}; 

function visablogginlägg() {

    if (
      titleInput instanceof HTMLInputElement &&
      textInput instanceof HTMLTextAreaElement &&
      blogg
    ) {

      const datumNew = new Date();

      const blogginlägg1 = new blogginlägg(
        titleInput.value,
        textInput.value,
        datumNew.toLocaleDateString("sv-SE")
    );

    const nyttInlägg = document.createElement("div");
    nyttInlägg.classList.add("blogg-inlägg");

    const titel = document.createElement("h2");
    titel.classList.add("blogg-titel");
    titel.textContent = blogginlägg1.title;

    const textIn = document.createElement("p");
    textIn.classList.add("blogg-textIn");
    textIn.textContent = blogginlägg1.text;

    const datum = document.createElement("p");
    datum.classList.add("blogg-datum");
    datum.textContent = blogginlägg1.datum;

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
      författare.textContent = "Författare: " + författareInput;
      författare.classList.add("blogg-författare");

      const kommentarDatum = document.createElement("p");
      
 

      


    });


    blogg.appendChild(nyttInlägg);


  }
};


class blogginlägg{
    title : string;
    text : string;
    datum : string;

    constructor(
        title : string,
        text : string,
        datum : string,
    ) {
        this.title = title;
        this.text = text;
        this.datum = datum;
    }
} 
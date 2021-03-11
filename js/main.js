// Zwei Konstanten werden hier deklariert (const-Deklaration)
// Die Elemente mit der passenden Id werden dann anschließend mit document.getElementById "geholt", welche in der index.html gespeichert sind. 
const inpSearch = document.getElementById('inp-search');
const output = document.getElementById('output');

// Sobald das Ereignis "load" beendet ist wird die Methode fetchCharacters ausgelöst.
window.addEventListener('load', () => {
    loader();
    fetchCharacters();
})

// Sobald in der Suchzeile ein Change-Event stattfindet wird alles darunter aufgerufen.
inpSearch.addEventListener('change', () => {
    // In die neue Variable werden dann alle values hineingespeicherten
    let searchQuery = inpSearch.value;
    loader();

    // Danach wird die Methoden aufgerufen mit den Values, also Buchstaben bzw. Buchstabenfolgen wie K, Pal, Jes, Ma etc. Daher springt nun die Methode fetchCharacters (Zeile 29) in die Zeile 34 und zeigt uns nur die Charaktere mit den eingegeben Values(query) an.
    fetchCharacters(searchQuery);
});


// Hier wird eine Methode gemacht, die einen Ladekreis vor dem Laden, der ganzen Liste der Charaktere anzeigt (Zeile 8) und zwischen der Eingabe und Ausgabe von Charakteren (Zeile 16)
function loader() {
    output.innerHTML = '<div class="gif-spinner mx-auto"><img src="img/loader.webp"></img></div>'
}

// Die oben erwähnte Methode wird jetzt gemacht. Im Parameter ist ein query, also die Eingabe, was dann anschließend in der URL nach dem ? steht, um spezifischeren Content anzuzeigen.
async function fetchCharacters(query) {
    // Die response, also Antwort wird hier deklariert
    let res;
    // Wenn wir eine query haben, also eine Eingabe im Suchfeld haben, fetch die "Basis-URL" und hänge dahinter denn gesuchten Namen-Parameteter dran
    if (query) {
        res = await fetch(`https://www.breakingbadapi.com/api/characters?name=${query}`);

        // Sonst fetch/schnapp die "Basis-URL" bzw. nur die Chararacters
    } else {
        res = await fetch('https://www.breakingbadapi.com/api/characters');
    }

    // Variable Results wird deklariert. Das await liefert in ein JSON-Objekt aufgelöstes promise(Versprechen) zurück auf das, das "async" wartet bevor es weiterdurchlaufen kann. 
    let results = await res.json();

    //Bevor etwas ausgegeben wird muss alles im innerHTML gelöscht werden, daher gibt man einen leeren String an. 
    output.innerHTML = "";


    // Die gespeicherten Ergebnisse werden in Results "gemapped", also in ein Array abgespeichert. 
    results.map(result => {

        // In der neuen Konstante werden nun die darin gespeicherten Ergebnisse aufgerufen und mit Namen bzw. Informationen, Headings und Spans versehen. 
        const htmlString = `<img src="${result.img}" class="img">
            <div class="info-display">
                <h5>Name: ${result.portrayed}</h5>
                <hr>
                <h6>Actor Name: <span>${result.name}</span></h6>
                <h6>Nickname: <span>${result.nickname}</span></h6>
                <h6>Birthday: <span>${result.birthday}</span></h6>
                <h6>Status: <span>${result.status}</span></h6>
            </div>`;

        // outString wird deklariert und eine div wird erzeugt
        let outputString = document.createElement('div');
        // Der neuen deklarierten Variable wird hier noch ein bisschen styling von Bootstrap verpasst, welches wir in der index.html eingebunden haben.
        outputString.classList.add('col-md-3', 'mb-3', 'img-info');
        // .innerHTML legt das Styling auf die Variable htmlString fest
        outputString.innerHTML = htmlString;
        // Hier wird dann alles auf unserer Page ausgegeben (OUTPUT)
        output.appendChild(outputString);
    })
}
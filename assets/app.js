function CSVKonverter (csv) {

    const sorok     = csv.trim().split('\n');
    const fejlec    = sorok[0].split('\t');
    const eredmeny  = [];

    for (let i = 1; i < sorok.length; i++) {

        const obj           = {};
        const jelenlegiSor  = sorok[i].split('\t');

        for (let j = 0; j < fejlec.length; j++) {

            obj[fejlec[j].trim()] = jelenlegiSor[j].trim();

        }

        eredmeny.push(obj);
    }

    return eredmeny;

}

async function tablaBeolvasasa (tablaUtvonal) {

    const olvaso = fetch(tablaUtvonal)
    .then((response) => response.text())
    .then((adat) => {
        
        console.log(CSVKonverter(adat))

    });

}

tablaBeolvasasa('tablak/ar.txt')

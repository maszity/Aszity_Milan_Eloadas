import { Segedlet }     from "./Segedlet.js";
import { Sutik }        from "./Sutik.js";
import { SutiRenderer } from "./SutiRender.js";

const SUTEMENY_KONTENER = document.getElementById('sutemeny-kontener');

let sutik       = [];
let sutiService = null;

async function init() {

    try {

        const seged  = new Segedlet();

        const adatok = await seged.adatokBetoltese();
        const db     = seged.indexeles(adatok);

        sutiService = new Sutik(db);
        sutik       = sutiService.osszesSuti();

        const renderer    = new SutiRenderer(
            SUTEMENY_KONTENER,
            sutiService
        );

        renderer.render(sutik);

        return sutik;

    }
    catch (err) {
        console.error(err);
    }

}

async function reInit () {

    const renderer    = new SutiRenderer(
        SUTEMENY_KONTENER,
        sutiService
    );

    renderer.render(sutik);

}

init();

document.getElementById('suti-felvetele').addEventListener('click', () => {

    if (
        document.getElementById('suti-neve').value == '' ||
        document.getElementById('suti-tipusa').value == '' ||
        document.getElementById('suti-ara').value == ''
    ) {

        alert('Minden mező kitöltése kötelező!');
        return;

    }

    const ujId     = Math.max(...sutik.map(s => Number(s.id))) + 1;
    const sutiAdat = {
        id       : ujId,
        dijazott : document.getElementById('suti-dijazott').checked ? "-1" : "0",
        nev      : document.getElementById('suti-neve').value,
        tipus    : document.getElementById('suti-tipusa').value
    };

    const ar = {
        sutiid : ujId,
        ertek  : document.getElementById('suti-ara').value,
        egyseg : "db"
    };

    sutiService.ujSuti(sutiAdat, ar);

    document.getElementById('suti-neve').value = '';
    document.getElementById('suti-tipusa').value = '';
    document.getElementById('suti-ara').value = '';

    reInit();
});

document.addEventListener('click', (e) => {

    const torlendoSuti = e.target.closest('[suti-akcio]')

    if (!torlendoSuti) return;

    const sutiAkcio = torlendoSuti.getAttribute("suti-akcio");

    switch (sutiAkcio) {
        case 'suti-torles':
    
            let torlendoSutiId = torlendoSuti.getAttribute('data-id');
            sutiService.sutiTorles(torlendoSutiId)
            sutik = sutiService.osszesSuti();
            reInit();

        break;
    
        default: return;
    }

})
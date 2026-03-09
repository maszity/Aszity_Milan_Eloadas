import { Segedlet } from "./Segedlet.js";
import { Sutik } from "./Sutik.js";

const SUTEMENY_KONTENER = document.getElementById('sutemeny-kontener');

async function init() {

    try {

        const seged     = new Segedlet();

        const adatok    = await seged.adatokBetoltese();
        const db        = seged.indexeles(adatok);
        const suti      = new Sutik(db);

        console.log(suti.osszesSuti())

    }
    catch (err) {
        console.error(err);
    }

}

init();
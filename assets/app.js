async function tablaBeolvasasa (tablaUtvonal) {

    const olvaso = await fetch(tablaUtvonal);
    
    olvaso
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
    });

}

tablaBeolvasasa('tablak/ar.txt')

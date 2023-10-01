document.addEventListener("DOMContentLoaded", function () {
    let btnEnvio = document.getElementById("enviar");
    let btnBorrar = document.getElementById("borrar");
    let valorinput = document.getElementById("name");
    let ContenedorPokemon = document.getElementById("Contenedorpokemon");

    btnBorrar.addEventListener("click", function (e) {
        e.preventDefault();
        ContenedorPokemon.innerHTML = "";
        valorinput.value = "";
    })

    btnEnvio.addEventListener("click", function (e) {
        e.preventDefault();
        let ValorDelInput = valorinput.value.toLowerCase();
        let APIURL = `https://pokeapi.co/api/v2/pokemon/${ValorDelInput}`;

        if (ValorDelInput.length < 1) {
            ContenedorPokemon.innerHTML = "";
            return ( Swal.fire ({
                icon: 'error',
                title: 'Oops...',
                text: 'Algo salió mal! Se ve que no has escrito nada. Vuelve a intentarlo pero esta vez no dejes el campo de texto vacío.',
                footer: 'Porfavor intenta nuevamente'
            }));
        }

        fetch(APIURL)
        .then(function (response) {
            if (!response.ok) {
                //uso el error 404 para decir que no encontro nada
                if (response.status === 404) {
                    throw new Error("El Pokémon no existe.");
                } else {
                    throw new Error("No se pudo cargar la información del Pokémon.");
                }
            }
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            ContenedorPokemon.innerHTML = "";
            let Pokemon = document.createElement("section");
            Pokemon.innerHTML = `
                <section class="contenedorImagenesPokemon">
                    <img class="imgPokemonFrente" src="${data.sprites.front_default}" alt="${data.name}">
                    <img class="imgPokemonTrasera" src="${data.sprites.back_default}" alt="${data.name}">
                </section>
                <section class="contenedorInfoPokemon">
                    <h1 class="nombrePokemon">${data.name}</h1>
                    <p class="tipoPokemon">${data.types[0].type.name}</p>
                </section>
            `;
            ContenedorPokemon.appendChild(Pokemon);
        })
        .catch(function (error) {
            if (error.message === "El Pokémon no existe.") {
                ContenedorPokemon.innerHTML = `
                    <p class="mensajeError">El Pokémon no existe en la PokeAPI.</p>
                `;
            }
        });
    });
});



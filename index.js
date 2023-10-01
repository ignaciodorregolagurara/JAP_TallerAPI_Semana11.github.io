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
            let Pokemon = document.createElement("section");
            let movimientos = "";
            ContenedorPokemon.innerHTML = "";

            /* */
            console.log("*************************************");
            console.log(`Pokemon encontrado: ${data.name}`);
            console.log(`ID correspondiente: ${data.id}`);
            console.log("*************************************");
            /* */
            
            for (let i = 0; i < data.moves.length; i++) {
                movimientos += `
                    <p class="movimientoPokemon">${data.moves[i].move.name}</p>
                `;
            }
            
            Pokemon.innerHTML = `
                <section class="contenedorImagenesPokemon">
                    <img class="imgPokemonFrente" src="${data.sprites.front_default}" alt="${data.name}">
                    <img class="imgPokemonTrasera" src="${data.sprites.back_default}" alt="${data.name}">
                </section>
                <h1 class="nombrePokemon">${data.name}</h1>
                <section class="contenedorInfoPokemonFisico">
                    <p class="numeroPokemon">Num #${data.id}</p>
                    <p class="tipoPokemon">${data.types[0].type.name}</p>
                    <p class="alturaPokemon">${data.height}cm</p>
                    <p class="pesoPokemon">${data.weight}kg</p>
                </section>
                <h2 class="tituloMovimientos">Posible Movimientos</h2>
                <section class="contenedorMovimientosPokemon">
                    ${movimientos}
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



let numerosGerados = []; 

async function buscarPoke() {
    
    document.querySelector(".pokemon").innerHTML = "";

    
    numerosGerados = [];

    
    document.querySelector("#botaoGerar").innerHTML = "Gerando...";

    for (let i = 0; i < 6; i++) {
        let numeroAleatorio;

        
        do {
            numeroAleatorio = Math.floor(Math.random() * 150) + 1;
        } while (numerosGerados.includes(numeroAleatorio));

        
        numerosGerados.push(numeroAleatorio);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
        const data = await response.json();
        mostraPoke(data);
    }

   
    document.querySelector("#botaoGerar").innerHTML = "Gerar novamente";
}


function mostraPoke(dados) {
    let pokemon = document.querySelector(".pokemon");

    pokemon.innerHTML += `
        <div class="telaPoke">
            <div class="telaImg">
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${dados.id}.png">
            </div>
            <div class="telaInfo">
                <h2>${dados.name}</h2>
                <p>${dados.types.map(tipo => tipo.type.name)}</p>
            </div>
        </div>
    `;
}

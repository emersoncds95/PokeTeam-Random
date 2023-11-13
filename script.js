let numerosGerados = [];

async function buscarPoke() {
    const jogoSelecionado = document.getElementById('selectJogo').value;

    document.querySelector(".pokemon").innerHTML = "";
    numerosGerados = [];
    document.querySelector("#botaoGerar").innerHTML = "Gerando...";
    

    while (numerosGerados.length < 6) {
        let numeroAleatorio = Math.floor(Math.random() * 1080) + 1;

        if (!numerosGerados.includes(numeroAleatorio)) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
                
                if (!response.ok) {
                    throw new Error('Não encontrado');
                }

                const data = await response.json();

                // Verifica se o Pokémon pertence ao jogo selecionado
                const games = data.game_indices.map(game => game.version.name);
                
                if (games.includes(jogoSelecionado)) {
                    mostraPoke(data);
                    numerosGerados.push(numeroAleatorio);
                }
            } catch (error) {
                console.error(`Erro ao buscar Pokémon com ID ${numeroAleatorio}: ${error.message}`);
            }
            
        }
        
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

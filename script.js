let numerosGerados = []; // Lista para armazenar os números gerados

async function buscarPoke() {
    // Limpar conteúdo anterior
    document.querySelector(".pokemon").innerHTML = "";

    // Limpar a lista de números gerados
    numerosGerados = [];

    // Adicionar indicador de "loading"
    document.querySelector("#botaoGerar").innerHTML = "Gerando...";

    for (let i = 0; i < 6; i++) {
        let numeroAleatorio;

        // Garantir que o número gerado não se repita
        do {
            numeroAleatorio = Math.floor(Math.random() * 150) + 1;
        } while (numerosGerados.includes(numeroAleatorio));

        // Adicionar o número gerado à lista
        numerosGerados.push(numeroAleatorio);

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${numeroAleatorio}`);
        const data = await response.json();
        mostraPoke(data);
    }

    // Remover indicador de "loading" e alterar o texto do botão
    document.querySelector("#botaoGerar").innerHTML = "Gerar novamente";
}

// Restante do código permanece o mesmo
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

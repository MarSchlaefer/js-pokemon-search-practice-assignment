
document.addEventListener('DOMContentLoaded', () => {
  // console.log(pokemonArray)

  const input = document.getElementById('pokemon-search-input')
  const searchForm = document.getElementById("pokemon-search-form")
  const pokeCont = document.getElementById('pokemon-container')
  const innerPoke = pokeCont.querySelector('p')


  fetch('http://localhost:3000/pokemon')
    .then(response => response.json())
    .then(json => {
      manipulate(json)
      seeImgTags()
    })

  // pokeCont.addEventListener('click', event => {
  //   if (event.target ===
  // })
  function manipulate(pokemonArray) {

    if (pokemonArray.length > 0) {
      pokeCont.innerText = ""
      pokemonArray.map(pokemon => {
        pokeCont.innerHTML += `<div class="poke-box" id=${pokemon.name}>
                                  <h2> ${pokemon.name} </h2>
                                    <img src=${pokemon.sprites.front} alt-src=${pokemon.sprites.back}>
                              </div>`
        const pokeDivs = pokeCont.querySelectorAll('div')
        for (const pokeDiv of pokeDivs) {
          pokeDiv.style.backgroundColor = '#fecd2f'
        }
        })
      }

    searchForm.addEventListener('input', event => {

      const userInput = input.value
      const filteredPoke = pokemonArray.filter(pokemon => pokemon.name.includes(userInput))

      pokeCont.innerHTML = ""

      if (filteredPoke.length > 0) {
        filteredPoke.map(pokeObj => {
          return pokeCont.innerHTML += `<div class="poke-box" id=${pokeObj.name}>
                                    <h2> ${pokeObj.name} </h2>
                                      <img src=${pokeObj.sprites.front} alt-src=${pokeObj.sprites.back}>
                                </div>`
        })
      } else {
        pokeCont.innerHTML = `<p> There are no pokemon that match your search. </p>`
      }
      seeImgTags()
      const pokeDivs = pokeCont.querySelectorAll('div')
      for (const pokeDiv of pokeDivs) {
        pokeDiv.style.backgroundColor = '#fecd2f'
      }
    })
  }

}) //end of DOM event listener

function seeImgTags() {
  const pokeCont = document.querySelector('#pokemon-container')
  const images = pokeCont.querySelectorAll('img')
  images.forEach( (img) => {
    img.addEventListener('click', function(event) {
      const src = img.getAttribute('src')
      img.setAttribute('src', img.getAttribute('alt-src'))
      img.setAttribute('alt-src', src)
    })
  })
}

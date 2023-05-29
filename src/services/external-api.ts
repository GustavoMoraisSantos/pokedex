import { IDefaultParam } from "@/Utils/types";
import api from "../axios-config";

  const getPokemonTypes = async () => {
    try {
      const response = await api.get('/type');
      const types = response.data.results.map((type: any) => {
        const capitalizedType = type.name.charAt(0).toUpperCase() + type.name.slice(1);
        return capitalizedType;
      });
  
      return types
    } catch (error) {
      generalError(error);;
    }
  };

  const getPokemonsByType = async (type: string) =>{
    try {
      const response = await api.get(`/type/${type}`);
      const pokemons = response.data.pokemon.map((entry: any) => entry.pokemon);
      const pokemonsWithDetails = await Promise.all(
        pokemons.map(async (pokemon: any) => {
          const pokemonResponse = await api.get(pokemon.url);
          const imageUrl = pokemonResponse?.data?.sprites?.front_default
            ? pokemonResponse?.data?.sprites?.front_default
            : "";
          const sprites = pokemonResponse.data.sprites;

          const id = pokemonResponse.data.id
          const types = pokemonResponse.data.types.map((type: any) => type.type.name);
          const formattedTypes = types.join(" & ");
          const stats = pokemonResponse.data.stats
          const formattedStats = stats.map((stat: any) => {
            return {
              name: stat.stat.name,
              base_stat: stat.base_stat,
            };
          });
  
          return {
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: imageUrl,
            sprites,
            types: formattedTypes,
            stats: formattedStats,
            id
          };
        })
      );
      return pokemonsWithDetails
    } catch (error) {
      generalError(error);;
    }
  }

  const getAllGenerations = async () =>{
    try {
      const response = await api.get('/generation');
      const generations = response.data.results.map((generation:any) => generation.name);

      return generations
    } catch (error) {
      generalError(error);
    }
  }

  // A PokeAPI não retorna os pokemóns de cada geração. 
  // Para isso farei um filtro com base na quantidade de pokemóns de cada geração,
  // filtrando através do ID, que faz referência à ordem na lista de criação.
  // Tendo que incluir manualmente.
  // Ou seja: a primeira geração vai do pokemón 1-151, a segunda 152-251...
  // Fica a sugestão aí para a PokeAPI (y)
  const getPokemonsByGeneration = async (generation: number) => {
    try{
      let start: number;
      let end: number;
    
      switch (generation) {
        case 1:
          start = 0;
          end = 151;
          break;
        case 2:
          start = 152;
          end = 251;
          break;
        case 3:
          start = 252;
          end = 386;
          break;
        case 4:
          start = 387;
          end = 493;
          break;
        case 5:
          start = 494;
          end = 649;
          break;
        case 6:
          start = 650;
          end = 721;
          break;
        case 7:
          start = 722;
          end = 809;
          break;
        case 8:
          start = 810;
          end = 898;
          break;
        default:
          alert("Invalid generation or still in development");
          return;
      }

      const response = await api.get(`/pokemon?offset=${start}&limit=${end - start}`);
      const pokemons = response.data.results

      const pokemonsWithDetails = await Promise.all(
        pokemons.map(async (pokemon: any) => {
          const pokemonResponse = await api.get(pokemon.url);
          const imageUrl = pokemonResponse?.data?.sprites?.front_default
            ? pokemonResponse?.data?.sprites?.front_default
            : "";
          const sprites = pokemonResponse.data.sprites;
          
          const id = pokemonResponse.data.id
          const types = pokemonResponse.data.types.map((type: any) => type.type.name);
          const formattedTypes = types.join(" & ");
          const stats = pokemonResponse.data.stats
          const formattedStats = stats.map((stat: any) => {
            return {
              name: stat.stat.name,
              base_stat: stat.base_stat,
            };
          });
  
          return {
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: imageUrl,
            sprites,
            types: formattedTypes,
            stats: formattedStats,
            id
          };
        })
      );
      return pokemonsWithDetails

    }catch(error){
      generalError(error);

    }
  }


  const getPokemons = async (params: IDefaultParam) => {
    let limit = params?.limit
    let offset = params?.offset
    if(!params){
      limit = 50
      offset = 0
    }
    try {
      const response = await api.get(`/pokemon?limit=${limit}&offset=${offset}`);
      const results = response.data.results;
  
      const pokemons = await Promise.all(
        results.map(async (pokemon: any) => {
          const pokemonResponse = await api.get(pokemon.url);
          const imageUrl = pokemonResponse.data.sprites.front_default;
          const sprites = pokemonResponse.data.sprites

          const id = pokemonResponse.data.id
          const types = pokemonResponse.data.types.map((type: any) => type.type.name);
          const formattedTypes = types.join(" & ");
          const stats = pokemonResponse.data.stats
          const formattedStats = stats.map((stat: any) => {
            return {
              name: stat.stat.name,
              base_stat: stat.base_stat,
            };
          });

          return {
            name: pokemon.name,
            url: pokemon.url,
            imageUrl: imageUrl,
            sprites,
            types: formattedTypes,
            stats: formattedStats,
            id
          };
        })
      );

      const responseFill = {
        pokemons,
        totalItems: response.data.count
      } 
  
      return responseFill
    } catch (error) {
      generalError(error);
    }
  };

  const getPokemsByName = async (name:string) => {
    try {
      const response = await api.get(`/pokemon/${name}`);
      if (response) {
        const results = response.data.forms;
        const pokemons = await Promise.all(
          results.map(async (pokemon: any) => {
            const pokemonResponse = await api.get(pokemon.url);
            const imageUrl = pokemonResponse.data.sprites.front_default;
            const sprites = pokemonResponse.data.sprites

            const id = pokemonResponse.data.id
            const types = pokemonResponse.data.types.map((type: any) => type.type.name);
            const formattedTypes = types.join(" & ");

            const stats = response.data.stats
            const formattedStats = stats?.map((stat: any) => {
              return {
                name: stat.stat.name,
                base_stat: stat.base_stat,
              };
            });
  
            return {
              id,
              types: formattedTypes,
              stats: formattedStats,
              name: pokemon.name,
              url: pokemon.url,
              imageUrl: imageUrl,
              sprites
            };
          })
        );
    
        return pokemons
      }
      return response
    } catch (error) {
      generalError(error);
    }
  }

  const generalError = (err: unknown) =>{
    return (
      alert(`Ocorreu o seguinte erro: ${err}` )
    )
  }

export {
  getPokemons,
  getPokemonTypes,
  getPokemonsByType,
  getAllGenerations,
  getPokemonsByGeneration,
  getPokemsByName
};
export interface IPokemon {
  name: string;
  url: string;
  imageUrl: string;
  sprites: any
  types: string;
  stats: any,
  id: number
}

export interface IDefaultParam {
  limit: number,
  offset: number,
}
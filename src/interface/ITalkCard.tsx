import { IAuthor } from "./IAuthor";
export interface ITalkCardCard {
  id?: number | undefined | null,
  title?: string | undefined | null,
  description?: string | undefined | null,
  author?: IAuthor | undefined | null,  
}
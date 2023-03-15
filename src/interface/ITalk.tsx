import { IAuthor } from "./IAuthor";

export interface ITalk {
    id?: number | undefined | null,
    title?: string | undefined | null,
    description?: string | undefined | null,
    author?: IAuthor| undefined | null,
    resources?: string | undefined | null,  
    talkDate?: Date | undefined | null,

  }
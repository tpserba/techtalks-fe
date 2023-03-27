import { ITalk } from "./ITalk"

export interface IPaginationInfo {
    content?: ITalk[],
    empty?: boolean,
    first?: boolean,
    last?: boolean,
    number?: number,
    numberOfElements?: number,
    pageable?: {

    },
    size?: number,
    sort?: {
        empty?: boolean,
        unsorted?: boolean,
        sorted?: boolean
    },
    totalElements?: number,
    totalPages?: number
}


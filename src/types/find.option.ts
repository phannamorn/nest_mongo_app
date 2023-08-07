import { WhereOption } from "./where.option";

export type FindOption = { 
    skip?: number, 
    take?: number,
    where?: WhereOption,
    relations?: any
}; 
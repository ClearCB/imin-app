import { SearchOperation } from "./search-operation";

export interface SearchCriteria {

    filterKey: string;
    operation: SearchOperation;
    value: any;

}

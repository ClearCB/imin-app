import { SearchCriteria } from "../../../shared/domain/model/search-criteria";

export interface SearchEventOptions {

    pageNumber: number;
    pageSize: number;
    body: {
        searchCriteriaList: SearchCriteria[];
        dataOption: string;
    }

}
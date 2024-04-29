import { SearchCriteria } from "../../../shared/domain/model/search-criteria";

export interface SearchEventOptions {

    searchCriteriaList: SearchCriteria[];
    pageNumber: number;
    pageSize: number;

}

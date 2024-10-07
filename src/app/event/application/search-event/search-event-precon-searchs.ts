import { SearchCriteria } from "../../../shared/domain/model/search-criteria";
import { SearchOperation } from "../../../shared/domain/model/search-operation";
import { SearchEventFormCriteriaOptions } from "../../infrastructure/view/search-event/search-event-criteria-form";

export const searchOnlineEvent = (isOnline: boolean) => {
    return {
        pageNumber: 0,
        pageSize: 10,
        body: {
            dataOption: "all",
            searchCriteriaList: [
                {
                    filterKey: "isOnline",
                    operation: SearchOperation.EQUAL,
                    value: isOnline
                }
            ]
        }
    }
}

export const searchBetweenLocationEvent = (latMax: number, latMin: number, longMax: number, longMin: number) => {
    return {
        pageNumber: 0,
        pageSize: 10,
        body: {
            dataOption: "all",
            searchCriteriaList: [
                {
                    filterKey: "latitude",
                    operation: SearchOperation.GREATER_THAN,
                    value: latMin
                },
                {
                    filterKey: "latitude",
                    operation: SearchOperation.LESS_THEN,
                    value: latMax
                },
                {
                    filterKey: "longitude",
                    operation: SearchOperation.GREATER_THAN,
                    value: longMin
                },
                {
                    filterKey: "longitude",
                    operation: SearchOperation.LESS_THEN,
                    value: longMax
                }
            ]
        }
    }
}

export const searchBetweenDatesEvent = (startDate?: Date, finishDate?: Date,) => {

    if (!startDate) {
        startDate = new Date();
    }

    if (!finishDate) {
        finishDate = new Date();
        finishDate.setDate(finishDate.getDate() + 7);
    }

    return {
        pageNumber: 0,
        pageSize: 10,
        body: {
            dataOption: "all",
            searchCriteriaList: [
                {
                    filterKey: "startDate",
                    operation: SearchOperation.GREATER_THAN,
                    value: startDate.toISOString().slice(0, -1)
                },
                {
                    filterKey: "finishDate",
                    operation: SearchOperation.LESS_THEN,
                    value: finishDate.toISOString().slice(0, -1)
                }
            ]
        }
    }
}

export const searchStartDateEvent = (startDate?: Date) => {

    if (!startDate) {
        startDate = new Date();
    }

    return {
        pageNumber: 0,
        pageSize: 10,
        body: {
            dataOption: "all",
            searchCriteriaList: [
                {
                    filterKey: "startDate",
                    operation: SearchOperation.GREATER_THAN,
                    value: startDate.toISOString().slice(0, -1)
                }
            ]
        }
    }
}

export const searchEventFormCriteria = (searchEventFormCriteria: SearchEventFormCriteriaOptions) => {

    const searchCriteriaList: SearchCriteria[] = [];

    if (searchEventFormCriteria.content) {
        searchCriteriaList.push({
            filterKey: "content",
            operation: SearchOperation.CONTAINS,
            value: searchEventFormCriteria.content
        });
    }

    if (searchEventFormCriteria.startDate) {
        const startDate = searchEventFormCriteria.startDate;
        startDate.setHours(startDate.getHours() + 2);

        searchCriteriaList.push({
            filterKey: "startDate",
            operation: SearchOperation.EQUAL,
            value: startDate.toISOString().slice(0,-1   )
        },);
    }

    if (searchEventFormCriteria.distanceBounds) {
        searchCriteriaList.push({
            filterKey: "latitude",
            operation: SearchOperation.GREATER_THAN,
            value: searchEventFormCriteria.distanceBounds.latMin
        },
            {
                filterKey: "latitude",
                operation: SearchOperation.LESS_THEN,
                value: searchEventFormCriteria.distanceBounds.latMax
            },
            {
                filterKey: "longitude",
                operation: SearchOperation.GREATER_THAN,
                value: searchEventFormCriteria.distanceBounds.longMin
            },
            {
                filterKey: "longitude",
                operation: SearchOperation.LESS_THEN,
                value: searchEventFormCriteria.distanceBounds.longMax
            });
    }


    return {
        pageNumber: 0,
        pageSize: 10,
        body: {
            dataOption: "all",
            searchCriteriaList: searchCriteriaList
        }
    }
}
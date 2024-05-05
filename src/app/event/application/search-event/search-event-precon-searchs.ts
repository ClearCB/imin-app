import { SearchOperation } from "../../../shared/domain/model/search-operation";

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

// {
//     "dataOption":"all",
//     "searchCriteriaList":[
//        {
//           "filterKey":"latitude",
//           "operation":"gt",
//           "value": 20
//        },
//        {
//           "filterKey":"latitude",
//           "operation":"lt",
//           "value": 50
//        },
//        {
//           "filterKey":"longitude",
//           "operation":"gt",
//           "value": -90
//        },
//        {
//           "filterKey":"longitude",
//           "operation":"lt",
//           "value": -70
//        },
//        {
//           "filterKey":"isOnline",
//           "operation":"eq",
//           "value": true
//        }
//     ]
// }

// {
//     "dataOption":"all",
//     "searchCriteriaList":[

//        {
//           "filterKey":"categories",
//           "operation":"cc",
//           "value": ["Category 8"]
//        }
//     ]
// }
export const sectorList:Array<string> = [
    "Health",
    "Food",
    "Wash",
    "Shelter/NFI",
    "Protection",
    "Education",
    "Livelihood",
    "Other"
]

export const geographicalSetting:Array<string> = [
    "Urban",
    "Rural",
    "Semi-Urban"
]

export const sectorSeverityScale:Map<number,string> = new Map([
    [1,"No concern – situation under control"],
    [2,"Situation of concern that requires monitoring"],
    [3,"Many people are suffering because of insufficient [supply of goods or services]"],
    [4,"Many people will die because [supply of goods or services] are insufficient"],
    [5,"Many people are known to be dying due to insufficient [supply of goods or services]"]
]);


export const factorSeverityScale:Map<number,string> = new Map([
    [1,"Factor with **Low** Impact"],
    [2,"Factor with **Medium** Impact"],
    [3,"Factor with **High** Impact"]
]);

// TODO This is not implemented as of now. Do implement it.
export const factorList:Array<string> = [
    "Access",
    "Availability",
    "Quality",
    "Use"
]

// TODO Get all the levels for this scale
export const futureConcernScale:Map<number,string> = new Map([
    [1, "Not worrried at all"],
    [5, "Worried of Survival Concerns"]
]);
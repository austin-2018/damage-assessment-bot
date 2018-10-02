import applyToModel from "utils/applyToModel";

type ISODateString = string;

export default class DisasterAssessmentReportModel<TReportType> {

    constructor(values: Partial<DisasterAssessmentReportModel<TReportType>>) {
        applyToModel(this, values, {})
    }

    id!: string;
    userId!: string;
    creationDate!: ISODateString;
    lastModifiedDate!: ISODateString;
    report!: TReportType;
}
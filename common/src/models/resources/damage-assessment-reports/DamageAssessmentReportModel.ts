
type ISODateString = string;

export default class DamageAssessmentReportModel<TReportType> {
    id!: string;
    userId!: string;
    creationDate!: ISODateString;
    lastModifiedDate!: ISODateString;
    report!: TReportType;
}
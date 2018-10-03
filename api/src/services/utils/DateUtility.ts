
export class DateUtility {
    static getInstance(): DateUtility {
        return new DateUtility();
    }

    currentDate(): Date {
        return new Date();
    }

    currentDateString(): string {
        return this.currentDate().toUTCString();
    }

    currentDateOffset(offset: { days: number }): Date {
        let result = new Date();
        if (offset.days) {
            result.setDate(result.getDate() + offset.days); 
        }
        return result;
    }

    currentDateOffsetString(offset: { days: number }): string {
        return this.currentDateOffset(offset).toUTCString();
    }
}
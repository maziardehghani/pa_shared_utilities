
export class CalendarService {

    public convertToPersianDate(date: string | Date): string {
        const d = new Date(date);

        if (isNaN(d.getTime())) {
            throw new Error('Invalid date');
        }

        const persianDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        }).format(d);

        return this.replaceNumbers(persianDate)
    }


    public convertToHumanDate(date: string | Date): string {
        const d = new Date(date);

        if (isNaN(d.getTime())) {
            throw new Error('Invalid date');
        }

        const persianDate = new Intl.DateTimeFormat('fa-IR-u-ca-persian', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(d);

        return this.replaceNumbers(persianDate)

    }

    private replaceNumbers(date: string) {
        return date.replace(/[۰-۹]/g, (digit) =>
            String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)),
        );
    }


}
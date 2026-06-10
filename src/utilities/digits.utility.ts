export class DigitUtilities {


    toEnglishNumbers(mobile: string): string {

        if (!mobile) {
            return mobile
        }

        const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
        const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٧', '٩'];
        const english = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];


        let result = mobile;
        for (let i = 0; i < 10; i++) {
            result = result
                .replace(new RegExp(persian[i], 'g'), english[i])
                .replace(new RegExp(arabic[i], 'g'), english[i]);
        }

        return result;
    }



    upperFirstChar(arg: string) {
        return arg.charAt(0).toUpperCase() + arg.slice(1)
    }

}
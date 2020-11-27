const calculateBmi = (height: number, weight: number): string => {
    const bmi: number = weight / (height / 100 * height / 100);
    let bmiMessage: string = '';

    switch (true) {
        case bmi < 18.5:
            bmiMessage = "Underweight";
            break;

        case bmi < 25:
            bmiMessage = "Normal";
            break;

        case bmi < 30:
            bmiMessage = "Overweight";
            break;

        default:
            bmiMessage = "Obese";
            break;
    }

    return bmiMessage;
}

const heightParameter: number = Number(process.argv[2]);
const weightParameter: number = Number(process.argv[3]);

console.log(calculateBmi(heightParameter, weightParameter));
const calculateBmi = (height: number, weight: number): void => {
    const bmi: number = weight / (height / 100 * height / 100)
    let bmiMessage: string = undefined;

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

    console.log(bmiMessage);
}

const height: number = Number(process.argv[2])
const weight: number = Number(process.argv[3])

calculateBmi(height, weight);
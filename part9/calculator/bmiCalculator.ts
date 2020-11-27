const calculateBmi = (height: number, weight: number): string => {

    if(!height || !weight) {
        throw new Error(`Height or Weight arguments weren't provided.`)
    }

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

try {
    const heightParameter: number = Number(process.argv[2]);
    const weightParameter: number = Number(process.argv[3]);
    
    console.log(calculateBmi(heightParameter, weightParameter));
}
catch (error) {
    console.log(error.message)
}
interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (dailyExerciseInHours: number[]): Result => {
    if (dailyExerciseInHours.length === 0) {
        throw new Error('No arguments were provided');
    }

    const targetDailyExerciseInHours = 2;

    const numberOfDays: number = dailyExerciseInHours.length;
    const numberOfTrainingDays: number = dailyExerciseInHours.filter(hour => hour > 0).length;
    const targetValue: number = targetDailyExerciseInHours;
    const averageTime: number = dailyExerciseInHours.reduce((a, b) => a + b, 0) / dailyExerciseInHours.length;
    const targetReached: boolean = (averageTime >= targetValue);

    let rating = 0;
    let ratingDescription = '';

    if (averageTime <= 0.5) {
        rating = 1;
        ratingDescription = `Pretty poor, you can do better!`;
    }
    else if (averageTime > 0.5 || averageTime <= 1.5) {
        rating = 2;
        ratingDescription = `Now we're talking, keep up the good work!`;
    }
    else if (averageTime > 1.5) {
        rating = 3;
        ratingDescription = `Awesome, you've reached your goal!`;
    }

    return {
        periodLength: numberOfDays,
        trainingDays: numberOfTrainingDays,
        success: targetReached,
        rating: rating,
        ratingDescription: ratingDescription,
        target: targetValue,
        average: averageTime
    } as Result;
};
try {
    const dailyExerciseLog: number[] = process.argv.slice(2, process.argv.length).map(arg => Number(arg));
    console.log(exerciseCalculator(dailyExerciseLog));
}
catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    else {
        console.log(JSON.stringify(error));
    }
}
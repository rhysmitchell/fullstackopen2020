interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (dailyTargetInHours: number, dailyExerciseInHours: number[]): Result => {
    if (dailyExerciseInHours.length === 0) {
        throw new Error('No arguments were provided');
    }

    const numberOfDays: number = dailyExerciseInHours.length;
    const numberOfTrainingDays: number = dailyExerciseInHours.filter(hour => hour > 0).length;
    const averageTime: number = dailyExerciseInHours.reduce((a, b) => a + b, 0) / dailyExerciseInHours.length;
    const targetReached: boolean = (averageTime >= dailyTargetInHours);

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
        target: dailyTargetInHours,
        average: averageTime
    } as Result;
};

try {

    // Target hours has been shifted to be the 'first' parameter
    // as we don't know the length of the exercise log ahead of time
    const dailyTargetInHours = Number(process.argv[2]);
    const dailyExerciseLog: number[] = process.argv.slice(3, process.argv.length).map(arg => Number(arg));
    console.log(calculateExercises(dailyTargetInHours, dailyExerciseLog));
}
catch (error: unknown) {
    if (error instanceof Error) {
        console.log(error.message);
    }
    else {
        console.log(JSON.stringify(error));
    }
}

export { calculateExercises };
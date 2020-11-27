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
    const targetDailyExerciseInHours = 2;

    const numberOfDays: number = dailyExerciseInHours.length;
    const numberOfTrainingDays: number = dailyExerciseInHours.filter(hour => hour > 0).length;
    const targetValue: number = targetDailyExerciseInHours;
    const averageTime: number = dailyExerciseInHours.reduce((a, b) => a + b, 0) / dailyExerciseInHours.length;
    const targetReached: boolean = (averageTime >= targetValue);

    let rating: number = 0;
    let ratingDescription: string = '';

    if (averageTime <= 0.5) {
        rating = 1
        ratingDescription = `Pretty poor, you can do better!`
    }
    else if (averageTime > 0.5 || averageTime <= 1.5) {
        rating = 2
        ratingDescription = `Now we're talking, keep up the good work!`
    }
    else if (averageTime > 1.5) {
        rating = 3
        ratingDescription = `Awesome, you've reached your goal!`
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
}

const dailyExerciseLog: number[] = [3, 0, 2, 4.5, 0, 3, 1];
console.log(exerciseCalculator(dailyExerciseLog));
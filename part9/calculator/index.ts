import express, { Request, Response } from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface IBMI {
    height: number;
    weight: number;
    bmi: string;
}

interface IExerciseParams {
    dailyExercises: number[];
    target: number;
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res: Response) => res.send('Hello Full Stack!'));

app.get('/bmi', (req: Request, res: Response) => {
    const { height, weight } = req.query;

    // A near on identical check is done internally inside calculateBmi(...)
    if (!height || !weight) {
        res.status(400).send({ error: `Height and weight arguments are required.` });
    }

    const parsedHeight = Number(height);
    const parsedWeight = Number(weight);

    if (isNaN(parsedHeight) || isNaN(parsedWeight)) {
        res.status(400).send({ error: `Malformatted parameters: try passing both arguments as numbers.` });
    }

    const bmi: IBMI = {
        weight: parsedWeight,
        height: parsedHeight,
        bmi: calculateBmi(parsedHeight, parsedWeight),
    };

    res.json(bmi);
});

app.post('/exercise', (req: Request, res: Response) => {
    try {
        const { dailyExercises, target } = req.body as IExerciseParams;

        if (!dailyExercises || !target) {
            res.status(400).send({ error: `Daily exercises and target arguments are required.` });
        }

        if (isNaN(target)) {
            res.status(400).send({ error: `Malformatted parameters: try passing both arguments as numbers.` });
        }

        const exercisesIsArray = Array.isArray(dailyExercises);
        const allExercisesAreNumbers = dailyExercises.filter(exercise => typeof exercise === "number").length === dailyExercises.length;

        if (!exercisesIsArray || !allExercisesAreNumbers) {
            throw new Error(`Daily exercises parameter must be of type: number[].`);
        }

        res.json(calculateExercises(target, dailyExercises));
    }
    catch (error: unknown) {
        if (error instanceof Error) {
            console.log(error.message);
        }
        else {
            console.log(JSON.stringify(error));
        }
    }
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
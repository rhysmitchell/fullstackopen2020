import express from 'express';
import { calculateBmi } from './bmiCalculator';

interface BMI {
    height: number;
    weight: number;
    bmi: string;
}

const app = express();

app.get('/hello', (_req, res) => res.send('Hello Full Stack!'));

app.get('/bmi', (req, res) => {
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

    const bmi: BMI = {
        weight: parsedWeight,
        height: parsedHeight,
        bmi: calculateBmi(parsedHeight, parsedWeight),
    };

    res.json(bmi);
});

const PORT = 3003;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
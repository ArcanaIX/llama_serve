const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/generate', async (req, res) => {
    const prompt = req.query.prompt;
    const model = req.query.model;
    const data = await askLlama(prompt, model);
    
    res.send(data);
});


//Functions
const askLlama = async (prompt, model) => {
    console.log('is generating...')
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            prompt: prompt,
            model: model,
            stream: false
        })
    });

    const data = await response.json();
    return data;
};

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
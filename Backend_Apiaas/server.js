import express from 'express';
import dotenv from 'dotenv';
import { executeQuery, executeReadQuery } from './hello-prisma/crud.js';

dotenv.config();
const app = express();

app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello siriiiii!');
});

app.post('/run-sql', async (req, res) => {
  const { sql, type } = req.body;

  if (!sql || !type) {
    return res.status(400).json({ error: 'Please provide both "sql" and "type" (write/read)' });
  }

  try {
    let result;
    if (type === 'write') {
      result = await executeQuery(sql); // For INSERT, UPDATE, DELETE
    } else if (type === 'read') {
      result = await executeReadQuery(sql); // For SELECT queries
    } else {
      return res.status(400).json({ error: 'Invalid type. Must be "read" or "write".' });
    }

    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

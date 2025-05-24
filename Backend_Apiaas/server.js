import express from 'express';
import dotenv from 'dotenv';
import { executeQuery, executeReadQuery } from './hello-prisma/crud.js';
import cors from 'cors'; 
import crypto from 'crypto';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {
  res.send('Hello siriiiii!');
});

//testing
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


//sigup 
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  // Validate input
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const sql = `
      INSERT INTO user_details (name, email, password)
      VALUES ('${name}', '${email}', '${password}')
    `;

    const result = await executeQuery(sql);
    const need = await  executeReadQuery(`SELECT * FROM user_details WHERE email = '${email}'`);
    const user = need[0];



    res.status(201).json({ message: 'User registered successfully', result,user });
  } catch (error) {
    console.error('Insert error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//login
 
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const sql = `SELECT * FROM user_details WHERE email = '${email}'`;
    const result = await executeReadQuery(sql);

    if (result.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    const user = result[0];

    if (user.password === password) {
      return res.status(200).json({ message: 'Login successful' ,user});
    } else {
      return res.status(401).json({ message: 'Password is incorrect' });
    }

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});


//subcription
app.post('/subscription', async (req, res) => {
  const { id, plan, amount } = req.body;

  if (!id || !plan || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Step 1: Check if the ID exists
    const checkSql = `SELECT * FROM subscription WHERE id = '${id}'`;
    const existing = await executeReadQuery(checkSql);

    let result;

    if (existing.length > 0) {
      // Step 2a: ID exists, so update the row
      const updateSql = `
        UPDATE subscription
        SET plan = '${plan}', amount = '${amount}'
        WHERE id = '${id}'
      `;
      result = await executeQuery(updateSql);
      res.status(200).json({ message: 'Subscription updated successfully', result });
    } else {
      // Step 2b: ID does not exist, so insert new row
      const insertSql = `
        INSERT INTO subscription (id, plan, amount)
        VALUES ('${id}', '${plan}', '${amount}')
      `;
      result = await executeQuery(insertSql);
      res.status(201).json({ message: 'Subscription created successfully', result });
    }
  } catch (error) {
    console.error('Subscription error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// API key generation route
app.post('/generate-api-key', async (req, res) => {
  const { id, apiLevel } = req.body;

  if (!id || !apiLevel) {
    return res.status(400).json({ message: 'Both id and apiLevel are required.' });
  }

  const apiKey = crypto.randomBytes(24).toString('hex');
  const createdAt = new Date().toISOString();
  const updatedAt = new Date().toISOString();

  const sql = `
    INSERT INTO "api_manage" ("id", "apiKey", "apiLevel", "createdAt", "updatedAt")
    VALUES (${id}, '${apiKey}', '${apiLevel}', '${createdAt}', '${updatedAt}')
  `;

  try {
    const result = await executeQuery(sql);
    res.status(201).json({
      message: 'API key generated and stored successfully',
      data: {
        id,
        apiKey,
        apiLevel,
        createdAt,
        updatedAt
      },
      result
    });
  } catch (error) {
    console.error('Database insert error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

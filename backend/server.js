const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// In-memory data
let tasks = [
  { id: 1, title: 'Bulut Bilişim projesi araştır', completed: true },
  { id: 2, title: 'React ile Frontend yaz', completed: false },
  { id: 3, title: 'AWS S3 de host et', completed: false }
];
let nextId = 4;

// GET tüm görevleri al
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST yeni görev ekle
app.post('/api/tasks', (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newTask = { id: nextId++, title, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PATCH görevin durumunu değiştir (tamamlandı/tamamlanmadı)
app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: 'Task not found' });
  task.completed = !task.completed;
  res.json(task);
});

// DELETE görevi sil
app.delete('/api/tasks/:id', (req, res) => {
  const idx = tasks.findIndex(t => t.id === parseInt(req.params.id));
  if (idx !== -1) {
    const deletedTask = tasks.splice(idx, 1)[0];
    res.json(deletedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// Sunucuyu başlat
app.listen(port, () => {
  console.log(`✅ Backend server running on http://localhost:${port}`);
});

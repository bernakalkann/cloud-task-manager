import { useState, useEffect } from 'react';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  
  // API URL - Backend'in barındırıldığı gerçek AWS EC2 sunucu adresi (Cloud Architecture)
  const API_URL = 'http://13.60.59.196/api/tasks';

  // Sayfa yüklendiğinde görevleri çek
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setTasks(data);
      setLoading(false);
    } catch (error) {
      console.error('Görevler çekilemedi:', error);
      setLoading(false);
    }
  };

  const submitTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Görev eklenemedi:', error);
    }
  };

  const toggleTask = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PATCH'
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (error) {
      console.error('Görev güncellenemedi:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch (error) {
      console.error('Görev silinemedi:', error);
    }
  };

  return (
    <div className="cloud-app">
      <header>
        <h1>Cloud Task Manager</h1>
        <div className="subtitle">3522 Bulut Bilişim Projesi</div>
      </header>
      
      <div className="glass-panel">
        <form className="add-task-form" onSubmit={submitTask}>
          <input 
            type="text" 
            placeholder="Yeni bir bulut görevi ekle..." 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button type="submit">Ekle</button>
        </form>

        {loading ? (
          <div style={{ textAlign: 'center', color: '#a09eb0' }}>Sunucudan görevler yükleniyor...</div>
        ) : (
          <ul>
            {tasks.length === 0 && (
              <div style={{ textAlign: 'center', color: '#a09eb0' }}>Henüz hiçbir görev yok.</div>
            )}
            {tasks.map(task => (
              <li key={task.id} className={task.completed ? 'completed' : ''}>
                <div className="task-content" onClick={() => toggleTask(task.id)}>
                  <div className="checkbox">
                    {task.completed && <span style={{color: '#0f0a1f', fontWeight: 'bold'}}>✓</span>}
                  </div>
                  <span className="task-text">{task.title}</span>
                </div>
                <button 
                  className="delete-btn" 
                  onClick={() => deleteTask(task.id)}
                  title="Görevi Sil"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;

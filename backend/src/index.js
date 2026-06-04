const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Путь к файлу для хранения данных
const dataPath = path.join(__dirname, '../data/datacenter.json');

// Обеспечиваем наличие папки data
if (!fs.existsSync(path.dirname(dataPath))) {
    fs.mkdirSync(path.dirname(dataPath), { recursive: true });
}

// Загрузка данных из файла или создание начальных
let dataCenterItems = [];
try {
    const rawData = fs.readFileSync(dataPath);
    dataCenterItems = JSON.parse(rawData);
} catch (err) {

}

function saveData() {
    fs.writeFileSync(dataPath, JSON.stringify(dataCenterItems, null, 2));
}

app.use(express.json());

// Раздача статики (собранный фронтенд из папки public)
app.use(express.static(path.join(__dirname, '../public')));

// GET /datacenter – список всех карточек (с поддержкой фильтрации по названию)
app.get('/datacenter', (req, res) => {
    const search = req.query.search;
    let result = dataCenterItems;
    if (search && search.trim() !== '') {
        const searchLower = search.toLowerCase();
        result = dataCenterItems.filter(item =>
            item.title && item.title.toLowerCase().includes(searchLower)
        );
    }
    res.json(result);
});

// GET /datacenter/:id – одна карточка (включая комментарии)
app.get('/datacenter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const item = dataCenterItems.find(i => i.id === id);
    if (item) res.json(item);
    else res.status(404).json({ error: "Not found" });
});

// POST /datacenter – создание новой карточки
app.post('/datacenter', (req, res) => {
    const { title, text, src, category, discount, promoCodes, modelPath } = req.body;
    if (!title || !text) {
        return res.status(400).json({ error: "Missing required fields: title, text" });
    }
    const newId = dataCenterItems.length ? Math.max(...dataCenterItems.map(i => i.id)) + 1 : 1;
    const newItem = {
        id: newId,
        title,
        text,
        src: src || "https://via.placeholder.com/300x200",
        category: category || "общее",
        discount: discount !== undefined ? discount : 0,
        promoCodes: promoCodes ? (Array.isArray(promoCodes) ? promoCodes : promoCodes.split(',').map(s => s.trim())) : [],
        modelPath: modelPath || "./models/computer.glb",
        comments: []
    };
    dataCenterItems.push(newItem);
    saveData();
    res.status(201).json(newItem);
});

// PATCH /datacenter/:id – обновление карточки
app.patch('/datacenter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataCenterItems.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    const updated = { ...dataCenterItems[index], ...req.body };
    if (req.body.promoCodes && typeof req.body.promoCodes === 'string') {
        updated.promoCodes = req.body.promoCodes.split(',').map(s => s.trim());
    }
    dataCenterItems[index] = updated;
    saveData();
    res.json(updated);
});

// DELETE /datacenter/:id – удаление карточки
app.delete('/datacenter/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = dataCenterItems.findIndex(i => i.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    dataCenterItems.splice(index, 1);
    saveData();
    res.status(204).send();
});

// POST /datacenter/:id/comments – добавить комментарий к карточке
app.post('/datacenter/:id/comments', (req, res) => {
    const id = parseInt(req.params.id);
    const item = dataCenterItems.find(i => i.id === id);
    if (!item) return res.status(404).json({ error: "Item not found" });

    const { author, text } = req.body;
    if (!author || !text) {
        return res.status(400).json({ error: "Author and text are required" });
    }

    const comments = item.comments || [];
    const newId = comments.length ? Math.max(...comments.map(c => c.id)) + 1 : 1;
    const newComment = {
        id: newId,
        author,
        text,
        createdAt: new Date().toISOString()
    };
    item.comments = [...comments, newComment];
    saveData();
    res.status(201).json(newComment);
});

// Для всех остальных маршрутов отдаём index.html (SPA роутинг)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

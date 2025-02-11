// server.js
import express from 'express';
import fs from 'fs'; // 导入原生 fs 模块（支持同步方法）
import { readdir, mkdir, writeFile, rm, rename } from 'fs/promises'; // 异步方法
import path from 'path';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const baseDir = './projectData'; // 指定要读取的目录

// 递归读取目录
async function readDirectory(dir) {
  try {
    const files = await readdir(dir, { withFileTypes: true });
    const nodes = [];
    for (const file of files) {
      if (file.isDirectory()) {
        const children = await readDirectory(path.join(dir, file.name));
        nodes.push({ id: path.join(dir, file.name), label: file.name, children });
      } else {
        nodes.push({ id: path.join(dir, file.name), label: file.name });
      }
    }
    return nodes;
  } catch (err) {
    console.error(err);
    return [];
  }
}

// 加载根节点
app.get('/api/loadRoot', async (req, res) => {
  const rootNodes = await readDirectory(baseDir);
  const data = [{ id: baseDir, label: "projectData", children: rootNodes }];
  res.json(data);
});

// 加载子节点（懒加载）
app.post('/api/loadChildren', async (req, res) => {
  const { id } = req.body;
  const children = await readDirectory(id);
  res.json(children);
});

// 自动生成唯一名称
function getUniqueName(parentId, baseName, isDir) {
  let index = 1;
  let name = baseName;

  while (true) {
    try {
      const files = fs.readdirSync(parentId, { withFileTypes: true });
      if (!files.some(file => file.name === name)) {
        break;
      }
      name = `${baseName}(${index})${isDir ? '' : path.extname(baseName)}`;
      index++;
    } catch (err) {
      console.error(`Error reading directory ${parentId}:`, err);
      throw new Error("Failed to generate unique name.");
    }
  }
  return name;
}

// 添加目录
app.post('/api/addFolder', async (req, res) => {
  const { parentId, name } = req.body;
  const uniqueName = getUniqueName(parentId, name, true);
  const newNodePath = path.join(parentId, uniqueName);

  try {
    await mkdir(newNodePath);
    res.json({ success: true, id: newNodePath, name: uniqueName });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// 添加文件
app.post('/api/addFile', async (req, res) => {
  const { parentId, name } = req.body;
  const uniqueName = getUniqueName(parentId, name, false);
  const newFilePath = path.join(parentId, uniqueName);

  try {
    await writeFile(newFilePath, '');
    res.json({ success: true, id: newFilePath, name: uniqueName });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// 删除节点
app.post('/api/delete', async (req, res) => {
  const { id } = req.body;

  try {
    await rm(id, { recursive: true, force: true });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// 重命名节点
app.post('/api/rename', async (req, res) => {
  const { id, newName } = req.body;
  const newPath = path.join(path.dirname(id), newName);

  try {
    await rename(id, newPath);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});
// 保存文件内容
app.post('/api/saveFile', async (req, res) => {
  const { id, content } = req.body;

  try {
    
    await writeFile(id, content, { encoding: 'utf8' });
    res.json({ success: true, message: 'File saved successfully.' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// 读取文件内容
app.post('/api/readFile', async (req, res) => {
  const { id } = req.body;

  try {
    const content = await fs.promises.readFile(id, { encoding: 'utf8' });
 
    res.json({ success: true, content });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});


const distDir = path.join("../front", 'dist');
app.use(express.static(distDir));

// 捕获所有路由请求，返回 index.html（支持 SPA）
app.get('*', (req, res) => {
  res.sendFile(path.resolve(distDir, 'index.html'));
});

app.listen(3000, () => console.log('Server is running on port 3000'));
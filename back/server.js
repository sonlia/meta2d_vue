// server.js
import express from 'express';
import { execSync } from 'child_process';
import fs from 'fs'; // 导入原生 fs 模块（支持同步方法）
import { readdir, mkdir, writeFile, rm, rename } from 'fs/promises'; // 异步方法
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';
 
const app = express();
app.use(cors({
  credentials: true, // 允许携带 Cookie
  origin: 'http://localhost:8080' // 前端地址
}));
app.use(express.json());



app.use(cookieParser()); // 解析 Cookie

// 单用户数据
// 模拟用户数据
const USER = {
  username: 'test',
  password: "test"
};


// 登录状态（简单模拟）
let isAuthenticated = false;

// 用户登录接口

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: '用户名和密码不能为空' });
  }

  if (username === USER.username &&  password === USER.password) {
    res.cookie('authToken', 'true', {  maxAge: 60 * 60 * 1000*20000000 });
    return res.json({ success: true, message: '登录成功' });
  } else {
    return res.status(401).json({ success: false, message: '用户名或密码错误' });
  }
});

// 注销接口
app.post('/api/logout', (req, res) => {
  res.clearCookie('authToken', { httpOnly: true, secure: true, sameSite: 'strict' });
  return res.json({ success: true, message: '注销成功' });
});
// 验证用户登录状态的中间件
function checkAuth(req, res, next) {
  const auth = req.cookies.authToken;

  if (auth !== 'true' ) {
    return res.status(401).json({ success: false, message: '未授权访问' });
  }

  next();
}



const baseDir = './projectData'; // 指定要 读取的目录

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
        if(file.name.startsWith("bak-")) break
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
app.get('/api/loadRoot',checkAuth, async (req, res) => {
  
    // 如果目录不存在则自动创建
    if (!fs.existsSync(baseDir)) {
      await fs.promises.mkdir(baseDir, { recursive: true });
    }
    const rootNodes = await readDirectory(baseDir);
    const data = [{ id: baseDir, label: "projectData", children: rootNodes }];
    res.json(data);
 
});

// 加载子节点（懒加载）
app.post('/api/loadChildren', checkAuth,async (req, res) => {
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
app.post('/api/addFolder',checkAuth, async (req, res) => {
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
app.post('/api/addFile', checkAuth,async (req, res) => {
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
app.post('/api/delete', checkAuth,async (req, res) => {
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
app.post('/api/rename', checkAuth,async (req, res) => {
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
// 保存文件内容
app.post('/api/saveFile', checkAuth,async (req, res) => {
  const { id, content } = req.body;

  try {
    const filePath = id; // 文件路径
    const backupFilePath = `bak-${path.basename(filePath)}`; // 备份文件路径
    const backupDir = path.dirname(filePath); // 备份目录

    // 检查文件是否存在
    const fileExists = await fileExistsCheck(filePath);

    if (fileExists) {
      // 如果文件存在，先备份
      const fullBackupPath = path.join(backupDir, backupFilePath);
      await fs.promises.copyFile(filePath, fullBackupPath);
      console.log(`Backup created: ${fullBackupPath}`);
    }

    // 写入新内容到原始文件
    await fs.promises.writeFile(filePath, content, { encoding: 'utf8' });
    res.json({ success: true, message: 'File saved successfully.' });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
});

// 辅助函数：检查文件是否存在
async function fileExistsCheck(path) {
  try {
    await fs.promises.access(path);
    return true; // 文件存在
  } catch {
    return false; // 文件不存在
  }
}
// 读取文件内容
app.post('/api/readFile', checkAuth,async (req, res) => {
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
// 检查端口是否被占用并清理
function killPort(port) {
  try {
    // 查找占用端口的进程
    const pid = execSync(`lsof -i :${port} -t || echo ""`).toString().trim();
    if (pid) {
      console.log(`端口 ${port} 被进程 ${pid} 占用，正在杀掉...`);
      execSync(`kill -9 ${pid}`);
      console.log(`进程 ${pid} 已被杀掉`);
    }
  } catch (err) {
    console.error('检查或杀掉端口进程时出错:', err);
  }
}

// 启动前检查并清理 3000 端口
killPort(3000);
app.listen(3000, "0.0.0.0",() => console.log('Server is running on port 3000'));
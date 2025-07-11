// server.js
import express from 'express';
import { execSync } from 'child_process';
import fs from 'fs'; // 导入原生 fs 模块（支持同步方法）
import { readdir, mkdir, writeFile, rm, rename } from 'fs/promises'; // 异步方法
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url'; // 用于替换 __dirname
import cors from 'cors';
import compression from 'compression';
import multer from 'multer';
import { rimraf } from 'rimraf';

// ES Module 中替代 __dirname 的方案
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors({
  credentials: true, // 允许携带 Cookie
  origin: (origin, callback) => {
    // 在开发环境中，为了方便可以暂时允许所有来源
    // TODO: 在生产环境中，应该设置为一个具体的白名单
    callback(null, true);
  },
}));
app.use(express.json({ limit: '100gb' }));
app.use(express.urlencoded({ limit: '100gb', extended: true }));
app.use(cookieParser()); // 解析 Cookie
app.use(compression());

 

// 单用户数据
// 模拟用户数据
const USER = {
  username: 'test',
  password: "test"
};


 

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
        if(file.name.startsWith("bak-")) continue
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
    console.log(rootNodes,baseDir, "rootNodes");
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




// ========== 独立文件存储的自定义图元接口 =============
const iconsDir =   './custom' ;
const ensureIconsDir = async () => {
  if (!fs.existsSync(iconsDir)) {
    await fs.promises.mkdir(iconsDir, { recursive: true });
  }
};

// 获取自定义图元列表
app.get('/api/customIcons/list', checkAuth, async (req, res) => {
  await ensureIconsDir();
  const files = await fs.promises.readdir(iconsDir);
  const list = [];
  for (const file of files) {
    if (file.endsWith('.json')) {
      const content = await fs.promises.readFile(path.join(iconsDir, file), 'utf8');
      try {
        list.push(JSON.parse(content));
      } catch (e) {
          // skip invalid json
      }
    }
  }
   res.json({ success: true, list });
});

// 新增自定义图元（或覆盖）
app.post('/api/customIcons/save', checkAuth, async (req, res) => {
  const { data } = req.body;
  await ensureIconsDir();
  if (!data || !data.name) {
    return res.json({ success: false, message: '缺少name' });
  }
  const filePath = path.join(iconsDir, `${data.name}.json`);
  await fs.promises.writeFile(filePath, JSON.stringify(  data , null, 2), 'utf8');
  res.json({ success: true, id: data.name });
});

// 删除自定义图元
app.post('/api/customIcons/delete', checkAuth, async (req, res) => {
  const { id } = req.body;
  await ensureIconsDir();
  const filePath = path.join(iconsDir, `${id}.json`);
  if (fs.existsSync(filePath)) {
    await fs.promises.rm(filePath);
    res.json({ success: true });
  } else {
    res.json({ success: false, message: '文件不存在' });
  }
});

// 重命名自定义图元（文件名和内容name都要改）
app.post('/api/customIcons/rename', checkAuth, async (req, res) => {
  const { id, newName } = req.body;
  await ensureIconsDir();
  const oldPath = path.join(iconsDir, `${id}.json`);
  const newPath = path.join(iconsDir, `${newName}.json`);
  if (!fs.existsSync(oldPath)) {
    return res.json({ success: false, message: '原文件不存在' });
  }
  const content = await fs.promises.readFile(oldPath, 'utf8');
  let obj = JSON.parse(content);
  obj.id = newName;
  if (obj.data) obj.data.name = newName;
  await fs.promises.writeFile(newPath, JSON.stringify(obj, null, 2), 'utf8');
  await fs.promises.rm(oldPath);
  res.json({ success: true });
});

// 编辑自定义图元数据
app.post('/api/customIcons/edit', checkAuth, async (req, res) => {
  const {  data } = req.body;
  await ensureIconsDir();
  const filePath = path.join(iconsDir, `${data.name}.json`);
  if (!fs.existsSync(filePath)) {
    return res.json({ success: false, message: '文件不存在' });
  }
   
  await fs.promises.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  res.json({ success: true });
});

// 辅助函数：对比新旧数据，生成 diff
function compareData(oldList, newList) {
  const oldMap = new Map(oldList.map(item => [item.id, item]));
  const newMap = new Map(newList.map(item => [item.id, item]));

  const result = {
      added: [], // 新增的数据
      removed: [], // 删除的数据
      updated: [] // 更新的数据及其变化
  };

  // 检查新增和更新
  for (const [id, newItem] of newMap) {
      if (!oldMap.has(id)) {
          result.added.push(newItem); // 新增
      } else {
          const oldItem = oldMap.get(id);
          const changes = {};

          // 检查 status 是否有变化
          if (newItem.status !== oldItem.status) {
              changes.status = { oldStatus: oldItem.status, newStatus: newItem.status };
          }
          // 检查 text 是否有变化
          if (newItem.text !== oldItem.text) {
              changes.text = { oldText: oldItem.text, newText: newItem.text };
          }

          // 如果有变化，则加入 updated 列表
          if (Object.keys(changes).length > 0) {
              result.updated.push({
                  id: id, 
                  text: newItem.text, // 默认包含 text 属性
                  change: changes // 变化的属性
              });
          }
      }
  }

  // 检查删除
  for (const [id, oldItem] of oldMap) {
      if (!newMap.has(id)) {
          result.removed.push(oldItem); // 删除
      }
  }

  return result;
}

// 新旧数据对比与历史合并
function handleProjectDataHistory(oldContent, newContent) {
  //oldcontent  ，包含 projectData  以及 switchChangHistory
  if(!oldContent) return JSON.stringify({ projectData: JSON.parse(newContent), switchChangHistory: [] });
  let oldData;
  let switchChangHistory;
  try {
    const oldParsed = JSON.parse(oldContent);
    oldData = oldParsed?.projectData ?? {};
    switchChangHistory = oldParsed?.switchChangHistory ?? [];
  } catch (e) {
    oldData = {};
    switchChangHistory = [];
  }
 
  const newData = JSON.parse(newContent) ?? {};
  
  const filterData = (x) => {
    if (x?.flag == "switch") {
      return { status: x.showChild, id: x.id, text: x.text };
    }
    if (x?.flag == "power") {
      return { status: x.isOn, id: x.id, text: x.text };
    }
  };
  const newDiffData = newData?.pens?.map((x) => filterData(x)).filter((x) => x != undefined);

  const oldDiffData = oldData?.pens?.map((x) => filterData(x)).filter((x) => x != undefined);

 
    const diffData = compareData(oldDiffData, newDiffData);
     if (diffData.length != 0) {
      const time = Date.now();
      switchChangHistory.unshift({ [time]: diffData });
    }
 
  return JSON.stringify({ projectData: newData, switchChangHistory });
}

 
// 上传临时目录
const UPLOAD_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileId = req.body.identifier;
    if (!fileId) {
      return cb(new Error('缺少 identifier'), null);
    }
    const chunkDir = path.join(UPLOAD_DIR, fileId);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }
    cb(null, chunkDir);
  },
  filename: function (req, file, cb) {
    const chunkNumber = req.body.chunkNumber;
    cb(null, String(chunkNumber ? chunkNumber - 1 : 0));
  }
});

const chunkUpload = multer({ storage });

// 接收文件分片
app.post('/api/uploadFileChunk', checkAuth, chunkUpload.single('file'), async (req, res) => {
  try {
    // 解析并兼容不同字段命名
    const upFileName = req.body.filename ;
    const upRelativePath = req.body.relativepath ;
    // simple-uploader 内置字段
    const upFileId = req.body.identifier;
    const upTotalChunks = Number(req.body.totalChunks);
    const upChunkIndex = Number(req.body.chunkNumber ? req.body.chunkNumber - 1 : 0);
     // 判断是否为最后一个分片或 0 字节文件
    const isLastChunk = Number.isFinite(upTotalChunks) && (upChunkIndex + 1 === upTotalChunks);
    const isZeroChunk = upTotalChunks === 0;

    if (isLastChunk || isZeroChunk) {
      const result = await mergeFileChunksInternal({ fileName: upFileName, relativePath: upRelativePath, fileId: upFileId, totalChunks: upTotalChunks });
      return res.json(result);
    }

    // 中间分片直接返回成功
    res.json({ success: true, message: '分片上传成功' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
  }
});

 

 
// 前端请求 /api/downloadFile?filename=xxx
app.get('/api/downloadFile', checkAuth, async (req, res) => {
  const { filename } = req.query;
  if (!filename) {
    return res.status(400).json({ success: false, message: '缺少文件名' });
  }
  // 校验 filename 必须以 projectData/ 开头，防止越权
  if (!filename.startsWith('projectData/')) {
    return res.status(400).json({ success: false, message: '非法文件路径' });
  }
  const filePath = path.resolve(filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: '文件不存在' });
  }
  // 获取文件大小
  const stat = fs.statSync(filePath);
  res.setHeader('Accept-Ranges', 'bytes'); // 告知客户端支持范围请求
  res.setHeader('Content-Type', 'application/octet-stream');
  res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(filename))}`);
  
  const range = req.headers.range;
  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });
    res.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${stat.size}`,
      'Content-Length': chunksize,
    });
    file.pipe(res);
  } else {
    res.setHeader('Content-Length', stat.size);
    // 用流方式读取并传输
    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
    // 错误处理
    readStream.on('error', (err) => {
      res.status(500).json({ success: false, message: '文件读取出错' });
    });
  }
});

// 获取指定文件的 switchChangHistory
app.post('/api/getSwitchHistory', checkAuth, async (req, res) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).json({ success: false, message: '缺少文件路径' });
  }
  const filePath = path.join('./', id);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ success: false, message: '文件不存在' });
  }
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');
    if(!content) return res.json({ success: true, switchChangHistory: [] });
    const parsed = JSON.parse(content);
    res.json({ success: true, switchChangHistory: parsed?.switchChangHistory || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: '读取失败' });
  }
});

// ========== UNIFIED PACKAGE API START ==========
// 统一获取目录包API /api/packages?type=icon/svg/png/path2D/canvasDraw
const typeDirMap = {
  icon: 'icon',
  svg: 'svg',
  png: 'png',
  path2D: 'path2D',
  canvasDraw: 'canvasDraw',
};

app.get('/api/packages', (req, res) => {
  const { type } = req.query;
  const dirName = typeDirMap[type];
  if (!dirName) {
    return res.status(400).json({ error: 'type参数无效' });
  }
  const dirPath = path.join(__dirname, '../front/public', dirName);
  try {
    const dirs = fs.readdirSync(dirPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => ({ name: dirent.name }));
    res.json(dirs);
  } catch (e) {
    res.status(500).json({ error: '读取目录失败', detail: e.message });
  }
});
// 静态托管所有资源
Object.values(typeDirMap).forEach(dir => {
  app.use(`/${dir}`, express.static(path.join(__dirname, '../front/public', dir)));
});


 
async function mergeFileChunksInternal({ fileName, relativePath, fileId, totalChunks }) {
  if (!relativePath || !fileId || totalChunks === undefined || totalChunks === null || !fileName) {
    throw new Error('缺少必要参数');
  }
  const chunkDir = path.join(UPLOAD_DIR, fileId);
  const filePath = path.join('./', relativePath);
  const backupFilePath = path.join(path.dirname(filePath), `bak-${path.basename(filePath)}`);
  const mergedFilePath = path.join(chunkDir, fileName);
   try {
    if (Number(totalChunks) > 0) {
      const maxAttempts = 5;
      let attempts = 0;
      let chunkPaths = [];
      while (attempts < maxAttempts) {
        if (fs.existsSync(chunkDir)) {
          // 仅统计纯数字命名的分片文件，忽略已合并文件或其他残留
          chunkPaths = fs.readdirSync(chunkDir).filter(name => /^\d+$/.test(name));
          if (chunkPaths.length >= Number(totalChunks)) {
            break; // 所有分片文件到齐或超出
          }
        }
        attempts++;
        if (attempts >= maxAttempts) {
          await rimraf(chunkDir);
          throw new Error(`分片数量不匹配，应有 ${totalChunks} 个，实际找到 ${chunkPaths.length} 个。请重新上传。`);
        }
        await new Promise((r) => setTimeout(r, 300));
      }
      chunkPaths.sort((a, b) => Number(a) - Number(b));
      const writeStream = fs.createWriteStream(mergedFilePath);
      for (const idx of chunkPaths) {
        const chunkPath = path.join(chunkDir, idx);
        const readStream = fs.createReadStream(chunkPath);
        await new Promise((resolve, reject) => {
          readStream.pipe(writeStream, { end: false });
          readStream.on('end', resolve);
          readStream.on('error', reject);
        });
      }
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
        writeStream.end();
      });
    } else {
      if (!fs.existsSync(chunkDir)) {
        fs.mkdirSync(chunkDir, { recursive: true });
      }
      await fs.promises.writeFile(mergedFilePath, '');
    }

    if (fs.existsSync(filePath)) {
      try {
        await fs.promises.copyFile(filePath, backupFilePath);
        console.log(`Backup created: ${backupFilePath}`);
      } catch (e) {
        console.error('备份失败', e);
      }
    }

    let oldContent = '';
    if (fs.existsSync(backupFilePath)) {
      try {
        oldContent = await fs.promises.readFile(backupFilePath, 'utf8');
      } catch (e) {}
    }

    const newContent = await fs.promises.readFile(mergedFilePath, 'utf8');
    const newFileSize = (await fs.promises.stat(mergedFilePath)).size;
    const finalContent = handleProjectDataHistory(oldContent, newContent);

    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    await fs.promises.writeFile(filePath, finalContent, { encoding: 'utf8' });

    await rimraf(chunkDir);

    return { success: true, message: '文件上传成功', file: { path: relativePath, size: newFileSize, originalname: fileName } };
  } catch (err) {
    try {
      await rimraf(chunkDir);
    } catch (_) {}
    throw err;
  }
}


// ========== UNIFIED PACKAGE API END ==========
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
killPort(3000); // 暂时禁用此功能，因为它可能导致在某些环境下启动失败
app.listen(3000, "0.0.0.0",() => console.log('Server is running on port 3000'));

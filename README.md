# cyjpj 个人网站（合并版）

一个文件夹同时包含两个网站：

1. **个人主页**（根目录）—— 纯 HTML/CSS/JS 静态站，包含作品、摄影、关于我、动态、技能、联系等板块
2. **3D 简历**（`resume3d/`）—— 基于 React Three Fiber 的滚动式 3D 简历（原 sen-3d-resume 项目），主页右上角「3D 简历」按钮可进入

## 目录结构

```
my-site/
├── index.html          个人主页（首页）
├── css/ js/ assets/    主页资源（照片放在 assets/photo-*.svg，替换成自己的即可）
├── resume3d/           3D 简历项目
│   ├── web/            3D 简历源码（React + TypeScript）
│   ├── site/           3D 简历构建产物（网页入口链接到这里，可直接静态部署）
│   ├── blender/        Blender 源文件（人物模型）
│   └── tutor/          改造教程
└── README.md
```

## 本地预览

### 个人主页

直接用浏览器打开根目录的 `index.html`，或在项目根目录起一个静态服务器：

```bash
python -m http.server 8080
# 访问 http://localhost:8080
```

3D 简历入口：http://localhost:8080/resume3d/site/

### 3D 简历（开发模式，改动源码即时生效）

```bash
cd resume3d/web
npm install        # 只需要第一次
npm run dev        # 访问 http://localhost:5173
```

## 修改内容

### 个人主页

直接改 `index.html` 里的文字，样式在 `css/style.css`，图片放在 `assets/`。

### 3D 简历（数据都在 resume3d/web/src 下）

| 想改什么 | 改哪里 |
| --- | --- |
| 首屏自我介绍 | `resume3d/web/src/App.tsx`（`COPY` 常量） |
| 履历时间线（教育/实习/项目/技能/联系方式） | `resume3d/web/src/ui/Resume.tsx` |
| 作品集板块与作品 | `resume3d/web/src/data/works.ts` |
| 作品详情 | `resume3d/web/src/content/works/<slug>.md` |
| 3D 人物模型 | 用 Blender 改 `resume3d/blender/sen.blend`，导出 `resume3d/web/public/models/me.glb` |
| 场景光照/背景色 | `resume3d/web/src/scene/Scene.tsx` 顶部常量 |

改完 3D 简历源码后，需要重新构建，网页上的「3D 简历」入口才会更新：

```bash
cd resume3d/web
npm run build
# 把 web/dist 里的内容复制到 resume3d/site/
```

### 摄影栏目

主页的「摄影」栏目目前是 6 张占位图（`assets/photo-1.svg` 到 `photo-6.svg`）。
把你的照片放进 `assets/`（建议 4:3，如 1600×1200），然后改 `index.html` 摄影区块里的引用与标题即可：

```html
<button class="photo-open" data-full="assets/photo-1.jpg" data-caption="日落时分 · 海边">
  <img src="assets/photo-1.jpg" alt="日落时分" loading="lazy">
  ...
</button>
```

`data-full` 是点击放大时显示的大图，`data-caption` 是灯箱下方的说明文字。
想加照片，复制一个 `photo-card` 区块并改文件名即可。

## 部署上线

整个 `my-site` 文件夹就是一个完整的网站，拖到任意静态托管即可：

- **Netlify / Vercel**：直接把 `my-site` 文件夹拖进网页，自动部署
- **GitHub Pages**：把 `my-site` 内容推到仓库，Settings → Pages 开启
- 也可以绑定自己的域名（如 `cyjpj.com`）

部署后访问路径：

- 首页（个人主页）：`https://你的域名/`
- 3D 简历：`https://你的域名/resume3d/site/`

## 常见问题

**3D 简历页空白？** 确认访问的是 `resume3d/site/`（构建产物），而不是 `resume3d/web/`（源码目录，没有可直接打开的 index.html）。需要联网加载 Google Fonts 和 HDR 环境贴图。

**人物还是作者本人的形象？** 是的，模型（`me.glb`）来自原项目作者，代码是 MIT 开源的，但人物形象属于作者个人内容。正式上线前建议在 Blender 里换成自己的模型，教程在 `resume3d/tutor/`。

**改完 3D 源码页面没变化？** 开发时用 `npm run dev` 看效果；正式发布的 `resume3d/site/` 需要 `npm run build` 后重新复制产物。

/* ============================================================
   图片配置 —— 换图片只改这一个文件

   用法：把你的图片文件放进 assets/ 文件夹，
   然后把下面每个字段的路径改成你的文件名即可。

   建议尺寸：
   - portrait   关于我头像        4:5   （如 800×1000）
   - featured   首屏作品卡封面    16:10 （如 800×500）
   - works      作品封面          4:5   （如 800×1000）
   - photos     摄影缩略图        4:3   （如 1200×900）
   - photos.full 点击放大的大图   越大越清晰

   full/caption 为空时会自动使用缩略图和标题。
   ============================================================ */
window.SITE_IMAGES = {
  // 关于我头像（当前为占位图）
  portrait: "assets/portrait.svg",

  // 首屏「最新作品」卡片封面（当前为占位图）
  featured: "assets/featured.svg",

  // 作品集三张封面（当前为占位图）
  works: [
    { img: "assets/work-1.svg", alt: "OmniForge 多智能体 AI 协作平台" },
    { img: "assets/work-2.svg", alt: "故障诊断智能体（天元智联实习）" },
    { img: "assets/work-3.svg", alt: "RAG 检索链路优化" },
  ],

  // 摄影栏目（当前为占位图）
  photos: [
    { img: "assets/photo-1.svg", full: "", title: "日落时分", loc: "海边 · 占位照片", caption: "日落时分 · 海边" },
    { img: "assets/photo-2.svg", full: "", title: "城市夜色", loc: "街头 · 占位照片", caption: "城市夜色 · 街头" },
    { img: "assets/photo-3.svg", full: "", title: "山间晨雾", loc: "远行 · 占位照片", caption: "山间晨雾 · 远行" },
    { img: "assets/photo-4.svg", full: "", title: "街头光影", loc: "老城 · 占位照片", caption: "街头光影 · 老城" },
    { img: "assets/photo-5.svg", full: "", title: "森林深处", loc: "徒步 · 占位照片", caption: "森林深处 · 徒步" },
    { img: "assets/photo-6.svg", full: "", title: "星空之下", loc: "露营 · 占位照片", caption: "星空之下 · 露营" },
  ],
}

// 作品集数据（双语）。5 大板块 → 点击展开作品详情。
// 纯数据驱动：增删板块 / 作品只改本文件，Works.jsx 仅负责渲染。
//
// 板块字段：
//   id        唯一标识（用于 framer layoutId 共享元素动画）
//   no        编号 '01'…'05'
//   title     板块标题
//   tagline   索引行右侧一句话
//   items[]   扁平作品列表：{ name, meta?, tags?, link? }
//             点击 item 弹出全屏详情，可补充可选媒体/文案字段：
//             { image?, video?, year?, desc? }（缺省时媒体用占位、简介回退 meta/标签）
//   groups[]  分组作品（与 items 二选一）：{ heading, items: string[] }
//   awards[]  奖项 chip（可选）
//   footer    底部技术/备注一行（可选）

export interface WorkListItem {
  name: string
  meta?: string
  tags?: string[]
  link?: string
  slug?: string
}

export interface WorkGroup {
  heading: string
  items: string[]
}

export interface WorkSection {
  id: string
  no: string
  title: string
  tagline: string
  items?: WorkListItem[]
  groups?: WorkGroup[]
  awards?: string[]
  footer?: string
}

export interface WorksLang {
  title: string
  closeLabel: string
  openLabel: string
  hint: string
  awardsLabel: string
  visitLabel: string
  detailPlaceholder: string
  phImageLabel: string
  phButtonLabel: string
  countLabel: (n: number) => string
  sections: WorkSection[]
}

export const WORKS: Record<'zh' | 'en', WorksLang> = {
  zh: {
    title: 'Works',
    closeLabel: '返回',
    openLabel: '展开作品',
    hint: '继续下滑',
    awardsLabel: '获奖',
    visitLabel: '访问作品',
    detailPlaceholder: '你的作品介绍',
    phImageLabel: '图片 / 视频',
    phButtonLabel: '跳转按钮',
    countLabel: (n) => `${n} 件作品`,
    sections: [
      {
        id: 'ad',
        no: '01',
        title: 'AI 项目',
        tagline: 'OmniForge · RAG · Agent',
        items: [
          { name: 'OmniForge 多智能体 AI 协作平台', meta: 'AI 应用开发 · 2026.01–06', tags: ['LangGraph', 'FastAPI', 'RAG'], link: 'https://github.com/syp0988-dotcom' },
          { name: '故障诊断智能体（天元智联实习）', meta: 'AI Agent · 2025.07–09', tags: ['Multi-Agent', 'LangGraph', 'Ragas'] },
          { name: 'RAG 检索链路优化', meta: '解析 · 混合检索 · Rerank', tags: ['Qdrant', 'Embedding', '评估体系'] },
        ],
        awards: ['响应提速 90%', '准确率 92%', '端到端 95.4%'],
      },
      {
        id: 'maker',
        no: '02',
        title: '开源',
        tagline: 'GitHub · syp0988-dotcom',
        items: [
          { name: 'GitHub 主页', meta: '开源与技术分享', link: 'https://github.com/syp0988-dotcom' },
          { name: 'OmniForge 源码', meta: '多智能体 AI 协作平台', link: 'https://github.com/syp0988-dotcom' },
        ],
        footer: '热爱开源 · 持续跟进 Agent 论文与框架演进',
      },
      {
        id: 'product',
        no: '03',
        title: '实习经历',
        tagline: '河南天元智联科技有限公司',
        items: [
          { name: '故障诊断智能体', meta: 'AI Agent 开发实习生 · 2025.07–09', tags: ['运维告警', '根因定位'] },
          { name: 'Ragas 检索评估与调优', meta: '离线评测 · 持续迭代', tags: ['Recall@K', 'MRR', 'NDCG'] },
        ],
      },
      {
        id: 'graphics',
        no: '04',
        title: '专业技能',
        tagline: 'RAG · Agent · 工程化',
        items: [
          { name: 'RAG 全链路设计与优化', meta: '解析 · Chunk · Embedding · 混合检索 · Rerank' },
          { name: 'Agent 系统架构', meta: 'ReAct · Plan-and-Execute · Workflow · Multi-Agent' },
          { name: 'LangGraph 开发', meta: 'Function Calling · Structured Output · Workflow 编排' },
          { name: 'AI 服务工程化', meta: '异步 · 高并发 · 缓存 · 模型路由 · 降级 · Token 成本控制' },
        ],
        footer: 'AI Coding Agent（Claude Code / Codex）· Prompt Engineering · 监控告警',
      },
    ],
  },
  en: {
    title: 'Works',
    closeLabel: 'Back',
    openLabel: 'Explore',
    hint: 'Keep scrolling',
    awardsLabel: 'Awards',
    visitLabel: 'Visit site',
    detailPlaceholder: 'Your work description',
    phImageLabel: 'Image / Video',
    phButtonLabel: 'Link button',
    countLabel: (n) => `${n} works`,
    sections: [
      {
        id: 'ad',
        no: '01',
        title: 'AI Projects',
        tagline: 'OmniForge · RAG · Agent',
        items: [
          { name: 'OmniForge — Multi-Agent AI Platform', meta: 'AI Development · 2026.01–06', tags: ['LangGraph', 'FastAPI', 'RAG'], link: 'https://github.com/syp0988-dotcom' },
          { name: 'Fault-Diagnosis Agent (Internship)', meta: 'AI Agent · 2025.07–09', tags: ['Multi-Agent', 'LangGraph', 'Ragas'] },
          { name: 'RAG Pipeline Optimization', meta: 'Parsing · Hybrid Search · Rerank', tags: ['Qdrant', 'Embedding', 'Eval'] },
        ],
        awards: ['−90% response time', '92% accuracy', '95.4% E2E'],
      },
      {
        id: 'maker',
        no: '02',
        title: 'Open Source',
        tagline: 'GitHub · syp0988-dotcom',
        items: [
          { name: 'GitHub Profile', meta: 'Open source & tech sharing', link: 'https://github.com/syp0988-dotcom' },
          { name: 'OmniForge Source', meta: 'Multi-agent AI collaboration platform', link: 'https://github.com/syp0988-dotcom' },
        ],
        footer: 'Open-source enthusiast · tracking the latest Agent papers & frameworks',
      },
      {
        id: 'product',
        no: '03',
        title: 'Internship',
        tagline: 'Henan Tianyuan Zhilian Technology',
        items: [
          { name: 'Fault-Diagnosis Agent', meta: 'AI Agent Intern · 2025.07–09', tags: ['Ops Alerts', 'Root Cause'] },
          { name: 'Ragas Evaluation & Retrieval Tuning', meta: 'Offline eval · iterative', tags: ['Recall@K', 'MRR', 'NDCG'] },
        ],
      },
      {
        id: 'graphics',
        no: '04',
        title: 'Skills',
        tagline: 'RAG · Agent · Engineering',
        items: [
          { name: 'RAG Full Pipeline', meta: 'Parsing · Chunking · Embedding · Hybrid Search · Rerank' },
          { name: 'Agent Architecture', meta: 'ReAct · Plan-and-Execute · Workflow · Multi-Agent' },
          { name: 'LangGraph Development', meta: 'Function Calling · Structured Output · Workflow Orchestration' },
          { name: 'AI Service Engineering', meta: 'Async · High Concurrency · Caching · Routing · Fallback · Cost Control' },
        ],
        footer: 'AI Coding Agents (Claude Code / Codex) · Prompt Engineering · Monitoring',
      },
    ],
  },
}

// 板块配图（横向画廊每张卡片左侧的整高封面）。放到 public/works/covers/ 下。
// 缺图时左栏用大编号渐变占位，放入图片后自动点亮。
export const SECTION_COVERS: Record<string, string> = {
  ad: `${import.meta.env.BASE_URL}works/covers/ad.jpg`,
  maker: `${import.meta.env.BASE_URL}works/covers/maker.jpg`,
  product: `${import.meta.env.BASE_URL}works/covers/product.jpg`,
  graphics: `${import.meta.env.BASE_URL}works/covers/graphics.jpg`,
}

// 统计一个板块的作品数（items 或 groups 求和），用于索引行 hover 显示
export function sectionCount(section: WorkSection): number {
  if (section.items) return section.items.length
  if (section.groups) return section.groups.reduce((n, g) => n + g.items.length, 0)
  return 0
}

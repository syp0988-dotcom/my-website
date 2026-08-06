import { motion } from 'framer-motion'
import { ZooopLogo } from './ZooopLogo'
import { SOCIAL_ICONS } from './SocialIcons'
import { FOCUS_POINTS } from '../data/focusPoints'

const SOCIAL_LINKS = [
  {
    id: 'email',
    label: '邮箱',
    href: 'mailto:syp0988@gmail.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/syp0988-dotcom',
  },
]

// 履历数据（双语）。英文为译稿，可按需润色。
interface ResumeGroup {
  heading?: string
  logo?: string
  logoImg?: string
  sub?: string
  link?: string
  items?: string[]
  links?: { id: string; label: string; href: string }[]
}
interface ResumeEntry {
  period: string
  place: string
  role?: string
  logo?: { src: string; alt: string }
  points?: string[]
  groups?: ResumeGroup[]
}
const RESUME: Record<'en' | 'zh', { title: string; entries: ResumeEntry[] }> = {
  en: {
    title: 'Résumé',
    entries: [
      {
        period: '2023 – 2027',
        place: 'Nanyang Institute of Technology',
        role: 'B.S. in Computer & Software Engineering',
        points: [
          'Expected graduation: June 2027',
          'Focus: AI systems · RAG · Agent development',
        ],
      },
      {
        period: '2025.07 – 2025.09',
        place: 'Henan Tianyuan Zhilian Technology',
        role: 'AI Agent Development Intern',
        points: [
          'Built a Multi-Agent fault-diagnosis system: alert analysis → log retrieval → root cause, fully automated',
          'LangGraph DAG with diagnose–verify–feedback loop: avg diagnosis time 12 min → 45 s (−90%)',
          'Ragas-based retrieval tuning: root-cause accuracy 65% → 92%',
          'Integrated into the company’s core ops product',
        ],
      },
      {
        period: '2026.01 – 2026.06',
        place: 'OmniForge',
        role: 'AI Application Developer (Personal Project)',
        points: [
          'LangGraph multi-agent platform: code generation, RAG Q&A, tool calls, SSE streaming',
          '7-node agent workflow · 10 agents · 10 plugin tools · 34 APIs · 269 tests passed',
          'Full RAG pipeline with 6 structure-aware chunk strategies; Recall@10 = 82.2%',
          '4 offline evaluation suites · 365 samples · E2E completion 95.4%',
        ],
      },
      {
        period: '2023 – Now',
        place: 'Core Skills',
        points: [
          'RAG full pipeline: parsing, chunking, embedding, hybrid search, rerank, evaluation',
          'Agent architectures: ReAct · Plan-and-Execute · Workflow · Multi-Agent',
          'LangGraph · Prompt Engineering · Function Calling · Structured Output',
          'AI service engineering: async, caching, model routing, fallback, token cost control',
        ],
      },
      {
        period: 'Open Source',
        place: 'GitHub & Contact',
        groups: [
          {
            heading: 'Let’s connect',
            items: ['GitHub: github.com/syp0988-dotcom', 'Email: syp0988@gmail.com'],
            links: SOCIAL_LINKS,
          },
        ],
      },
    ],
  },
  zh: {
    title: 'Résumé',
    entries: [
      {
        period: '2023.09 – 2027.06',
        place: '南阳理工学院 · 计算机与软件学院',
        role: '本科',
        points: [
          '预计 2027 年 6 月毕业',
          '方向：AI 系统 · RAG · Agent 开发',
        ],
      },
      {
        period: '2025.07 – 2025.09',
        place: '河南天元智联科技有限公司',
        role: 'AI Agent 开发实习生',
        points: [
          '开发 Multi-Agent 故障诊断系统：告警分析 → 日志抓取 → 根因定位全自动闭环',
          'LangGraph DAG「诊断-验证-反馈」机制：平均诊断耗时 12 分钟 → 45 秒（提速 90%）',
          'Ragas 评估框架持续调优检索链路：根因识别准确率 65% → 92%',
          '系统已集成至公司核心运维产品',
        ],
      },
      {
        period: '2026.01 – 2026.06',
        place: 'OmniForge',
        role: 'AI 应用开发工程师（个人项目）',
        points: [
          '基于 LangGraph 的多智能体平台：代码生成、RAG 知识库问答、工具调用、SSE 流式交互',
          '7 节点 Agent 工作流 · 10 个 Agent · 10 个插件化工具 · 34 个 API · 269 个自动化测试',
          '完整 RAG 链路 + 6 类结构感知 Chunk 策略，Recall@10 达 82.2%',
          '四套离线评测体系 · 365 条样本 · 端到端任务完成率 95.4%',
        ],
      },
      {
        period: '2023 – 至今',
        place: '专业技能',
        points: [
          'RAG 全链路：文档解析、Chunk、Embedding、混合检索、Rerank、效果评估',
          'Agent 架构：ReAct · Plan-and-Execute · Workflow · Multi-Agent',
          'LangGraph · Prompt Engineering · Function Calling · Structured Output',
          'AI 服务工程化：异步、高并发、缓存、模型路由、降级、Token 成本控制',
        ],
      },
      {
        period: '开源',
        place: 'GitHub & 联系',
        groups: [
          {
            heading: '保持联系',
            items: ['GitHub：github.com/syp0988-dotcom', '邮箱：syp0988@gmail.com'],
            links: SOCIAL_LINKS,
          },
        ],
      },
    ],
  },
}

// 履历条目依次对应 glb 里的聚焦锚点（相机停靠点），顺序须与 entries 一致。
// 名单是唯一真源，见 data/focusPoints.ts（Scene.tsx 也从那里取）。
const POINT_ORDER = FOCUS_POINTS

const EASE = [0.22, 1, 0.36, 1]
const containerV = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.04 } },
}
const itemV = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: EASE } },
}

function Group({ group }: { group: ResumeGroup }) {
  const heading =
    group.logo === 'zooop' ? (
      <a
        className="zooop-logo-link"
        href={group.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ZOOOP"
      >
        <ZooopLogo className="zooop-logo" animated />
      </a>
    ) : group.link ? (
      <a className="about-link" href={group.link} target="_blank" rel="noopener noreferrer">
        {group.heading}
      </a>
    ) : (
      <span>{group.heading}</span>
    )

  return (
    <motion.div className="tl-group" variants={itemV}>
      <div className="tl-group-head">
        {group.logoImg && (
          <span className="tl-group-logo">
            <img src={group.logoImg} alt={group.heading || ''} loading="lazy" />
          </span>
        )}
        {heading}
        {group.sub && <span className="tl-group-sub">{group.sub}</span>}
      </div>
      {group.items && (
        <ul className="tl-points">
          {group.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      )}
      {group.links && (
        <div className="tl-logos">
          {group.links.map((l) => {
            const Icon = SOCIAL_ICONS[l.id as keyof typeof SOCIAL_ICONS]
            return (
              <a
                key={l.id}
                className="tl-logo"
                href={l.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={l.label}
                title={l.label}
              >
                <Icon />
              </a>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}

function Entry({ entry, index }: { entry: ResumeEntry; index: number }) {
  return (
    <motion.div
      className="tl-entry"
      data-point={POINT_ORDER[index]}
      variants={containerV}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
    >
      <motion.span className="tl-dot" variants={itemV} aria-hidden="true" />
      {/* tl-body 包住文字内容（点保持在外做时间轴标记）：移动端可给它加卡片衬底，
          且它紧贴内容高度，不含 tl-entry 用于排布的大 padding。
          用普通 div（非 motion）：framer 变体经 React context 穿透它，叶子元素仍是
          tl-entry 的直接 stagger 子级，入场动画与包裹前完全一致。 */}
      <div className="tl-body">
        <motion.div className="tl-period" variants={itemV}>
          {entry.period}
        </motion.div>
        <motion.div className="tl-head" variants={itemV}>
          {entry.logo && (
            <span className="tl-logo-chip">
              <img src={entry.logo.src} alt={entry.logo.alt} loading="lazy" />
            </span>
          )}
          <h3 className="tl-place">{entry.place}</h3>
        </motion.div>
        {entry.role && (
          <motion.div className="tl-role" variants={itemV}>
            {entry.role}
          </motion.div>
        )}
        {entry.points && (
          <motion.ul className="tl-points" variants={itemV}>
            {entry.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </motion.ul>
        )}
        {entry.groups && entry.groups.map((g, i) => <Group key={i} group={g} />)}
      </div>
    </motion.div>
  )
}

export default function Resume({ lang }: { lang: 'en' | 'zh' }) {
  const data = RESUME[lang]
  return (
    <section className="resume" lang={lang}>
      <motion.h2
        className="resume-title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-10% 0px' }}
        transition={{ duration: 0.7, ease: EASE }}
      >
        {data.title}
      </motion.h2>
      <div className="timeline">
        {data.entries.map((e, i) => (
          <Entry key={i} entry={e} index={i} />
        ))}
      </div>
    </section>
  )
}

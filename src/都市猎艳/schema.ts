// ═══════════════════════ MVU 变量结构 — 都市猎艳 ═══════════════════════
// 依据：创作规划.yaml mvu 段（世界 / 主角 / 九位美娇娘）
// 运行时全局注入 z（Zod 4）与 _（lodash），禁止 import
//
// 路径约定（与 EJS getvar 的 stat_data 点路径一致）：
//   世界.当前时间 / 世界.当前区域 / 世界.近期事件
//   主角.底牌等级 / 主角.威望值 / 主角.资产
//   {角色名}.好感度 / {角色名}.关系阶段 / {角色名}.当前穿着
//   {角色名}.心理活动 / {角色名}.身体特征.{胸部|腰臀|腿足|肌肤}

// ── 九位美娇娘通用结构（千金辈 5 位与主母辈 4 位完全一致） ──
const 美娇娘结构 = z.object({
  好感度: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
  关系阶段: z.enum(['初识', '熟悉', '暧昧', '沦陷']).prefault('初识'),
  当前穿着: z.string().prefault('待初始化'),
  心理活动: z.string().prefault('待初始化'),
  身体特征: z.object({
    胸部: z.string().prefault('待初始化'),
    腰臀: z.string().prefault('待初始化'),
    腿足: z.string().prefault('待初始化'),
    肌肤: z.string().prefault('待初始化'),
  }).prefault({}),
}).prefault({});

export const Schema = z.object({
  // ── 世界 ──
  世界: z.object({
    // 格式 YYYY/MM/DD HH:MM
    当前时间: z.templateLiteral([z.number(), '/', z.number(), '/', z.number(), ' ', z.number(), ':', z.number()]).prefault('2026/06/01 14:00'),
    当前区域: z.string().prefault('待初始化'),
    // 最多保留 5 条，旧事件滚动移除
    近期事件: z.array(z.string()).transform(events => _.takeRight(events, 5)).prefault([]),
  }).prefault({}),
  // ── 主角 ──
  主角: z.object({
    底牌等级: z.enum(['深藏不露', '初露锋芒', '锋芒毕露', '惊世骇俗']).prefault('深藏不露'),
    威望值: z.coerce.number().transform(value => _.clamp(value, 0, 100)).prefault(0),
    // 身家（万元）
    资产: z.coerce.number().prefault(0),
  }).prefault({}),
  // ── 千金辈 ──
  沈冰岚: 美娇娘结构,
  沈玉瑶: 美娇娘结构,
  顾晚晴: 美娇娘结构,
  萧听雨: 美娇娘结构,
  唐傲雪: 美娇娘结构,
  // ── 主母辈 ──
  苏晚吟: 美娇娘结构,
  叶清桐: 美娇娘结构,
  阮青蘅: 美娇娘结构,
  秦望舒: 美娇娘结构,
});

export type Schema = z.output<typeof Schema>;

/**
 * Anime.js - ESM
 * @version v1.0.0-龙械
 * @license MIT
 * @copyright 2026 - Julian Garnier
 */

import { animate } from './animation/animation.js';
export { JSAnimation } from './animation/animation.js';
import { createTimeline } from './timeline/timeline.js';
export { Timeline } from './timeline/timeline.js';
import { stagger } from './utils/stagger.js';

/**
 * 龙械库 · LongRhythm Engine
 * 
 * 长九（造浪者/首席营销官）专属运动武器库
 * 龙言逻辑体系的下层执行引擎
 * 
 * 调用方式：
 *   import { 起, 落, 散, 谱, 签, 节 } from './龙械.js'
 *   起('.标题', { 签名: '寒', 节奏: '涟漪' })
 * 
 * 核心引擎：基于逐帧渲染循环的轻量运动引擎
 * 授权：MIT
 */


/* ================================================================
   签名预设 · 设计意图 → 执行参数
   选择签名 = 选择这个运动的情绪底色
   ================================================================ */

const 签 = {
  /** 冷峻精确：克制、机械感、像素级精准 */
  寒: { ease: 'inOutQuint', duration: 800 },
  /** 锋锐急骤：快速、果断、有侵略性 */
  锋: { ease: 'inExpo', duration: 500 },
  /** 弹性有力：活力足、有回弹感 */
  弹: { ease: 'outBack', duration: 600 },
  /** 柔软温和：有机、自然、亲和 */
  绵: { ease: 'spring(1, 80, 8, 0)', duration: 1000 },
  /** 震撼戏剧：大幅夸张、仪式感 */
  震: { ease: 'outElastic(1, .5)', duration: 1200 },
};

/* ================================================================
   节奏预设 · 设计意图 → 编组模式
   选择节奏 = 选择多元素出场的编排方式
   ================================================================ */

const 节 = {
  /** 涟漪：中心向外逐层散开 */
  涟漪: { from: 'center' },
  /** 阵列：线性依次登场 */
  阵列: { from: 'first' },
  /** 奔涌：波浪式递进（结合 easing 产生浪潮感） */
  奔涌: { from: 'first', ease: 'outCubic' },
  /** 回响：从边缘向内反射 */
  回响: { from: 'last' },
  /** 随机：无规则错落 */
  随机: { from: 'random' },
};

/* ================================================================
   内部工具函数
   ================================================================ */

/** 将签名名称映射为 anime.js 参数对象 */
function 取签名(签值) {
  if (!签值) return {}
  if (typeof 签值 === 'string' && 签[签值]) return { ...签[签值] }
  if (typeof 签值 === 'object') return 签值
  return {}
}

/** 将节奏名称映射为 stagger 延迟函数 */
function 取节奏(节值, 间隔 = 100) {
  if (!节值) return stagger(间隔, { from: 'first' })
  if (typeof 节值 === 'number') return stagger(节值, { from: 'first' })
  if (typeof 节值 === 'string' && 节[节值]) return stagger(间隔, 节[节值])
  if (typeof 节值 === 'object') return stagger(间隔, 节值)
  return stagger(间隔, { from: 'first' })
}

/** 将参数中的龙言关键词翻译成 anime.js 参数 */
function 翻译(选项 = {}) {
  const {
    签名: 签值,
    节奏: 节值,
    距离: 距值,
    时长: 时值,
    延迟: 延值,
    循环: 循值,
    交替: 交值,
    透明度: 透值,
    缩放: 缩值,
    ...剩余
  } = 选项;

  const 签名参数 = 取签名(签值);
  const 结果 = { ...签名参数, ...剩余 };

  // 时长优先用签名预设，但显式传入则覆盖
  if (时值 !== undefined) 结果.duration = 时值;

  // 延迟处理——节奏优先，但显式延迟值覆盖
  if (节值 !== undefined) {
    结果.delay = 取节奏(节值, 选项.间隔 || 100);
  } else if (延值 !== undefined) {
    结果.delay = 延值;
  }

  // 循环
  if (循值 !== undefined) 结果.loop = 循值;
  if (交值 !== undefined) 结果.alternate = 交值;

  return 结果
}

/* ================================================================
   动词函数 · 运动行为
   每个函数都可以接受龙言参数，也接受原生 anime.js 参数
   ================================================================ */

/**
 * 起 · 入场
 * 元素从无到有进入视野
 * @param {string|Element|NodeList} 目标
 * @param {object} 选项
 */
function 起(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  const 距离 = 选项.距离 || 30;
  // 如果没有显式写透明度或变换，则使用默认入场效果
  if (参.opacity === undefined && 参.scale === undefined) {
    参.opacity = [0, 1];
  }
  // 如果没有显式写位移，则使用默认距离
  if (参.translateY === undefined && 参.translateX === undefined && 参.scale === undefined) {
    参.translateY = [距离, 0];
  }
  return animate(目标, 参)
}

/**
 * 落 · 退场
 * 元素从有到无离开视野
 */
function 落(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  const 距离 = 选项.距离 || 30;
  if (参.opacity === undefined) 参.opacity = [1, 0];
  if (参.translateY === undefined && 参.translateX === undefined) {
    参.translateY = [0, 距离];
  }
  return animate(目标, 参)
}

/**
 * 散 · 扩散
 * 从中心向四周散开
 */
function 散(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  选项.距离 || 80;
  if (参.opacity === undefined) 参.opacity = [0, 1];
  if (参.scale === undefined) 参.scale = [0.5, 1];
  return animate(目标, 参)
}

/**
 * 聚 · 汇聚
 * 从四周向中心聚集
 */
function 聚(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  选项.距离 || 80;
  if (参.opacity === undefined) 参.opacity = [0, 1];
  if (参.scale === undefined) 参.scale = [0, 1];
  return animate(目标, 参)
}

/**
 * 掠 · 擦过
 * 方向性擦除式登场
 */
function 掠(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  const 方向 = 选项.方向 || 'left';
  if (参.opacity === undefined) 参.opacity = [0, 1];
  // 支持 clip-path 擦除效果
  if (方向 === 'left') {
    参.clipPath = ['inset(0 100% 0 0)', 'inset(0 0 0 0)'];
  } else if (方向 === 'right') {
    参.clipPath = ['inset(0 0 0 100%)', 'inset(0 0 0 0)'];
  } else if (方向 === 'top') {
    参.clipPath = ['inset(0 0 100% 0)', 'inset(0 0 0 0)'];
  } else if (方向 === 'bottom') {
    参.clipPath = ['inset(100% 0 0 0)', 'inset(0 0 0 0)'];
  }
  return animate(目标, 参)
}

/**
 * 震 · 脉动
 * 节奏性呼吸或闪烁，用于状态指示
 */
function 震(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  if (参.scale === undefined) 参.scale = [1, 1.08, 1];
  if (参.loop === undefined) 参.loop = true;
  if (参.alternate === undefined) 参.alternate = true;
  if (参.ease === undefined) 参.ease = 'inOutCubic';
  return animate(目标, 参)
}

/**
 * 涌 · 涌入
 * 序列元素依次涌入，默认涟漪节奏
 */
function 涌(目标, 选项 = {}) {
  const 参 = 翻译({ 节奏: '涟漪', ...选项 });
  if (参.opacity === undefined) 参.opacity = [0, 1];
  if (参.translateY === undefined) 参.translateY = [20, 0];
  return animate(目标, 参)
}

/**
 * 叠 · 堆叠
 * 元素逐层覆盖堆叠入场
 */
function 叠(目标, 选项 = {}) {
  const 参 = 翻译(选项);
  if (参.opacity === undefined) 参.opacity = [0, 1];
  if (参.translateY === undefined) 参.translateY = [40, 0];
  // 堆叠感需要更大的间隔
  if (参.delay === undefined && !选项.节奏) {
    参.delay = stagger(150, { from: 'first' });
  }
  return animate(目标, 参)
}

/**
 * 融 · 溶解
 * 整体过渡变换形态，用于状态切换
 */
function 融(目标, 选项 = {}) {
  const 参 = 翻译({ 签名: '绵', ...选项 });
  if (参.opacity === undefined) 参.opacity = [0, 1];
  return animate(目标, 参)
}

/**
 * 射 · 弹射
 * 从视野外弹入目标位
 */
function 射(目标, 选项 = {}) {
  const 参 = 翻译({ 签名: '弹', ...选项 });
  const 方向 = 选项.方向 || 'bottom';
  const 距离 = 选项.距离 || 120;
  if (参.opacity === undefined) 参.opacity = [0, 1];
  if (方向 === 'bottom') 参.translateY = [距离, 0];
  else if (方向 === 'top') 参.translateY = [-距离, 0];
  else if (方向 === 'left') 参.translateX = [-距离, 0];
  else if (方向 === 'right') 参.translateX = [距离, 0];
  return animate(目标, 参)
}

/* ================================================================
   叙事时间线 · Timeline
   龙言称"谱"——按时间轴编排多幕运动
   ================================================================ */

/**
 * 谱 · 时间线
 * 编排多元素出场的时间轴叙事
 * 
 * 用法：
 *   谱()
 *     .起('.标题', { 签名: '寒' })
 *     .涌('.卡片', { 签名: '弹' })
 *     .射('.按钮', { 签名: '锋' })
 */
function 谱(选项 = {}) {
  return createTimeline(选项)
}

/* ================================================================
   直通底层 · 完全自定义时使用
   绕过龙言翻译层，直接用 anime.js 原生参数
   ================================================================ */

/**
 * 械 · 直通
 * 需要完全自定义动画参数时使用底层 animate
 * 所有参数为 anime.js 原生格式
 */
function 械(目标, 选项 = {}) {
  return animate(目标, 选项)
}

/* ================================================================
   版本信息
   ================================================================ */

const 版本 = '1.0.0-龙械';
const 引擎 = '逐帧渲染循环 · 龙械库';

export { animate, createTimeline, stagger, 叠, 射, 引擎, 掠, 散, 械, 涌, 版本, 签, 聚, 节, 落, 融, 谱, 起, 震 };

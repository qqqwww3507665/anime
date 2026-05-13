/**
 * 起 · 入场
 * 元素从无到有进入视野
 * @param {string|Element|NodeList} 目标
 * @param {object} 选项
 */
export function 起(目标: string | Element | NodeList, 选项?: object): JSAnimation;
/**
 * 落 · 退场
 * 元素从有到无离开视野
 */
export function 落(目标: any, 选项?: {}): JSAnimation;
/**
 * 散 · 扩散
 * 从中心向四周散开
 */
export function 散(目标: any, 选项?: {}): JSAnimation;
/**
 * 聚 · 汇聚
 * 从四周向中心聚集
 */
export function 聚(目标: any, 选项?: {}): JSAnimation;
/**
 * 掠 · 擦过
 * 方向性擦除式登场
 */
export function 掠(目标: any, 选项?: {}): JSAnimation;
/**
 * 震 · 脉动
 * 节奏性呼吸或闪烁，用于状态指示
 */
export function 震(目标: any, 选项?: {}): JSAnimation;
/**
 * 涌 · 涌入
 * 序列元素依次涌入，默认涟漪节奏
 */
export function 涌(目标: any, 选项?: {}): JSAnimation;
/**
 * 叠 · 堆叠
 * 元素逐层覆盖堆叠入场
 */
export function 叠(目标: any, 选项?: {}): JSAnimation;
/**
 * 融 · 溶解
 * 整体过渡变换形态，用于状态切换
 */
export function 融(目标: any, 选项?: {}): JSAnimation;
/**
 * 射 · 弹射
 * 从视野外弹入目标位
 */
export function 射(目标: any, 选项?: {}): JSAnimation;
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
export function 谱(选项?: {}): Timeline;
/**
 * 械 · 直通
 * 需要完全自定义动画参数时使用底层 animate
 * 所有参数为 anime.js 原生格式
 */
export function 械(目标: any, 选项?: {}): JSAnimation;
export namespace 签 {
    namespace 寒 {
        let ease: string;
        let duration: number;
    }
    namespace 锋 {
        let ease_1: string;
        export { ease_1 as ease };
        let duration_1: number;
        export { duration_1 as duration };
    }
    namespace 弹 {
        let ease_2: string;
        export { ease_2 as ease };
        let duration_2: number;
        export { duration_2 as duration };
    }
    namespace 绵 {
        let ease_3: string;
        export { ease_3 as ease };
        let duration_3: number;
        export { duration_3 as duration };
    }
    namespace 震 {
        let ease_4: string;
        export { ease_4 as ease };
        let duration_4: number;
        export { duration_4 as duration };
    }
}
export namespace 节 {
    namespace 涟漪 {
        let from: string;
    }
    namespace 阵列 {
        let from_1: string;
        export { from_1 as from };
    }
    namespace 奔涌 {
        let from_2: string;
        export { from_2 as from };
        let ease_5: string;
        export { ease_5 as ease };
    }
    namespace 回响 {
        let from_3: string;
        export { from_3 as from };
    }
    namespace 随机 {
        let from_4: string;
        export { from_4 as from };
    }
}
export const 版本: "1.0.0-\u9F99\u68B0";
export const 引擎: "\u9010\u5E27\u6E32\u67D3\u5FAA\u73AF \u00B7 \u9F99\u68B0\u5E93";
import { JSAnimation } from './animation/index.js';
import { Timeline } from './timeline/index.js';
import { animate } from './animation/index.js';
import { stagger } from './utils/stagger.js';
import { createTimeline } from './timeline/index.js';
export { animate, stagger, createTimeline, JSAnimation, Timeline };

# BRAIN LAB - Development & Thought Log

## 核心思考原则

- **主动探索**：遇到工具链或环境困难不直接放弃，主动通过 Web 搜索、GitHub 寻找开源替代方案或者 Bypass 手段。
- **实时记录**：保持在这个日志文件中记录每一次遇到的坑、技术抉择以及破局的思路，作为整个项目的成长轴。

---

## [2026-02-26] Phase 3: 寻找 "Product Showcase" 替代方案

**背景**：在尝试生成产品宣发头图（Mockup）时，Gemini 内置的 `generate_image` 因云端配额限制 (503 Service Unavailable) 无法发图。
**原始阻碍**：系统内缺乏如 Figma / Stitch 这样的外挂设计工具集成。
**破局思路**：

1. **纯前端/开源实现**：在 GitHub 上搜寻能够通过代码直接渲染出设备边框（Device Mockups）的 React 组件，或者找能够导入截图直接生成好看背景卡片的开源工具源码库（例如 Pika.style 或类似工具的代码级实现）。
2. **纯代码的 3D/高级渲染**：也许可以直接用 `framer-motion` 配合带有透视变换 (`transform: perspective(...) rotateX(...)`) 的纯 CSS 手段，在应用内写一个隐藏的路由 `/showcase`，让跑起来的 App 本身就长得像一张 3D 渲染图。

**行动**：我将立刻上网搜索 "open source screenshot to aesthetic mockup generator github" 或者是类似 "react device mockup component" 的项目。

---

## [2026-02-26] Phase 3: 展厅模式替代方案思考

基于刚才的 GitHub 检索，我发现与其依赖外部的不稳定 API 或繁重的开源生图项目（如 mockify / screenshot.rocks），完全可以在我们的 `App.tsx` 里内置一个“展厅 (Showcase)”模式。

**设计方案**：

1. 构建一个 `<ProductShowcase />` 组件（或内嵌在 `App.tsx` 的一个彩蛋路由）。
2. 内部用一个固定高宽比（如 16:9）的容器，配上深空发光渐变底图。
3. 将真正的 App 视图以 `transform: scale(0.8)` 放入其中，带有一个类似 macOS 浏览器窗口的边框（红黄绿小圆点），辅以最高级的高斯模糊阴影 (`drop-shadow`)。
4. 顶部加上 Dribbble 风格的大号 Typography 标题：“BRAIN LAB - Cognitive Training”。

这避免了任何第三方图像生成 API，而且所有渲染100%基于真实的最新代码组件，方便随时截图作为宣发图！

**进展 (17:55)**：用户已批准通过自研的高级渲染页（代码实现）来替代生图。马上开始拆分主页组件，编写包含炫酷 3D 转换特效与深度打光的 `Showcase.tsx`。

---

## [2026-02-26] Phase 3: 重构底层视觉 - 从深空紫到明亮极简 (Brand & Theme Skills)

**背景**：在渲染完 Bento Grid 和 Showcase 之后，用户反馈应用“一片黑”且反感先前的“蓝紫配色”，要求我运用相关的前端设计 Skills。
**解决方案**：

1. **运用本地经验库**：通过文件扫描，我定位到了系统内的 `~/.claude/skills/brand-guidelines` (Anthropic 官方设计库) 与 `theme-factory` 等专业级设计指令集。
2. **彻底颠覆色盘**：废弃了原有的星空渐变、黑紫色背景 (`#050510`, `#13152a`) 和所有的粗糙弥散伪类发光！全面接轨专业极简风。
3. **落实为 Light Theme (浅色极简主义)**：
   - 基础底色：高级书页白 `faf9f5` 与纯白 `ffffff`。
   - 文本层次：主黑 `#141413`，副灰 `#5c5c5c`。
   - 点缀与状态：完全采用原研级的橙色 (`#d97757`)、清湛蓝 (`#6a9bcc`)、森意绿 (`#788c5d`)。
   - 深造内联与外联阴影结构取代发光层，让卡片质感如同现实中的精密印刷品。
4. **字体层级重构**：贯彻专业规范手册中的 `Poppins` 标题字体与 `Lora` / `Inter` 长文字体。
   **结果**：现在应用处于最明亮的高端产品状态！

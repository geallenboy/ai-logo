# 🎨 AI Logo - 开源 AI 生成 Logo

**AI Logo** 是一个开源 AI 生成 Logo 项目，结合 AI 的强大设计能力，自动生成高质量、独特且符合品牌风格的 Logo。无论你是创业者、设计师还是开发者，AI Logo 都能帮助你 **快速创建专业品牌 Logo**，支持 **多种风格定制、矢量输出、自定义颜色与字体**，让你的品牌从众多竞争者中脱颖而出！

✨ **为开发者、企业、自由职业者提供一键 Logo 生成的 AI 解决方案！**

---

## 🚀 主要功能

### 🎨 **AI 智能 Logo 生成**

- **文本生成 Logo**（Text-to-Logo）：输入品牌名称 & 关键词，AI 生成独特 Logo。
- **Logo 风格选择**：支持现代、极简、复古、科技、手绘等多种风格。
- **AI 调整 Logo 设计**：智能分析品牌名称和行业，为你提供最佳 Logo 方案。

### 🔧 **自定义 Logo 设计**

- **颜色 & 形状调整**：选择你喜欢的配色方案，支持渐变色、扁平化等设计风格。
- **字体 & 排版**：支持多种字体风格，并可自定义字体大小、间距等。
- **图标 & 矢量支持**：生成 SVG、PNG 格式，适用于各种设计需求。

### 👤 **用户管理**

- **账号系统**：使用 Supabase 提供安全的 **用户登录 & 注册**。
- **Logo 收藏 & 历史记录**：保存并管理已生成的 Logo，随时调整修改。

### 💰 **支付与订阅**

- **积分兑换**：使用 **积分系统** 生成 Logo，提高项目变现能力。
- **订阅计划**：集成 **Stripe**，支持 **高级 Logo 方案**，满足不同用户需求。

### 🌍 **全球化 UI 体验**

- **多语言支持**：支持 **中文、英文**，适用于全球市场。
- **光暗模式切换**：可自由选择 **深色 / 浅色 UI 主题**，适配不同用户喜好。
- **响应式设计**：适用于 **桌面端、移动端 & 平板设备**，无缝体验！

---

## 🛠️ 技术栈

### 🚀 **前端技术**

- **Next.js**：支持 **SSR & SSG**，提高 SEO 与加载性能。
- **Tailwind CSS**：打造现代 UI 设计，提升用户交互体验。
- **Zustand**：轻量级状态管理，提高 Logo 生成交互效率。

### 🖥️ **后端 & AI 计算**

- **Supabase**：提供用户认证、数据存储、实时 Logo 生成服务。
- **Stripe**：实现支付 & 订阅系统，支持积分管理。
- **AI 设计引擎**：集成 **Stable Diffusion、DeepAI**，实现 AI 生成 Logo。

### 🔧 **工具 & DevOps**

- **ESLint & Prettier**：统一代码风格，保证代码质量。
- **Vercel**：实现一键部署，让应用稳定运行。
- **Docker**（可选）：支持容器化部署，适用于本地 & 服务器环境。

---

## 📥 安装 & 部署

### **前置要求**

- ✅ [Node.js](https://nodejs.org/) (>= 18.x)
- ✅ [Supabase 账户](https://supabase.com/)
- ✅ [Stripe 账户](https://stripe.com/)

### **快速启动**

```bash
# 1. 克隆代码仓库
git clone https://github.com/geallenboy/ai-logo.git
cd ai-logo

# 2. 安装依赖
pnpm install
# 或者 yarn
yarn install

# 3. 配置环境变量
cp .env.example .env
# 配置 Supabase & Stripe 相关参数

# 4. 启动开发服务器
pnpm run dev
# 或 yarn dev

# 5. 访问本地应用
http://localhost:3000
```

---

## 项目预览

[预览地址](https://ailogo.nextjsbase.site/)

---

## 🤝 贡献指南

我们欢迎所有开发者、设计师的贡献！🚀

### **如何贡献**

1. **Fork 本项目** 并创建新分支：
   ```bash
   git checkout -b feature-branch-name
   ```
2. **提交你的改动**：
   ```bash
   git commit -m "✨ 新增 Logo 生成优化"
   ```
3. **推送代码**：
   ```bash
   git push origin feature-branch-name
   ```
4. **创建 Pull Request**，我们会尽快审核！🎉

---

## 📄 许可协议

本项目基于 **MIT 许可协议**，允许自由使用、修改和分发。  
详情请查看 [LICENSE](LICENSE) 文件。

---

## 🌍 联系我

如果你对 AI Logo 感兴趣，或者希望合作，请随时联系我！💬

📧 **Email**：[gejialun88@gmail.com](mailto:gejialun88@gmail.com)  
🐦 **Twitter**：[gejialun88](https://x.com/gejialun88)  
🌐 **个人网站**：[我的网站](https://gegarron.com)  
💬 **微信**：gegarron

🚀 **立即体验 AI Logo，让你的品牌焕发新生！** 🎨✨

---

## 🌟 Star & Fork 🌟

如果你喜欢这个项目，请 **Star ⭐ & Fork**，让更多人发现它！  
🔗 **GitHub Repo**：[AI Logo](https://github.com/geallenboy/ai-logo)

---

### **🔥 为什么选择 AI Logo？**

✅ **AI 生成独特 Logo**：快速、一键生成，满足品牌个性化需求。  
✅ **自定义风格 & 颜色**：Logo 设计可随意调整，匹配品牌形象。  
✅ **AI 训练个性化 Logo**：根据你的品牌特点优化生成方案。  
✅ **支持商业变现**：集成 Stripe，助力 SaaS 业务模式。  
✅ **开源 & 可扩展**：可自由部署 & 自定义 AI 模型。

🔥 **立即 Fork & 开发，开启你的 AI 设计之旅！** 🚀

## 🎨 项目预览

以下是部分 UI 预览图：

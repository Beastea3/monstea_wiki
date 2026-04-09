# 19 Types of Robotic Software Engineers
# 19类机器人软件工程师

**演讲者 (Speaker):** Karissa Stisser
**发布日期 (Published):** 2026年4月 (April 2026)
**视频来源 (Source):** YouTube — https://youtu.be/JI0gO_fDKEg
**整理人 (Ingested by):** wiki-claw ingest subagent
**日期 (Ingested):** 2026-04-09

---

## 核心贡献 | Core Contribution

Karissa Stisser 在本视频中将 **机器人软件工程（Robotic Software Engineering）** 领域划分为 **19 种角色类型**，帮助学习者和求职者更有针对性地构建技能树，而非试图掌握"所有东西"。

她还额外补充了 **4 个 Bonus 类别**（客户技术支持、销售工程、技术管理、人员管理），实际覆盖 **23 种** 不同的工作角色。

> "我把它分解成 19 种不同类型的机器人软件工程师，每个人都有自己的类别和特定的技能组合，这样你就可以评估哪种最吸引你，或者哪种与你的技能最匹配。"

---

## 19 类角色完整列表 | The 23 Roles

### 核心技术角色（Core Technical Roles）

| # | 角色 | 英文 | 核心技能 |
|---|------|------|----------|
| 1 | 本地化/定位 | Localization | C++, 线性代数, 状态估计 (EKF, Particle Filter) |
| 2 | 地图构建 | Mapping | C++, 点云处理, Cloud, 子图(submap) |
| 3 | SLAM | SLAM | Localization + Mapping 的结合 |
| 4 | DevOps | DevOps | Docker, AWS/GCP, Jenkins, Git, 安全 |
| 5 | 人机交互 | Human-Computer Interfacing | 传感器交互, 自然语言处理, LLM, 直觉设计 |
| 6 | 控制工程 | Controls Engineering | 物理, C++, 机电系统, 底层控制 |
| 7 | 驱动程序 | Drivers | C/C++, 硬件驱动, 二进制解析 |
| 8 | 新设备Bring-Up | Device Bring-Up | Linux, Bash, 网络配置, Python |
| 9 | 路径规划 | Path Planning | C++, 图/树算法, A*, MPI, MPPI, 强化学习 |
| 10 | 机械操作 | Manipulation | C++, 视觉, 灵巧操作 |
| 11 | 远程控制 | Remote Control | C++(机器人端) + JavaScript/Java(UI端), 网络安全 |
| 12 | 感知工程 | Perception Engineering | Python, PyTorch/TensorFlow, 深度学习, 传感器融合 |
| 13 | 目标跟踪 | Tracking | C++, 概率统计, 多目标关联, Sensor Fusion |
| 14 | 标定工程 | Calibration Engineering | C++/Python, 棋盘格标定, ICP, 传感器 extrinsic/intrinsic calibration |
| 15 | 设备管理/执行器 | Device Manager / Executor | C++, 多线程, OS, CPU/GPU调度 |
| 16 | 用户界面 | User Interface | JavaScript/QT/Web, UX设计, 文档 |
| 17 | 仿真工程 | Simulation Engineering | Gazebo/Unity/Unreal, 物理模型, GPU, 多线程 |
| 18 | 数据分析 | Data Analyst | Python, 可视化(Kaggle), 统计分析 |
| 19 | 优化工程 | Optimization Engineering | CUDA, C++, 数据填充, 压缩, OMP, 多线程 |

### Bonus 类别（4类）

| # | 角色 | 英文 | 核心技能 |
|---|------|------|----------|
| 20 | 客户技术支持 | Customer Troubleshooting | 沟通, 文档, 快速诊断 |
| 21 | 客户集成/销售工程 | Customer Integration / Sales Engineer | 技术+客户沟通, 需求收集 |
| 22 | 人员管理 | Personnel Manager | 同理心, 人员目标管理 |
| 23 | 技术管理 | Technical Manager | 项目里程碑, 技术决策, 任务分配 |

---

## 关键结论 | Key Takeaways

### 1. 核心通用技能
- **C++** 是机器人软件工程中使用最广泛的编程语言（性能要求高）
- **Python** 在感知、机器学习、数据分析中占主导
- **Linux** 开发环境几乎是必须的（很少在 Windows 上开发）
- **ROS (Robot Operating System)** 是最常见的机器人中间件框架，提供 Transform Tree、消息系统、可视化工具

### 2. 角色层级（从硬件到用户）
```
最低层（硬件最近）          最高层（用户最近）
Device Bring-Up              User Interface
Drivers                      Customer-facing
Controls Engineering
Localization/Mapping
Path Planning
Perception
Simulation
DevOps
Data Analyst / Optimization
Testers
```

### 3. 数学基础的重要性
- **线性代数**：坐标变换、矩阵运算（几乎所有角色都需要）
- **概率统计**：状态估计、跟踪、传感器融合
- **物理学**：控制工程、路径规划、仿真

### 4. 高需求但人才稀缺的领域
- **SLAM/Localization**：永远不够用，数学和算法要求高
- **Optimization**：工资极高，需要 CUDA 等深度优化技能
- **DevOps**：机器人的"机油"，没有就完全跑不起来

### 5. 入门友好的角色
- **Device Bring-Up**：不需要复杂的算法，Python 即可
- **Testers**：有动手能力、注重细节即可，不需要会写核心算法
- **Data Analyst**：Python + 可视化即可

---

## 与现有 Wiki 页面的关系 | Relationship to Existing Wiki

- 本页与 [[robotics-software-engineering]] 概念页互补，后者定义领域，本页提供角色分类
- 相关概念页：[[localization]]、[[mapping]]、[[slam]]、[[path-planning]]、[[perception-engineering]]、[[controls-engineering]]、[[ros]]、[[simulation-robotics]]、[[calibration-engineering]]、[[optimization-engineering]]
- 相关实体页：[[karissa-stisser]]（演讲者）、[[robotic-software-engineering-roles]]（分类体系本身）

---

## 来源 | Source

- 原始 SRT 字幕文件：`wiki/raw/19-types-robotic-software-engineers-transcript.srt`
- 源数据页面：`wiki/sources/19-types-robotic-software-engineers.md`

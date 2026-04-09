---
title: "19 Types of Robotic Software Engineers — Summary"
date: 2026-04-09
tags: [robotic, software-engineering, transcript]
created: 2026-04-09
updated: 2026-04-09
---

# 19 Types of Robotic Software Engineers | 机器人软件工程师的19种类型

> Source: SRT transcript (likely YouTube/video educational content)
> Date: 2026-04-09
> Original: English

---

## Concept | 核心概念

A YouTube/video educational content categorizing the **19 distinct software engineering roles** found in the robotics industry. The speaker covers both **core technical roles** (localization, mapping, perception) and **supporting roles** (DevOps, UI, testing, management), offering practical guidance on skills required, tools used, and career pathways for each. The taxonomy spans the full robotics software stack: from low-level drivers and controls to high-level planning, simulation, and customer-facing integration.

一个将机器人软件工程领域划分为**19种明确角色**的视频内容。涵盖**核心技术岗位**（定位、测绘、感知）和**支持性岗位**（DevOps、用户界面、测试、管理），提供每种岗位所需技能、常用工具和职业路径的实用指导。角色分类覆盖机器人软件全栈：从底层驱动程序和控制，到高层规划、仿真和面向客户的技术集成。

**字符数: ~520**

---

## Detailed Notes | 详细笔记

### Core Robotics Roles (1–6)

1. **Localization | 定位** — Determining where the robot is in its environment. Uses Kalman filters, particle filters; sensors: IMU, cameras, LiDAR, GPS. Requires C++, Python, Linux, strong math/stats. Most commonly discussed role in robotics.

2. **Mapping | 测绘** — Creating maps for robots to navigate. Often done via SLAM (Simultaneous Localization and Mapping); uses factor graphs and submaps for efficiency. Maps may be stored in the cloud for reuse. Requires C++, Python, Linux, cloud infrastructure knowledge.

3. **DevOps | 运维开发** — Infrastructure and deployment: CI/CD, Docker containers, Jenkins, AWS/cloud. Ties the entire system together; ensures code changes don't break existing functionality. Often overlooked but critical.

4. **Human-Computer Interfacing | 人机交互** — Making robot interaction intuitive. Covers: physical interfaces (lights, gestures, sound), NLP/LLM integration, AR visualization. Needs both technical and UX design skills.

5. **Controls Engineer | 控制工程师** — Electromechanical and physics-based lower-level control (motor speed, pressure, temperature). Requires understanding of physics, feedback loops, PID controllers. More hardware-adjacent than software-heavy.

6. **Drivers | 驱动程序开发** — Writing low-level sensor/actuator drivers. Parsing binary data from hardware, communicating over protocols (SPI, I2C, UART). Very hardware-adjacent; requires deep hardware knowledge.

### Mid-Level Roles (7–12)

7. **Device Bring Up | 设备初始化** — Getting new hardware running: flashing OS, setting up networking, configuring boards. Primarily bash scripting and Python; Linux proficiency essential.

8. **Path Planning | 路径规划** — Computing collision-free paths from A to B. Uses A*, RRT, RRT*, MPC, reinforcement learning. Requires C++, strong trees/graphs algorithm knowledge.

9. **Manipulation | 机械臂操控** — Robotic arm control: grasping, picking, fine motor skills. Requires inverse kinematics, dynamics, understanding of grippers and actuators.

10. **Remote Control | 远程控制** — Networking for robot control: web/app interfaces, sockets, latency management, encryption. Web dev skills (JavaScript) + networking knowledge.

11. **Perception | 感知** — Processing sensor data: computer vision, ML/DL, object detection/classification. PyTorch, TensorFlow, OpenCV. Often overlaps with localization and mapping.

12. **Tracking | 目标跟踪** — Following objects frame-to-frame; sensor fusion for robust tracking. Probabilistic methods, Bayesian filtering. Overlaps with perception and localization.

### Specialized/Supporting Roles (13–19)

13. **Calibration Engineer | 标定工程师** — Calibrating sensor positions (extrinsic/intrinsic). Checkerboard patterns for cameras, ICP for LiDAR. Ensures downstream algorithms receive accurate sensor data. C++ or Python.

14. **Device Manager/Executor | 设备管理器** — Orchestrating all software processes: memory management, CPU/GPU load, multi-threading, thread safety. Needs deep OS and systems programming knowledge. C++ focus.

15. **User Interface | 用户界面** — Dashboard and control panel development. Web (JavaScript), desktop (Java/QT), mobile (Swift/Android). Needs eye for UX and good documentation skills.

16. **Simulation Engineer | 仿真工程师** — Building physics-based digital twins. Tools: Gazebo (ROS-native), Unity (C#), Unreal. Requires GPU for rendering, multi-threading for physics updates, CAD-to-simulation pipeline skills.

17. **Data Analyst | 数据分析师** — Post-run data analysis: plotting, trend detection, anomaly finding. Python with plotting libraries. Cloud data pipelines, automated processing on robot dock/sync. Needs strong communication skills.

18. **Optimization Engineer | 优化工程师** — Speeding up existing code: CUDA/GPU optimization, C++ data structure optimization, compression, parallel computing (OMP). High salaries due to scarcity. Deep systems knowledge required.

19. **Testers | 测试工程师** — System-level bug finding: physical robot testing, simulation testing, unit tests (Gtest). Need detail-orientation, good communication, Jira for bug tracking. Great entry point for robotics careers.

### Bonus Roles (Beyond 19)

- **Customer Troubleshooting | 客户技术支持** — Listening to customers, diagnosing problems, working with engineers to fix issues. Needs strong communication and memory.

- **Customer Integration / Sales Engineer | 客户集成/售前工程师** — Bridging sales and engineering: understanding customer needs (factory layout, networking constraints, app integration), presenting technical solutions.

- **Personnel Manager | 人事经理** — People-focused: empathetic, balancing project goals with individual career goals, preventing turnover.

- **Technical Manager | 技术经理** — Project-focused: tracking milestones, assigning tasks, evaluating solutions, removing blockers.

### Key Themes

- **C++ is the dominant language** for performance-critical robotics code (localization, mapping, planning, optimization)
- **Python** is common for higher-level scripting, testing, data analysis, simulation (Gazebo)
- **Linux proficiency** is nearly universal across all roles
- **Multi-threading and systems programming** appear in Device Manager, Simulation, Optimization roles
- **Entry points**: Testing, Device Bring-Up, and DevOps are cited as accessible starting points for newcomers
- **Cloud integration** is increasingly important across mapping, DevOps, data analysis, and simulation
- **Communication skills** matter especially in Testing, Customer Troubleshooting, Data Analysis, and Management roles

### Source | 来源

- Raw transcript: `raw/19-types-robotic-software-engineers-transcript.srt`
- Source with metadata: `sources/19-types-robotic-software-engineers-transcript.md`

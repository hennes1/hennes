var resData = [
    {
        /* 怪物初始血量
         * 每次怪物的血量增加计算公式： initBlood + initBlood * 40%
        */
        "initBlood": 1060, //此值尽量不小于1000
        // 职业
        "occupation": [
            {
                "title": "战士",
                "description": "力量强大，防御力强，力大无穷。",
                "src": zyRoot +　"big/zy_001.png",
                "face": zyRoot +　"small/001.png",
                "skills": [
                    {"name": "力量", "face": jnRoot +　"skill_ll.png"},
                    {"name": "破甲", "face": jnRoot +　"skill_pj.png"},
                    {"name": "狂风卷", "face": jnRoot +　"skill_kfj.png"}
                ]
            },
            {
                "title": "法师",
                "description": "法师们会用神秘的咒语摧毁他们的敌人，可操作性极强。",
                "src": zyRoot +　"big/zy_002.png",
                "face": zyRoot +　"small/002.png",
                "skills": [
                    {"name": "力量", "face": jnRoot +　"skill_ll.png"},
                    {"name": "瞬光", "face": jnRoot +　"skill_xg.png"},
                    {"name": "致命一箭", "face": jnRoot +　"skill_zmyj.png"}
                ]
            },
            {
                "title": "道士",
                "description": "多样技能，操作性强。",
                "src": zyRoot +　"big/zy_003.png",
                "face": zyRoot +　"small/003.png",
                "skills": [
                    {"name": "光芒", "face": jnRoot +　"skill_gm.png"},
                    {"name": "芒星", "face": jnRoot +　"skill_mx.png"},
                    {"name": "圣光", "face": jnRoot +　"skill_sg.png"}
                ]
            },
            {
                "title": "矮人战士",
                "description": "矮人种族善良，爱好工艺劳动。暴击造成的伤害超高。",
                "src": zyRoot +　"big/zy_004.png",
                "face": zyRoot +　"small/004.png",
                "skills": [
                    {"name": "力量", "face": jnRoot +　"skill_ll.png"},
                    {"name": "洞察弱点", "face": jnRoot +　"skill_dcrd.png"},
                    {"name": "致命一箭", "face": jnRoot +　"skill_zmyj.png"}
                ]
            },
            {
                "title": "双刀蒙面侠",
                "description": "能比别人更快的释放技能。",
                "src": zyRoot +　"big/zy_005.png",
                "face": zyRoot +　"small/005.png",
                "skills": [
                    {"name": "轻视", "face": jnRoot +　"skill_qs.png"},
                    {"name": "霉素", "face": jnRoot +　"skill_ds.png"},
                    {"name": "沙暴天", "face": jnRoot +　"skill_sbt.png"}
                ]
            },
            {
                "title": "熊猫人",
                "description": "洞悉敌人弱点，可以无视部分护甲。",
                "src": zyRoot +　"big/zy_006.png",
                "face": zyRoot +　"small/006.png",
                "skills": [
                    {"name": "力量", "face": jnRoot +　"skill_ll.png"},
                    {"name": "破甲", "face": jnRoot +　"skill_pj.png"},
                    {"name": "洞察弱点", "face": jnRoot +　"skill_dcrd.png"}
                ]
            },
            {
                "title": "精灵",
                "description": "精灵族精通技能伤害，能够无视敌人部分魔法抗性。",
                "src": zyRoot +　"big/zy_007.png",
                "face": zyRoot +　"small/007.png",
                "skills": [
                    {"name": "轻视", "face": jnRoot +　"skill_qs.png"},
                    {"name": "光芒", "face": jnRoot +　"skill_gm.png"},
                    {"name": "圣光", "face": jnRoot +　"skill_sg.png"}
                ]
            }
        ],
        // 怪物
        "monster": [
            {"name": "隐秘忍者", "src": gwRoot + "boss_23.png"},
            {"name": "鳄鱼骑士", "src": gwRoot + "boss_12.png"},
            {"name": "鳄鱼战士", "src": gwRoot + "boss_13.png"},
            {"name": "鳄鱼狂战", "src": gwRoot + "boss_14.png"},
            {"name": "鲨鱼战士", "src": gwRoot + "boss_15.png"},
            {"name": "石像", "src": gwRoot + "boss_17.png"},
            {"name": "四角恶徒", "src": gwRoot + "boss_16.png"},
            {"name": "狂暴火统", "src": gwRoot + "boss_18.png"},
            {"name": "绿龙怪", "src": gwRoot + "boss_20.png"},
            {"name": "独眼暴徒", "src": gwRoot + "boss_8.png"},
            {"name": "魔城看守", "src": gwRoot + "boss_21.png"},
            {"name": "火牛怪", "src": gwRoot + "boss_9.png"},
            {"name": "骷髅战士", "src": gwRoot + "boss_19.png"},
            {"name": "双刀骷髅", "src": gwRoot + "boss_10.png"},
            {"name": "地狱扑手", "src": gwRoot + "boss_11.png"},
            {"name": "火骷髅", "src": gwRoot + "boss_22.png"},
            {"name": "恶魔少年", "src": gwRoot + "boss_24.png"},
            {"name": "第七魔王·武", "src": gwRoot + "boss_7.png"},
            {"name": "第六魔王·钢", "src": gwRoot + "boss_6.png"},
            {"name": "第五魔王·死", "src": gwRoot + "boss_5.png"},
            {"name": "第四魔王·栗", "src": gwRoot + "boss_4.png"},
            {"name": "第三魔王·梦", "src": gwRoot + "boss_3.png"},
            {"name": "第二魔王·恶", "src": gwRoot + "boss_2.png"},
            {"name": "第一魔王·恨", "src": gwRoot + "boss_1.png"}
        ],
        /*+++++++++++++++++++++++++++++++++++++
            基础攻击属性对照：
            "PhyMin":  物理最小攻击
            "PhyMax":  物理最大攻击
            "PhyShRt": 物理伤害率
            "PhyCtRt": 物理穿透率
            "PhyCt":   物理穿透(护甲穿透)
            "PhyBjSh": 物理暴击伤害
            "PhyBjRt": 物理暴击率
            "SKMin":   技能最小攻击
            "SKMax":   技能最大攻击
            "SKShRt":  技能伤害率
            "SKCtRt":  技能穿透率
            "SKCt":    技能穿透(魔抗穿透)
            "SKBjSh":  技能暴击伤害
            "SKBj":    技能暴击
            "SKCD":    冷却时间

            物理最小：(PhyMin*(1+PhyShRt)+PhyCt)*(1+PhyShRt)   物理最大：(PhyMax*(1+PhyShRt)+PhyCt)*(1+PhyShRt)
            技能最小：(SKMin*(1+SKCtRt)+SKCt)*(1+SKCtRt)       技能最大：(SKMax*(1+SKCtRt)+SKCt)*(1+SKCtRt)

        +++++++++++++++++++++++++++++++++++++*/
        // 技能
        "skills": [
            {"name": "破甲", "src": jnRoot + "skill_pj.png", "Lv": 1, "des": "护甲穿透+20",
                "attack": [
                    {"PhyCt": 20}
                ]
            },
            {"name": "芒星", "src": jnRoot + "skill_mx.png", "Lv": 1, "des": "技能伤害+10%",
                "attack": [
                    {"SKShRt": 0.1}
                ]
            },
            {"name": "致命一箭", "src": jnRoot + "skill_zmyj.png", "Lv": 1, "des": "物理暴击率+10%,物理暴击伤害+10%",
                "attack": [
                    {"PhyShRt": 0.1, "PhyBjSh": 0.1}
                ]
            },
            {"name": "圣光", "src": jnRoot + "skill_sg.png", "Lv": 1, "des": "技能最小伤害+168,技能最大伤害+208",
                "attack": [
                    {"SKMin": 138, "SKMax": 208}
                ]
            },
            {"name": "洞察弱点", "src": jnRoot + "skill_dcrd.png", "Lv": 1, "des": "物理暴击伤害+10%",
                "attack": [
                    {"PhBjSh": 0.1}
                ]
            },
            {"name": "沙暴天", "src": jnRoot + "skill_sbt.png", "Lv": 1, "des": "技能最小伤害+68,技能最大伤害+108,魔抗穿透+5%",
                "attack": [
                    {"SKMin": 68, "SKMax": 108, "SKCt": 0.05}
                ]
            },
            {"name": "光芒", "src": jnRoot + "skill_gm.png", "Lv": 1, "des": "技能暴击率+20%",
                "attack": [
                    {"SKBjRt": 0.2}
                ]
            },
            {"name": "力量", "src": jnRoot + "skill_ll.png", "Lv": 1, "des": "物理最小攻击+32,物理最大攻击+48",
                "attack": [
                    {"PhyMin": 32, "PhyMax": 48}
                ]
            },
            {"name": "狂风卷", "src": jnRoot + "skill_kfj.png", "Lv": 1, "des": "物理最小攻击+6,物理最大攻击+16,护甲穿透+5%",
                "attack": [
                    {"PhyMin": 6, "PhyMax": 16, "PhyCtRt": 0.05}
                ]
            },
            {"name": "轻视", "src": jnRoot + "skill_qs.png", "Lv": 1, "des": "魔抗穿透+20",
                "attack": [
                    {"SKCt": 20}
                ]
            },
            {"name": "瞬光", "src": jnRoot + "skill_xg.png", "Lv": 1, "des": "物理攻击暴击+10%",
                "attack": [
                    {"PhyBjRt": 0.1}
                ]
            },
            {"name": "毒素", "src": jnRoot + "skill_ds.png", "Lv": 1, "des": "最大攻击力+32,技能最小攻击+68,技能最大攻击+108",
                "attack": [
                    {"PhyMax": 32, "SKMin": 68, "SKMax": 108}
                ]
            }
        ],
        // 装备
        "equipment": [
            {"name": "第一战斧", "src": jnRoot + "eq_07.png", "des": "物理最小攻击+60,物理最大攻击+60",
                "attack": [
                    {"PhyMin": 60, "PhyMax": 60}
                ]
            },

            {"name": "克拉戒指", "src": jnRoot + "eq_09.png", "des": "技能最小伤害+168,技能最大伤害+208,冷却时间-0.2s",
                "attack": [
                    {"SKCD": -0.2, "SKMin": 168, "SKMax": 208}
                ]
            },

            {"name": "国王戒指", "src": jnRoot + "eq_14.png", "des": "物理暴击率+20%",
                "attack": [
                    {"PhyBjRt": 0.2}
                ]
            },
            {"name": "金属权杖", "src": jnRoot + "eq_10.png", "des": "护甲穿透+20%,魔抗穿透+20%",
                "attack": [
                    {"PhyCtRt": 0.2, "SKCtRt": 0.2}
                ]
            },
            {"name": "皇后戒指", "src": jnRoot + "eq_11.png", "des": "技能暴击率+35%",
                "attack": [
                    {"SKBjRt": 0.35}
                ]
            },
            {"name": "贤者权杖", "src": jnRoot + "eq_05.png", "des": "冷却时间-0.8s",
                "attack": [
                    {"SKCD": -0.8}
                ]
            },
            {"name": "光剑", "src": jnRoot + "eq_04.png", "des": "护甲穿透 +60,魔抗穿透 +60",
                "attack": [
                    {"PhyCt": 60, "SKCt": 60}
                ]
            },
            {"name": "国王项链", "src": jnRoot + "eq_12.png", "des": "攻击力 +10%,攻击暴击 +10%",
                "attack": [
                    {"PhyShRt": 0.1, "PhyBjRt": 0.1}
                ]
            },
            {"name": "龙纹刀", "src": jnRoot + "eq_08.png", "des": "技能伤害 +35%",
                "attack": [
                    {"SKShRt": 0.35}
                ]
            },
            {"name": "秘银戒指", "src": jnRoot + "eq_06.png", "des": "物理最小攻击+28,物理最大攻击+42,物理攻击力+5%",
                "attack": [
                    {"PhyMin": 28, "PhyMax": 42, "PhyShRt": 0.05}
                ]
            },
            {"name": "黑剑", "src": jnRoot + "eq_03.png", "des": "攻击暴击 +10%,技能暴击 +20%,暴击伤害 +50%",
                "attack": [
                    {"PhyBjRt": 0.1, "SKBjRt": 0.2, "PhyBjSh": 0.5}
                ]
            },
            {"name": "猛禽斧", "src": jnRoot + "eq_01.png", "des": "最大攻击力 +180",
                "attack": [
                    {"PhyMax": 180}
                ]
            },
            {"name": "鱼鳞刀", "src": jnRoot + "eq_02.png", "des": "攻击力 +25%",
                "attack": [
                    {"PhyShRt": 0.25}
                ]
            },
            {"name": "皇后项链", "src": jnRoot + "eq_13.png", "des": "技能伤害 +20%,冷却时间 -0.3S",
                "attack": [
                    {"SKShRt": 0.2, "SKCD": -0.3}
                ]
            }
        ]
    }
];
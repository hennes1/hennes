var resData = [
    {
        // 初始值：[体力，熟练度，技能点]
        "initArr": [100, 10, 0],
        /* 地图数据
        *  当 material: 0 时，表示材料就是自身，否则，按照“羊角山”中的方式写入数据，并保证num为0
        *  num：不可修改（请保持默认）
        */
        "map": [
            {
                "name": "羊角山",
                "large": MAP +　"dt_01.png",
                "monster": [
                    {"name": "神牛", "face": mRoot +　"m_001.png",
                        "material": [
                            {"name": "牛骨", "num": 0},
                            {"name": "牛皮", "num": 0},
                            {"name": "牛角", "num": 0}
                        ]
                    },
                    {"name": "猪怪", "face": mRoot +　"m_002.png",
                        "material": [
                            {"name": "猪骨", "num": 0},
                            {"name": "猪皮", "num": 0},
                            {"name": "猪牙", "num": 0}
                        ]
                    },
                    {"name": "蜘蛛精", "face": mRoot +　"m_003.png",
                        "material": [
                            {"name": "蜘蛛獠牙", "num": 0},
                            {"name": "锋利的脚", "num": 0}
                        ]
                    },
                    {"name": "小狐狸", "face": mRoot +　"m_004.png",
                        "material": [
                            {"name": "狐狸皮", "num": 0}
                        ]
                    }
                ]
            },
            {
                "name": "千羽丘",
                "large": MAP +　"dt_02.png",
                "monster": [
                    {"name": "甘草", "face": mRoot +　"m_005.png", "material": 0},
                    {"name": "田七", "face": mRoot +　"m_006.png", "material": 0},
                    {"name": "金银花", "face": mRoot +　"m_007.png", "material": 0},
                    {"name": "千里香", "face": mRoot +　"m_008.png", "material": 0},
                    {"name": "紫色染料花", "face": mRoot +　"m_009.png", "material": 0},
                    {"name": "苹果", "face": mRoot +　"m_010.png", "material": 0},
                    {"name": "仙茅", "face": mRoot +　"m_011.png", "material": 0}
                ]
            },
            {
                "name": "北珠岛",
                "large": MAP +　"dt_03.png",
                "monster": [
                    {"name": "珍珠", "face": mRoot +　"m_012.png", "material": 0},
                    {"name": "云石", "face": mRoot +　"m_013.png", "material": 0},
                    {"name": "玉石", "face": mRoot +　"m_014.png", "material": 0},
                    {"name": "炼丹石", "face": mRoot +　"m_015.png", "material": 0},
                    {"name": "彩晶", "face": mRoot +　"m_016.png", "material": 0},
                    {"name": "发丝石", "face": mRoot +　"m_017.png", "material": 0}
                ]
            },
            {
                "name": "浮空岛",
                "large": MAP +　"dt_04.png",
                "monster": [
                    {"name": "硬纸", "face": mRoot +　"m_018.png", "material": 0},
                    {"name": "无名精", "face": mRoot +　"m_019.png", "material": 0},
                    {"name": "硬皮", "face": mRoot +　"m_020.png", "material": 0},
                    {"name": "蛛丝布", "face": mRoot +　"m_021.png", "material": 0},
                    {"name": "硬木", "face": mRoot +　"m_022.png", "material": 0},
                    {"name": "党参", "face": mRoot +　"m_023.png", "material": 0},
                    {"name": "相思子", "face": mRoot +　"m_024.png", "material": 0}
                ]
            },
            {
                "name": "云晓峰",
                "large": MAP +　"dt_05.png",
                "monster": [
                    {"name": "玉衡", "face": mRoot +　"m_025.png", "material": 0},
                    {"name": "紫阳", "face": mRoot +　"m_026.png", "material": 0},
                    {"name": "剑花", "face": mRoot +　"m_027.png", "material": 0},
                    {"name": "灵芝", "face": mRoot +　"m_028.png", "material": 0},
                    {"name": "豆块", "face": mRoot +　"m_029.png", "material": 0},
                    {"name": "草圣", "face": mRoot +　"m_030.png", "material": 0},
                    {"name": "飞羽", "face": mRoot +　"m_031.png", "material": 0}
                ]
            }
        ],
        /* 装备
        *  num: 不可修改(请保持默认)，表示获取的个数
        *  total：可自定义，表示所需材料的个数
        */
        "equipment": [
            {
                "category": "武器",
                "num": 0,
                "list": [
                    {"name": "碧玉", "face": eRoot + "eq/wuQi/wuqi01.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 2},
                            {"name": "锋利的脚", "total": 2}
                        ]
                    },
                    {"name": "出尘", "face": eRoot + "eq/wuQi/wuqi02.png", "num": 0,
                        "material": [
                            {"name": "硬木", "total": 2},
                            {"name": "硬皮", "total": 1}
                        ]
                    },
                    {"name": "飞叶", "face": eRoot + "eq/wuQi/wuqi03.png", "num": 0,
                        "material": [
                            {"name": "硬纸", "total": 2},
                            {"name": "硬木", "total": 1}
                        ]
                    },
                    {"name": "沧海", "face": eRoot + "eq/wuQi/wuqi04.png", "num": 0,
                        "material": [
                            {"name": "猪皮", "total": 2},
                            {"name": "玉衡", "total": 1}
                        ]
                    },
                    {"name": "暮云剑", "face": eRoot + "eq/wuQi/wuqi05.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 5},
                            {"name": "玉石", "total": 3},
                            {"name": "彩晶", "total": 3}
                        ]
                    },
                    {"name": "醉燐剑", "face": eRoot + "eq/wuQi/wuqi06.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 4},
                            {"name": "锋利的脚", "total": 4},
                            {"name": "彩晶", "total": 4}
                        ]
                    },
                    {"name": "麒麟臂", "face": eRoot + "eq/wuQi/wuqi07.png", "num": 0,
                        "material": [
                            {"name": "猪皮", "total": 4},
                            {"name": "玉衡", "total": 4},
                            {"name": "紫阳", "total": 1}
                        ]
                    },
                    {"name": "绵柔花", "face": eRoot + "eq/wuQi/wuqi08.png", "num": 0,
                        "material": [
                            {"name": "硬纸", "total": 4},
                            {"name": "硬木", "total": 3},
                            {"name": "云石", "total": 2}
                        ]
                    },
                    {"name": "问天责", "face": eRoot + "eq/wuQi/wuqi09.png", "num": 0,
                        "material": [
                            {"name": "硬木", "total": 4},
                            {"name": "硬皮", "total": 4},
                            {"name": "炼丹石", "total": 4}
                        ]
                    },
                    {"name": "鸿雁长飞剑", "face": eRoot + "eq/wuQi/wuqi10.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 5},
                            {"name": "锋利的脚", "total": 5},
                            {"name": "彩晶", "total": 6}
                        ]
                    },
                    {"name": "天祭剑", "face": eRoot + "eq/wuQi/wuqi11.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 8},
                            {"name": "锋利的脚", "total": 8},
                            {"name": "彩晶", "total": 8}
                        ]
                    },
                    {"name": "墨魂", "face": eRoot + "eq/wuQi/wuqi12.png", "num": 0,
                        "material": [
                            {"name": "猪皮", "total": 8},
                            {"name": "玉衡", "total": 8},
                            {"name": "紫阳", "total": 6}
                        ]
                    },
                    {"name": "紫金镇皇枪", "face": eRoot + "eq/wuQi/wuqi13.png", "num": 0,
                        "material": [
                            {"name": "硬木", "total": 5},
                            {"name": "硬皮", "total": 6},
                            {"name": "炼丹石", "total": 5}
                        ]
                    },
                    {"name": "混魔枪", "face": eRoot + "eq/wuQi/wuqi14.png", "num": 0,
                        "material": [
                            {"name": "硬木", "total": 8},
                            {"name": "硬皮", "total": 8},
                            {"name": "炼丹石", "total": 8}
                        ]
                    },
                    {"name": "天魔扇", "face": eRoot + "eq/wuQi/wuqi15.png", "num": 0,
                        "material": [
                            {"name": "硬纸", "total": 8},
                            {"name": "硬木", "total": 8},
                            {"name": "云石", "total": 8}
                        ]
                    }
                ]
            },
            {
                "category": "挂件",
                "num": 0,
                "list": [
                    {"name": "速风", "face": eRoot + "eq/guaJian/01.png", "num": 0,
                        "material": [
                            {"name": "云石", "total": 1}
                        ]
                    },
                    {"name": "弱水", "face": eRoot + "eq/guaJian/02.png", "num": 0,
                        "material": [
                            {"name": "发丝石", "total": 1},
                            {"name": "云石", "total": 2}
                        ]
                    },
                    {"name": "惊羽", "face": eRoot + "eq/guaJian/03.png", "num": 0,
                        "material": [
                            {"name": "发丝石", "total": 2},
                            {"name": "云石", "total": 3}
                        ]
                    },
                    {"name": "冰凝", "face": eRoot + "eq/guaJian/04.png", "num": 0,
                        "material": [
                            {"name": "发丝石", "total": 3},
                            {"name": "云石", "total": 4}
                        ]
                    },
                    {"name": "无极", "face": eRoot + "eq/guaJian/05.png", "num": 0,
                        "material": [
                            {"name": "发丝石", "total": 4},
                            {"name": "云石", "total": 5}
                        ]
                    },
                    {"name": "朝天子", "face": eRoot + "eq/guaJian/06.png", "num": 0,
                        "material": [
                            {"name": "牛角", "total": 1},
                            {"name": "珍珠", "total": 2}
                        ]
                    },
                    {"name": "孤山傲", "face": eRoot + "eq/guaJian/07.png", "num": 0,
                        "material": [
                            {"name": "蛛丝布", "total": 1},
                            {"name": "珍珠", "total": 1}
                        ]
                    },
                    {"name": "霜乌沙", "face": eRoot + "eq/guaJian/08.png", "num": 0,
                        "material": [
                            {"name": "蛛丝布", "total": 3},
                            {"name": "珍珠", "total": 3}
                        ]
                    },
                    {"name": "瑶玉珠", "face": eRoot + "eq/guaJian/09.png", "num": 0,
                        "material": [
                            {"name": "蛛丝布", "total": 5},
                            {"name": "珍珠", "total": 5}
                        ]
                    }
                ]
            },
            {
                "category": "鞋子",
                "num": 0,
                "list": [
                    {"name": "棘烟", "face": eRoot + "eq/xieZi/01.png", "num": 0,
                        "material": [
                            {"name": "硬皮", "total": 2},
                            {"name": "牛皮", "total": 2}
                        ]
                    },
                    {"name": "杞梁", "face": eRoot + "eq/xieZi/02.png", "num": 0,
                        "material": [
                            {"name": "硬皮", "total": 3},
                            {"name": "牛皮", "total": 3},
                            {"name": "彩晶", "total": 1}
                        ]
                    },
                    {"name": "若凌", "face": eRoot + "eq/xieZi/03.png", "num": 0,
                        "material": [
                            {"name": "硬皮", "total": 4},
                            {"name": "牛皮", "total": 3},
                            {"name": "彩晶", "total": 3}
                        ]
                    },
                    {"name": "缘风", "face": eRoot + "eq/xieZi/04.png", "num": 0,
                        "material": [
                            {"name": "硬皮", "total": 6},
                            {"name": "牛皮", "total": 5},
                            {"name": "彩晶", "total": 3},
                            {"name": "珍珠", "total": 2}
                        ]
                    },
                    {"name": "铁壁靴", "face": eRoot + "eq/xieZi/05.png", "num": 0,
                        "material": [
                            {"name": "硬皮", "total": 8},
                            {"name": "牛皮", "total": 8},
                            {"name": "彩晶", "total": 6},
                            {"name": "炼丹石", "total": 3}
                        ]
                    }
                ]
            },
            {
                "category": "药品",
                "num": 0,
                "list": [
                    {"name": "碧双丹", "face": eRoot + "eq/yaoPin/01.png", "num": 0,
                        "material": [
                            {"name": "甘草", "total": 1},
                            {"name": "仙茅", "total": 1}
                        ]
                    },
                    {"name": "健胃散", "face": eRoot + "eq/yaoPin/02.png", "num": 0,
                        "material": [
                            {"name": "金银花", "total": 2},
                            {"name": "千里香", "total": 2}
                        ]
                    },
                    {"name": "混元丹", "face": eRoot + "eq/yaoPin/03.png", "num": 0,
                        "material": [
                            {"name": "灵芝", "total": 2},
                            {"name": "飞羽", "total": 2},
                            {"name": "党参", "total": 1}
                        ]
                    },
                    {"name": "纳元丹", "face": eRoot + "eq/yaoPin/04.png", "num": 0,
                        "material": [
                            {"name": "相思子", "total": 3},
                            {"name": "豆块", "total": 2},
                            {"name": "党参", "total": 3}
                        ]
                    },
                    {"name": "长生不老丹", "face": eRoot + "eq/yaoPin/05.png", "num": 0,
                        "material": [
                            {"name": "党参", "total": 5},
                            {"name": "仙茅", "total": 5},
                            {"name": "珍珠", "total": 5},
                            {"name": "千里香", "total": 5}
                        ]
                    }
                ]
            },
            {
                "category": "衣服",
                "num": 0,
                "list": [
                    {"name": "布衣", "face": eRoot + "eq/yiFu/01.png", "num": 0,
                        "material": [
                            {"name": "猪皮", "total": 1},
                            {"name": "牛皮", "total": 1}
                        ]
                    },
                    {"name": "无梦", "face": eRoot + "eq/yiFu/02.png", "num": 0,
                        "material": [
                            {"name": "牛皮", "total": 2},
                            {"name": "蛛丝布", "total": 2},
                            {"name": "发丝石", "total": 2}
                        ]
                    },
                    {"name": "凤羽", "face": eRoot + "eq/yiFu/03.png", "num": 0,
                        "material": [
                            {"name": "牛皮", "total": 3},
                            {"name": "蛛丝布", "total": 4},
                            {"name": "发丝石", "total": 4}
                        ]
                    },
                    {"name": "瑶歌裳", "face": eRoot + "eq/yiFu/04.png", "num": 0,
                        "material": [
                            {"name": "蛛丝布", "total": 6},
                            {"name": "发丝石", "total": 5},
                            {"name": "狐狸皮", "total": 3}
                        ]
                    },
                    {"name": "圣印战甲", "face": eRoot + "eq/yiFu/05.png", "num": 0,
                        "material": [
                            {"name": "牛皮", "total": 6},
                            {"name": "硬皮", "total": 6},
                            {"name": "发丝石", "total": 5},
                            {"name": "狐狸皮", "total": 3}
                        ]
                    },
                    {"name": "圣麟衣", "face": eRoot + "eq/yiFu/06.png", "num": 0,
                        "material": [
                            {"name": "牛皮", "total": 8},
                            {"name": "硬皮", "total": 8},
                            {"name": "发丝石", "total": 8},
                            {"name": "狐狸皮", "total": 8}
                        ]
                    }
                ]
            }
        ],
        /* 技能
        *  Lv：不可修改(请保持默认)，表示当前为1级
        *  total：可自定义，表示最高可以升至多少级
        */
        "skills": [
            {"name": "缝纫", "face": eRoot + "sk_001.png", "Lv": 1, "total": 10},
            {"name": "采金", "face": eRoot + "sk_002.png", "Lv": 1, "total": 10},
            {"name": "庖丁", "face": eRoot + "sk_003.png", "Lv": 1, "total": 10},
            {"name": "神农", "face": eRoot + "sk_004.png", "Lv": 1, "total": 10},
            {"name": "治疗", "face": eRoot + "sk_005.png", "Lv": 1, "total": 10},
            {"name": "铸造", "face": eRoot + "sk_006.png", "Lv": 1, "total": 10}
        ],
        /* 成就
        *  和装备中的类目一一对应【武器，挂件，鞋子，药品和衣服】
        *  Lv：不可修改(请保持默认)，通过后台计算等级，最后是用此值和total比较
        *  grade：表示等级，可按要求自行更改
        *  total：升级的数值，即达到此值就可升级至该级别
        */
        "achievement": [
            {
                "category": "武器", "face": eRoot + "am_001.png", "Lv": 0,
                "grade": [
                    {"name": "5种状态之一初级1", "total": 5},
                    {"name": "5种状态之一中级2", "total": 20},
                    {"name": "5种状态之一高级3", "total": 50},
                    {"name": "5种状态之一完美4", "total": 100}
                ]
            },
            {
                "category": "挂件", "face": eRoot + "am_002.png", "Lv": 0,
                "grade": [
                    {"name": "5种状态之二初级1", "total": 5},
                    {"name": "5种状态之二中级2", "total": 20},
                    {"name": "5种状态之二高级3", "total": 50},
                    {"name": "5种状态之二完美4", "total": 100}
                ]
            },
            {
                "category": "鞋子", "face": eRoot + "am_003.png", "Lv": 0,
                "grade": [
                    {"name": "5种状态之三初级1", "total": 5},
                    {"name": "5种状态之三中级2", "total": 20},
                    {"name": "5种状态之三高级3", "total": 50},
                    {"name": "5种状态之三完美4", "total": 100}
                ]
            },
            {
                "category": "药品", "face": eRoot + "am_004.png", "Lv": 0,
                "grade": [
                    {"name": "5种状态之四初级1", "total": 5},
                    {"name": "5种状态之四中级2", "total": 20},
                    {"name": "5种状态之四高级3", "total": 50},
                    {"name": "5种状态之四完美4", "total": 100}
                ]
            },
            {
                "category": "衣服", "face": eRoot + "am_005.png", "Lv": 0,
                "grade": [
                    {"name": "5种状态之五初级1", "total": 5},
                    {"name": "5种状态之五中级2", "total": 20},
                    {"name": "5种状态之五高级3", "total": 50},
                    {"name": "5种状态之五完美4", "total": 100}
                ]
            }
        ]
    }
];
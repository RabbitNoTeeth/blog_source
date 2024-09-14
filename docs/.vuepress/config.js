module.exports = {
    title: '刘新冬的博客',
    description: '刘新冬的技术博客，记录学习笔记以及开发中遇到的各种技术问题',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            {text: '首页', link: '/'},
            {
                text: 'Java',
                ariaLabel: 'java',
                items: [
                    {text: 'JavaSE', link: '/java/javase/'},
                    {text: 'Effective Java', link: '/java/effectivejava/'},
                    {text: 'Vert.x', link: '/java/vertx/'}
                ]
            },
            {
                text: '数据库',
                ariaLabel: 'database',
                items: [
                    {text: 'PostgreSQL', link: '/database/postgresql/'}
                ]
            },
            // {
            //     text: '深度学习',
            //     ariaLabel: 'deeplearning',
            //     items: [
            //         {text: '深度学习入门', link: '/deeplearning/base/'}
            //     ]
            // },
            {
                text: '其他',
                ariaLabel: 'other',
                items: [
                    {text: 'Nginx', link: '/nginx/'},
                    {text: 'Docker', link: '/docker/'},
                    {text: 'Linux', link: '/linux/'}
                ]
            }
        ],
        sidebar: {
            '/java/javase/': [
                {
                    title: 'JavaSE',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/java/javase/', '简介'],
                        {
                            title: '集合',   // 标题
                            collapsable: false, // 是否可收起
                            sidebarDepth: 2,    // 展开层级
                            children: [
                                ['/java/javase/collection/default/Collection', 'Collection'],
                                ['/java/javase/collection/default/List', 'List'],
                                ['/java/javase/collection/default/Map', 'Map'],
                                ['/java/javase/collection/default/Queue', 'Queue'],
                                ['/java/javase/collection/default/Set', 'Set']
                            ]
                        },
                        {
                            title: '并发',   // 标题
                            collapsable: false, // 是否可收起
                            sidebarDepth: 2,    // 展开层级
                            children: [
                                ['/java/javase/concurrent/default/设计线程安全的类', '设计线程安全的类'],
                                ['/java/javase/concurrent/default/基础构建模块', '基础构建模块'],
                                ['/java/javase/concurrent/default/任务执行', '任务执行'],
                                ['/java/javase/concurrent/default/取消与关闭', '取消与关闭'],
                                ['/java/javase/concurrent/default/线程池的使用', '线程池的使用'],
                                ['/java/javase/concurrent/default/死锁', '死锁'],
                                ['/java/javase/concurrent/default/性能与可伸缩性', '性能与可伸缩性'],
                                ['/java/javase/concurrent/default/显式锁', '显式锁'],
                                ['/java/javase/concurrent/default/构建自定义的同步工具', '构建自定义的同步工具'],
                                ['/java/javase/concurrent/default/原子变量与非阻塞同步机制', '原子变量与非阻塞同步机制'],
                                ['/java/javase/concurrent/default/Executor框架', 'Executor框架'],
                                ['/java/javase/concurrent/default/Future框架', 'Future框架']
                            ]
                        },
                        {
                            title: '其他',   // 标题
                            collapsable: false, // 是否可收起
                            sidebarDepth: 2,    // 展开层级
                            children: [
                                ['/java/javase/other/default/static关键字', 'static关键字'],
                                ['/java/javase/other/default/泛型机制', '泛型机制'],
                                ['/java/javase/other/default/解决hash冲突的常用方法', '解决hash冲突的常用方法'],
                                ['/java/javase/other/default/三元运算符与类型转换', '三元运算符与类型转换']
                            ]
                        },
                        {
                            title: 'IO',   // 标题
                            collapsable: false, // 是否可收起
                            sidebarDepth: 2,    // 展开层级
                            children: [
                                ['/java/javase/io/default/NIO概述', 'NIO概述']
                            ]
                        }
                    ]
                }
            ],
            '/java/effectivejava/': [
                {
                    title: 'Effective Java',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/java/effectivejava/', '简介'],
                        ['/java/effectivejava/default/01_考虑用静态工厂方法代替构造器', '考虑用静态工厂方法代替构造器'],
                        ['/java/effectivejava/default/02_遇到多个构造器参数时考虑用构建器', '遇到多个构造器参数时考虑用构建器'],
                        ['/java/effectivejava/default/03_用私有构造器或者枚举类型强化Singleton属性', '用私有构造器或者枚举类型强化Singleton属性'],
                        ['/java/effectivejava/default/04_通过私有构造器强化不可实例化的能力', '通过私有构造器强化不可实例化的能力'],
                        ['/java/effectivejava/default/05_避免创建不必要的对象', '避免创建不必要的对象'],
                        ['/java/effectivejava/default/06_消除过期的对象引用', '消除过期的对象引用'],
                        ['/java/effectivejava/default/07_避免使用终结方法', '避免使用终结方法'],
                        ['/java/effectivejava/default/08_覆盖equals时请遵守通用约定', '覆盖equals时请遵守通用约定'],
                        ['/java/effectivejava/default/09_建议始终覆盖toString', '建议始终覆盖toString'],
                        ['/java/effectivejava/default/10_谨慎地覆盖clone', '谨慎地覆盖clone'],
                        ['/java/effectivejava/default/11_考虑实现Comparable接口', '考虑实现Comparable接口'],
                        ['/java/effectivejava/default/12_使类和成员的可访问性最小化', '使类和成员的可访问性最小化'],
                        ['/java/effectivejava/default/13_使可变性最小化', '使可变性最小化'],
                        ['/java/effectivejava/default/14_复合优先于继承', '复合优先于继承'],
                    ]
                }
            ],
            '/java/vertx/': [
                {
                    title: 'Vert.x',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/java/vertx/', '简介'],
                        ['/java/vertx/default/idleTimeout', 'idleTimeout, 一个可以将服务器干废的参数'],
                        ['/java/vertx/default/在vertx中使用虚拟线程', '在vertx中使用虚拟线程']
                    ]
                }
            ],
            '/database/postgresql/': [
                {
                    title: 'PostgreSQL',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/database/postgresql/', '简介'],
                        ['/database/postgresql/default/install', '安装'],
                        ['/database/postgresql/default/备份与恢复', '备份与恢复'],
                        ['/database/postgresql/default/远程连接中断问题', '远程连接中断问题'],
                        ['/database/postgresql/default/like查询优化', 'like查询优化'],
                        ['/database/postgresql/default/创建自增序列', '创建自增序列'],
                        ['/database/postgresql/default/自增变量导致插入失败问题', '自增变量导致插入失败问题'],
                        ['/database/postgresql/default/垂直分表', '垂直分表'],
                        ['/database/postgresql/default/两表关联更新', '两表关联更新'],
                        ['/database/postgresql/default/常用函数', '常用函数']
                    ]
                }
            ],
            '/deeplearning/base/': [
                {
                    title: '深度学习入门',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/deeplearning/base/', '什么是深度学习'],
                        ['/deeplearning/base/default/神经网络的数学基础', '神经网络的数学基础'],
                        ['/deeplearning/base/default/张量运算', '神经网络的“齿轮”：张量运算']
                    ]
                }
            ],
            '/docker/': [
                {
                    title: 'Docker',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/docker/', '简介'],
                        ['/docker/default/基本概念', '基本概念'],
                        ['/docker/default/常用操作', '常用操作'],
                        ['/docker/default/docker_run', 'docker run 详解'],
                        ['/docker/default/Dockerfile', 'Dockerfile']
                    ]
                }
            ],
            '/nginx/': [
                {
                    title: 'Nginx',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/nginx/', '简介'],
                        ['/nginx/default/获取免费SSL证书', '获取免费SSL证书'],
                        ['/nginx/default/反向代理TCP、UDP', '反向代理TCP/UDP'],
                        ['/nginx/default/反向代理获取客户端真实IP', '反向代理获取客户端真实IP']
                    ]
                }
            ],
            '/linux/': [
                {
                    title: 'Linux',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/linux/', '简介'],
                        ['/linux/default/搭建nfs共享存储', '搭建nfs共享存储']
                    ]
                }
            ]
        }
    },
    plugins: [
        '@vuepress/back-to-top',
        '@vuepress/nprogress',
        '@xiaopanda/vuepress-plugin-code-copy'
    ]
}

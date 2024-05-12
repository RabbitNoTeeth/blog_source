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
                    {text: 'JavaSE', link: '/java/javase/collection/default/Collection/'},
                    {text: 'Vert.x', link: '/java/vertx/'}
                ]
            },
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

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
                        ['/java/javase/collection/', '简介'],
                        ['/java/javase/collection/default/Collection', 'Collection'],
                        ['/java/javase/collection/default/List', 'List'],
                        ['/java/javase/collection/default/Map', 'Map'],
                        ['/java/javase/collection/default/Queue', 'Queue'],
                        ['/java/javase/collection/default/Set', 'Set']
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
                        ['/nginx/default/代理TCP|UDP', '代理TCP/UDP'],
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

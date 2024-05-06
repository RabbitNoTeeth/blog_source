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
                text: '我写了这些 ↓',
                ariaLabel: 'development',
                items: [
                    {text: 'vertx', link: '/vertx/'},
                    {text: 'nginx', link: '/nginx/'},
                    {text: 'docker', link: '/docker/'},
                    {text: 'linux', link: '/linux/'}
                ]
            }
        ],
        sidebar: {
            '/vertx/': [
                {
                    title: 'vertx',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/vertx/', '简介'],
                        ['/vertx/default/idleTimeout', 'idleTimeout, 一个可以将服务器干废的参数'],
                        ['/vertx/default/在vertx中使用虚拟线程.md', '在vertx中使用虚拟线程']
                    ]
                }
            ],
            '/docker/': [
                {
                    title: 'docker',   // 标题
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
                    title: 'nginx',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/nginx/', '简介'],
                        ['/nginx/default/获取免费SSL证书', '获取免费SSL证书'],
                        ['/nginx/default/代理TCP|UDP', '代理TCP/UDP']
                    ]
                }
            ],
            '/linux/': [
                {
                    title: 'linux',   // 标题
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

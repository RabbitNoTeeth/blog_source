module.exports = {
    title: 'RabbitNoTeeth′s Blog',
    description: '刘新冬的技术博客，记录学习笔记以及开发中遇到的各种技术问题',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        logo: '/img/logo.png',
        nav: [
            {text: '首页', link: '/'},
            {
                text: '开发小能手',
                ariaLabel: 'development',
                items: [
                    {text: 'docker', link: '/docker/'}
                ]
            }
        ],
        sidebar: {
            '/docker/': [
                {
                    title: 'docker',   // 必要的
                    collapsable: false, // 可选的, 默认值是 true,
                    sidebarDepth: 2,    // 可选的, 默认值是 1
                    children: [
                        ['/docker/', '简介'],
                        ['/docker/基本概念', '基本概念'],
                        ['/docker/常用命令', '常用命令']
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

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
                    title: 'docker',   // 标题
                    collapsable: false, // 是否可收起
                    sidebarDepth: 2,    // 展开层级
                    children: [
                        ['/docker/', '简介'],
                        ['/docker/default/基本概念', '基本概念'],
                        ['/docker/default/常用命令', '常用命令'],
                        ['/docker/default/docker_run参数详解', 'docker run 参数详解'],
                        ['/docker/default/Dockerfile', 'Dockerfile']
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

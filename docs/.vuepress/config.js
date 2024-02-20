module.exports = {
    title: 'RabbitNoTeeth′s blog',
    description: '刘新冬的技术博客，记录学习笔记以及开发中遇到的各种技术问题',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.ico'}]
    ],
    themeConfig: {
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
                    sidebarDepth: 1,    // 可选的, 默认值是 1
                    children: [
                        ['/docker/', '简介'],
                        ['/docker/aaa', 'aaa文章'],
                        ['/docker/bbb', 'bbb文章'],
                    ]
                }
            ]
        }
    }
}

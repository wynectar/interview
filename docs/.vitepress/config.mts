import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "面试进行时",
  description: "Interview in progress",
  head: [['link', { rel: 'icon', type: 'image/png', href: '/favicon.png' }]],
  markdown: {
    math: true,
  },
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.svg',
    outline: { label: '页面导航' },
    nav: [
      // { text: '首页', link: '/' },
      { text: '法律维权🔥', link: '/law/contract' }
    ],

    sidebar: [
      {
        text: '面试准备',
        items: [
          { text: '了解面试流程', link: '/before-interview/process' },
          { text: '分析 JD 招聘要求', link: '/before-interview/jd' },
          { text: '书写简历', link: '/before-interview/cv' }
        ]
      },
      {
        text: '数据结构与算法',
        items: [
          { text: '算法基础', link: '/algorithm-structure/basic' },
          { text: '数组&字符串', link: '/algorithm-structure/array-string' },
          { text: '链表&双指针', link: '/algorithm-structure/link-pointer' },
          { text: '栈&队列', link: '/algorithm-structure/stack-queue' },
          { text: '二叉树', link: '/algorithm-structure/tree' },
          { text: '其他', link: '/algorithm-structure/other' },
        ]
      },
      {
        text: '前端',
        items: [
          { 
            text: '笔试', 
            items: [
              { text: 'JS手写代码', link: '/front-end/write-code' },
              { text: 'JS读代码', link: '/front-end/read-code' }
            ] 
          },
          { 
            text: '一面', 
            items: [
              { text: '计算机基础', link: '/front-end/one-base' },
              { text: 'HTML & CSS', link: '/front-end/one-httpcss' },
              { text: 'JS基础', link: '/front-end/one-js' },
              { text: 'TS', link: '/front-end/one-ts' },
              { text: 'HTTP网络请求', link: '/front-end/one-http' },
            ] 
          },
          { 
            text: '二面', 
            items: [
              { text: 'Vue使用', link: '/front-end/two-vue-use' },
              { text: 'Vue原理', link: '/front-end/two-vue-principle' },
              { text: 'React使用', link: '/front-end/two-react-principle' },
              { text: 'React原理', link: '/front-end/two-react-principle' },
              { text: '小程序', link: '/front-end/two-app' },
              { text: '前端工程化', link: '/front-end/two-engineering' },
              { text: 'Node.js', link: '/front-end/two-nodejs' },
            ] 
          },
          { 
            text: '三面', 
            items: [
              { text: '交叉面试', link: '/front-end/three-more' },
              { text: '项目成绩/难点', link: '/front-end/three-project' },
              { text: '前端Leader面试', link: '/front-end/three-leader' },
              { text: '反问面试官', link: '/front-end/three-ask' },
            ] 
          },
        ]
      },
      {
        text: '后端',
        link: '/back-end/index'
      },
      {
        text: 'HR面试',
        items: [
          { text: '行为面试', link: '/hr-interview/behavior' },
          { text: '谈薪技巧', link: '/hr-interview/skill' }
        ]
      },
      {
        text: '法律维权🔥',
        items: [
          { text: '劳动合同的订立', link: '/law/contract' },
          { text: '劳动合同的解除和终止', link: '/law/lift' },
          { text: '劳动法', link: '/law/rights' }
        ]
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],

    search: {
      provider: 'local',
      options: {
        miniSearch: {
          /**
           * @type {Pick<import('minisearch').Options, 'extractField' | 'tokenize' | 'processTerm'>}
           */
          options: {
            /* ... */
          },
          /**
           * @type {import('minisearch').SearchOptions}
           * @default
           * { fuzzy: 0.2, prefix: true, boost: { title: 4, text: 2, titles: 1 } }
           */
          searchOptions: {
            /* ... */
          }
        }
      }
    }
  }
})

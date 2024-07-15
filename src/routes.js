import {createRouter, createWebHistory} from 'vue-router'
import notFound from "@/components/notFound";

const routes = [
    {
        path: '/', name: 'entrance', component: () => import('@/components/entrance'),
        children: [
            {
                path: '/', component: () => import('@/components/home'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: '/circle/:id(\\d+)' + '.html', component: () => import('@/components/singlepage/detailPage'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: '/user/:id(\\d+)' + '.html', component: () => import('@/components/singlepage/userPage'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: '/home' + '.html', name: 'home', component: () => import('@/components/home'),
                meta: {
                    keepAlive: true
                },
            },
            {
                path: '/circle', name: 'circle', component: () => import('@/components/home'),
                meta: {
                    keepAlive: true
                },
            },
            {path: '/edit/:id(\\d+)' + '.html', component: () => import('@/components/singlepage/editPage'),},
            {
                path: '/notifications/:id' + '.html', component: () => import('@/components/user/msgDetail'), meta: {
                    keepAlive: true
                },
            },
            {
                path: '/circle.html', component: () => import('@/components/circleList'), meta: {
                    keepAlive: true
                },
            },
            {
                path: '/topic/:id' + '.html', component: () => import('@/components/singlepage/TopicContent'), meta: {
                    keepAlive: true
                },
            },

        ],
        meta: {
            keepAlive: true //如果需要缓存就是true 不需要缓存就是false
        },
    },
    {
        path: '/:pathMatch(.*)*' + '.html', name: 'notFound', component: notFound, meta: {
            keepAlive: true //如果需要缓存就是true 不需要缓存就是false
        },
    },
    {
        path: '/user/:id' + '.html', component: () => import('@/components/singlepage/userPage'),
        meta: {
            keepAlive: true //如果需要缓存就是true 不需要缓存就是false
        },
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

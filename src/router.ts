import {
    createMemoryHistory,
    createRouter,
    RouterOptions
} from "vue-router";

import HomePage from '@/views/HomePage.vue'
import ConvertPage from '@/views/ConvertPage.vue'

const routes = [
    {path: '/', component: HomePage },
    {path: '/convert', component: ConvertPage}
]


const router = createRouter(<RouterOptions>{
    history: createMemoryHistory(),
    routes,
    linkActiveClass: 'active-link'
})

export default router;

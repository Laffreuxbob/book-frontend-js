import { createRouter, createWebHistory} from "vue-router";
import List from "@/components/List";
import HomePage from "@/components/HomePage";
import AddForm from "@/components/AddForm";

const routes = [

    {
        path: '/',
        name: 'Home',
        component:  HomePage
    },
    {
        path: '/list',
        name: 'List',
        component:  List
    },
    {
        path: '/add',
        name: 'add',
        component:  AddForm
    },



]

const router = createRouter ( {
    history: createWebHistory(process.env.BASE_URL),
    routes
})


export default router
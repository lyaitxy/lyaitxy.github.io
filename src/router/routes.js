// import Home from '@/pages/Home'
// import Search from '@/pages/Search'
// import Register from '@/pages/Register'
// import Login from '@/pages/Login'
// import Detail from '@/pages/Detail'
// import AddCartSuccess from '@/pages/AddCartSuccess'
// import ShopCart from '@/pages/ShopCart'
// import Trade from '@/pages/Trade'
// import Pay from '@/pages/Pay'
// import PaySuccess from '@/pages/PaySuccess'
// import Center from '@/pages/Center'

//引入二级路由
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

//路由懒加载
const Home = () => import('@/pages/Home')
const Search = () => import('@/pages/Search')
const Register = () => import('@/pages/Register')
const Login = () => import('@/pages/Login')
const Detail = () => import('@/pages/Detail')
const AddCartSuccess = () => import('@/pages/AddCartSuccess')
const ShopCart = () => import('@/pages/ShopCart')
const Trade = () => import('@/pages/Trade')
const Pay = () => import('@/pages/Pay')
const PaySuccess = () => import('@/pages/PaySuccess')
const Center = () => import('@/pages/Center')


//路由配置信息
export default [
    {
        name:  'Center' ,
        path: '/center' ,
        component: Center,
        meta: {
            isShowFooter: true
        },
        //二级路由
        children:[
            {
                path: 'myorder',
                component: MyOrder
            },
            {
                path: 'grouporder',
                component: GroupOrder
            },
            {
                path: '/center' ,
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name:  'PaySuccess' ,
        path: '/paysuccess' ,
        component: PaySuccess,
        meta: {
            isShowFooter: true
        }
    },
    {
        name:  'Pay' ,
        path: '/pay' ,
        component: Pay,
        meta: {
            isShowFooter: true
        },
        //路由独享守卫
        beforeEnter: (to, from, next) => {
            if (from.path === '/trade') {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name:  'Trade' ,
        path: '/trade',
        component: Trade,
        meta: {
            isShowFooter: true
        },
        beforeEnter: (to, from, next) => {
            let path = from.path;
            if (path.indexOf('/shopcart') != -1 ) {
                next();
            } else {
                next(false);
            }
        }
    },
    {
        name: 'shopCart',
        path: '/shopcart',
        component: ShopCart,
        meta: {
            isShowFooter: true
        }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: Detail,
        meta: {
            isShowFooter: false
        }
    },
    {
        path: '/home',
        component: Home,
        meta: {
            isShowFooter: true
        }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {
            isShowFooter: true
        },
        name: 'search'

    },
    {
        path: '/register',
        component: Register,
        meta: {
            isShowFooter: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            isShowFooter: false
        }
    },
    {
        name: 'addCartSuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: {
            isShowFooter: true
        }
    },
    // 重定向，在地址栏输入localhost:8080/时，自动跳转到localhost:8080/home
    {
        path: '/',
        redirect: '/home'
    }
]    

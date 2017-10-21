// var addFun = require('./cacl');

// 从site.sass中导入sass文件
// require('../statics/css/site.scss');


// alert(addFun(1, 2));
// window.onload = function() {
//     // 获取=号元素
//     var btnok = document.getElementById('btnok');
//     // 获取计算结果元素
//     var res = document.getElementById('res');
//     // 给=号注册点击事件
//     btnok.onclick = function() {
//         // 获取v1中的值
//         var v1 = document.getElementById('v1').value;
//         // 获取v2中的值
//         var v2 = document.getElementById('v2').value;
//         // 试输出计算结果
//         console.log(addFun(v1, v2));
//         // 把结果输出到res框中
//         res.value = addFun(v1, v2);
//     }
// }

// 步骤1：导入 vue这个包
import Vue from 'vue';
// 步骤2：想要解析和呈现App.vue组件的内容，则导入 App.vue组件
import App from './App.vue';

// 路由包：
// 导入路由包
import vueRouter from 'vue-router';
// 将vueRouter和vue绑定起来
Vue.use(vueRouter);
// 定义路由规则
// 导入后台管理系统 的整体而已组件 
import layout from './components/admin/layout.vue'
// 导入login.vue组件对象
import login from './components/admin/account/login.vue'
// 导入goodslist.vue
import goodslist from './components/admin/goods/goodslist.vue'
// 导入goodsadd.vue
import goodsadd from './components/admin/goods/goodsadd.vue'

var router = new vueRouter({
    routes: [
        { name: 'default', path: '/', redirect: '/admin/layout' },
        { name: 'login', path: '/login', component: login },
        {
            name: 'layout',
            path: '/admin/layout',
            component: layout,
            children: [
                { name: 'goodslist', path: 'goodslist', component: goodslist },
                { name: 'goodsadd', path: 'goodsadd', component: goodsadd },
            ]
        },
    ]
});


// 2.axios的使用
// 2.1导入axios包
import axios from 'axios';
// 2.2设定axios的基本的url请求前缀
axios.defaults.baseURL = 'http://157.122.54.189:9095';
// 2.3想要在将来的每个 子组件 中的方法中均可以使用this.$http去调用其它方法执行ajax请求
// 就要将axios对象持载到vue 的原型属性$http上
Vue.prototype.$http = axios;

// 2.4 绑定到vue上
Vue.use(axios);

// 3.0 使用elementUI这个ui框架的步骤
// 3.1 导包
import elementUI from 'element-ui';
// 3.2 忖入elementui的css控制样式
import 'element-ui/lib/theme-default/index.css';

// 从site.css中导入css文件
require('../statics/css/site.css');

// 从site.less中导入less文件
require('../statics/css/site.less');

// 3.3 绑定
Vue.use(elementUI);

new Vue({
    el: '#app',
    router: router,
    // 使用app这个组件对象
    // es5的写法
    // render:function(create){create(App);}

    // es6的写法
    render: create => create(App),

});
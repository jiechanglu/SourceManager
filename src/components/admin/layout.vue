<template>
    <div class="tmpl" id="layout">
        <el-row>
            <!-- 1。左边区域 -->
            <el-col :span="leftcol">
                 <img src="../../../statics/imgs/logo.png" id="logo">
                 <div class="layout menu">
                        <el-menu default-active="1-1" class="el-menu-vertical-demo" :collapse="iscollapse" >
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-message icon"></i>购物商城
                                </template>
                            <el-menu-item-group>
                                <el-menu-item index="1-1">内容管理</el-menu-item>
                                <el-menu-item index="1-2">类别管理</el-menu-item>
                                <el-menu-item index="1-3">评论管理</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-message icon"></i>订单管理
                                </template>
                            <el-menu-item-group>
                                <el-menu-item index="2-1">订单列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        </el-menu>
                </div>  
            </el-col>
            <!-- 2。右边区域 -->
            <el-col :span="rightcol">
                <!-- <div class="grid-content bg-purple-light"></div> -->
                <!-- 顶部第一行 -->
                <el-row>
                        <el-col :span="24">
                            <div class="topbg">
                                <el-row>
                                    <el-col :span="1">
                                        <!-- 控制菜单的展开和收缩图标 -->
                                        <i @click="showhide" class="el-icon-menu layout area"></i>
                                    </el-col>
                                    <el-col :span="23">
                                       <span style="font-size:15px;">欢迎<span>{{username}}</span>登录</span> 
                                       <el-dropdown split-button type="primary">
                                            更多
                                            <el-dropdown-menu slot="dropdown">                                          
                                              <el-dropdown-item>修改密码</el-dropdown-item>
                                              <el-dropdown-item>注销登录</el-dropdown-item>                                       
                                            </el-dropdown-menu>
                                          </el-dropdown>
                                    </el-col>
                                </el-row>
                            </div>
    
                        </el-col>
                        
                    </el-row>
                    <router-view></router-view>
                </el-col>
        </el-row>
    </div>
</template>
<!-- 禁止UIScrollView垂直方向滚动，只允许水平方向滚动

scrollview.contentSize =  CGSizeMake(你要的长度, 0);

禁止UIScrollView水平方向滚动，只允许垂直方向滚动

scrollview.contentSize =  CGSizeMake(0, 你要的宽度);

作者：MO了不起
链接：http://www.jianshu.com/p/2ee8b7a6dfe1
來源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。 -->
<script>
    export default {
        data() {
            return {
                // 这个属性主要是用来控制el-menu菜单的展开和收缩的
                // false: 展开  true:收缩
                iscollapse: false,
                // 控制左边菜单栏的宽度的
                leftcol: 4,
                // 控制右边菜单栏的宽度的
                rightcol: 20,
                username:'admin'
            }
        },
        methods: {
            showhide() {
                //    1.0控制菜单的展开和收缩
                this.iscollapse = !this.iscollapse;

                //    2.0 当菜单是收缩状态的时候，leftcol等于1 rightcol=23
                if (this.iscollapse) {
                    this.leftcol = 1;
                    this.rightcol = 23;
                    // 设置图片宽度为三倍宽
                    document.getElementById('logo').style.width = "300%";

                } else {
                    // 3.0 当菜单是展开状态的时候，leftcol等于4 rightcol=20
                    this.leftcol = 4;
                    this.rightcol = 20;
                    // 设置图片宽度变为原型
                    document.getElementById('logo').style.width = "100%";
                    
                }
            },
        }
    }
</script>
<style scoped>
    #layout{
        height: 100%;
        overflow: hidden;
    }
    img{
        width: 100%;
        height: 42px;
    }
    .icon{
        color:white !important;
    }
</style>
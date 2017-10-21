<template>
    <div class="tmpl">
        <!-- 第二行 -->
        <el-row>
            <el-col span="24">
                <!-- 下面是gooslist补充的内容 -->
                <div class="abread bt-line">
                        <el-breadcrumb separator="/">
                            <el-breadcrumb-item :to="{ path: '/admin/layout' }">购物商城</el-breadcrumb-item>
                            <el-breadcrumb-item>首页</el-breadcrumb-item>
                            <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                        </el-breadcrumb>
                </div>
                <!-- <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>活动管理</el-breadcrumb-item>
                    <el-breadcrumb-item>活动列表</el-breadcrumb-item>
                    <el-breadcrumb-item>活动详情</el-breadcrumb-item>
                  </el-breadcrumb> -->
            </el-col>
        </el-row>
        <!-- 第三行：编辑及搜索行 -->
        <div class="t">
        <div class="operation">
        <el-row>
            <el-col :span="9">
                <!-- 下面是gooslist补充的内容 -->
                <!-- <span class="wrapper"> -->
                    <el-button type="info"><i class="el-icon-plus icon"></i> <router-link to="/admin/layout/goodsadd">新增</router-link></el-button>
                    <el-button type="success" @click="allSel"><i class="el-icon-check icon"></i> 全选</el-button>
                    <el-button type="danger" @click="delRow"><i class="el-icon-delete icon"></i> 删除</el-button>
                <!-- </span> -->
            </el-col>
            <el-col :span="5" :offset="10">
                    <el-input
                    placeholder="请输入搜索内容"
                    icon="search"
                    v-model="searchvalue">
                  </el-input>
                </el-col>
        </el-row>
        </div></div>

        <!-- 第四行 -->
        <el-row>
            <div class="table" style="padding:10px;">
                <el-row>
                <el-col :span="24">
                    <el-table
                        id="all"
                        ref="multipleTable"
                        :data="list"
                        border
                        tooltip-effect="dark"
                        @selection-change="getrows"
                        style="width: 100%;height:400px;overflow-y:scroll;">
                        <el-table-column
                        type="selection"
                        width="55">
                        </el-table-column>
                        <el-table-column prop="title" label="标题">
                            <!-- 这个div不能添加 否则router-link不能起作用 -->
                            <!-- <div class="iconProp"> -->
                                <template scope='scope'>
                                    <router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                                        {{ scope.row.title }}
                                    </router-link>
                                </template>
                            <!-- </div> -->
                        </el-table-column>
                        <el-table-column prop="categoryname" label="类别" width="100">
                            </el-table-column>
                        <el-table-column label="发布人/发布时间"  width="200">
                            <template scope="scope">
                                {{scope.row.user_name }}  / {{scope.row.add_time | datefmt('-')}}
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="属性" width="140">
                            <template scope="scope">
                                    <el-tooltip class="item" effect="dark" content="轮播图" placement="bottom">
                                        <i v-bind="{class:scope.row.is_slide == 1 ?'el-icon-picture on icon':'el-icon-picture off icon'}"></i>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="置顶" placement="bottom">
                                            <i v-bind="{class:scope.row.is_top == 1 ?'el-icon-upload on icon':'el-icon-upload off icon'} "></i>
                                    </el-tooltip>
                                    <el-tooltip class="item" effect="dark" content="推荐" placement="bottom">
                                            <i v-bind="{class:scope.row.is_hot == 1 ?'el-icon-star-on on icon':'el-icon-star-on off icon'} "></i>
                                    </el-tooltip>
                            </template>
                        </el-table-column>
                            <el-table-column label="操作" width="80">
                        <template scope="scope">
                            <!-- 下面的按钮添加一个size属性定义按钮大小 可以为small mini -->
                                <el-button type="success" size="small"><router-link v-bind="{to:'/admin/goodsedit/'+scope.row.id}">
                                    修改
                                </router-link></el-button> 
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="block" style="margin:20px auto;">
                            <el-pagination
                              @size-change="handleSizeChange"
                              @current-change="handleCurrentChange"
                              :current-page="currentPage"
                              :page-sizes="pageSizes"
                              :page-size="pageSize"
                              layout="total, sizes, prev, pager, next, jumper"
                              :total="totalcount">
                            </el-pagination>
                          </div>
                </el-col>
            </el-row>
        </div>
        </el-row>
        <!-- 第四行结束 -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                searchvalue:'',
                list:[],
                pageCount:10,
                totalpage:2,
                totalcount:17,
                pageSizes:[5,10],
                pageSize:10,
                currentPage:1,
                // 获取删除数据商品的id字符串，多个id之间使用逗号分隔
                // ids:''
                ids:''
            }
        },
        filters:{
            // 定义私有过滤器 时间格式 filters为一个对象 过滤器为一个方法 其中有个型参为要过滤的对象 第二个型参为分割字符串
            datefmt: function(input,charsplit) {
                var date = new Date(input);
                var y = date.getFullYear();
                var m = date.getMonth()+1;
                var d = date.getDate();
                return y + charsplit + m + charsplit + d;
            }
        },
        methods: {
            // 添加删除数据方法
            delRow(){
                alert('你要删除的id为'+this.ids);
                // var rowsid = this.getrows(rows);
                // this.$http.get('/admin/goods/del/:'+this.ids,function(){
                //     alert('Are you Sure');
                // }).then(res=>{
                //     if(res.data.status == 0){
                //         alert('删除成功');
                //     }else{
                //         alert('删除失败');
                //     }
                // });
            },
            getrows(rows){
                // console.log(rows);
                // 在每次事件触发完后清空，不叠加
                this.ids = '';
                var splitchar = ',';
                for(var i = 0; i < rows.length; i++){
                    if(i == rows.length-1){
                        splitchar = '';
                    }
                    this.ids += rows[i].id+splitchar;
                }
                // console.log(this.ids);
            },
            getlist(){
                var url  ='/admin/goods/getlist?pageIndex='+this.currentPage+'&pageSize='+this.pageSize+'&searchvalue=';
                this.$http.get(url).then(res=>{
                    if(res.data.status == 1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 正常逻辑处理
                    this.list = res.data.message;
                    console.log(res.data);
                    this.totalpage = Math.ceil(res.data.totalcount/this.pageCount);
                    this.totalcount = res.data.totalcount;
                })
            },
            handleCurrentChange(page){
                this.currentPage = page;
                // 当当前页数发生改变的时候，触发这个事件然后重新请求列表数据
                this.getlist();
            },
            handleSizeChange(size){
                // 当显示数量发生改变的时候，注意要把当前页重置为1，然后重新请求列表数据
                this.currentPage = 1;
                this.pageSize = size;
                this.getlist();
            },
            allSel(){
                // alert('全选');
                var checkBoxs1 = document.getElementsByClassName('el-checkbox__input');
                for(var i = 0; i < checkBoxs1.length; i++){
                    if(checkBoxs1[i].classList.contains('is-checked')){
                        checkBoxs1[i].classList.remove('is-checked')
                    }else{
                        checkBoxs1[i].classList.add('is-checked');
                    }
                }
            },
            tableRowClassName(row,index){
                if(index % 2 == 0){
                    return 'info-row';
                }else{
                    return 'positive-row';
                }
            }
        },
        created:function(){
            this.getlist();
        }
    }
</script>
<style scoped>
   
</style>
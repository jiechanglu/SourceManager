<template>
    <div class="tmpl">
        <!-- this is goodsadd.vue -->
        <!-- 第二行 -->
        <el-row>
            <el-col span="24">
                <!-- 下面是gooslist补充的内容 -->
                <div class="abread bt-line">
                    <el-breadcrumb separator="/">
                        <el-breadcrumb-item :to="{ path: '/admin/layout' }">返回上一层</el-breadcrumb-item>
                        <el-breadcrumb-item>购物商城</el-breadcrumb-item>
                        <el-breadcrumb-item>首页</el-breadcrumb-item>
                        <el-breadcrumb-item>新增内容</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </el-col>
        </el-row>
        <!-- 第三行：编辑及搜索行 -->
        <div class="t">
            <div class="operation">
                <div class="goodsadd">
                    <el-row>
                        <el-col :span="20">
                            <!-- 下面表单中:inline属性可设置为行内块样式表单即左右文字结构 -->
                            <el-form :inline="true" :model="form" :rules="rules" ref="name" class="demo-form-inline">
                                <el-row>
                                    <div class="first">
                                        <el-col :span="12">
                                            <!-- 注意：要验证的表单元素需要添加 prop属性才能验证 -->
                                            <el-form-item prop="title" label="内容标题" required>
                                                <el-input v-model="form.title" placeholder="请输入内容标题(必填)"></el-input>
                                            </el-form-item>

                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="副标题">
                                                <el-input placeholder="请输入副标题" v-model="form.sub_title"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-row>
                                <!-- 第一行输入结束 -->
                                <!-- 第二行输入开始 -->
                                <el-row>
                                    <div class="local">
                                        <el-col :span="11">
                                            <el-form-item label="所属类型" required>
                                                <el-select v-model="form.category_id" placeholder="请选择">
                                                    <el-option v-for="(item,index) in categoryList" :label="item.title" :value="item.category_id"><span v-for="count in (item.class_layer-1)">&nbsp;&nbsp;&nbsp;</span>
                                                        <span
                                                            v-if="item.class_layer>1">|-</span>{{item.title}}
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>

                                        </el-col>
                                        <el-col :span="5">
                                            <el-form-item label="是否发布" prop="delivery">
                                                <el-switch on-text="是" off-text="否" v-model="form.status"></el-switch>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="8">
                                            <el-form-item label="推荐类型" prop="delivery">
                                                <el-switch on-text="轮播图" off-text="轮播图" v-model="form.is_slide"></el-switch>
                                                <el-switch on-text="置顶" off-text="置顶" v-model="form.is_top"></el-switch>
                                                <el-switch on-text="推荐" off-text="推荐" v-model="form.is_hot"></el-switch>
                                            </el-form-item>
                                        </el-col>
                                    </div>
                                </el-row>
                                <!-- 第二行输入结束 -->
                                <!-- 第三行开始 -->
                                <div class="upload">
                                    <el-row>
                                        <el-col :span="11">
                                            <el-form-item label="上传封面">
                                                <el-upload class="upload-demo" action="http://157.122.54.189:9095/admin/article/uploadimg" :file-list="form.imgList" :on-success="imgUploaded"
                                                    list-type="picture">
                                                    <el-button size="small" type="primary">点击上传</el-button>
                                                    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                                                </el-upload>
                                            </el-form-item>

                                        </el-col>
                                        <el-col :span="11">
                                            <el-form-item label="图片相册">
                                                <el-upload action="http://157.122.54.189:9095/admin/article/uploadimg" :on-success="fileUploaded" :file-list="form.fileList"
                                                    list-type="picture">
                                                    <el-button size="small" type="primary">点击上传</el-button>
                                                    <div slot="tip" class="el-upload__tip">只能上传图片文件</div>
                                                </el-upload>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 第三行结束 -->
                                <!-- 第四行开始 -->
                                <div class="productIfo">
                                    <el-row>
                                        <el-col :span="6">
                                            <el-form-item prop="goods_no" label="商品货号">
                                                <el-input v-model="form.goods_no"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item prop="stock_quantity" label="库存数量">
                                                <el-input v-model="form.stock_quantity"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item prop="market_price" label="市场价格">
                                                <el-input v-model="form.market_price">0</el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="6">
                                            <el-form-item prop="sell_price" label="销售价格">
                                                <el-input v-model="form.sell_price">0</el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 第四行结束 -->
                                <!-- 第五行开始 -->
                                <div class="areaText">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="内容摘要" prop="title" required>
                                                <el-input type="textarea" v-model="form.zhaiyao"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 第五行结束 -->
                                <!-- 第六行开始 -->
                                <div class="areaText">
                                    <el-row>
                                        <el-col :span="24">
                                            <el-form-item label="详细内容" prop="title" required>
                                                <quill-editor v-model="form.content"></quill-editor>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                </div>
                                <!-- 第五行结束 -->
                                <el-row>
                                    <el-col :offset="2">
                                            <el-form-item>
                                                    <el-button type="primary" @click="">提交保存</el-button>
                                                    <el-button type="warning" @click="">返回上一页</el-button>
                                                    <el-button type="danger" @click="">重置</el-button>
                                                </el-form-item>
                                    </el-col>
                                </el-row>
                            </el-form>
                            <!-- 表单结束 -->
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // 引入已安装好的第三方插件
    import { quillEditor } from 'vue-quill-editor'
    export default {
        data() {
            // 自定义表单验证
            var checkNumber = (rule,value,callback)=>{
                if(!value){
                    return callback(new Error('不能为空'));
                }
                if(isNaN(value)){
                    return callback(new Error('输入的值必须为一个数字'));
                }
                else{
                    callback();
                }
            };
            return {
                categoryList: [],
                form: {
                    title: "",
                    sub_title: "",
                    goods_no: "0",
                    category_id: "",
                    stock_quantity: 0,
                    market_price: 0,
                    sell_price: 0,
                    status: true,
                    is_slide: true,
                    is_top: false,
                    is_hot: true,
                    zhaiyao: "",
                    content: "",
                    class_layer: '',
                    imgList: [],
                    fileList: []
                },
                rules: {
                    title: [
                        { required: true, message: '内容不能为空', trigger: 'blur' },
                    ],
                    goods_no: [
                        { required: true, message: '商品编号不能为空', trigger: 'blur' },
                    ],
                    // 导入自定义表单验证
                    stock_quantity: [
                        { validator:checkNumber, trigger: 'blur' }
                    ],
                    market_price: [
                        { validator:checkNumber, trigger: 'blur' }
                    ],
                    sell_price: [
                        { validator:checkNumber, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            imgUploaded: function () { },
            fileUploaded: function () { },
            // 新增分类方法
            getCatelist: function () {
                this.$http.get('/admin/category/getlist/goods').then(res => {
                    // alert(111);
                    // console.log(res.data);
                    this.categoryList = res.data.message;
                    console.log(this.categoryList)

                });
            }
        },
        created: function () {
            this.getCatelist();
        },
        // 导入富文本编辑框
        components: {
            quillEditor
        }
    }

</script>
<style scoped>

</style>
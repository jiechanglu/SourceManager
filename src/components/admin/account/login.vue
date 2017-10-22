<template>
    <div class="login">
        <div class="img">
            <img src="../../../../statics/imgs/logo.png" alt="">
        </div>
        <el-row>
            <el-col :span="6" :offset="9">
                <div class="inner">
                    <!-- 注意下面的 :model="form必须得添加上去 不然不能验证生效及登录生效" -->
                    <el-form :inline="true"  :model="form" :rules="rules" ref="ruleForm">
                        <el-form-item label="账号" prop="uname">
                            <el-input placeholder="请输入账号" v-model="form.uname"></el-input>
                        </el-form-item>
                        <el-form-item label="密码" prop="upwd">
                            <el-input placeholder="请输入密码" v-model="form.upwd"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="success" @click="login">登录</el-button>
                            <el-button type="danger" @click="resetForm('ruleForm')">重置</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    uname: '',
                    upwd: ''
                },
                rules: {
                    uname: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    upwd: [
                        { required: true, message: '密码不能为空', trigger: 'blur' }
                    ]
                },
            }
        },

        methods: {
            login() {
                // 登录前先进行表单验证步骤
                this.$refs.ruleForm.validate(valid => {
                    if (valid) {
                        // 将用户名和密码post请求到登录接口
                        // alert('你现在可以登录了');
                        this.$http.post('/admin/account/login',this.form)
                        .then(res=>{
                            if(res.data.status == 1){
                                // 下面的$message是element UI里面的报错功能
                                this.$message.error(res.data.message);
                                return;
                            }
                            // 若成功则跳转到登录成功后页面 （使用vue-router的编程式导航）
                            this.$router.push({name:'goodslist'});
                        })
                    }else{
                        return false;
                    }
                })
            },
             // 重置表单元素
             resetForm(formref) {
                this.$refs[formref].resetFields();
            },
        }
    }

</script>
<style scoped>
    body {
        overflow: hidden;
    }

    .login .img {
        text-align: center;
        margin-bottom: 10px;
    }

    .login {
        padding-top: 100px;
        width: 100%;
        height: 540px;
        /* background-color: #56A6DF; */
        background-color: #267cb7;
    }

    .el-form-item__label {
        color: white;
    }

    .login .el-input,
    .el-input__inner {
        width: 300px;
    }

    .inner {
        padding: 15px;
        border: 1px solid red;
        border-radius: 5px;
    }
</style>
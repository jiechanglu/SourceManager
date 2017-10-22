<template>
    <div class="tmpl">
        <el-form :inline="true">
            <el-row>
                <el-col :span="8" :offset="8">
                    <el-form-item required label="账号">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item required label="密码">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-button type="primary"></el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        methods: {
            login(){
                // 登录前先进行表单验证步骤
                this.$refs.form1.validate(valid=>{
                    if(valid){

                    }
                })
            }
        }
    }
</script>
<style scoped>
</style>
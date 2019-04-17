<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">后台管理系统</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username">
                        <el-button slot="prepend" icon="el-icon-lx-people"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="submitForm('ruleForm')">
                        <el-button slot="prepend" icon="el-icon-lx-lock"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="login-tips">Tips : 用户名和密码随便填。</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    import {mapMutations, mapGetters} from 'vuex';
    import configData from '@/assets/config.json';
    import jsrsasign from 'jsrsasign';

    export default {
        data: function () {
            return {
                expo: '',
                keytoken: '',
                modu: '',
                ruleForm: {
                    username: 'admin',
                    password: '123123'
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            this.getkey();
        },
        computed: {
            ...mapGetters(['userInfo'])
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //let code = this.enctype(this.keytoken, this.ruleForm.password);
                        //console.log(code);
                        let params = {
                            deviceType: configData.deviceType,
                            deviceID: configData.deviceID,
                            deviceDesc: configData.deviceDesc,
                            appVersion: configData.appVersion,
                            app_name: configData.app_name,
                            extCode: configData.extCode,
                            capp_id: configData.capp_id, //应用ID  应用二级目录 gx_yunexam
                            loginName: this.ruleForm.username,
                            password: this.ruleForm.password,
                        }
                        //const url;
                        this.$br_axios.br_axios_post("token/register.do", params).then(data => {
                            // url = data.data;
                        }).catch(e => {
                            this.url = e.data;
                            debugger
                        })
                        console.log(this.url);
                        localStorage.setItem('ms_username', this.ruleForm.username);
                        this.$router.push('/');
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            getkey() {
                this.$br_axios.br_axios_post("brsecure/get.do", {}).then(data => {
                    this.modu = data.data.modu;
                    this.expo = data.data.expo;
                    this.keytoken = data.data.keytoken;
                })
            },
            enctype(k, data) {
                debugger
                let rsa = new jsrsasign.RSAKey();
                // 将密钥转码
                rsa = KEYUTIL.getKey(k);
                // 创建Signature对象，设置签名编码算法
                let sig = new rsa.KJUR.crypto.Signature({"alg": "SHA256withRSA"});
                // 初始化
                sig.init(rsa)
                // 传入待加密字符串
                sig.updateString(data)
                // 生成密文
                let sign = hextob64(sig.sign());
                // 对加密后内容进行URI编码
                return encodeURIComponent(sign);
            },
            // encrypt(data) {
            //     setMaxDigits(130);
            //     let key = new RSAKeyPair(this.expo, "", this.modu);
            //     return encryptedString(key, encodeURIComponent(data));
            // },
            ...mapMutations({set_userInfo: 'SET_USERINFO'}),
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        color: #fff;
        border-bottom: 1px solid #ddd;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
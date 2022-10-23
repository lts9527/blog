<template>
  <div>
    <Test ref="child"></Test>
    <div class="fr5g6jiA0WO8I5j8xFyEG">
      <div class="_38I18Pd760wgL69y-7BZQk">欢迎登录</div>
      <div class="_2dwZR1zkHPNhGvOXPg5e4j"></div>
      <form class="form" onsubmit="return false">
        <div class="form-item">
          <label for="username" class="form-item-label">
            用户名或邮箱
            <span class="form-item-required">*</span>
          </label>
          <div class="form-item-control">
            <input type="text" placeholder="user@example.com" class="input" v-model="user.username" />
          </div>
        </div>
        <div>
          <label class="form-item-label" for="password">
            密码
            <span class="form-item-required">*</span>
          </label>
          <div class="form-item-control">
            <!-- <div class="input-password has-icons-right"> -->
            <input placeholder="Password" type="password" class="input" v-model="user.password" />
            <span class="icon is-small icon-clickable is-right"></span>
            <!-- </div> -->
          </div>
        </div>
        <div class="imWMl8_1QGHj_KomPh1Qt">
          <button @click="login" class="button button-control button-size-normal" type="submit">
            <div class="button-content">登录</div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import Test from "@/components/notification/notification.vue";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  components: {
    Test,
  },
  methods: {
    ...mapActions("userModule", { userlogin: "login" }),
    login() {
      // 请求api
      this.userlogin(this.user)
        .then(() => {
          // 跳转首页
          this.$router.replace({ name: "home" });
        })
        .catch((err) => {
          // this.$refs.child.alertTipFun({
          //   type: "error",
          //   msg: err.response ? err.response.data.msg : err,
          // });
          let msg = err.response ? err.response.data.msg : err;
          this.$dialog.message.error(msg, {
            position: "top",
          });
        });
    },
  },
};
</script>
<style>
.fr5g6jiA0WO8I5j8xFyEG {
  position: relative;
  width: 320px;
  margin: 140px auto 40px;
  padding: 20px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 8px 0 rgba(36, 46, 66, 0.06);
  box-sizing: border-box;
}

._38I18Pd760wgL69y-7BZQk {
  position: relative;
  font-weight: 600;
  font-size: 12px;
  color: #242e42;
  line-height: 20px;
  text-align: center;
}

._2dwZR1zkHPNhGvOXPg5e4j {
  width: 100%;
  height: 0;
  margin-top: 12px;
  margin-bottom: 20px;
  opacity: 0.6;
  border-bottom: 1px solid;
  border-image-source: radial-gradient(circle at 50% 0, #abb4be, #fff 100%);
  border-image-slice: 1;
}
.form-item {
  width: 100%;
  max-width: 455px;
}

.form-item-label {
  text-align: left;
  padding: 6px 0px;
  display: block;
  margin-bottom: 4px;
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, 微软雅黑, STHeitiSC-Light, simsun, 宋体, WenQuanYi Zen Hei,
    WenQuanYi Micro Hei, sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.67;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: 1.67;
}

.form-item-error {
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, 微软雅黑, STHeitiSC-Light, simsun, 宋体, WenQuanYi Zen Hei,
    WenQuanYi Micro Hei, sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #404e68;
  color: #ca2621;
}

.form-item-required {
  margin: 0 2px;
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, 微软雅黑, STHeitiSC-Light, simsun, 宋体, WenQuanYi Zen Hei,
    WenQuanYi Micro Hei, sans-serif;
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #ca2621;
}

.form-item-control {
  position: relative;
}

.input {
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, 微软雅黑, STHeitiSC-Light, simsun, 宋体, WenQuanYi Zen Hei,
    WenQuanYi Micro Hei, sans-serif;
  font-size: 12px;
  /* width: 100%; */
  /* max-width: 455px; */
  width: 280px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 4px;
  border: 1px solid #abb4be;
  background-color: #fff;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
  /* -webkit-transition: all .3s ease-in-out;
    -o-transition: all .3s ease-in-out; */
  /* transition: all .3s ease-in-out; */
  /* caret-color: #36435c; */
  outline: none;
}

.input:not([readonly]):not([disabled]):focus {
  border-color: #55bc8a;
  -webkit-box-shadow: 0 4px 8px 0 rgba(85, 188, 138, 0.2);
  box-shadow: 0 4px 8px 0 rgba(85, 188, 138, 0.2);
}

.input-password {
  position: relative;
  width: 376px;
}

.input-password.has-icons-right .icon.clickable {
  opacity: 0.5;
  pointer-events: auto;
}

.input-password.has-icons-right .icon.clickable:hover {
  opacity: 1;
}

.input-password.has-icons-right .icon.is-right {
  z-index: 5;
  position: absolute;
  top: 50%;
  -webkit-transform: translateY(-50%);
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  right: 12px;
}

.imWMl8_1QGHj_KomPh1Qt {
  margin-top: 24px;
}

.imWMl8_1QGHj_KomPh1Qt button[type="submit"] {
  width: 100%;
}

.button-content {
  height: 20px;
  white-space: nowrap;
}

.is-loading .button-content {
  display: inline-block;
  vertical-align: middle;
  margin-right: 12px;
}

.button {
  position: relative;
  height: 32px;
  border: none;
  border-radius: 100px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  cursor: pointer;
  -webkit-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  font-family: PingFang SC, Lantinghei SC, Helvetica Neue, Helvetica, Arial,
    Microsoft YaHei, 微软雅黑, STHeitiSC-Light, simsun, 宋体, WenQuanYi Zen Hei,
    WenQuanYi Micro Hei, sans-serif;
  font-size: 12px;
  font-weight: 600;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.67;
  letter-spacing: normal;
  color: #36435c;
}

.button:focus,
.button:hover {
  -webkit-box-shadow: none;
  box-shadow: none;
  outline: none;
}

.button:disabled {
  opacity: 0.6;
  pointer-events: none;
  cursor: not-allowed;
}

.button + .button {
  margin-left: 12px;
}

.button-control {
  color: #fff;
  border: 1px solid #242e42;
  background-color: #242e42;
  -webkit-box-shadow: 0 8px 16px 0 rgba(35, 45, 65, 0.28);
  box-shadow: 0 8px 16px 0 rgba(35, 45, 65, 0.28);
}
</style>

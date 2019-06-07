<template>
  <div>
    <div class="container-scroller">
      <!-- partial -->
      <div class="container-fluid page-body-wrapper">
        <div class="main-panel">
          <div v-if="user"
               class="content-wrapper">
            <div v-if="userInfo.tbranchByFdept"
                 class="page-header">
              <h3 class="page-title">
                                <span class="page-title-icon bg-gradient-primary text-whitemr-2">
                                    <i class="mdi mdi-home"></i>
                                </span>
                欢迎来到{{userInfo.tbranchByFdept.fname}}智慧图书馆平台系统
              </h3>
              <H2>欢迎您!{{userInfo.fname}}</H2>
            </div>
            <div v-for="(userrolesById, index) in userInfo.tuserrolesById"
                 class="row"
                 :key="index">
              <div v-for="(modrolesById, index) in userrolesById.troleByFrid.tmodrolesById"
                   v-if="userrolesById.troleByFrid"
                   class="col-md-4 stretch-card grid-margin"
                   :key="index"
                   @click="gotoLayout">
                <div class="card bg-gradient-danger card-img-holder text-white">
                  <div class="card-body"
                       style="position: relative; width: 170px; height: 89px;">
                    <img alt=""
                         class="page5-tu1"
                         height="89"
                         src="./images/timg.jpg"
                         width="170">
                    <span style="position: absolute; bottom: 0; left: 0;"><a :href="modrolesById.tkjplatmodsByFmodid.furl">{{modrolesById.tkjplatmodsByFmodid.fdesc}}</a></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- content-wrapper ends -->
          <!-- partial -->
        </div>
        <!-- main-panel ends -->
      </div>
      <!-- page-body-wrapper ends -->
    </div>
  </div>
</template>
<script>
  //import fetch from "isomorphic-fetch"
  import axios from 'axios';
  import { mapState } from 'vuex';

  export default {
    name: 'myInfo',
    computed: {
      ...mapState(['user']),
      userInfo() {
        return this.user.userInfo;
      }
    },
    mounted() {
      axios.defaults.withCredentials = true;
      axios({
        url: 'http://172.10.200.216:8088/kjsso/api/v1/users/me',
        method: 'get'
      }).then(response => {
        const result = response.data;
        if (result.status === 'success') {
          console.log('infoOK!');
          const userInfo = result.data;
          this.$store.dispatch('user/saveUserInfo', userInfo);
        } else {
          alert('then.error!');
        }
      }).catch(error => console.log('error'));
    },
    methods: {
      gotoLayout() {
        this.$router.push('/dashboard');
      }
    },
    components: {}
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @keyframes bounceInLeft {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      transform: translate3d(-3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(25px, 0, 0);
    }
    75% {
      transform: translate3d(-10px, 0, 0);
    }
    90% {
      transform: translate3d(5px, 0, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  @keyframes bounceInRight {
    from, 60%, 75%, 90%, to {
      animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
    }
    0% {
      opacity: 0;
      transform: translate3d(3000px, 0, 0);
    }
    60% {
      opacity: 1;
      transform: translate3d(-25px, 0, 0);
    }
    75% {
      transform: translate3d(10px, 0, 0);
    }
    90% {
      transform: translate3d(-5px, 0, 0);
    }
    100% {
      opacity: 1;
      transform: none;
    }
  }

  /*.page5-tu1, .page5-tu2, .page5-tu3, .page5-tu4 {
       position: absolute;
       width: REM(480);
       height: REM(206);
       left: 50%;
       margin-left: REM(-240);
       opacity: 0;
    }*/

  .page5-tu1 {
    bottom: REM(778);
    animation: bounceInLeft 0.5s 0.25s linear forwards;
  }

  /*   .page5-tu2 {
     bottom: REM(548);
     animation: bounceInLeft 0.7s 0.45s linear forwards;
  }

     .page5-tu3 {
     bottom: REM(314);
     animation: bounceInRight 0.9s 0.65s linear forwards;
  }

     .page5-tu4 {
     bottom: REM(81);
     animation: bounceInRight 1.1s 0.85s linear forwards;
  }*/
</style>


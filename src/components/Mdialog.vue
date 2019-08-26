<template>
  <div class="dialog-box" v-transfer-dom>
    <x-dialog v-model="show" class="dialog-demo" @on-hide="sendDialog()">
      <img @click="dialogClose" style="position: absolute;top: -10%;left: 105%;" src="../../assets/dialogClose.svg" alt="">
      <div class="content-box">
        <div class="dialog-box-left">
          <div class="dialog-phone">
            <img style="width: 298.5px; height: 477px;margin:20px 70px" src="../../assets/QRcodePhone.png" alt=""><!--zijinQRcodePhone-->
          </div>
        </div>
        <div class="dialog-box-right">
          <div class="dialog-logo">
            <!--<img style="margin-right:20px;" src="../../assets/中国建设银行.svg" alt="">-->
            <!--<img style="margin-right:20px; width: 10vw; height: 5vw;" src="../../assets/紫金农商行上市logo-02.svg" alt="">-->
            <img style="margin-right:20px; width: 10vw; height: 2.1vw;" src="../../assets/kunlun/kunlunlogo.png" alt="">
          </div>
          <div v-if="showPrize" class="dialog-prize">
            <p>{{level}}</p>
            <p>{{prize}}</p>
          </div>
          <div class="dialog-QRcode">
            <div style="width: 8rem;height: 8rem; border: #999999 solid 3px">
              <!--<img style="width: 8rem;height: 8rem" src="../../assets/QRcode.png" alt="">-->
            <!--  <img style="width: 8rem;height: 8rem" src="../../assets/紫金农商QRcode.jpg" alt="">-->
                <img style="width: 8rem;height: 8rem" src="../../assets/kunlun/kunlunQRcode.png" alt="">
            </div>
            <!--<p style="width: 100%; margin-top: 2rem">使用建设银行app</p>-->
            <p style="width: 100%; margin-top: 2rem">使用昆仑银行app</p>
            <!--<p style="width: 100%; margin-top: 2rem">使用紫金农商银行app</p>-->
            <p style="width: 100%;margin-top: 0.5rem">扫码{{type}}</p>
          </div>
          <div v-if="showPay" class="dialog-pay">
            <p>支付金额：{{value}}元</p>
          </div>
        </div>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import { XDialog, TransferDomDirective as TransferDom } from 'vux'
  export default {
    name: "TestFlex",
    props:["level","showPrize", "prize","show","type", "showPay","value"],
    directives: {
      TransferDom
    },
    components: {
      XDialog
    },
    data() {
      return {
        flag: false,
        msg:"1-2-3-4"
       /* level: "一等奖",
        prize: "价值10000元现金大奖",*/
      };
    },
    methods:{
      sendDialog(){
        let msg = false;
        this.$emit("transferDialog", msg);
      },
      dialogClose(){
        this.show = false;
      }
    }
  }
</script>

<style scoped>
  .dialog-box{
    display: flex;
    flex-direction: row;
  }
  .content-box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .dialog-box-left{
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }
  .dialog-box-right{
    width: 50%;
    height: 100%;
    /*flex-wrap: wrap;*/
  }
  .dialog-logo{
    width: 100%;
    height: 15%;
    margin-top: 4%;
    display: flex;
    flex-direction: row-reverse;
  }
  .dialog-prize{
    width: 100%;
    height: 10%;
    margin:2% 5% 0 8%;
  }
  .dialog-prize p{
    font-size: 1rem;
    font-weight: bolder;
  }
  .dialog-QRcode{
    width: 100%;
    height: 30%;
    margin-left: 8%;
    margin-top: 10%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
  .dialog-QRcode p{
    font-size: 1rem;
    font-weight: bolder;
  }
  .dialog-pay{
    width: 100%;
    height: 10%;
    margin-top: 35%;
    margin-left: 8%;
  }
  .dialog-pay p{
    font-size: 1rem;
    font-weight: bolder;
  }

</style>

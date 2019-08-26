<template>
  <div class="lw-box">
    <div class="lw-box-left">
      <div class="lw-box-game">
          <div v-if="index%2 == flagWhite" v-for="(item,index) in 20" :style=coordinate[index]>
            <img style="width: 1.5vw;height: 1.5vw" src="../assets/lighterWhite.png" alt="">
          </div>
        <div v-if="index%2 == flagRed" v-for="(item,index) in 20" :style=coordinate[index]>
          <img style="width: 1.4vw;height: 1.4vw" src="../assets/lighterRed.png" alt="">
        </div>
        <div class="lw-box-game-inner">
          <div class="lw-box-game-center" id="luck-wheel" :style="rotateStyle"></div>
          <div class="lw-box-game-pointer">
            <img style="width: 150px;height: 150px;margin-bottom: 50px" class="" :src="controlImg" @click="startRotate" />
          </div>
        </div>
      </div>
    </div>
    <div class="lw-box-right">
      <div class="lw-right-top1"></div>
      <div class="lw-right-top">
        <div class="lw-right-title">
          <div style="width: 30%; height: 1px; border-top: #eae24e solid 1px"></div>
          <div style="width: 30%; height: 3rem;text-align: center"><p style="font-size: 1.8rem; color: #eae24e;letter-spacing: 8px">奖项设置</p></div>
          <div style="width: 30%; height: 1px; border-top: #eae24e solid 1px"></div>
        </div>
        <div class="lw-right-content">
          <ul style="margin-left: 20%;font-size: 2vw;color: #eae24e;letter-spacing: 2px">
            <li style="margin-top: 4%">一等奖：价值10000元的现金大奖；</li>
            <li style="margin-top: 4%">二等奖：价值5000元的苹果手机一部</li>
            <li style="margin-top: 4%">三等奖：8888元体验券一张</li>
            <li style="margin-top: 4%">幸运奖：现金10元券一张</li>
          </ul>
        </div>
      </div>
      <div class="lw-right-middle">
      <!--  <img style="width: 10rem; height: 10rem" src="../assets/二维码.png" alt="">
        <p style="margin-top: 1%; font-size: 1.5rem;font-weight: bolder;letter-spacing: 2px;color: white">扫码参加活动</p>-->
      </div>
      <div class="lw-right-bottom">
      </div>
    </div>
    <!--<mdialog :level="level" :show-prize="showPrize" :prize="prize" :show="show" :type="type" @transferDialog="getDialog()"></mdialog>-->
  </div>
</template>

<script>
  import startBtn from '../assets/转盘指针.png'
  import rotateBtn from '../assets/转盘指针.png'
  import mdialog from '@/components/Mdialog'
  let t1 = 0;
  let t2 = 0;
  export default {
    components: {
      // mdialog
    },
    props: {
      endrotate: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        level:"",
        prize:"",
        show: false,
        type: "",
        showPrize: true,
        count:0,
        isShowLED: 1,
        flagRed: 1,
        flagWhite:0,
        coordinate:[],
        speed: 0, // 转的幅度 默认匀速 最好为两个角度间 90/10  的十分之一  注：必须修改
        deg: 0, // 记录转动后的角度 可大于360
        rotate: 180, // 目标位置
        isAllowClick: true, // 转动转盘的开关
        isAllowClick2: true, // 转动转盘的开关
        time: 100,
        controlImg: startBtn,
        rotateStyle:
          '-webkit-transform: rotate(' +
          this.deg +
          'deg);transform: rotate(' +
          this.deg +
          'deg);'
      }
    },
    watch: {
      endrotate(val) {
        if (val == 0) {
          this.reset()
        }
      }
    },
    methods: {
      getDialog(){
          this.reset();
      },
      getCoordinate(){
        let part = (2*Math.PI)/20;
        let r = 15.55;
        let x = 15.7;
        let y = 15.8;
        for (let i = 0; i < 20; i++){
         let res_x = x + r*Math.cos(part * i);
         let res_y = y + r*Math.sin(part * i);
            this.coordinate.push(
              {
              width:'1.5vw',
              height:'1.5vw',
              position: 'absolute',
              left:res_x  + 'vw',
              top:res_y + 'vw',
            },
            )
          /*console.log(x + r*Math.cos(part * i))
          console.log(y + r*Math.sin(part * i))*/
        }
      },
      reset() {
        t1 = 0;
        t2 = 0;
        this.speed = 0;// 转的幅度 默认匀速 最好为两个角度间 90/10  的十分之一  注：必须修改
        this.deg = 0; // 记录转动后的角度 可大于360
        this.rotate = 0; // 在360度内 最后指针停下的角度
        this.show = false;
        this.isShowLED = 1;
        this.rotateStyle =
          '-webkit-transform: rotate(' +
          this.deg +
          'deg);transform: rotate(' +
          this.deg +
          'deg);'
      },
      startRotate() {
        let that = this;
        that.isAllowClick = true;
        that.controlImg = rotateBtn;
        that.test(2);
        that.turntable();
        that.flashlight();
        that.count = 0;
      },
      turntable() {
        let that = this;
        that.$emit('endlottery');
        t1 = setInterval(function() {
          if (that.speed < 100) {
            that.speed = that.speed >= 100 ? that.speed : that.speed + 5;
            that.deg = that.deg + that.speed;
            console.log("if-deg->" + that.deg);
            that.rotateStyle =
              '-webkit-transform: rotate(' + that.deg + 'deg);' +
              'transform: rotate(' + that.deg + 'deg);' +
              'transition:all 0.2s linear';
            this.endSpeed = that.speed;
            this.enddeg = that.deg + 100 + that.rotate;
            console.log("if-rotate->" + that.rotate);
            console.log("if-speed->" + this.endSpeed);
          } else {
            this.endSpeed = this.endSpeed >= 0 ? this.endSpeed - 2 : this.endSpeed;
            console.log("else--speed-->" + this.endSpeed);
            this.enddeg += this.endSpeed;
            if(this.endSpeed >= 2){
              console.log("else-deg->" + this.enddeg);
              that.rotateStyle =
                '-webkit-transform: rotate(' + this.enddeg + 'deg);' +
                'transform: rotate(' + this.enddeg + 'deg);' +
                'transition:all 0.2s linear';
            }else {
              that.level = "三等奖";
              that.prize = "8888元体验券一张";
              that.show = true;
              that.type = "领取";
               for (let i = 0; i <= t1; i++) {
                  clearInterval(i);
                  that.count = 0;
                  that.isShowLED = 0;
                }
            }
          }
        }, that.time)
      },
      flashlight(){
        t2 = setInterval(()=>{
          this.count ++;
          if (this.count % 2 == 1) {
            this.flagWhite = 1;
            this.flagRed = 0;
          }else {
            this.flagWhite = 0;
            this.flagRed = 1;
          }
          if (this.isShowLED == 0){
            console.log("flash-->" + this.isShowLED);
            for (let i = 0; i <= t2; i++) {
              clearInterval(i);
            }
            this.count = 0;
          }
        },600);
      },
      random(lower, upper) {
        return Math.floor(Math.random() * (upper - lower+1)) + lower;
      },
      test(level){
        switch (level) {
          case 0: this.rotate = this.random(340,350); break;
          case 1: this.rotate = this.random(40,80); break;
          case 2: this.rotate = this.random(100,140); break;
          case 3: this.rotate = this.random(160,200); break;
          case 4: this.rotate = this.random(220,260); break;
          case 5: this.rotate = this.random(280,320); break;
          default: break;
        }
      },
      lwback(){
        this.$router.go(-1)
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.getCoordinate();
        //this.flashlight();
      });
    },
  }
</script>

<style scoped>
  .wheel {
    width: 100%;
    height: 100%;
    background-image: url('../assets/turntable.png');
    background-size: cover;
  }

  .control {
    position: absolute;
    top: 1.95rem;
    left: 2rem;
    width: 2rem;
    height: 2.1rem;
  }

  .lw-box{
    position: fixed;
    display: flex;
    display: -webkit-flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    height:100%;
    background: url("../assets/转盘游戏.png") no-repeat;
    background-size: 100% 105%;
    /*background-size: cover;*/
  }
  .lw-box-left{
    width: 50%;
    height: 100%;
    margin: 5% 0 0 2.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    display: -webkit-flex;
  }
  .lw-box-right{
    width: 47.5%;
    height: 100%;
    display: flex;
    display: -webkit-flex;
    flex-direction: column;
    flex-wrap: wrap;
   /* background: cornflowerblue;*/
  }
  .lw-right-top1{
    width: 100%;
    height: 25%;
  }
  .lw-right-top{
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
   }
  .lw-right-title{
    width: 100%;
    height: 20%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .lw-right-content{
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;
  }
  .lw-right-middle{
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .lw-right-bottom{
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .lw-logo{
    width: 80%;
    height: 90%;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .lw-back{
    width: 20%;
    height: 90%;
    margin-left: 1%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .lw-box-game{
    position: fixed;
    /*width: 500px;*/
    width: 33vw;
    height: 33vw;
    border-radius: 50%;
    margin-bottom: 1rem;
    border: #f9db0b solid 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background: #ffa500;
  }
  .lw-box-game-inner{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /*width: 440px;
    height: 440px;*/
    width: 29vw;
    height: 29vw;
    border-radius: 50%;
    z-index: -3;
    border: #fd9300 solid 1px;
    background: #fdb500;
  }
  .lw-box-game-center{
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
/*    width: 420px;
    height: 420px;*/
    width: 28vw;
    height: 28vw;
    border-radius: 50%;
    z-index: -2;
    background-image: url('../assets/转盘背景.png');
    background-size: cover;
  }
  .lw-box-game-pointer{
    position: absolute;
    /*background: white;*/
    z-index: -1;
  }
</style>

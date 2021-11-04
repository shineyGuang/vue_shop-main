<template>
  <div class="imgBox">
    <img :src="feedBackImg" alt="">
    <div class="total-box">
      <el-col :span="18" class="textBox">
        <span class="imgText">免费发布需求，专业人才为您<span style="color: #ffea03;">私人定制</span></span>
      </el-col>
      <el-col :span="24" class="iconBox">
        <div class="fastBox">
          <div>
            <img :src="fastImg" alt="">
          </div>
          <div class="iconText">
            <span>极速匹配</span>
          </div>
        </div>

        <div class="fastBox">
          <div>
            <img :src="guaranteeImg" alt="">
          </div>
          <div class="iconText">
            <span>平台担保</span>
          </div>
        </div>

        <div class="fastBox">
          <div>
            <img :src="oneServeImg" alt="">
          </div>
          <div class="iconText">
            <span>一站式服务</span>
          </div>
        </div>
      </el-col>
    </div>
  </div>
</template>

<script>
// import feedImg from '@/assets/feedbackHeader/编组 7.png'
import feedImg from '@/assets/feedbackHeader/画板.png'
// import feedImg from '@/assets/三上悠亚首页导航栏.jpeg'
// import feedImg from '@/assets/feedbackHeader/feedBackHeaderImg.png'
import fast from '@/assets/feedbackHeader/极速发货.png'
import guarantee from '@/assets/feedbackHeader/担保.png'
import oneServe from '@/assets/feedbackHeader/一站式.png'

export default {
  name: 'feedbackHeader',
  data() {
    return {
      feedBackImg: feedImg,
      fastImg: fast,
      guaranteeImg: guarantee,
      oneServeImg: oneServe
    }
  }
}
</script>

<style lang="less" scoped>
.imgBox {
  width: 100%;
  padding: 0 0;

  .total-box {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    //margin-top: 0.002rem;
  }

  .iconBox {
    position: absolute;
    top: 0.8rem;
    display: flex;
    justify-content: center;
    font-family: PingFangSC-Regular;
    font-size: 0.1rem;
    color: #FFFFFF;
    letter-spacing: 0;
    text-align: justify;

    .fastBox {
      display: flex;
      justify-content: flex-start;

      .iconText {
        margin-top: 0.065rem;
      }
    }
  }

  .textBox {
    position: absolute;
    top: 0.45rem;
    left: 13%;
    display: flex;
    justify-content: center;

    .imgText {
      font-family: AlibabaPuHuiTiB;
      font-size: 0.18rem;
      color: #FFFFFF;
      letter-spacing: 0;
      text-align: justify;
      line-height: 0.4rem;
    }
  }

  > img {
    position: relative;
    width: 100%;
  }
}
</style>

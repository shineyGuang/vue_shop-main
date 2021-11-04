<template>
  <div class="wrapper">
    <div class="right-mid">
      <div class="circle-box">
        <div class="circle-base right2">
          <div class="title"></div>
          <div class="count"></div>
          <div class="center-pic"></div>
        </div>
        <div class="circle-base left2"></div>
        <div class="circle-base circle-bg"></div>
        <div class="circle-base right3"></div>
        <div class="circle-base left1"></div>
        <div class="circle-base right1"></div>
        <div class="circle-base db-circle"></div>
        <div class="circle-base snow"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'robotHeaderPic'
}
</script>

<style lang="less" scoped>
.wrapper {
  font-size: 8px;
  position: relative;
  //border: solid 1px yellow;
}

.right-mid {

  margin-top: 1.2em;

  //.circle-box {
  //  height: 18.1em;
  //  width: 18.1em;
  //  margin: 0 auto;
  //  position: relative;
  //
  //  .circle-base {
  //    position: absolute;
  //    background-size: 100% 100%;
  //    left: 50%;
  //    top: 50%;
  //  }

  .circle-box {
    height: 7em;
    width: 7em;
    margin: 0 auto;
    position: relative;

    .circle-base {
      position: absolute;
      background-size: 100% 100%;
      left: 50%;
      top: 50%;
    }

    //.db-circle {
    //  background: url('../../assets/bigScreen/circle.png');
    //  background-size: cover;
    //  width: 32.6em;
    //  height: 32.6em;
    //  margin-left: -16.3em;
    //  margin-top: -16.3em;
    //  z-index: 3;
    //}

    .db-circle {
      background: url('../../assets/bigScreen/circle.png');
      background-size: cover;
      width: 22em;
      height: 22em;
      margin-left: -11em;
      margin-top: -11em;
      z-index: 3;
    }

    //.circle-bg {
    //  background: url('../../assets/bigScreen/right-bg.png') no-repeat;
    //  background-size: cover;
    //  width: 38.5em;
    //  height: 16.3em;
    //  margin-left: -19.25em;
    //  margin-top: 2.15em;
    //  z-index: 2;
    //}

    .circle-bg {
      background: url('../../assets/bigScreen/right-bg.png') no-repeat;
      background-size: cover;
      width: 34em;
      height: 14.8em;
      margin-left: -17.5em;
      margin-top: 1.68em;
      z-index: 2;
    }

    //.left2 {
    //  background: url('../../assets/bigScreen/left2.png');
    //  background-size: cover;
    //  width: 12.5em;
    //  height: 12.5em;
    //  margin-left: -6.25em;
    //  margin-top: -6.25em;
    //  z-index: 10;
    //  animation: 10s linear 0s normal none infinite circle2;
    //}

    .left2 {
      background: url('../../assets/bigScreen/left2.png');
      background-size: cover;
      width: 12.5em;
      height: 12.5em;
      margin-left: -6.25em;
      margin-top: -6.25em;
      z-index: 10;
      animation: 10s linear 0s normal none infinite circle2;
    }

    .right3 {
      background: url('../../assets/bigScreen/right3.png');
      background-size: cover;
      width: 14.4em;
      height: 14.4em;
      margin-left: -7.2em;
      margin-top: -7.2em;
      z-index: 100;
      animation: 10s linear 0s normal none infinite circle1;
    }

    .left1 {
      background: url('../../assets/bigScreen/left1.png');
      background-size: cover;
      width: 17.3em;
      height: 17.3em;
      margin-left: -8.65em;
      margin-top: -8.65em;
      z-index: 150;
      animation: 10s linear 0s normal none infinite circle2;
    }

    .right1 {
      background: url('../../assets/bigScreen/right1.png');
      background-size: cover;
      width: 18.4em;
      height: 18.4em;
      margin-left: -9.2em;
      margin-top: -9.2em;
      z-index: 200;
      animation: 10s linear 0s normal none infinite circle1;
    }

    .right2 {
      background: url('../../assets/bigScreen/right2.png');
      background-size: cover;
      width: 10.1em;
      height: 7.1em;
      padding-top: 3em;
      line-height: 20px;
      text-align: center;
      margin-left: -5.05em;
      margin-top: -5.05em;
      z-index: 300;

      .title {
        font-size: 0.9em;
        color: #fff;
      }

      .count {
        color: #32e6ff;
        font-size: 1.9em;
        margin-top: 0.5em;
      }

      .center-pic {
        background: url("../../assets/bigScreen/snRPA.png");
        background-size: cover;
        width: 10em;
        height: 4.2em;
        margin-top: -0.7em;
      }
    }

    .snow {
      background: url('../../assets/bigScreen/snow.gif');
      background-size: cover;
      width: 26em;
      height: 26em;
      margin-left: -13em;
      margin-top: -13em;
      z-index: 999;
      filter: blur(3px)
    }

    .box-base {
      position: absolute;
      padding-top: 1.3em;
      text-indent: 0.9em;
      height: 5.9em;
      width: 9em;
      z-index: 9999;
      color: #fff;

      .box-icon {
        height: 1.2em;
        width: 1.2em;
      }

      .box-title {
        font-size: 0.7em;
        opacity: 0.9;
        margin-top: 0.8em;
      }

      .box-count {
        font-size: 1.2em;
        font-weight: bold;
        margin-top: 0.2em;
      }
    }
  }
}

@keyframes circle1 {

  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }

}

@keyframes circle2 {

  from {
    transform: rotate(360deg);
  }

  to {
    transform: rotate(0deg);
  }

}

@media only screen and (min-width: 480px) and (max-width: 1200px) {
  .wrapper {
    font-size: 8px;
  }
}

@media only screen and (min-width: 1201px) and (max-width: 2000px) {
  .wrapper {
    font-size: 10px;
  }
}

@media screen and (min-width: 2000px) {
  .wrapper {
    font-size: 17px;
  }
}

//@media screen and (max-width: 1366px) {
//  .wrapper {
//    font-size:  8px;
//  }
//}

//@media screen and (max-width: 1920px) {
//  .wrapper {
//    font-size: 10px;
//  }
//}
//@media screen and (max-width: 2560px) {
//  .wrapper {
//    font-size: 13px;
//  }
//}
</style>

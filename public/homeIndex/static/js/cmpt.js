Vue.component('type-select', {
    props: ['selected'],
    data: function() {
        return {
            options: [{
                value: '/finance',
                label: '财务场景'
            }, {
                value: '/personnel',
                label: '人事场景'
            }, {
                value: '/resale',
                label: '零售场景'
            }, {
                value: '/supplyChain',
                label: '供应链场景'
            }, {
                value: '/dataScene',
                label: '数据触达'
            }, {
                value: '/banking',
                label: '金融场景'
            }, {
                value: '/service',
                label: '客服场景'
            }],
            value: ''
        }
    },
    template: `<div class="type-select">
            <el-select v-model="value" placeholder="请选择" @change="selectChange">
                <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                </el-option>
            </el-select>
        </div>`,
    mounted: function() {
        this.value = this.selected
    },
    methods: {
        selectChange: function() {
            //this.$emit('type-change', this.value)
            window.location.href = 'http://rpa.suning.com/cms'+this.value+".htm"
        }
    }
})

Vue.component('performance', {
    props: ["performancelist", 'showsetting', 'margintop'],
    data: function() {
        return {};
    },
    template: `<div class="expression-content" :style="{'margin-top':margintop?margintop+'px':'51px'}">
            <div class="item" v-for="item in performancelist" :key="item.title">
                <div class="item-img-box">
                    <img class="left-icon" :src="item.url" alt="" />
                    <img v-if="showsetting" src='http://rpa.suning.com/static/RPA/res/static/img/banking/setting.png'  alt="" class="setting">
                </div>
                <div class="item-text-box">
                    <div class="item-title">{{ item.title }}</div>
                    <div class="item-desc">{{ item.desc }}</div>
                </div>
            </div>
        </div>`,
})

Vue.component('my-swiper',{
    props:['swiperlist'],
    data:function() {
        mySwiper:''
    },
    mounted:function() {
        this.mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项
            autoplay:{
               delay: 3000,
            },
            slidesPerView:3,
            //滑动速度
            speed:1000,
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
            },
            
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })        
    },
    template:`<div class="my-swiper">
        <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide swiper-item" v-for="item of swiperlist" :key="item.id">
                <img class="swiper-img" :src="item.url" />
                <div class="swiper-desc">{{ item.desc }}</div>
            </div>
        </div>
        
    </div>
<div class="swiper-button-prev" @click="prev"></div>
        <div class="swiper-button-next" @click="next"></div></div>`,
    methods:{
        prev: function() {
            this.mySwiper.slidePrev();
        },
        next: function() {
            this.swiper.slideNext();
        }
    }
})
$(function(){
    if (window.location.href.indexOf('index')>-1) {
        $('.menu-index').addClass('menu-active');
        $('.menu-example').removeClass('menu-active');
        $('.menu-cicada').removeClass('menu-active');
    } else if (window.location.href.indexOf('cicada')>-1) {
       $('.menu-cicada').addClass('menu-active');
       $('.menu-example').removeClass('menu-active');
       $('.menu-index').removeClass('menu-active');
     }else {
        $('.menu-example').addClass('menu-active');
        $('.menu-index').removeClass('menu-active');
        $('.menu-cicada').removeClass('menu-active');
    }
$('.menu-item-cmpt').click(function() {
    window.location.href="http://rpacmpt.cnsuning.com/#/mainPage";
})
$('.drill').click(function() {
      window.open('http://snrobot-drill.suning.com')
    })
$('.loginBtn').click(function() {
      window.open('http://snrobot.cnsuning.com/')
    })
})
$('.menu-item-cmpt').mouseover(function() {
    $('.menu-cmpt-list').addClass('block')
})
$('.menu-cmpt-list').mouseleave(function() {
    $('.menu-cmpt-list').removeClass('block')
})
$('.to-cmpt-base').click(function() {
   window.location.href = "http://rpacmpt.cnsuning.com/#/mainPage";
   return false
})

$('.tianmao-dialog-btn').click(function() {
     var val = $('#tianmao-input').val();
   if (val.length!=8) {
      $('#tianmao-input-err').addClass('block')
         return
   }
   if (val[0] != 0 || val[0]!=1 || val[0] !=2 || val[0] !=9) {
      if (val[0] == 2) {
       if (val[1]>2) {
        $('#tianmao-input-err').addClass('block')
         return
       }
    } 
    if(val[0] == 9) {
       if (val[1]<2) {
     $('#tianmao-input-err').addClass('block')
         return
      }
    }
   } else {
    $('.tianmao-input-err').addClass('block')
    return
}
window.location.href="http://oss.suning.com/snrobot/cmpt_file/zSmMcVJXu0urslCrTEOv1SaeoWC8TLFNxD55rSXRaoCwd9z8iFGg5e2PsL-tTG91.zip"
   let data = {
    appName:'天猫数据抓取',
 downloadUser:$('#tianmao-input').val()
}
   $.ajax({
     beforeSend: function (XMLHttpRequest) {
         		     XMLHttpRequest.setRequestHeader("snrobot-authId", "DOWMLOAD_TIMES");
                         },
                        headers:{'Content-Type':'application/json;charset=utf8','snrobot-authId':'DOWMLOAD_TIMES'},
     url:"http://snrobotop.cnsuning.com/website/addClientDownloadDetail.htm",
     data:JSON.stringify(data),
     type:'POST',
     success:function() {
        $('.tianmao-dialog').removeClass('block')
     }
})

})

$('.shwoTm').click(function() {
   $('.tianmao-dialog').addClass('block')
})
$('.closeDialog').click(function() {
   $('.tianmao-dialog').removeClass('block')
})

$('.menu-item-tm').mouseover(function() {
    $('.menu-tm-list').addClass('block')
})
$('.menu-item-tm').mouseleave(function() {
    $('.menu-tm-list').removeClass('block')
})
$('#tianmao-input').focus(function() {
    $('#tianmao-input-err').removeClass('block')

})
$('#tianmao-input').blur(function() {
   var val = $('#tianmao-input').val();
   if (val.length!=8) {
      $('#tianmao-input-err').addClass('block')
         return
   }
   if (val[0] != 0 || val[0]!=1 || val[0] !=2 || val[0] !=9) {
      if (val[0] == 2) {
       if (val[1]>2) {
        $('#tianmao-input-err').addClass('block')
         return
       }
    } 
    if(val[0] == 9) {
       if (val[1]<2) {
     $('#tianmao-input-err').addClass('block')
         return
      }
    }
      
      return
   } else {
    $('.tianmao-input-err').addClass('block')
}
})


$('.to-cmpt-bus').click(function() {
   window.location.href = "http://rpacmpt.cnsuning.com/#/businessList?id=2&type=yewu";
   return false
})
var valHandle;  //定时器
const ctx = wx.createCanvasContext("bgCanvas")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepText: 10, //设置倒计时初始值
        winwidth:''
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    
    onLoad(){
        //获取页面宽度
        wx.getSystemInfo({
            success:(res) => {
                console.log(res)
                this.setData({
                    winwidth:res.windowWidth
                })
            }
        })
    },
    setRpx(w){
        //rpx转px canvas不能加单位 ,默认px //rpx / 750  * 页面宽度
        return w / 750 * this.data.winwidth;
    },
    onReady: function () {
        //初始化
        this.drawArc(-1.5)
    },
    drawArc(endAngle){
        //绘制 初始
        let that = this;
        ctx.setLineWidth(that.setRpx(22))
        ctx.arc(that.setRpx(57), that.setRpx(57), that.setRpx(45), 0, 2 * Math.PI)
        ctx.setStrokeStyle('white')
        ctx.stroke()

        ctx.beginPath()
        ctx.setLineCap('round')
        ctx.setLineWidth(that.setRpx(18))
        ctx.arc(that.setRpx(57), that.setRpx(57), that.setRpx(45), 1.5 * Math.PI, endAngle, true)
        ctx.setStrokeStyle('#FFAF2B')
        ctx.stroke()
        ctx.draw()
    },
    //点击开始倒计时按钮
    clickStartBtn: function () {
        // console.log("倒计时动画开始")
        var that = this
        that.data.stepText = 10 //重新设置一遍初始值，防止初始值被改变
        var step = that.data.stepText;  //定义倒计时
        var num = -0.5;
        var decNum = 2 / step / 10
        clearInterval(valHandle)


        valHandle = setInterval(function () {

            that.setData({
                stepText: parseInt(step)
            })
            step = (step - 0.1).toFixed(1)
            console.log(num)
            num += decNum
            // console.log(num*Math.PI)
            that.drawArc(num * Math.PI)

            if (step <= 0) {
                clearInterval(valHandle)  //销毁定时器

            }

        }, 100)
    },
})
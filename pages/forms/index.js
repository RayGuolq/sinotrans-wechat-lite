import chartWrap from '../canvas/chartWrap'
import getConfig from './getConfig'
var app = getApp()
Page({
    data: {
        timeSValue: '',
        dateSValue: '',
        timeEValue: '',
        dateEValue: ''
    },
    timePickerBindchange: function(e) {
        var times = e.detail.value
        console.log(times);
        var timeNew = times + ":00"
        this.setData({
            timeSValue: timeNew
        })
    },
    timePickerBindchange1: function(e) {
        var times = e.detail.value
        var timeNew = times + ":00"
        this.setData({
            timeEValue: timeNew
        })
    },
    datePickerBindchange: function(e) {
        this.setData({
            dateSValue: e.detail.value
        })
    },
    datePickerBindchange1: function(e) {
        this.setData({
            dateEValue: e.detail.value
        })
    },
    quxiao: function() {
        wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
        })
    },
    onLoad: function() {
        var did = wx.getStorageSync('keyDid')
        var tokenuserid = wx.getStorageSync('tokenuserid')
        this.setData({
            did: did,
            tokenuserid: tokenuserid
        })
    },
    query: function() {
        let pageThis = this
        var did = this.data.did
        var tokenuserid = this.data.tokenuserid
        var that = this.data
        var dates = that.dateSValue
        var times = that.timeSValue
        var device_time = dates + ' ' + times
        var datee = that.dateEValue
        var timee = that.timeEValue
        var device_timeend = datee + ' ' + timee
        wx.showToast({
            title: '数据加载中',
            icon: 'loading',
            duration: 10000
        });
        wx.request({
            url: 'https://api.keruis.com/DeviceData_mr/queryTemCurve',
            data: {
                "tokenuserid": tokenuserid,
                "d_id": did,
                "device_time": device_time,
                "device_timeend": device_timeend,
                "status": 0
            },
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function(res) {
                if (res.data.resultCode == 200) {
                    console.log(res.data)
                    var resultData = res.data.data
                    var threshold_up = resultData.device.d_temp_limit_top
                    var threshold_down = resultData.device.d_temp_limit_floor
                    var res = resultData.data
                    var temps = []
                    var times = []
                    var down = []
                    var up = []
                    for (var b = 0, len = res.length; b < len; b++) {
                        temps[b] = res[b].temp_1
                        times[b] = res[b].device_time
                        down[b] = threshold_down
                        up[b] = threshold_up
                    }
                    app.deviceInfo.then(function(deviceInfo) {
                        console.log('设备信息', deviceInfo)
                        let width = Math.floor(deviceInfo.windowWidth - (deviceInfo.windowWidth / 750) * 10 * 2) //canvas宽度
                        let height = Math.floor(width / 1.6) //这个项目canvas的width/height为1.6
                        let canvasId = 'myCanvas'
                        let canvasConfig = {
                            width: width,
                            height: height,
                            id: canvasId
                        }
                        let data = {
                            0: temps,
                            1: down,
                            2: up
                        }
                        let labels = times
                        let config = getConfig(canvasConfig, labels, data)
                        chartWrap.bind(pageThis)(config)
                        setTimeout(function() {
                            wx.hideToast()
                        }, 0)
                    })
                }
            },
        })

    },
    onShow: function() {
        //渲染逻辑不要写这里，后台切换到前端会被重新执行
    }
})
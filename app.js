//app.js
let Promise = require('./libs/ES2015ponyfill/promise').Promise
App({
    onLaunch: function() {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)
    },
    getUserInfo: function(cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.login({
                success: function() {
                    wx.getUserInfo({
                        success: function(res) {
                            that.globalData.userInfo = res.userInfo
                            typeof cb == "function" && cb(that.globalData.userInfo)
                        }
                    })
                }
            })
        }
    },
    onLaunch: function() {
        this.deviceInfo = this.promise.getDeviceInfo();
        var usename = wx.getStorageSync('keyname')
        var password = wx.getStorageSync('keyword')
        if (usename !== '') {
            wx.request({
                url: 'https://core.keruis.com/user/login',
                method: 'POST',
                data: ({
                    "u_name": usename,
                    "u_pwd": password,
                    "versions": "1.0",
                    "tag": "4"
                }),
                header: {
                    'content-type': 'application/json'
                },
                success: function(res) {
                    if (res.data.resultCode !== 200) {
                        try {
                            wx.clearStorageSync()
                        } catch (e) {}
                        wx.redirectTo({
                            url: 'pages/index/index'
                        })
                    }
                },
            })
        }
    },
    onShow: function() {
        console.log('App Show')
    },
    onHide: function() {
        console.log('App Hide')
    },
    globalData: {
        userInfo: null,
        hasLogin: false
    },
    substring: function() {
        return substring()
    },
    // length:function(){
    //   return this.length
    // },
    promise: {
        getDeviceInfo: function() { //获取设备信息
            let promise = new Promise((resolve, reject) => {
                wx.getSystemInfo({
                    success: function(res) {
                        resolve(res)
                    },
                    fail: function() {
                        reject()
                    }
                })
            })
            return promise
        }
    },
    getGid: (function() { //全局唯一id
        let id = 0
        return function() {
            id++
            return id
        }
    })()
})
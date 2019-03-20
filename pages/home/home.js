var sliderWidth = 100; // 需要设置slider的宽度，用于计算中间位置
var app = getApp()
Page({
    data: {
        latitude: 31.234070,
        longitude: 121.481770
    },
    onReady: function (e) {
        this.mapCtx = wx.createMapContext('myMap')
    },
    onLoad: function(e) {
        var that = this;
        var user = wx.getStorageSync('keyUser')
        var name = user.u_nickname
        var category = '一般管理员'
        console.log(e)
        console.log(that)
        that.setData({
            usename: name,
            category: category
        })
    },
    openConfirm: function() {
        wx.navigateTo({
            url: '../personalInformation/personalInformation',
        })
    },
    saoma: function(e) {
        wx.scanCode({
            success: (res) => {
                var result = res.result
                console.log(result)
                var result1 = result.match(/keruis.com\/s\//)
                var result2 = "keruis.com/s/"
                if (result1 && result1[0] == result2) {
                    var xinresult = result.split('/')
                    console.log(xinresult)
                    for (var n = 0; n < xinresult.length; n++) {
                        if (n == (xinresult.length - 1)) {
                            var resultn = xinresult[n]
                        }
                    }
                    var xinresultindex = resultn.substring(0, 1)
                    console.log(xinresultindex)
                    if (xinresultindex == 'a') {
                        var xinresult16 = resultn.substring(1)
                        console.log(xinresult16)
                        // xinresult16 = Number(xinresult16)
                        var buquan = 8 - (xinresultindex.length + xinresult16.length + 1)
                        for (var n = 0, d = ''; n < buquan; n++) {
                            d = d + '0'
                        }
                        var zhi = xinresultindex + '1' + d + xinresult16
                    } else {
                        var xinresult16 = resultn.substring(1)
                        console.log(xinresult16)
                        // xinresult16 = Number(xinresult16)
                        var buquan = 8 - (xinresultindex.length + xinresult16.length)
                        for (var n = 0, d = ''; n < buquan; n++) {
                            d = d + '0'
                        }
                        var zhi = xinresultindex + d + xinresult16
                    }
                    console.log(zhi)
                    var xin = parseInt(zhi, 16)
                    console.log(xin)
                    try {
                        wx.setStorageSync('keyDeviceOctId', xin)
                    } catch (e) {}
                    //获取设备id
                    wx.request({
                        url: 'https://core.keruis.com/device/getDoctIdByDid',
                        method: 'POST',
                        data: ({
                            "d_oct_id": xin
                        }),
                        header: {
                            'content-type': 'application/json'
                        },
                        success: function(res) {
                            if (res.data.resultCode == 200) {
                                var value = res.data.data
                                try {
                                    wx.setStorageSync('keyDid', value)
                                } catch (e) {}
                            }
                        }
                    });
                    wx.navigateTo({
                        url: "../confirm/confirm"
                    })
                } else {
                    wx.showModal({
                        content: '无效二维码',
                        showCancel: false,
                        success: function(res) {
                            if (res.confirm) {
                                console.log('确定')
                            }
                        }
                    });
                }
            }
        })
    },
    moveToLocation: function () {
        this.mapCtx.moveToLocation()
        wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
        })
    }
});
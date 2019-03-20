Page({
    data: {
        mingcheng: "",
        id: "",
        zaixian: true,
        lixian: false
    },
    onLoad: function(e) {
        var that = this
        var tokenuserid = wx.getStorageSync('tokenuserid')
        var did = wx.getStorageSync('keyDid')
        that.setData({
            id: did,
            tokenuserid: tokenuserid
        })
        var didss = new Array()
        didss[0] = did
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1500
        })
        wx.request({
            url: 'https://api.keruis.com/DeviceData_mr/reaelTime',
            data: ({
                "tokenuserid": tokenuserid,
                "didss": didss
            }),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.resultCode == 200) {
                    var data = res.data.data[0];
                    var deviceTime = data.device_time;
                    var mingcheng = data.d_name;
                    var wendu = data.temp_1;
                    var shezhiwendu = data.working_temp_1;
                    that.setData({
                        mingcheng: mingcheng,
                        deviceTime: deviceTime,
                        wendu: wendu,
                        shezhiwendu: shezhiwendu
                    })
                    if (data.d_status === '1') {
                        that.setData({
                            zaixian: true,
                            lixian: false
                        })
                    } else if (data.d_status === '0') {
                        that.setData({
                            zaixian: false,
                            lixian: true
                        })
                    }
                } else {
                    wx.showModal({
                        content: '无数据',
                        showCancel: false,
                        success: function(res) {
                            console.log(res);
                            if (res.confirm) {
                                wx.navigateBack({
                                    delta: 1, // 回退前 delta(默认为1) 页面
                                })
                                // wx.redirectTo({
                                //     url: "../home/home"
                                // })
                            } else {}
                        }
                    })
                }
                setTimeout(function() {
                    wx.hideToast()
                }, 0)
            }
        })
    },
    // confirm: function() {
    //     var id = wx.getStorageSync('keyDid')
    //     wx.request({
    //         url: 'https://lite.keruis.com/KeruisCore/cmd/cmd59',
    //         data: ({
    //             "code": id
    //         }),
    //         method: 'POST',
    //         header: {
    //             'content-type': 'application/json'
    //         },
    //         success: function(res) {
    //             if (res.data.resultCode == 200) {
    //                 wx.showToast({
    //                     title: '已完成',
    //                     icon: 'success',
    //                     duration: 3000
    //                 });
    //                 // wx.navigateBack({
    //                 //     url:"../fenzu/fenzu"
    //                 // })
    //             }
    //         }
    //     })
    // },
    baobiao: function() {
        wx.navigateTo({
            url: "../forms/index"
        })
    },
    shuaxin: function() {
        var that = this
        var didss = new Array()
        didss[0] = that.data.id
        wx.showToast({
            title: '加载中',
            icon: 'loading',
            duration: 1000
        })
        wx.request({
            url: 'https://api.keruis.com/DeviceData_mr/reaelTime',
            data: ({
                "tokenuserid": that.data.tokenuserid,
                "didss": didss
            }),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success: function(res) {
                if (res.data.resultCode == 200) {
                    var data = res.data.data[0];
                    var deviceTime = data.device_time;
                    var wendu = data.temp_1;
                    var shezhiwendu = data.working_temp_1;
                    that.setData({
                        deviceTime: deviceTime,
                        wendu: wendu,
                        shezhiwendu: shezhiwendu
                    })
                    if (data.d_status === '1') {
                        that.setData({
                            zaixian: true,
                            lixian: false
                        })
                    } else if (data.d_status === '0') {
                        that.setData({
                            zaixian: false,
                            lixian: true
                        })
                    }
                }
                wx.showToast({
                    title: '已完成',
                    icon: 'success',
                    duration: 1000
                });
            }
        })
    },
    // zhuizong: function(e) {
    //     wx.navigateTo({
    //         url: '../maps/maps',
    //     })
    // }
})
//index.js
//获取应用实例
var app = getApp()
var util = require('../../utils/util.js')
Page({
    data: {
        motto: 'Hello World',
        title: 'sinotrans',
        mingcheng: '中国外运发展股份有限公司',
        shuoming: 'SINOTRANS TRANSPORTATION DEVELOPMENT CO., LTD.',
        zhuzuoquan: 'Copyright © 2012',
        usename: "用户名",
        password: "密码"
    },
    onLoad: function() {
        var usename = wx.getStorageSync('keyname')
        var password = wx.getStorageSync('keyword')
        if (usename !== null && password !== null) {
            this.setData({
                usenameValue: usename,
                passwordValue: password
            })
        }
    },
    radioItems: [{
            name: 'cell standard',
            value: '0'
        },
        {
            name: 'cell standard',
            value: '1',
            checked: true
        }
    ],
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value);

        var radioItems = this.data.radioItems;
        for (var i = 0, len = radioItems.length; i < len; ++i) {
            radioItems[i].checked = radioItems[i].value == e.detail.value;
        }

        this.setData({
            radioItems: radioItems
        });
    },
    //事件处理函数
    // bindViewTap: function() {
    //   wx.navigateTo({
    //     url: '../fenzu/fenzu'
    //   })
    // },
    bindUsername: function(e) {
        var usename = e.detail.value
        try {
            wx.setStorageSync('keyname', usename)
        } catch (e) {}
    },
    bindPassword: function(e) {
        var password = e.detail.value
        try {
            wx.setStorageSync('keyword', password)
        } catch (e) {}
    },

    loginTap: function(e) {
        var that = this
        var usename = wx.getStorageSync('keyname')
        var password = wx.getStorageSync('keyword')
        if (usename == '' || password == '') {
            wx.showModal({
                content: '用户名密码不能为空',
                showCancel: false,
                success: function(res) {
                    if (res.confirm) {
                        console.log('用户点击确定')
                    }
                }
            });
        } else {
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
                    if (res.data.resultCode == 200) {
                        var data = res.data.data
                        try {
                            wx.setStorageSync('keyUser', data)
                            wx.setStorageSync('tokenuserid', data.tokenuserid)
                            wx.setStorageSync('keyname', usename)
                            wx.setStorageSync('keyword', password)
                        } catch (e) {}
                        wx.redirectTo({
                            url: "../home/home"
                        })
                    } else {
                        wx.showModal({
                            content: '用户名密码错误',
                            showCancel: false,
                            success: function(res) {
                                if (res.confirm) {
                                    console.log('用户点击确定')
                                }
                            }
                        });
                    }
                }
            });
            // wx.redirectTo({
            //   url: "../home/home"
            // })
        }
    },
})
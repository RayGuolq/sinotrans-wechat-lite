Page({
    data: {
        old: '',
        old1: null,
        newp: '',
        newp1: null,
        confirm: '',
        confirm1: null,
        types: 'password'
    },
    old: function(e) {
        var that = this
        var old = e.detail.value
        that.setData({
            old: old
        })
    },
    newp: function(e) {
        var that = this
        var newp = e.detail.value
        that.setData({
            newp: newp
        })
    },
    confirm: function(e) {
        var that = this
        var confirm = e.detail.value
        that.setData({
            confirm: confirm
        })
    },
    alter: function(e) {
        var that = this
        var res = this.data
        var usename = wx.getStorageSync('keyname')
        if (res.old == '' || res.newp == '' || res.confirm == '') {
            wx.showModal({
                content: '选项不能为空',
                showCancel: false,
                success: function(res) {
                    console.log(res);
                    if (res.confirm) {
                        that.setData({
                            old1: null,
                            newp1: null,
                            confirm1: null
                        })
                    }
                }
            })
        } else {
            if (res.newp == res.confirm) {
                wx.request({
                    url: 'https://lite.keruis.com/KeruisCore/account/ChangePassword',
                    data: {
                        'name': usename,
                        'password': res.old,
                        'newpassword': res.newp
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    // header: {}, // 设置请求的 header
                    success: function(res) {
                        if (res.data.resultCode == 200) {
                            wx.showToast({
                                title: res.data.resultMsg,
                                icon: 'success',
                                duration: 3000
                            });
                        } else {
                            wx.showModal({
                                content: res.data.resultMsg,
                                showCancel: false,
                                success: function(res) {
                                    console.log(res);
                                    if (res.confirm) {
                                        that.setData({
                                            old1: null,
                                            newp1: null,
                                            confirm1: null
                                        })
                                    }
                                }
                            })
                        }
                    },
                })
            } else {
                wx.showModal({
                    content: '两次密码输入不相同',
                    showCancel: false,
                    success: function(res) {
                        console.log(res);
                        if (res.confirm) {
                            that.setData({
                                old1: null,
                                newp1: null,
                                confirm1: null
                            })
                        }
                    }
                })
            }
        }
    },
    // checkboxChange:function(e){
    //     var that = this
    //     var val = e.detail.value
    //     console.log(typeof(a))
    //     if(val == 'true'){
    //         that.setData({
    //             types:'text'
    //         })
    //     }else{
    //         that.setData({
    //             types:'password'
    //         })
    //     }
    // }
})
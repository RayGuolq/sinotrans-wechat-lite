Page({
    data: {
        fromsrc: "/images/people1.png",
        name: "",
        account: "",
        phone: "",
        email: "",
        qiyeID: "",
        qiyeName: "",
        contect: ""
    },
    onLoad: function() {
        var that = this
        var user = wx.getStorageSync('keyUser')
        console.log(user)
        var name = user.u_nickname
        var account = user.u_name
        var phone = user.telephone
        var email = user.email
        var qiyeID = user.s_id
        var qiyeName = user.s_id_nickname
        that.setData({
            name: name,
            account: account,
            phone: phone,
            email: email,
            qiyeID: qiyeID,
            qiyeName: qiyeName
        })

    },
    // imgchange:function(){
    //     console.log(this)
    //     var that = this
    //     wx.chooseImage({
    //         count: 1,
    //         success: function (res) {
    //             // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //             var tempFilePaths = res.tempFilePaths
    //             that.setData({
    //                 fromsrc:tempFilePaths
    //             })
    //         }
    //     })
    // },
    return: function() {
        wx.showModal({
            // title: '弹窗标题',
            content: '退出当前用户',
            confirmText: "确认",
            cancelText: "取消",
            success: function(res) {
                console.log(res);
                if (res.confirm) {
                    try {
                        wx.clearStorageSync()
                    } catch (e) {}
                    wx.redirectTo({
                        url: "../index/index"
                    })
                } else {}
            }
        })
    },
    alter: function() {
        wx.navigateTo({
            url: '../alter/alter',
        })
    }
})
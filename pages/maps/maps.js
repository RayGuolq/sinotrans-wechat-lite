var app = getApp()
Page({
  data: {
        markers: [
            // {
            // iconPath: null,
            // id: 0,
            // latitude:  null,
            // longitude:  null,
            // width: 240,
            // height: 220,
            // name: '地图定位',
            // desc: '我现在的位置'
            // },
            {
            iconPath: "/images/xiangzi1.png",
            id:  0,
            latitude: null,
            longitude:  null,
            width:null,
            height: null,
            // name: '地图定位',
            // desc: '我现在的位置'
        }],
        point:{
            latitude:  '',
            longitude: ''
        },
        
    },
    onLoad:function(e){
        var that = this;
        var id = wx.getStorageSync('keyDid')
        this.setData({
            id:id
        })
        wx.request({
            url: 'https://lite.keruis.com/KeruisApi/device/queryShebei_realtimeByCode',
            data:({"codes":id}),
            method: 'POST',
            header: {
                'content-type': 'application/json'
            },
            success:function(res){
                if(res.data.resultCode == 200){
                    // var srcx = wx.getStorageSync('keycanvasimg'+id+'')
                    var markers = that.data.markers
                    // markers[0].latitude = parseFloat(res.data.data[0].latitude)+0.008
                    // markers[0].longitude = parseFloat(res.data.data[0].longitude)
                    // if(markers[0].latitud=='' || markers[0].longitude==''){
                    //     wx.showModal({
                    //         content: '无经纬度坐标',
                    //         showCancel: false,
                    //         success: function (res) {
                    //             if (res.confirm) {
                    //                 wx.navigateBack({
                    //                     delta: 1, // 回退前 delta(默认为1) 页面
                    //                 })
                    //             }
                    //         }
                    //     })
                    //     markers[0].iconPath = '/'+srcx+''
                    // }else{
                    //     markers[0].iconPath = '/'+srcx+''
                    // }
                    markers[0].latitude = parseFloat(res.data.data[0].latitude)
                    markers[0].longitude = parseFloat(res.data.data[0].longitude)
                    app.deviceInfo.then(function(deviceInfo){
                        console.log(deviceInfo)
                        markers[0].height = deviceInfo.windowHeight/12
                        markers[0].width = (deviceInfo.windowWidth)/8
                        that.setData({
                            markers:markers
                        })
                    })
                    if(markers[0].latitude=='' || markers[0].longitude==''){
                            wx.showModal({
                                content: '无经纬度坐标',
                                showCancel: false,
                                success: function (res) {
                                    if (res.confirm) {
                                        wx.navigateBack({
                                            delta: 1, // 回退前 delta(默认为1) 页面
                                        })
                                    }
                                }
                            })
                    }else{
                        that.setData({
                            markers:markers,
                        })
                    }
                    var point = that.data.point
                    point.longitude = parseFloat(res.data.data[0].longitude)
                    point.latitude = parseFloat(res.data.data[0].latitude)
                    that.setData({
                        markers:markers,
                        point:point
                    }) 
                }
            }
        })
    },
    // onReady:function(e){
    //     var that = this
    //     var id = this.data.id 
    //     var srcx = wx.getStorageSync('keycanvasimg'+id+'')
    //     var markers = that.data.markers
    //     markers[0].iconPath = '/'+srcx+''
    //     console.log(markers)
    //     that.setData({
    //         markers:markers,
    //     }) 
    // }    
})
var util=require('../../utils/util');
const db= wx.cloud.database();
const mailbox=db.collection('mailbox')
// pages/mail/mail.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date: util.getDay(new Date()),
        today: util.getDay(new Date()),
        time: util.getTime(new Date()),
        now:util.getTime(new Date()),
        isPublic:false,
        isSend:0,
    },
    senderChange:function(e){
        this.setData({
            sender:e.detail.value
        })
    },
    addresseeChange:function(e){
        this.setData({
            addressee:e.detail.value
        })
    },
    subjectChange:function(e){
        this.setData({
            subject:e.detail.value
        })
    },
    dateChange: function (e) {
        this.setData({
            date: e.detail.value
        })
    },
    timeChange: function (e) {
        this.setData({
            time: e.detail.value
        })
    },
    textChange:function(e){
        this.setData({
            text:e.detail.value
        })
    },
    checkChange:function(e){
        this.setData({
            isPublic:e.detail.value
        })
    },


//提交按钮
sendmail(){
    var a=this.data.date+' '+this.data.time;
    var b=this.data.today+' '+this.data.now;

    //判断名称和邮箱
    wx.showLoading({
      title: '请稍等',
    })
    if (this.data.sender==null) {
        wx.showModal({
          content:'请输入你的名称',
          showCancel: false,
        })
        wx.hideLoading()
    }else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.addressee))) {
        wx.showModal({
            content:'请输入正确的邮箱',
            showCancel: false,
          })
          wx.hideLoading()
    }else{
        //判断是否当前时间，是则直接发送
        if (a<=b) {
            wx.cloud.callFunction({
                name:"sendEmail",
                data:{
                    subject:this.data.subject,
                    addressee:this.data.addressee,
                    text:this.data.text,
                    sender:this.data.sender,
                },
                sucess(res){
                    console.log("发送成功",res)
                },fail(res){
                    console.log("发送失败",res)
                }
            })
            this.data.isSend=1
            console.log('发送')
        }else{
            this.data.isSend=0
            console.log('保存')
        }

        //保存至数据库
        mailbox.add({
            data:{
                sender:this.data.sender,
                addressee:this.data.addressee,
                subject:this.data.subject,
                text:this.data.text,
                sendTime:this.data.date+' '+this.data.time,
                nowTime:this.data.today+' '+this.data.now,
                isPublic:this.data.isPublic,
                isSend:this.data.isSend
            }
        }).then(res=>{console.log(res)})
        wx.hideLoading({
          complete: () => {
            wx.showModal({
                content:'提交成功',
                showCancel: false,
                complete:() =>{
                    wx.navigateBack({
                      delta: 0,
                    })
                }
            })
        },
        })
        
    }
}
})
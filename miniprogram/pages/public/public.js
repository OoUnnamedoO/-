var util=require('../../utils/util');
const db= wx.cloud.database();
const mailbox=db.collection('mailbox')


Page({

    sendmail(){
        wx.cloud.callFunction({
            name:"sendEmail",
            sucess(res){
                console.log("发送成功",res)
            },fail(res){
                console.log("发送失败",res)
            }
        })
    }



})
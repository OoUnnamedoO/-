// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const nodemailer = require("nodemailer")
// 创建一个SMTP客户端配置
const config = {
    host: 'smtp.163.com',
    port: 25,
    auth: {
        user: 'postleee@163.com',
        pass: 'KSKRUBAKMKDMCLCP'
    }
}
// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);

exports.main =async(event,context) =>{
    var mail = {
        from:event.sender+'<postleee@163.com>',
        subject: event.subject,
        to: event.addressee,
        text:event.text
    };
    let res = await transporter.sendMail(mail);
    return res;
}
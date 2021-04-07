//网页端每日签到
const axios = require("axios");
const cookie = process.env.SMZDM_COOKIE;
const fs = require("fs");
const qmsgapi = process.env.QMSGAPI;
const sckey = process.env.sckey;
const tgapi = process.env.tgapi;
once = null;
ckstatus = 1;
result_md = ""
signstatus = 0;
time = new Date();
tmpHours = time.getHours();
time.setHours(tmpHours + 8);
notice = time.toLocaleString() + "\n";
const header = {
    headers: {
        Referer: "https://www.smzdm.com/",
        cookie: `'${cookie}'`,
        },
      };
function smzdm() {
  return new Promise(async (resolve) => {
    try {
      let url =
        "https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=&_=";
      let res = await axios.get(url, header);
      if (res.data.error_code == 0) {
        data = `签到成功!\n签到天数: ${res.data.data.checkin_num} | Lv:${res.data.data.rank} | 经验值:${res.data.data.exp}`;
      } else {
        data = res.data.error_msg;
      }
      console.log(data);
    } catch (err) {
      console.log(err);
      data="签到接口请求出错"
    }
    resolve("什么值得买每日签到：\n" + data);
  });
}
//smzdm()
//module.exports = smzdm;
sign();

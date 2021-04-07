//网页端每日签到
const axios = require("axios");
function smzdm() {
  return new Promise(async (resolve) => {
    try {
      let url =
        "https://zhiyou.smzdm.com/user/checkin/jsonp_checkin?callback=&_=";
      const header = {
        headers: {
          Referer: "https://www.smzdm.com/",
          cookie: config.smzdm.cookie,
        },
      };
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
module.exports = smzdm;

start();
function start(taskList) {
    return new Promise(async (resolve) => {
        try {
            console.log("任务列表   " + argv._)
            console.log("------------开始签到任务------------");
            for (let i = 0; i < taskList.length; i++) {
                console.log(`任务${i + 1}执行中`);
                let exists = fs.existsSync(`./scripts/${taskList[i]}.js`)
                if (exists) {
                    const task = require(`./scripts/${taskList[i]}.js`);
                    logs += (await task()) + "    \n\n";
                } else {
                    logs += `任务${i+1}：${taskList[i]}  不存在该脚本文件,请确认输入是否有误\n\n`
                    console.log("不存在该脚本文件,请确认输入是否有误")
                }
            }
            console.log("------------任务执行完毕------------\n");
            await sendmsg(logs);
        } catch (err) {
              console.log(err);
        }
        resolve();
    });
}

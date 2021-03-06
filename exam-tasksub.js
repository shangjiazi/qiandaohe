// 通过 webhook 添加定时任务订阅。运行前根据具体情况修改 suburl 和 webhook 里面的内容
// 每次运行都会添加新任务，请不要多次运行
// 这只是一个简单的范例，如果出现未知问题，手动修正一下代码

const suburl = 'https://raw.githubusercontent.com/shangjiazi/shoujicangku/main/226.conf'

const webhook = {
  url: '/webhook',              // 远程： http://sss.xxxx.com/webhook
  token: '5108b7bf-60e2-490d-a60e-51690e452edb',     // 在 webUI->SETTING 界面查找
}

$axios(suburl).then(res=>{
  const body = res.data
  const mastr = body.matchAll(/([0-9\-\*\/]+ [0-9\-\*\/]+ [0-9\-\*\/]+ [0-9\-\*\/]+ [0-9\-\*\/]+( [0-9\-\*\/]+)?) ([^ ,]+), ?tag=([^, \n\r]+)/g)

  ;[...mastr].forEach(mr=>{
    if (mr[3] && mr[1]) {
      $axios({
        url: webhook.url,
        method: 'post',
        data: {
          token: webhook.token,
          type: 'taskadd',
          task: {
            name: mr[4] || 'tasksub-新的任务',
            type: 'cron',
            job: {
              type: 'runjs',
              target: mr[3],
            },
            time: mr[1],
            running: true        // 是否自动执行添加的任务
          }
        }
      }).then(res=>console.log(res.data))
    }
  })
}).catch(e=>console.error(e))

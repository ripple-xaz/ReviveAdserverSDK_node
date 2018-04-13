//配置服务相关内容
//配置node  web框架express
const express = require('express')
const port = 8082
const app = express()
//配置mongodb数据库相关内容
var request = require('request');


const homePage = `
`
app.get('/',function(req,res){
	res.send(homePage)
})
.listen(port,()=>{
 	console.log('Server Running At '+port)
})

//定义初始变量，避免返回的js报错
let location = {
    protocol : 'http'
}
let document = {
    charset :'windows-1252',
    write(){
        
    }
}
let window = {
    location:'http',
    OA_zones:''
}

//getAdInfoByWebsites
app.get('/getAdInfoByWebsites', function (req, res) {
    const sendData = res

    if(!req._parsedUrl.search){
        sendData.send('缺少参数');
    }

    const publishId =  getQueryString('publishId',req._parsedUrl.search)
    const zoneId =  getQueryString('zoneId',req._parsedUrl.search)
    const baseUrl = 'http://123.207.214.20'

    if(zoneId && publishId){
        let options = {
            method:'get',
            url: baseUrl + '/reviveads/www/delivery/spcjs.php?id='+publishId,
            headers: {  //模拟服务器发送请求（Cookie要带上）
                "Content-Type": "application/x-javascript; charset=UTF-8",
                "Access-Control-Allow-Origin" : "*",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" ,
                "Upgrade-Insecure-Requests": 1,
                "Pragma" : "no-cache",
                "Host" : "123.207.214.20",
                "Cookie" : "OAID=0da80651e5e6ce91137dfa432573cc3b; OAZBLOCK=5.1521772541_23.1522751283_24.1522154770; OXLCA=26.p6lvne-23; OABLOCK=26.1522757703_28.1522165013; OACAP=26.343_28.17; OAZCAP=5.12_23.343_24.2; OXLIA=26.p6lzd3-23; OAGEO=CN%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; OACBLOCK=2.1521772541_3.1521773222_6.1522046228_12.1522757703_13.1522165013_15.1523429211_18.1523429211_16.1523429211; OACCAP=2.14_3.30_6.55_12.348_13.17_15.118_18.165_16.137; OASCCAP=16.1_18.1_15.1",
                "Connection" : "keep-alive",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Accept": "*/*"
            }
        };
        request(options, function (err, res, body) { //spcjs
            http://123.207.214.20/reviveads/www/delivery/spc.php?zones=32%7C29%7C30&source=&r=71837104&charset=UTF-8&/
            if (err) {
                sendData.send('参数错误');
            }else {
                const scriptText = body
                eval(scriptText)  //执行返回的结果
                let url =  baseUrl + '/reviveads/www/delivery/spc.php?zones=' + OA_zoneids + '&r=' + OA_r+'&loc=http://123.206.205.11&source=&charset=UTF-8'
                let options = { 
                    method:'get',
                    url:url,
                    headers: {  //模拟服务器发送请求（Cookie要带上）
                        "Content-Type": "application/x-javascript; charset=UTF-8",
                        "Access-Control-Allow-Origin" : "*",
                        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" ,
                        "Upgrade-Insecure-Requests": 1,
                        "Pragma" : "no-cache",
                        "Host" : "123.207.214.20",
                        "Cookie" : "OAID=0da80651e5e6ce91137dfa432573cc3b; OAZBLOCK=5.1521772541_23.1522751283_24.1522154770; OXLCA=26.p6lvne-23; OABLOCK=26.1522757703_28.1522165013; OACAP=26.343_28.17; OAZCAP=5.12_23.343_24.2; OXLIA=26.p6lzd3-23; OAGEO=CN%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; OACBLOCK=2.1521772541_3.1521773222_6.1522046228_12.1522757703_13.1522165013_15.1523429211_18.1523429211_16.1523429211; OACCAP=2.14_3.30_6.55_12.348_13.17_15.118_18.165_16.137; OASCCAP=16.1_18.1_15.1",
                        "Connection" : "keep-alive",
                        "Cache-Control": "no-cache",
                        "Connection": "keep-alive",
                        "Accept": "*/*",
                    }
                }
                request(options, function (err, res, body) {
                    if(err){
                        sendData.send('参数错误');
                    }else {
                        eval(body); //执行字符串语句
                        var locationUrl = getNavUrl(OA_output[zoneId])[0]
                        var imgUrl = getImgUrl(OA_output[zoneId])[0]
                        imgUrl = getUrl(imgUrl)
                        locationUrl = getUrl(locationUrl)
                        function getNavUrl(str){  //截取导航地址
                            var reg = /href='.+?'/ig
                            return str.match(reg)
                        }
                        function getImgUrl(str){  //截取图片地址
                            var reg = /src='.+?'/ig
                            return str.match(reg)
                        }

                        function getUrl(str){  //将获取到的图片喝和导航地址进行处理
                            return str.substring(str.indexOf('=')+2,str.length-1)
                        }

                        var data = {
                            locationUrl,imgUrl
                        }
                        sendData.send(data)
                    }
                })

                function getZoneIds(){ //获取zoneId
                    var reg = /var OA_zoneids = escape/ig
                }
            }
        })
    }else{
         sendData.send('参数错误');
    }
});



//getAdInfoByZone
app.get('/getAdInfo', function (req, res) {
    const sendData = res

    if(!req._parsedUrl.search){
        sendData.send('缺少参数');
    }

    const publishId =  getQueryString('publishId',req._parsedUrl.search)
    const zoneId =  getQueryString('zoneId',req._parsedUrl.search)
    const baseUrl = 'http://123.207.214.20'

    if(zoneId && publishId){
        let url = 'http://123.207.214.20/reviveads/www/delivery/avw.php?zoneid='+zoneId+'&cb=INSERT_RANDOM_NUMBER_HERE&n=a2522711'
        let options = {
            method:'get',
            url:url,
            headers: {  //模拟服务器发送请求（Cookie要带上）
                "Content-Type": "application/x-javascript; charset=UTF-8",
                "Access-Control-Allow-Origin" : "*",
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" ,
                "Upgrade-Insecure-Requests": 1,
                "Pragma" : "no-cache",
                "Host" : "123.207.214.20",
                "Cookie" : "OAID=0da80651e5e6ce91137dfa432573cc3b; OAZBLOCK=5.1521772541_23.1522751283_24.1522154770; OXLCA=26.p6lvne-23; OABLOCK=26.1522757703_28.1522165013; OACAP=26.343_28.17; OAZCAP=5.12_23.343_24.2; OXLIA=26.p6lzd3-23; OAGEO=CN%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; OACBLOCK=2.1521772541_3.1521773222_6.1522046228_12.1522757703_13.1522165013_15.1523429211_18.1523429211_16.1523429211; OACCAP=2.14_3.30_6.55_12.348_13.17_15.118_18.165_16.137; OASCCAP=16.1_18.1_15.1",
                "Connection" : "keep-alive",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
                "Accept": "*/*"
            }
        }
        request(options, function (err, res, body) {
                if(err){
                    sendData.send('参数错误');
                }else {
                    var m3_r = Math.floor(Math.random()*99999999999);
                    let url =  baseUrl + '/reviveads/www/delivery/ajs.php?zoneid='+zoneId+'&cb='+m3_r+'&charset=windows-1252&loc=file:///C:/Users/ripple/Desktop/ins.html'
                    let options = { 
                        method:'get',
                        url:url,
                        headers: {  //模拟服务器发送请求（Cookie要带上）
                            "Content-Type": "application/x-javascript; charset=UTF-8",
                            "Access-Control-Allow-Origin" : "*",
                            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 Safari/537.36" ,
                            "Upgrade-Insecure-Requests": 1,
                            "Pragma" : "no-cache",
                            "Host" : "123.207.214.20",
                            "Cookie" : "OAID=0da80651e5e6ce91137dfa432573cc3b; OAZBLOCK=5.1521772541_23.1522751283_24.1522154770; OXLCA=26.p6lvne-23; OABLOCK=26.1522757703_28.1522165013; OACAP=26.343_28.17; OAZCAP=5.12_23.343_24.2; OXLIA=26.p6lzd3-23; OAGEO=CN%7C%7C%7C%7C%7C%7C%7C%7C%7C%7C; OACBLOCK=2.1521772541_3.1521773222_6.1522046228_12.1522757703_13.1522165013_15.1523429211_18.1523429211_16.1523429211; OACCAP=2.14_3.30_6.55_12.348_13.17_15.118_18.165_16.137; OASCCAP=16.1_18.1_15.1",
                            "Connection" : "keep-alive",
                            "Cache-Control": "no-cache",
                            "Connection": "keep-alive",
                            "Accept": "*/*",
                        }
                    }
                    request(options, function (err, res, body) {
                        if(err){
                            sendData.send('参数错误');
                        }else {
                            let str = unescapeHTML(body)
                            
                            var locationUrl = getNavUrl(str)[0]
                            console.log(locationUrl);
                            var imgUrl = getImgUrl(str)[0]
                            console.log(imgUrl);
                            imgUrl = getUrl(imgUrl)
                            locationUrl = getUrl(locationUrl)

                            function unescapeHTML (a){//解码
                                a = "" + a;
                               return a.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/\\/g,'').replace(/\"/g,'');
                            }
                            function getNavUrl(str){  //截取导航地址
                                var reg = /href='.+?'/ig
                                return str.match(reg)
                            }
                            function getImgUrl(str){  //截取图片地址
                                var reg = /src='.+?'/ig
                                return str.match(reg)
                            }

                            function getUrl(str){  //将获取到的图片喝和导航地址进行处理
                                return str.substring(str.indexOf('=')+2,str.length-1)
                            }

                            var data = {
                                locationUrl,imgUrl
                            }
                            sendData.send(data)
                        }
                    })
                }
        })
           
    }else{
         sendData.send('参数错误');
    }
});



function getQueryString(name,url){  //截取search
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)",'i');
    var r = url.substr(url.indexOf('?')+1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}
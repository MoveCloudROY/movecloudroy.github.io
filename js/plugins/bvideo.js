stellaris.registerThemePlugin(".bvideo",{convertNum:a=>1e4<=a?(a/1e4).toFixed(1)+"万":a,toHHMMSS:a=>[Math.floor(a/3600),Math.floor(a/60)%60,a%60].map(a=>a.toString().padStart(2,0)).join(":"),getVideoMessage:async function(a){var e=a.slice(0,2).toLowerCase(),e=stellar.tag_plugins.bvideo.video_info+`?vtype=${{av:"aid",bv:"bvid"}[e]}&type=${e}&id=`+a,e=(await(await fetch(e)).json()).data;return e?{v_id:a,v_title:e.title,v_time:this.toHHMMSS(e.duration),v_playview:e.stat.view,v_danmaku:this.convertNum(e.stat.danmaku),v_type:"视频",v_upname:e.owner.name,v_cover:e.pic}:{v_id:a,v_title:"出错了！"}},layout:function(e){var a=e.getAttribute("v_id");this.getVideoMessage(a).then(a=>{e.children[0].innerHTML=`<div class="bvideo-box">
              <div class="bvideo-cover">
                  <div class="cover-default"></div>
                  <div class="bvideo-cover-layer" style="background-image:url(${stellar.tag_plugins.bvideo.image_proxy}${a.v_cover}@320w_200h_1c_!web-space-index-myvideo.webp)">
                      <i class="icon-video"></i>
                  </div>
                  <span class="duration">${a.v_time}</span>
              </div>
              <div class="bvideo-info">
                  <p class="title">${a.v_title}</p>
                  <p class="card-status">
                      <span class="play-num">
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="12" viewBox="0 0 384 512"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"/></svg>
                          <span>${a.v_playview}</span></span>
                      <span>
                          <svg xmlns="http://www.w3.org/2000/svg" height="16" width="18" viewBox="0 0 576 512"><path d="M64 80c-8.8 0-16 7.2-16 16V416c0 8.8 7.2 16 16 16H512c8.8 0 16-7.2 16-16V96c0-8.8-7.2-16-16-16H64zM0 96C0 60.7 28.7 32 64 32H512c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96zm96 64a32 32 0 1 1 64 0 32 32 0 1 1 -64 0zm104 0c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm0 96c0-13.3 10.7-24 24-24H448c13.3 0 24 10.7 24 24s-10.7 24-24 24H224c-13.3 0-24-10.7-24-24zm-72-64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM96 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
                          <span>${a.v_danmaku}</span></span></p>
                  <div class="partition">
                      <label class="card-label">${a.v_type}</label>
                      <label class="up-label"></label>
                      <label class="up-name">${a.v_upname}</label>
                  </div>
                  <div class="actions hide"></div>
              </div>
          </div>`})},init:function(){var e=document.getElementsByClassName("bvideo");for(let a=0;a<e.length;a++){var i=e[a];this.layout(i)}}});
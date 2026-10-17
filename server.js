const http=require('http');
const fs=require('fs');
const path=require('path');
const {WebSocketServer}=require('ws');
const PORT=process.env.PORT||3000;
const html=path.join(__dirname,'public','index.html');
const server=http.createServer((req,res)=>{if(req.url==='/'||req.url==='/index.html'){res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'});fs.createReadStream(html).pipe(res);}else{res.writeHead(404);res.end('Not found');}});
const wss=new WebSocketServer({server,path:'/ws'});
const rooms=new Map();
const send=(ws,obj)=>{if(ws?.readyState===1)ws.send(JSON.stringify(obj));};
const code=()=>Array.from({length:6},()=> 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[Math.floor(Math.random()*32)]).join('');
function leave(ws){let room=ws.room;if(!room)return;let r=rooms.get(room);ws.room=null;if(!r)return;rooms.delete(room);for(let p of r.players)if(p!==ws){p.room=null;send(p,{type:'left'});}}
wss.on('connection',ws=>{ws.on('message',raw=>{let m;try{m=JSON.parse(raw)}catch{return;}if(m.type==='create'){leave(ws);let room;do{room=code()}while(rooms.has(room));let series=m.series===3?3:1;rooms.set(room,{players:[ws],series,turn:0,round:1});ws.room=room;ws.side=0;send(ws,{type:'created',room});}else if(m.type==='join'){leave(ws);let room=String(m.room||'').toUpperCase(),r=rooms.get(room);if(!r||r.players.length!==1){send(ws,{type:'error',message:'입장 가능한 방이 없습니다.'});return;}r.players.push(ws);ws.room=room;ws.side=1;send(ws,{type:'joined',room,series:r.series});r.players.forEach((p,i)=>send(p,{type:'start',room,series:r.series,side:i}));}else if(m.type==='move'){let r=rooms.get(ws.room);if(!r||r.players.length!==2||!m.move||!Number.isInteger(m.move.to)||m.move.to<0||m.move.to>11)return;let p=r.players.find(x=>x!==ws);send(p,{type:'move',move:m.move});}else if(m.type==='next'){let r=rooms.get(ws.room);if(!r||ws.side!==0)return;r.round++;send(r.players[1],{type:'next'});}else if(m.type==='leave')leave(ws);});ws.on('close',()=>leave(ws));});
server.listen(PORT,()=>console.log('십이장기 ONLINE listening on '+PORT));

# 십이장기 ONLINE V9

V8 기반 업데이트: 온라인 방장(서버 side=0)은 빨강, 참가자(side=1)는 초록으로 고정. 두 기기 모두 자신의 진영이 아래쪽에 오도록 보드 방향 조절. 3판 2선승제에서도 진영 색은 고정하며 선공만 번갈아 진행. 포획한 말과 차례 표시도 색상을 일치시킴. AI 대전과 캐릭터 기본 테마 및 V8 모바일 UI 유지.

배포: npm install / npm start. Render Root Directory 비움, Build `npm install`, Start `npm start`. `public/index.html`을 서버가 제공함. 오프라인 HTML은 AI 대전 확인용.

주의: 서버는 이동 메시지를 중계하는 방식이며 서버 측 게임 규칙 검증은 미구현. 실제 두 기기 온라인 플레이는 별도 검증 필요.

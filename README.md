# 십이장기 ONLINE V8

## 실행 / 배포
- `npm install` 후 `npm start`
- Render: Build Command `npm install`, Start Command `npm start`
- `public/index.html`: 온라인 웹 클라이언트
- 별도 `TwelveShogi_V8_Offline.html`: AI 대전 로컬 테스트 (온라인 대전은 서버 접속 필요)

## V8 개선
- 메인화면 제목 확대, 메뉴를 중앙에 집중 배치
- 도움말을 기본 규칙 / AI 대전 / 온라인 대전 탭으로 구성, 방 코드·대기실·접속 오류 상세 설명
- 모바일 게임 화면에서 장기판과 하단 버튼을 한 화면에 배치, 안전 영역 반영
- V7의 캐릭터 테마 기본값 및 기존 기능 유지

주의: 실제 다양한 모바일 기기 및 2대의 기기 간 온라인 연결은 별도 검증 필요. 서버는 기존 중계 방식으로 규칙 검증 보완이 필요합니다.

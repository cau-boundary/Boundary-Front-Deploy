<p align="center">
<img src="https://user-images.githubusercontent.com/30883319/121801534-c77b0b80-cc72-11eb-8d72-193a9e24ee33.png">
</p>

# Boundary Frontend
## 레포지토리 다운받기
```bash
git clone repository_name
```

## 레포지토리 세팅
### ./config.js 세팅
`./config.js`파일을 만들어 다음 내용에 맞게 설정
```js
const config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302"] }] };
module.exports = {
    peerConfig : {
        // for deployment enable below
        host: "localhost",
        port: 3000
        // for local test enable below
        // host: "serverURL",
        // port: 443
        path: "/media-chat",
        config,
        // deploy to aws or herokuapp enable secure:true option
        // secure: true,
    },
    apiConfig : {
        // baseURL: "https://serverURL",
		baseURL: "http://localhost:3000",
    }
}
```
### mapbox api key 세팅
[Mapbox](https://account.mapbox.com) 에서 발급받은 API Key를 `./src/components/page_index/bdmainmap.tsx`78번째 줄 mapbox_api_key에 삽입
```js
...
map.current = new mapboxgl.Map({
    accessToken: `mapbox_api_key`,
    container: mapContainer.current,
...
```

## 서버 실행
### 기본 실행
```bash
npm run build
npm run start
```
### pm2 사용시
```bash
#기존에 서버가 실행중이라면 중지시키고
npm run build
pm2 start npm --name "boundary_front" -- start
```

## 코드 컨벤션
### prettieerc & eslintrc format on save 설정
VSCode settings.json 파일 설정
```json
{
    // Set the default
    "editor.formatOnSave": false,
    // Enable per-language
    "[javascript]": {
    "editor.formatOnSave": true
    },
    "editor.codeActionsOnSave": {
    // For ESLint
    "source.fixAll.eslint": true
    }
}
```
### git branch 관리
* git flow 사용하여 관리
    * git flow feature start "기능이름"
    * git flow feature finish "기능이름"
    * 개발은 develop 브랜치에서 진행
* develop 브랜치 pull은 주기적으로 할 것

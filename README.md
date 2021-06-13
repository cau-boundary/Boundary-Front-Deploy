# Boundary Frontend

<h1>사용법</h1>
<pre>
1.git clone repository_name
2.git checkout develop
3.npm install
4.npm run dev
5.root 디렉토리에 config.js 생성 후 아래와 같은 형식으로 작성
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
</pre>

```bash
# 기존에 실행중인 서버가 있다면 종료하기
pm2 delete boundary_front

# 새로운 서버 시작
npm run build
pm2 start npm --name "boundary_front" -- start
```

<h1>코드 작성전 유의사항</h1>
<pre>
1. git flow 사용중
2. develop 브랜치 확인
3. git flow feature start "기능이름"
4. git flow feature finish "기능이름"
5. 단 develop 브랜치 pull은 주기적으로 할 것
</pre>

<h1>저장할때마다 코드 자동 prettieerc & eslintrc 적용하는 방법</h1>
<pre>
1. VS Code에서 settings.json파일을 들어간다(윈도우, 리눅스에서는 Ctrl + ,, 맥에서는 Cmd + , 를 누르고 오른쪽 위에 작은 문서 아이콘 누르면 settings.json 볼 수 있음)
2. 아래 내용을 붙여넣기
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
</pre>

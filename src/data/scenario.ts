import type { SimulationData, Round } from '../types/simulation';

// ─────────────────────────────────────────────────────────────
// ROUND 01 — 긴급 | 애매한 브리프
// ─────────────────────────────────────────────────────────────
const round01: Round = {
  id: 1,
  situationType: '긴급',
  title: '애매한 브리프',
  content: {
    type: 'email',
    from: 'PM 지수현 <jisuhyeon@novaworks.io>',
    to: '강다은',
    date: '2024년 3월 12일 (화) 오전 10:22',
    subject: '온보딩 화면 개선 건',
    body: `다은씨,

안녕하세요. 이번 주 Growth 지표 검토하다가 연락드려요.

최근 신규 가입자의 7일 활성화율이 계속 정체 상태예요. 지난달 기준으로 32~33% 사이에서 맴돌고 있는데, 이번 분기 OKR 목표가 40%라서 좀 답답한 상황이에요. 팀에서는 온보딩 경험이 원인 중 하나라는 얘기가 나오고 있고요.

이번 스프린트 안에 온보딩 화면 개선을 해볼 수 있을까요? 디자인 나오는 대로 태민한테 바로 넘기면 이번 스프린트 안에 붙일 수 있을 것 같아서요. 구체적인 방향은 다은씨가 판단해서 가져와주면 제일 좋겠어요.

어떻게 생각하세요?

지수현`,
  },
  question: '어떻게 시작할 것인가?',
  choices: [
    {
      id: '1a',
      text: 'PM에게 30분 미팅을 잡아 목표 지표, 개선 범위, 성공 기준을 먼저 정의한다',
      branchKey: 'align',
      scores: { user: 4, collaboration: 5, decision: 4, business: 4 },
      quality: 'optimal',
    },
    {
      id: '1b',
      text: '기존 온보딩 플로우를 분석하고 유저 인터뷰 데이터부터 직접 찾아본다',
      branchKey: 'research',
      scores: { user: 5, collaboration: 2, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '1c',
      text: '비슷한 B2B SaaS 온보딩 레퍼런스를 수집해 개선 방향 초안을 먼저 만든다',
      branchKey: 'reference',
      scores: { user: 2, collaboration: 2, decision: 3, business: 2 },
      quality: 'suboptimal',
    },
    {
      id: '1d',
      text: '스프린트 기간을 감안해 빠르게 개선안 3개를 만들어 PM에게 먼저 보여준다',
      branchKey: 'rush',
      scores: { user: 1, collaboration: 2, decision: 2, business: 1 },
      quality: 'poor',
    },
    {
      id: '1e',
      text: '활성화율 데이터에 접근해 어느 단계에서 이탈이 일어나는지 수치로 파악한다',
      branchKey: 'data',
      scores: { user: 4, collaboration: 2, decision: 4, business: 4 },
      quality: 'suboptimal',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 02 — 협업 | 엔지니어의 반론
// ─────────────────────────────────────────────────────────────
const round02: Round = {
  id: 2,
  situationType: '협업',
  title: '엔지니어의 반론',
  content: {
    type: 'plain',
    text: `디자인 초안을 공유하자 엔지니어 태민이 #growth-squad 채널에 메시지를 남겼다.

"다은씨, 확인했어요. 근데 이 플로우대로 구현하면 최소 2주는 걸릴 것 같아요. 이번 스프린트가 1주인데, 지수현씨도 이 일정 알고 있어요?"`,
  },
  question: '어떻게 대응할 것인가?',
  choices: [
    {
      id: '2a',
      text: '태민, 지수현과 3자 미팅을 잡아 구현 가능한 범위로 디자인을 조정한다',
      branchKey: 'negotiate',
      scores: { user: 3, collaboration: 5, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '2b',
      text: '구현 복잡도를 낮출 수 있는 대안 플로우를 태민과 1:1로 먼저 논의한다',
      branchKey: 'simplify',
      scores: { user: 3, collaboration: 4, decision: 4, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '2c',
      text: '1주 안에 가능한 범위로 스코프를 직접 줄여 수정안을 만들어 PM에게 보고한다',
      branchKey: 'scope_down',
      scores: { user: 2, collaboration: 2, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '2d',
      text: '일정 조정은 PM 소관이므로 채널에 확인 완료 이모지를 남기고 PM에게 공을 넘긴다',
      branchKey: 'pass',
      scores: { user: 1, collaboration: 1, decision: 1, business: 2 },
      quality: 'poor',
    },
    {
      id: '2e',
      text: '2주 일정이 필요하다는 태민의 판단을 PM에게 공유하고 스프린트 조정을 제안한다',
      branchKey: 'extend',
      scores: { user: 2, collaboration: 3, decision: 2, business: 2 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 03 — 의사결정 | 데이터 vs 직관
// ─────────────────────────────────────────────────────────────
const round03: Round = {
  id: 3,
  situationType: '의사결정',
  title: '데이터 vs 직관',
  content: {
    type: 'document',
    title: '온보딩 UX 개선 — 사용자 인터뷰 요약',
    author: '강다은',
    date: '2024년 3월 14일',
    body: `## 조사 개요
- 대상: 최근 30일 내 가입한 신규 유저 8명 (B2B 담당자)
- 방식: 원격 인터뷰, 각 45분

## 주요 발견

### 1. 설정 단계의 인지 부하
인터뷰 참여자 8명 중 6명이 최초 워크스페이스 설정 화면에서 "입력해야 할 항목이 너무 많다"는 반응을 보였다. 특히 팀 규모, 업종, 주요 사용 목적을 한 화면에서 동시에 요구하는 구조에 대한 불만이 집중됐다.

### 2. 완료 후 다음 행동 불명확
가입 완료 후 화면에서 무엇을 해야 하는지 모르겠다는 응답이 5명. 현재 온보딩은 설정 완료를 종료 지점으로 인식하게 설계되어 있으며, 첫 번째 핵심 기능으로의 연결이 부재.

### 3. 진행 상황 피드백 부족
"내가 지금 몇 단계 중 몇 단계에 있는지 모르겠다"는 언급 4건.

## 개선 방향 가설
- 설정 항목을 필수/선택으로 분리해 초기 진입 장벽 낮추기
- 완료 화면에 '첫 번째 할 일' CTA 추가
- 단계 표시 인디케이터 도입`,
  },
  branchedContent: {
    align: {
      type: 'document',
      title: '온보딩 UX 개선 — 사용자 인터뷰 요약',
      author: '강다은',
      date: '2024년 3월 14일',
      body: `## 조사 개요
- 대상: 최근 30일 내 가입한 신규 유저 8명 (B2B 담당자)
- 방식: 원격 인터뷰, 각 45분
- ※ 이번 리서치는 지수현PM과 사전 합의한 성공 기준(7일 활성화율 +5%p) 기반으로 설계됨

## 주요 발견

### 1. 설정 단계의 인지 부하
인터뷰 참여자 8명 중 6명이 최초 워크스페이스 설정 화면에서 "입력해야 할 항목이 너무 많다"는 반응을 보였다. 특히 팀 규모, 업종, 주요 사용 목적을 한 화면에서 동시에 요구하는 구조에 대한 불만이 집중됐다.

### 2. 완료 후 다음 행동 불명확
가입 완료 후 화면에서 무엇을 해야 하는지 모르겠다는 응답이 5명.

### 3. 진행 상황 피드백 부족
"내가 지금 몇 단계 중 몇 단계에 있는지 모르겠다"는 언급 4건.

## 개선 방향 가설
- 설정 항목을 필수/선택으로 분리해 초기 진입 장벽 낮추기
- 완료 화면에 '첫 번째 할 일' CTA 추가
- 단계 표시 인디케이터 도입`,
    },
  },
  question: '어떤 방향으로 의사결정을 내릴 것인가?',
  choices: [
    {
      id: '3a',
      text: '인터뷰 데이터를 근거로 삼아 PM을 설득하고 설계 방향을 리서치 결과 기반으로 정한다',
      branchKey: 'data_driven',
      scores: { user: 5, collaboration: 4, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '3b',
      text: 'PM의 직관과 리서치 결과를 병행 검토할 수 있도록 두 방향의 프로토타입을 각각 만든다',
      branchKey: 'both',
      scores: { user: 4, collaboration: 4, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '3c',
      text: 'PM의 의견을 따르되, 리서치 결과를 문서화해서 다음 기회에 다시 꺼낼 수 있도록 남긴다',
      branchKey: 'defer',
      scores: { user: 2, collaboration: 3, decision: 2, business: 2 },
      quality: 'suboptimal',
    },
    {
      id: '3d',
      text: '더 많은 데이터가 필요하다고 판단해 추가 리서치를 PM에게 요청한다',
      branchKey: 'more_data',
      scores: { user: 3, collaboration: 2, decision: 1, business: 1 },
      quality: 'poor',
    },
    {
      id: '3e',
      text: '리서치 결과보다 PM의 시장 감각이 더 중요하다고 판단해 PM 의견대로 진행한다',
      branchKey: 'pm_call',
      scores: { user: 1, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 04 — 위기 | C레벨의 전면 수정 요구
// ─────────────────────────────────────────────────────────────
const round04: Round = {
  id: 4,
  situationType: '위기',
  title: 'C레벨의 전면 수정 요구',
  content: {
    type: 'email',
    from: 'CPO 박현우 <hyunwoo.park@novaworks.io>',
    to: 'Growth Squad (지수현, 강다은, 태민 외)',
    date: '2024년 3월 18일 (월) 오후 2:47',
    subject: '온보딩 개선안 검토 의견',
    body: `팀,

오늘 디자인 리뷰에서 온보딩 개선안 봤어요. 전반적인 방향성에 대해 한 마디 드리고 싶어서요.

지금 안은 기존 플로우를 다듬는 수준에 머물러 있는 것 같아요. 어제 경쟁사 Flowbase 자료 보셨나요? 지난달 온보딩 전면 개편 이후 7일 활성화율이 12%p 올랐다는 리포트가 나왔거든요. 우리 지표랑 비교하면 격차가 계속 벌어지는 상황이에요.

런칭까지 3일 남은 거 알고 있어요. 근데 솔직히 이번에 점진적 개선으로 붙이면 또 패치 반복이 될 것 같아서, 이 기회에 구조 자체를 다시 볼 필요가 있지 않을까 싶어요.

팀에서 어떻게 생각하는지 의견 주시면 좋겠어요.

현우`,
  },
  question: '어떻게 대응할 것인가?',
  choices: [
    {
      id: '4a',
      text: 'CPO와 PM, 팀이 함께하는 긴급 리뷰를 소집해 현실적인 범위와 리스크를 데이터로 제시한다',
      branchKey: 'escalate',
      scores: { user: 3, collaboration: 5, decision: 5, business: 5 },
      quality: 'optimal',
    },
    {
      id: '4b',
      text: '현재안을 유지하되, 구조 개편을 위한 별도 프로젝트를 다음 스프린트에 제안하는 문서를 작성한다',
      branchKey: 'defer_next',
      scores: { user: 3, collaboration: 4, decision: 4, business: 4 },
      quality: 'suboptimal',
    },
    {
      id: '4c',
      text: 'CPO의 의견을 반영해 핵심 플로우만 빠르게 재설계하고 3일 안에 개발 가능한 범위로 좁힌다',
      branchKey: 'partial_rebuild',
      scores: { user: 2, collaboration: 3, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '4d',
      text: 'CPO 지시이므로 PM에게 일정 연기를 요청하고 전면 재설계를 시작한다',
      branchKey: 'full_rebuild',
      scores: { user: 2, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
    {
      id: '4e',
      text: '이미 개발이 시작된 상황임을 CPO에게 전달하고 현재안대로 진행한다',
      branchKey: 'ignore',
      scores: { user: 2, collaboration: 1, decision: 2, business: 1 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 05 — 전략 | 디자인 시스템 딜레마
// ─────────────────────────────────────────────────────────────
const round05: Round = {
  id: 5,
  situationType: '전략',
  title: '디자인 시스템 딜레마',
  content: {
    type: 'attachment',
    files: [
      {
        name: 'Novaworks_DesignSystem_v2.3.pdf',
        fileType: 'pdf',
        preview: `# NovaWorks Design System v2.3
## 컴포넌트 현황

### 현재 제공 컴포넌트
- Button (Primary / Secondary / Ghost)
- Input (Text / Textarea / Select)
- Modal (Default / Confirm)
- Card (Default / Bordered)
- Progress Bar (Linear)
- Toast Notification

### 미제공 컴포넌트 (v3.0 예정)
- Step Indicator (다단계 진행 표시)
- Checklist (체크 가능한 항목 목록)
- Tooltip (맥락 도움말)

> ⚠️ 시스템에 없는 패턴을 임의 생성할 경우 디자인 리뷰 필수.
> 시스템 일관성 유지를 위해 신규 컴포넌트는 DS팀 승인 후 도입.`,
      },
    ],
  },
  question: '어떻게 진행할 것인가?',
  choices: [
    {
      id: '5a',
      text: 'DS팀에 Step Indicator 컴포넌트 우선 도입을 요청하고, 승인 전까지 대안 구조를 검토한다',
      branchKey: 'request_ds',
      scores: { user: 3, collaboration: 5, decision: 4, business: 4 },
      quality: 'optimal',
    },
    {
      id: '5b',
      text: '현재 시스템 내 Progress Bar를 활용해 Step Indicator 역할을 수행하도록 UI를 구성한다',
      branchKey: 'adapt',
      scores: { user: 3, collaboration: 4, decision: 4, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '5c',
      text: 'Step Indicator 컴포넌트를 직접 설계해 개발 팀에 구현을 요청한다',
      branchKey: 'custom',
      scores: { user: 3, collaboration: 2, decision: 3, business: 2 },
      quality: 'suboptimal',
    },
    {
      id: '5d',
      text: '다른 디자이너 유진의 경고를 따라 Step Indicator 없이 디자인 방향을 수정한다',
      branchKey: 'drop',
      scores: { user: 1, collaboration: 3, decision: 2, business: 1 },
      quality: 'poor',
    },
    {
      id: '5e',
      text: '시스템에 없더라도 사용자 경험을 위해 필요하므로 리뷰 없이 바로 설계를 진행한다',
      branchKey: 'skip_review',
      scores: { user: 2, collaboration: 1, decision: 2, business: 1 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 06 — 협업 | QA 구현 불일치
// ─────────────────────────────────────────────────────────────
const round06: Round = {
  id: 6,
  situationType: '협업',
  title: 'QA 구현 불일치',
  content: {
    type: 'document',
    title: 'QA 검수 결과 — 온보딩 개선 v1.0',
    author: 'QA 민재',
    date: '2024년 3월 20일',
    body: `## 검수 요약
- 검수 환경: Chrome 최신 / macOS
- 전체 항목: 24건
- 통과: 17건 / 미통과: 7건

## 주요 불일치 항목

### [CRITICAL] 단계 표시 위치 다름
- 디자인 스펙: 진행 인디케이터가 각 단계 상단 고정
- 실제 구현: 하단 배치됨
- 영향: 사용자가 현재 단계를 파악하기 어려움

### [MAJOR] 선택 항목 선택 시 피드백 없음
- 디자인 스펙: 항목 선택 시 체크 애니메이션 + 배경색 변경
- 실제 구현: 상태 변화 없음 (정적)

### [MAJOR] 완료 화면 CTA 버튼 누락
- 디자인 스펙: '첫 번째 기능 체험하기' 버튼 포함
- 실제 구현: 버튼 없이 완료 텍스트만 표시됨

### [MINOR] 폰트 사이즈 오차
- 스펙: 16px / 구현: 14px (3개 항목)

## 원인 추정
개발팀 확인 결과, 해당 화면의 스펙 문서 버전이 상이했음. 개발 팀은 v1.1 기준으로 구현, QA는 v1.3 기준으로 검수.`,
  },
  question: '어떻게 대응할 것인가?',
  choices: [
    {
      id: '6a',
      text: 'CRITICAL/MAJOR 항목 원인을 태민과 확인하고, 스펙 버전 관리 프로세스를 함께 정비한다',
      branchKey: 'process',
      scores: { user: 3, collaboration: 5, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '6b',
      text: 'CRITICAL 항목만 긴급 수정을 요청하고 나머지는 다음 배포로 분리한다',
      branchKey: 'triage',
      scores: { user: 3, collaboration: 3, decision: 4, business: 4 },
      quality: 'suboptimal',
    },
    {
      id: '6c',
      text: '모든 불일치 항목을 수정할 수 있도록 배포 일정 연기를 PM에게 요청한다',
      branchKey: 'delay',
      scores: { user: 3, collaboration: 3, decision: 2, business: 2 },
      quality: 'suboptimal',
    },
    {
      id: '6d',
      text: '스펙 버전이 달랐던 것은 개발 팀의 확인 소홀이므로 수정 책임을 개발 팀에 전달한다',
      branchKey: 'blame',
      scores: { user: 1, collaboration: 1, decision: 2, business: 1 },
      quality: 'poor',
    },
    {
      id: '6e',
      text: 'MINOR 수준이라 판단해 현재 구현 상태로 배포를 진행한다',
      branchKey: 'ship_anyway',
      scores: { user: 1, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 07 — 위기 | 론칭 후 지표 하락
// ─────────────────────────────────────────────────────────────
const round07: Round = {
  id: 7,
  situationType: '위기',
  title: '론칭 후 지표 하락',
  content: {
    type: 'slide',
    slides: [
      {
        title: '온보딩 개선 배포 후 7일 지표 현황',
        bullets: [
          '배포일: 2024년 3월 21일',
          '측정 기간: 배포 후 7일 (3/21~3/27)',
          '비교 기준: 직전 7일 (3/14~3/20)',
        ],
        note: '데이터 출처: Amplitude · 작성 2024.03.28',
      },
      {
        title: '핵심 지표 변화',
        table: {
          headers: ['지표', '배포 전', '배포 후', '변화'],
          rows: [
            ['7일 활성화율', '34.2%', '31.1%', '▼ 3.1%p'],
            ['온보딩 완료율', '61.4%', '58.7%', '▼ 2.7%p'],
            ['평균 완료 소요 시간', '4분 32초', '5분 14초', '▲ 42초'],
            ['2단계 이탈율', '18.3%', '24.6%', '▲ 6.3%p'],
          ],
        },
      },
      {
        title: '참고 맥락',
        bullets: [
          '같은 기간 신규 가입자 수는 전주 대비 +8% 증가',
          '경쟁사 Flowbase 마케팅 캠페인 집행 중 (유입 트래픽 성격 변화 가능성)',
          '배포 직후 3일간 간헐적 로딩 오류 발생 (CS 팀 확인, 현재 해소)',
        ],
        note: '지표 하락이 개선안 자체의 문제인지, 외부 요인인지 추가 분석 필요',
      },
    ],
  },
  question: '어떻게 대응할 것인가?',
  choices: [
    {
      id: '7a',
      text: '2단계 이탈율 급등에 집중해 해당 화면의 세션 녹화와 히트맵 데이터를 분석한다',
      branchKey: 'analyze',
      scores: { user: 5, collaboration: 3, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '7b',
      text: '외부 요인(경쟁사 캠페인, 로딩 오류)을 분리해 순수 UX 기인 지표 변화를 측정할 방법을 설계한다',
      branchKey: 'isolate',
      scores: { user: 4, collaboration: 4, decision: 4, business: 5 },
      quality: 'suboptimal',
    },
    {
      id: '7c',
      text: '배포 전 버전으로 롤백을 제안하고 원인 분석 후 재배포 계획을 수립한다',
      branchKey: 'rollback',
      scores: { user: 2, collaboration: 3, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '7d',
      text: '지표 하락이 일시적일 수 있으므로 2주 더 모니터링하자고 PM에게 제안한다',
      branchKey: 'wait',
      scores: { user: 2, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
    {
      id: '7e',
      text: '로딩 오류가 원인이라고 보고 엔지니어링 팀에 기술적 해결을 요청하고 디자인 검토는 보류한다',
      branchKey: 'tech_only',
      scores: { user: 1, collaboration: 2, decision: 1, business: 1 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 08 — 협업 | 다른 스쿼드와의 충돌
// ─────────────────────────────────────────────────────────────
const round08: Round = {
  id: 8,
  situationType: '협업',
  title: '다른 스쿼드와의 충돌',
  content: {
    type: 'attachment',
    files: [
      {
        name: 'Growth_vs_Retention_Flow_비교.pdf',
        fileType: 'pdf',
        preview: `# Growth Squad vs Retention Squad — 플로우 충돌 현황

## 충돌 지점 요약

### 화면: 가입 완료 직후 랜딩 (온보딩 4단계)

**Growth Squad (강다은 설계)**
- 목적: 신규 유저의 첫 핵심 기능 체험 유도
- 화면 구성: '바로 시작하기' CTA → 핵심 기능 진입
- 대상: 전체 신규 가입자

**Retention Squad (디자이너 유진 설계)**
- 목적: 가입 후 3일 이내 재방문율 제고를 위한 알림 설정 유도
- 화면 구성: 알림 권한 요청 → 관심 카테고리 선택
- 대상: 전체 신규 가입자

## 문제
두 플로우가 동일 화면 슬롯(온보딩 4단계)을 각각 다른 목적으로 설계.
현재 어느 플로우를 우선할지 결정된 바 없음.

## 영향 범위
- 개발: 두 플로우 중 하나를 선택하거나 통합해야 구현 가능
- 지표: 각 스쿼드의 OKR에 직접 영향`,
      },
    ],
  },
  question: '어떻게 해결할 것인가?',
  choices: [
    {
      id: '8a',
      text: '유진과 두 스쿼드의 PM이 함께하는 조율 세션을 제안하고 사용자 관점 기준으로 우선순위를 정한다',
      branchKey: 'joint',
      scores: { user: 4, collaboration: 5, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '8b',
      text: '두 플로우를 순차적으로 배치(핵심 기능 → 알림 설정)하는 통합안을 유진에게 제안한다',
      branchKey: 'merge',
      scores: { user: 3, collaboration: 4, decision: 4, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '8c',
      text: 'Growth Squad의 OKR이 현재 스프린트 우선순위이므로 내 플로우를 먼저 배치하자고 PM에게 요청한다',
      branchKey: 'priority',
      scores: { user: 2, collaboration: 2, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '8d',
      text: '두 플로우를 A/B 테스트로 검증하자고 제안하고 결과가 나올 때까지 보류한다',
      branchKey: 'ab_test',
      scores: { user: 3, collaboration: 3, decision: 2, business: 2 },
      quality: 'poor',
    },
    {
      id: '8e',
      text: '이 결정은 PM들이 해야 하므로 양쪽 PM에게 판단을 위임하고 결과를 기다린다',
      branchKey: 'delegate',
      scores: { user: 1, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 09 — 전략 | 리소스 부족과 우선순위
// ─────────────────────────────────────────────────────────────
const round09: Round = {
  id: 9,
  situationType: '전략',
  title: '리소스 부족과 우선순위',
  content: {
    type: 'document',
    title: '다음 스프린트 디자인 요청 목록',
    author: 'PM 지수현',
    date: '2024년 3월 28일',
    body: `## 배경
다음 스프린트(2주)에 처리 가능한 디자인 리소스는 약 1개 기능 분량. 현재 접수된 요청은 아래 3건.

---

## 요청 1 — 대시보드 홈 개편
- 요청자: CPO 박현우
- 내용: 신규 유저 유입 증가에 따라 홈 화면을 역할별로 개인화. 관리자/일반 멤버 뷰 분리.
- 예상 규모: 크다 (신규 컴포넌트 다수 필요)
- 비고: CPO 직접 요청. 다음 투자자 데모 전 완성 희망.

## 요청 2 — 온보딩 2단계 개선 (후속 작업)
- 요청자: PM 지수현
- 내용: 이번 배포 후 지표 분석 결과, 2단계 이탈율이 높아 해당 화면 재설계 필요.
- 예상 규모: 중간 (기존 플로우 내 수정)
- 비고: 7일 활성화율 직결 이슈. 이번 스프린트 목표와 직접 연결.

## 요청 3 — 팀 초대 플로우 신규 설계
- 요청자: 엔지니어 태민
- 내용: 현재 팀 초대 기능이 없어 B2B 고객사에서 지속적으로 CS 요청 발생. 신규 플로우 설계 필요.
- 예상 규모: 중간 (신규 화면 3~4개)
- 비고: CS 팀 집계 기준 월 평균 28건 불만 접수.`,
  },
  question: '어떤 요청을 선택할 것인가?',
  choices: [
    {
      id: '9a',
      text: '스쿼드 OKR과 직접 연결된 온보딩 2단계 개선을 선택하고 CPO 요청은 다음 스프린트로 조율한다',
      branchKey: 'okr_first',
      scores: { user: 4, collaboration: 4, decision: 5, business: 5 },
      quality: 'optimal',
    },
    {
      id: '9b',
      text: 'CPO 요청이 투자자 데모와 연결되어 있으므로 대시보드 개편을 우선 진행한다',
      branchKey: 'cpo_first',
      scores: { user: 2, collaboration: 3, decision: 3, business: 4 },
      quality: 'suboptimal',
    },
    {
      id: '9c',
      text: 'CS 불만이 반복되는 팀 초대 플로우를 선택해 사용자 문제를 해결한다',
      branchKey: 'cs_first',
      scores: { user: 4, collaboration: 3, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '9d',
      text: '세 요청을 각각 축소해 모두 이번 스프린트에 처리하겠다고 제안한다',
      branchKey: 'all_three',
      scores: { user: 1, collaboration: 2, decision: 1, business: 1 },
      quality: 'poor',
    },
    {
      id: '9e',
      text: '우선순위 결정은 PM이 해야 한다고 판단해 지수현에게 결정을 요청한다',
      branchKey: 'let_pm',
      scores: { user: 1, collaboration: 2, decision: 1, business: 2 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// ROUND 10 — 성찰 | 스프린트 회고
// ─────────────────────────────────────────────────────────────
const round10: Round = {
  id: 10,
  situationType: '성찰',
  title: '스프린트 회고',
  content: {
    type: 'document',
    title: 'Growth Squad 스프린트 #4 회고 — 익명 메모 모음',
    author: '회고 진행: PM 지수현',
    date: '2024년 3월 29일',
    body: `## 잘 된 점 (Keep)
- 온보딩 개선안 배포 완료
- QA에서 발견된 CRITICAL 이슈 빠르게 수정
- 데이터 기반으로 2단계 이탈 원인 특정

## 아쉬운 점 (Problem)
- 디자인 스펙과 구현 사이에 버전 불일치 발생 → 재작업 시간 소요
- 다른 스쿼드와의 플로우 충돌을 늦게 발견
- 스프린트 중반 이후 디자인 변경 요청이 잦아 개발 팀 컨텍스트 스위칭 많았음

## 제안 (Try)
- **태민**: "디자인 확정 전에 구현 가능성 검토 단계를 넣었으면 좋겠어요."
- **유진**: "스쿼드 간 디자인 공유 루틴이 있으면 충돌을 줄일 수 있을 것 같아요."
- **익명**: "디자인 프로세스가 개발 속도를 늦추는 것 같은데, 간소화할 방법을 고민해봐야 할 것 같아요."`,
  },
  question: '이 피드백에 어떻게 반응할 것인가?',
  choices: [
    {
      id: '10a',
      text: '피드백을 수용하고, 다음 스프린트부터 적용할 디자인-개발 협업 프로세스 개선안을 문서로 제안한다',
      branchKey: 'improve',
      scores: { user: 3, collaboration: 5, decision: 5, business: 4 },
      quality: 'optimal',
    },
    {
      id: '10b',
      text: '스펙 버전 불일치 문제에 집중해 버전 관리 방식을 팀과 함께 정비한다',
      branchKey: 'spec_fix',
      scores: { user: 2, collaboration: 4, decision: 4, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '10c',
      text: '디자인 프로세스 간소화 의견에 동의하고, 일부 단계를 생략하는 방향으로 워크플로우를 조정한다',
      branchKey: 'simplify_process',
      scores: { user: 2, collaboration: 3, decision: 3, business: 3 },
      quality: 'suboptimal',
    },
    {
      id: '10d',
      text: '디자인 변경 요청이 잦았던 이유는 CPO의 후반부 개입 때문임을 회고 자리에서 공유한다',
      branchKey: 'blame_up',
      scores: { user: 1, collaboration: 1, decision: 2, business: 1 },
      quality: 'poor',
    },
    {
      id: '10e',
      text: '회고 피드백은 개인 감정이 섞인 경우가 많으므로 크게 신경 쓰지 않고 다음 스프린트로 넘어간다',
      branchKey: 'ignore_retro',
      scores: { user: 1, collaboration: 1, decision: 1, business: 1 },
      quality: 'poor',
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// EXPORT
// ─────────────────────────────────────────────────────────────
export const simulationData: SimulationData = {
  id: 'novaworks-designer-squad',
  intro: {
    title: '스쿼드의 디자이너',
    background: `당신은 B2B SaaS 스타트업 **'노바웍스(NovaWorks)'**의 Product Designer입니다. 합류한 지 3개월째인 지금, Growth Squad에서 **온보딩 개선 프로젝트**를 맡았습니다. 팀에는 PM 지수현, 엔지니어 태민이 함께하고 있고, 회사 전체 디자이너 3명 중 한 명입니다.`,
    character: {
      name: '강다은',
      role: 'Product Designer',
      organization: 'Growth Squad',
    },
    goal: '스쿼드 목표에 기여하면서 팀 내 디자이너로서의 신뢰를 쌓는다.',
    tasks: [
      'PM의 요청을 구체적인 디자인 방향으로 전환한다',
      '엔지니어와 협업해 구현 가능한 범위를 찾는다',
      '데이터를 기반으로 디자인 의사결정을 내린다',
      '다른 스쿼드, C레벨과의 충돌 상황을 조율한다',
    ],
    skills: ['사용자 중심 사고', '협업', '의사결정', '비즈니스 감각'],
    totalRounds: 10,
    timeLimitMinutes: 15,
  },
  competencyLabels: {
    user: '사용자 중심 사고',
    collaboration: '협업',
    decision: '의사결정',
    business: '비즈니스 감각',
  },
  outro: {
    goalLabel: '스쿼드 목표에 기여하면서 팀 내 디자이너로서의 신뢰를 쌓는다',
    characters: ['PM 지수현', '엔지니어 태민', '디자이너 유진', 'CPO 박현우'],
    tiers: {
      high: {
        closing: `스프린트가 끝났습니다, {name}씨.\n온보딩 개선안은 배포됐고, 팀은 다음 스프린트 계획을 짜고 있어요.\n당신이 내린 선택들이 쌓여 팀 안에서 디자이너의 자리를 만들었습니다.`,
        goalAchievement: '팀으로부터 높은 신뢰를 얻었습니다.',
        goalScore: '신뢰도 {score}%',
        characterReactions: {
          'PM 지수현': '처음에 브리프가 너무 모호했는데, 다은씨가 먼저 기준을 잡아줘서 일이 훨씬 빠르게 풀렸어요. 다음 스프린트도 같이 하고 싶어요.',
          '엔지니어 태민': '솔직히 디자이너랑 일하면서 이렇게 구현 얘기를 편하게 한 게 처음이에요. 스펙 해석하느라 헤매는 시간이 확 줄었거든요.',
          '디자이너 유진': '혼자 달리지 않고 디자인 시스템이랑 다른 스쿼드 흐름을 챙겨준 게 인상적이었어요. 나중에 같이 컴포넌트 리뷰 한번 해요.',
          'CPO 박현우': '지표 하락 때 바로 원인 분석하고 대응 방향 가져온 거 잘 봤어요. 그게 디자이너한테 기대하는 태도예요.',
        },
        competencyFeedback: {
          user: '데이터와 맥락을 함께 읽었습니다. 숫자 뒤에 있는 사용자 행동을 놓치지 않았어요.',
          collaboration: '팀원의 제약을 거스르지 않고 협상 포인트를 찾아냈습니다.',
          decision: '불확실한 상황에서 기준을 먼저 만들고 움직였습니다.',
          business: '디자인 결정이 지표와 스쿼드 목표에 어떻게 연결되는지 의식했습니다.',
        },
      },
      mid: {
        closing: `스프린트가 끝났습니다, {name}씨.\n온보딩 개선안은 예정대로 배포됐지만, 팀 안에서 몇 가지 아쉬운 순간들이 남아있어요.\n아직 호흡을 맞춰가는 중이지만, 배운 것들이 분명히 있습니다.`,
        goalAchievement: '팀의 신뢰를 일부 얻었습니다.',
        goalScore: '신뢰도 {score}%',
        characterReactions: {
          'PM 지수현': '같은 방향을 보고 있다는 건 느꼈는데, 중간에 커뮤니케이션 타이밍이 몇 번 어긋났어요. 좀 더 일찍 공유해줬으면 더 빠르게 움직일 수 있었을 것 같아요.',
          '엔지니어 태민': '스펙은 잘 정리해줬는데, 구현 가능성 얘기를 조금 더 먼저 했으면 중간에 수정이 없었을 거예요.',
          '디자이너 유진': '기존 패턴을 우회한 선택이 몇 군데 있었는데, 그 이유를 팀에 공유하면 나중에 같은 논쟁을 반복 안 해도 될 것 같아요.',
          'CPO 박현우': '판단 자체는 나쁘지 않았어요. 다만 근거를 좀 더 명확하게 들고 왔으면 결정이 더 빠르게 났을 거예요.',
        },
        competencyFeedback: {
          user: '사용자 관점을 의식했지만, 데이터와 직관 사이에서 흔들린 순간이 있었습니다.',
          collaboration: '팀원과 협력하려 했지만, 타이밍이 맞지 않은 경우가 있었습니다.',
          decision: '방향은 잡았지만 근거를 설득력 있게 전달하는 연습이 필요합니다.',
          business: '비즈니스 맥락을 인식했지만, 디자인 결정과 연결 짓는 데 아직 거리감이 있습니다.',
        },
      },
      low: {
        closing: `스프린트가 끝났습니다, {name}씨.\n배포는 됐지만, 팀 안에서 몇 가지 긴장이 남아있습니다.\n이번 스프린트는 많은 것을 배울 수 있는 시간이었어요.`,
        goalAchievement: '팀의 신뢰를 쌓기엔 아직 부족했습니다.',
        goalScore: '신뢰도 {score}%',
        characterReactions: {
          'PM 지수현': '같은 목표를 보고 있었는지 잘 모르겠어요. 중요한 순간마다 방향 맞추는 데 시간이 너무 많이 걸렸어요.',
          '엔지니어 태민': '구현하면서 헷갈리는 부분이 많았어요. 스펙에서 놓친 부분이 꽤 있었고, 중간에 다시 맞추느라 시간을 썼어요.',
          '디자이너 유진': '같은 스쿼드에서 일하면서 서로의 작업이 충돌하는 걸 나중에야 알게 됐어요. 미리 공유하는 루틴을 만들어보는 게 어떨까요.',
          'CPO 박현우': '결정 자체보다 왜 그 결정을 했는지가 안 보였어요. 근거를 들고 오는 습관이 중요해요.',
        },
        competencyFeedback: {
          user: '사용자보다 주어진 상황에 반응하는 데 집중한 경향이 있었습니다.',
          collaboration: '팀원의 제약과 맥락을 충분히 반영하지 못한 순간들이 있었습니다.',
          decision: '명확한 기준 없이 결정한 경우가 있었습니다. 왜 이 선택인지를 먼저 정리하는 연습이 필요합니다.',
          business: '디자인 결정이 팀 목표나 지표와 어떻게 연결되는지 의식하는 훈련이 필요합니다.',
        },
      },
    },
  },
  rounds: [
    round01, round02, round03, round04, round05,
    round06, round07, round08, round09, round10,
  ],
};

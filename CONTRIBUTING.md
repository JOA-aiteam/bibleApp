# Contributing Guide

이 문서는 [README.md](./README.md)의 협업 가이드를 보충하는 **상세 규칙과 고급 내용**입니다.
기본 흐름(온보딩 → 브랜치 → Commit → PR → Merge)은 README를 먼저 읽어 주세요.

## 목차

- [작업 관리: GitHub Issues](#작업-관리-github-issues)
- [Pull Request 작성 가이드](#pull-request-작성-가이드)
- [코드 리뷰 가이드](#코드-리뷰-가이드)
- [민감 정보 관리](#민감-정보-관리)
- [실수 복구](#실수-복구)
- [고급: git rebase](#고급-git-rebase)
- [GitHub 저장소 설정 상세](#github-저장소-설정-상세)
- [자주 쓰는 명령어 모음](#자주-쓰는-명령어-모음)

---

## 작업 관리: GitHub Issues

모든 작업은 **Issue → 브랜치 → PR** 순서로 진행하는 것을 권장합니다.

1. **Issues 탭 → New issue** 로 작업을 등록합니다.
   - 제목: `[기능] 로그인 화면`, `[버그] 탭 전환 시 깜빡임` 처럼 종류가 보이게
   - 본문: 목표, 해야 할 일 체크리스트, 완료 조건
2. 오른쪽 사이드바에서 **Assignees** (담당자)를 지정합니다. 담당자가 없는 Issue를 가져갈 때는 코멘트로 알립니다.
3. 브랜치 이름에 Issue 번호를 붙여도 됩니다: `feature/login-12` (선택)
4. PR 본문의 **관련 Issue** 항목에 `Closes #12` 를 적거나, PR 사이드바 **Development** 에서 Issue를 연결합니다.

> [!NOTE]
> `Closes #12` 같은 키워드는 **기본 브랜치(Default branch)로 Merge되는 PR** 에서만 Issue를 자동으로 닫습니다.
> README 권장대로 기본 브랜치가 `dev`라면 feature → dev Merge 시 자동으로 닫힙니다. 기본 브랜치가 `main`이라면 Issue를 직접 닫아 주세요.

**라벨 예시** (선택, Issues → Labels 에서 생성): `feature`, `bug`, `docs`, `refactor`, `help wanted`

---

## Pull Request 작성 가이드

PR을 만들면 [PR 템플릿](./.github/pull_request_template.md)이 자동으로 채워집니다. 각 항목은 이렇게 씁니다.

| 항목 | 작성 요령 |
| --- | --- |
| 작업 개요 | 무엇을, **왜** 했는지 1~3줄 |
| 주요 변경 사항 | 리뷰어가 볼 파일·로직을 항목별로 |
| 관련 Issue | `Closes #12` |
| 테스트 방법 및 결과 | 리뷰어가 **그대로 따라 할 수 있는** 절차와 실제 결과 (Android/iOS/Web 중 무엇으로 확인했는지) |
| 스크린샷 | UI 변경 시 변경 전/후. 휴대폰 화면 캡처를 PR 본문에 드래그 앤 드롭하면 업로드됨 |
| 리뷰어 확인 사항 | 특히 봐줬으면 하는 부분, 고민한 점, 알려진 한계 |

**PR 크기**

- 한 PR = 한 기능/수정. 관련 없는 변경(예: 다른 화면 수정, 포맷팅 일괄 변경)은 별도 PR로.
- 변경 파일이 많아지면 나누어 올리는 것을 고려합니다. 작은 PR이 리뷰도 빠르고 충돌도 적습니다.
- 아직 완성 전이지만 의견을 받고 싶다면 **Draft PR** 로 올리고, 준비되면 **Ready for review** 를 누릅니다.

**PR 제목** = Squash Merge 후 dev에 남는 Commit 메시지입니다. 반드시 Commit 컨벤션 형식(`feat: …`, `fix: …`)으로 씁니다.

---

## 코드 리뷰 가이드

**리뷰어**

- 리뷰 요청을 받으면 가능한 한 **1일 이내**에 확인합니다. (팀 합의로 조정)
- 확인 포인트
  - 기능이 PR 설명대로 동작하는가? (가능하면 브랜치를 받아 직접 실행)
  - 화면 파일은 `src/app/`, 재사용 코드는 `src/components/`·`src/hooks/` 에 있는가?
  - 타입 오류는 없는가? (`npx tsc --noEmit`)
  - 불필요한 코드, `console.log`, 하드코딩된 비밀 값은 없는가?
  - 새 패키지가 `npx expo install` 로 추가되었는가?
- 코멘트는 **이유와 대안**을 함께 씁니다.
  - ❌ "이거 이상해요"
  - ✅ "이 값은 다른 화면에서도 쓰일 것 같아서 `src/constants/theme.ts`로 옮기면 좋겠습니다."
- 꼭 고쳐야 하는 것과 제안을 구분합니다. 제안은 앞에 `[제안]`, 사소한 것은 `[nit]` 을 붙입니다.

**PR 작성자**

- 모든 코멘트에 답글을 답니다. (반영했으면 "반영했습니다 + Commit 링크", 반영하지 않으면 이유)
- 수정은 **같은 브랜치에 Commit → Push** 하면 PR에 자동 반영됩니다. 새 PR을 만들지 않습니다.
- 반영 후 **Re-request review** 로 다시 요청합니다.
- 승인 후 Merge는 작성자가 직접 합니다. (README 10장 규칙)

---

## 민감 정보 관리

- `.env`, `.env.*` 파일은 `.gitignore`에 등록되어 있어 Git에 올라가지 않습니다. 필요한 변수 목록은 값 없이 **`.env.example`** 로 공유합니다. (현재 이 프로젝트에는 환경 변수 파일이 없습니다)
- 서명 키(`*.jks`, `*.p8`, `*.p12`, `*.key`, `*.pem`, `*.mobileprovision`)도 이미 `.gitignore`에 등록되어 있습니다.
- 스토어 업로드용 **서비스 계정 JSON 키**, Firebase 설정 파일 등을 추가하게 되면, Commit 전에 `.gitignore`에 먼저 등록합니다.
- Expo에서 `EXPO_PUBLIC_` 으로 시작하는 환경 변수는 **앱 번들에 포함되어 사용자에게 노출**됩니다. 진짜 비밀 값(서버 API Secret 등)은 앱에 넣지 않습니다.
- **Supabase 키** (백엔드로 Supabase 사용 확정, 아직 미연결)
  - 앱에 넣을 수 있는 키: 프로젝트 URL과 **anon / publishable key** (공개를 전제로 한 키). 단, 이 키로 데이터가 보호되려면 테이블마다 **RLS(Row Level Security)** 정책이 반드시 켜져 있어야 합니다.
  - **절대 앱·저장소에 넣으면 안 되는 것**: **service_role / secret key**, 데이터베이스 비밀번호, Supabase 개인 액세스 토큰. 이 값들은 RLS를 무시하고 모든 데이터에 접근할 수 있습니다.
  - 실제 값은 각자의 `.env`에만 두고, 변수 이름만 `.env.example`로 공유합니다. 키 전달은 Git이 아닌 팀 내부 채널로 합니다.
- 실수로 비밀 값을 Push했다면:
  1. **즉시 해당 키를 폐기하고 재발급**합니다. (Commit을 지워도 이력·포크·캐시에 남을 수 있음)
  2. 팀에 알립니다.
  3. 이력 수정(강제 Push)은 팀 전체에 영향을 주므로 혼자 하지 않습니다.

---

## 실수 복구

먼저 **멈추고, `git status`와 `git log --oneline -5`로 상태를 확인**하세요. 그리고 Commit하지 않은 작업이 있다면 `git stash push -u -m "백업"` 으로 보관해 두면 안전합니다.

### Commit 메시지를 잘못 썼다 (아직 Push 전)

```powershell
git commit --amend -m "feat: 올바른 메시지"
```

> Push한 뒤라면 고치지 마세요. 어차피 Squash Merge 시 PR 제목이 최종 Commit 메시지가 됩니다.

### 마지막 Commit에 파일 하나를 빠뜨렸다 (아직 Push 전)

```powershell
git add 빠뜨린파일.tsx
git commit --amend --no-edit
```

### Staging을 취소하고 싶다 (파일 내용은 유지)

```powershell
git restore --staged 파일경로
```

### 특정 파일의 수정을 버리고 싶다

```powershell
git diff 파일경로              # 정말 버려도 되는지 먼저 확인
git restore 파일경로           # ⚠ 해당 파일의 수정 내용이 사라짐 (복구 불가)
```

### 잘못된 브랜치에서 분기했다 (예: 다른 사람의 feature 브랜치에서 분기)

내 Commit만 골라서 dev 기반 새 브랜치로 옮깁니다.

```powershell
git log --oneline -10                      # 내 Commit 해시 확인 (예: a1b2c3d, e4f5g6h)
git switch dev
git pull origin dev
git switch -c feature/login-v2
git cherry-pick a1b2c3d e4f5g6h            # 오래된 것부터 순서대로
git push -u origin feature/login-v2
```

기존 PR이 있었다면 닫고(Close) 새 PR을 만듭니다. 기존 브랜치는 확인이 끝난 뒤 삭제합니다.

### 이미 Push한 Commit을 되돌리고 싶다

이력을 지우지 않고 **"되돌리는 Commit"을 새로 만드는** `git revert`를 사용합니다.

```powershell
git switch dev
git pull origin dev
git switch -c fix/revert-login
git revert <되돌릴-Commit-해시> --no-edit
git push -u origin fix/revert-login
# → dev 로 PR 생성
```

GitHub에서 Merge된 PR 페이지 하단의 **Revert** 버튼을 누르면 같은 작업을 하는 PR이 자동으로 만들어집니다.

### 실수로 dev/main에 직접 Push했다 (브랜치 보호가 없는 경우)

1. **팀에 즉시 알립니다.** 다른 팀원이 이미 그 Commit을 받았을 수 있습니다.
2. 강제 Push로 지우지 말고, 위의 `git revert` 방법으로 되돌리는 PR을 만듭니다.
3. 원래 작업은 feature 브랜치에서 다시 PR로 올립니다.

### Commit이 사라진 것 같다

Git은 최근 이동 기록을 `reflog`에 남깁니다. 대부분 여기서 찾을 수 있습니다.

```powershell
git reflog -20                             # 최근 HEAD 이동 기록
git branch rescue/lost-work <해시>          # 찾은 Commit을 새 브랜치로 살려 두기
```

---

## 고급: git rebase

> [!WARNING]
> rebase는 Commit을 **새로 만들어(해시 변경)** 이력을 다시 씁니다. 다음 규칙을 지킬 수 있을 때만 사용하세요.
> - **본인 혼자 쓰는 feature/fix 브랜치에서만** 사용합니다. `main`, `dev`, 다른 사람과 공유하는 브랜치에서는 절대 사용하지 않습니다.
> - rebase 후 Push에는 `--force` 대신 반드시 **`--force-with-lease`** 를 사용합니다.
> - 이 프로젝트는 Squash Merge를 쓰므로 **rebase를 하지 않아도 전혀 문제없습니다.** 기본은 README 12장의 `git merge origin/dev` 입니다.

### merge vs rebase

| | `git merge origin/dev` (기본) | `git rebase origin/dev` (고급) |
| --- | --- | --- |
| 결과 | 내 브랜치에 Merge Commit 추가 | 내 Commit들을 최신 dev 위로 다시 붙임 |
| 이력 | 갈래가 생김 | 일직선 |
| 충돌 해결 | 한 번에 | Commit마다 반복될 수 있음 |
| Push | 일반 `git push` | `git push --force-with-lease` 필요 |
| 위험도 | 낮음 | 중간 (공유 브랜치에서 쓰면 높음) |

### 사용 방법

```powershell
git switch feature/login
git status                         # 깨끗한 상태여야 함
git fetch origin
git rebase origin/dev

# 충돌이 나면: 파일 수정 → git add <파일> → 계속
git rebase --continue
# 포기하고 rebase 전으로 돌아가기
git rebase --abort

# 이미 Push한 적이 있는 브랜치라면
git push --force-with-lease
```

`--force-with-lease`는 원격 브랜치가 내가 마지막으로 본 상태일 때만 덮어씁니다. 그 사이 누군가 같은 브랜치에 Push했다면 거부되어 남의 Commit을 지우지 않습니다.

---

## GitHub 저장소 설정 상세

README [13장](./README.md#13-github-저장소-권장-설정)의 설정을 화면 순서대로 정리했습니다. 저장소 **소유자 / Admin** 만 할 수 있습니다.

### 1. Repository 생성

1. github.com 우측 상단 **`+` → New repository**
2. Owner, Repository name, Description 입력
3. Public / Private 선택
4. **Initialize this repository with** 항목(README, .gitignore, license)은 **모두 선택하지 않음**
5. **Create repository** → 표시되는 화면의 "…or push an existing repository from the command line" 대신 README 7장 명령어 사용

### 2. Collaborators 초대

1. 저장소 **Settings → Collaborators** (Organization: **Collaborators and teams**)
2. 비밀번호 / 2단계 인증 확인
3. **Add people** → GitHub 아이디 또는 이메일 → **Add … to this repository**
4. 팀원이 초대를 수락하면 목록에 표시됩니다. (대기 중이면 Pending)

### 3. 기본 브랜치

**Settings → General → Default branch** → ⇄ 버튼 → `dev` → **Update** → "I understand, update the default branch" 확인

### 4. Pull Request 옵션

**Settings → General → (아래로 스크롤) Pull Requests**

- ✅ Allow merge commits
- ✅ Allow squash merging → Default commit message: **Pull request title**
- ☐ Allow rebase merging (선택)
- ✅ Always suggest updating pull request branches
- ✅ Automatically delete head branches

변경 즉시 저장됩니다.

### 5. 브랜치 보호 (Ruleset)

1. **Settings → Rules → Rulesets → New ruleset → New branch ruleset**
2. **Ruleset Name**: `protect-main-dev`
3. **Enforcement status**: `Active`
4. **Bypass list**: 비워 둠
5. **Target branches → Add target → Include by pattern** → `main` 입력 → 같은 방식으로 `dev` 추가
6. **Branch rules**
   - ✅ Restrict deletions
   - ✅ Block force pushes
   - ✅ Require a pull request before merging
     - Required approvals: `1`
     - ✅ Dismiss stale pull request approvals when new commits are pushed
     - ✅ Require conversation resolution before merging
7. **Create**

> [!NOTE]
> - Private 저장소 + 개인 Free 요금제에서는 저장해도 "적용되지 않는다"는 안내가 표시되며 규칙이 동작하지 않습니다. (README 13-3 참고)
> - 팀원이 2명이고 승인 1명이 필수라면, 서로의 PR을 반드시 리뷰해야 Merge할 수 있습니다. 1인 작업 기간에는 소유자를 Bypass list에 임시로 추가하는 방법도 있지만, 기본은 비워 두는 것을 권장합니다.
> - 구 방식(**Settings → Branches → Add classic branch protection rule**)을 쓴다면 Branch name pattern에 `main`, `dev`를 각각 등록하고, "Require a pull request before merging", "Require approvals: 1", "Do not allow bypassing the above settings"를 켭니다. Allow force pushes / Allow deletions는 **꺼진 상태(기본값)** 로 둡니다.

### 6. (선택) GitHub CLI로 설정하기

[GitHub CLI](https://cli.github.com/)를 설치하면 일부 설정을 터미널에서 할 수 있습니다. 필수가 아닙니다.

```powershell
winget install --id GitHub.cli -e
gh auth login

# 저장소 생성 + 현재 폴더를 origin으로 연결 (Push는 하지 않음)
gh repo create <REPO> --private --source . --remote origin

# Merge 옵션, 자동 브랜치 삭제, 기본 브랜치
gh repo edit <OWNER>/<REPO> --enable-merge-commit --enable-squash-merge --enable-rebase-merge=false --delete-branch-on-merge
gh repo edit <OWNER>/<REPO> --default-branch dev

# Collaborator 초대
gh api --method PUT repos/<OWNER>/<REPO>/collaborators/<USERNAME>
```

브랜치 보호(Ruleset)도 `gh api`로 만들 수 있지만 JSON 작성이 필요해 초보자에게는 웹 설정을 권장합니다.

---

## 자주 쓰는 명령어 모음

| 하고 싶은 것 | 명령어 |
| --- | --- |
| 현재 상태 보기 | `git status` |
| 현재 브랜치 이름 | `git branch --show-current` |
| 브랜치 목록 (원격 포함) | `git branch -a` |
| 브랜치와 원격 연결 상태 | `git branch -vv` |
| 이력 그래프 | `git log --oneline --graph --all -20` |
| 변경 내용 보기 | `git diff` (Staging 전) / `git diff --staged` (Staging 후) |
| 원격 정보만 가져오기 | `git fetch origin` |
| 원격 정보 + 삭제된 브랜치 정리 | `git fetch --prune` |
| dev 최신화 | `git switch dev` → `git pull origin dev` |
| 새 브랜치 만들고 이동 | `git switch -c feature/<이름>` |
| 최신 dev를 내 브랜치에 반영 | `git fetch origin` → `git merge origin/dev --no-edit` |
| Merge 취소 (충돌 중) | `git merge --abort` |
| 임시 보관 / 복원 | `git stash push -u -m "메모"` / `git stash pop` |
| Merge된 로컬 브랜치 삭제 | `git branch -D feature/<이름>` (GitHub에서 Merged 확인 후) |

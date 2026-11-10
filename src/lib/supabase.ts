// Android/iOS에서 세션을 기기에 저장할 localStorage 를 expo-sqlite 로 설치한다. (웹에서는 아무 동작 안 함)
import 'expo-sqlite/localStorage/install';

import { createClient } from '@supabase/supabase-js';
import { AppState, Platform } from 'react-native';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabasePublishableKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    'Supabase 환경 변수가 없습니다. .env.example 을 복사해 .env.local 을 만들고 ' +
      'EXPO_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY 를 채운 뒤 `npx expo start` 를 다시 실행하세요.'
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    // 웹 서버 렌더링(app.json web.output: "server") 중에는 localStorage 가 없으므로 메모리 저장소로 대체된다.
    storage: typeof localStorage === 'undefined' ? undefined : localStorage,
    autoRefreshToken: true,
    persistSession: true,
    // Android/iOS에는 세션을 읽어 올 URL 이 없다.
    detectSessionInUrl: false,
  },
});

// 앱이 포그라운드일 때만 토큰 자동 갱신을 돌린다.
// https://supabase.com/docs/reference/javascript/auth-startautorefresh
if (Platform.OS !== 'web') {
  AppState.addEventListener('change', (state) => {
    if (state === 'active') {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}

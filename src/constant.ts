export const FIREBASE_ERROR_MESSAGE: Record<string, string> = {
    "auth/email-already-in-use": "이미 사용 중인 이메일입니다.",
    "auth/invalid-email": "유효하지 않은 이메일 형식입니다.",
    "auth/user-not-found": "가입된 사용자가 없습니다.",
    "auth/wrong-password": "비밀번호가 일치하지 않습니다.",
    "auth/weak-password": "비밀번호가 너무 약합니다. 강력한 비밀번호를 사용하세요.",
    "auth/missing-password": "비밀번호를 입력해주세요.",
    "auth/invalid-credential": "잘못된 인증 정보입니다.",
    "auth/network-request-failed": "네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.",
    "auth/too-many-requests": "요청이 너무 많아 잠시 후 다시 시도해주세요.",
    "auth/user-token-expired": "사용자의 인증 토큰이 만료되었습니다. 다시 로그인해주세요.",
};

export const NOT_FOUND_ERROR = "예기치 않은 오류가 발생했습니다.";
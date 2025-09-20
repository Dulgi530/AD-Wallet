// Android Compact 사이즈 기준 (412 x 917) 오토레이아웃 유틸리티

// 기준 사이즈
const BASE_WIDTH = 412;
const BASE_HEIGHT = 917;

// 현재 화면 크기 계산
export const getScreenSize = () => {
  // 서버 사이드 렌더링을 위한 안전장치
  if (typeof window === "undefined") {
    return {
      width: BASE_WIDTH,
      height: BASE_HEIGHT,
      scaleX: 1,
      scaleY: 1,
      scale: 1,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;

  return {
    width,
    height,
    scaleX: width / BASE_WIDTH,
    scaleY: height / BASE_HEIGHT,
    scale: Math.min(width / BASE_WIDTH, height / BASE_HEIGHT),
  };
};

// 반응형 크기 계산 함수
export const responsiveSize = (baseSize, useScale = true) => {
  const { scale, scaleX, scaleY } = getScreenSize();

  if (useScale) {
    return `${baseSize * scale}px`;
  } else {
    return `${baseSize}px`;
  }
};

// 반응형 폰트 크기
export const responsiveFontSize = (baseSize) => {
  const { scale } = getScreenSize();
  return `${Math.max(baseSize * scale, 10)}px`; // 최소 10px 보장
};

// 반응형 패딩/마진
export const responsiveSpacing = (baseSpacing) => {
  const { scale } = getScreenSize();
  return `${baseSpacing * scale}px`;
};

// 반응형 너비 (퍼센트 기반)
export const responsiveWidth = (baseWidth) => {
  const { scale } = getScreenSize();
  return `${baseWidth * scale}px`;
};

// 반응형 높이 (퍼센트 기반)
export const responsiveHeight = (baseHeight) => {
  const { scale } = getScreenSize();
  return `${baseHeight * scale}px`;
};

// 미디어 쿼리 헬퍼
export const mediaQueries = {
  mobile: "@media (max-width: 480px)",
  tablet: "@media (min-width: 481px) and (max-width: 768px)",
  desktop: "@media (min-width: 769px)",
  smallMobile: "@media (max-width: 360px)",
  largeMobile: "@media (min-width: 361px) and (max-width: 480px)",
};

// 반응형 스타일 생성기
export const createResponsiveStyle = (baseStyles, breakpointStyles = {}) => {
  return {
    ...baseStyles,
    ...breakpointStyles,
  };
};

// 컨테이너 스타일 생성기
export const createContainerStyle = () => {
  const { width, height } = getScreenSize();

  return {
    width: "100%",
    minHeight: "100vh",
    maxWidth: `${BASE_WIDTH}px`,
    margin: "0 auto",
    position: "relative",
    overflowX: "hidden",
    background: "#1d1818",
  };
};

// 헤더 스타일 생성기
export const createHeaderStyle = () => {
  return {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: responsiveSpacing(20),
    width: "100%",
    boxSizing: "border-box",
  };
};

// 버튼 스타일 생성기
export const createButtonStyle = (baseWidth, baseHeight) => {
  return {
    width: responsiveWidth(baseWidth),
    height: responsiveHeight(baseHeight),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "none",
    borderRadius: responsiveSize(5),
    cursor: "pointer",
    transition: "all 0.3s ease",
  };
};

// 텍스트 스타일 생성기
export const createTextStyle = (baseFontSize, fontWeight = 700) => {
  return {
    fontFamily: '"Mina", "Noto Sans KR", sans-serif',
    fontWeight: fontWeight,
    fontSize: responsiveFontSize(baseFontSize),
    color: "white",
    textAlign: "center",
    lineHeight: "normal",
  };
};

// 아이콘 스타일 생성기
export const createIconStyle = (baseSize) => {
  return {
    width: responsiveSize(baseSize),
    height: responsiveSize(baseSize),
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };
};

// 반응형 그리드 생성기
export const createGridStyle = (columns, gap = 20) => {
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: responsiveSpacing(gap),
    width: "100%",
  };
};

// 반응형 플렉스 생성기
export const createFlexStyle = (
  direction = "row",
  justify = "center",
  align = "center",
  gap = 10
) => {
  return {
    display: "flex",
    flexDirection: direction,
    justifyContent: justify,
    alignItems: align,
    gap: responsiveSpacing(gap),
    width: "100%",
  };
};

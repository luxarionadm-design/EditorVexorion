/**
 * AutoDetect.js
 * Utilitas cerdas untuk mendeteksi apakah pengguna menggunakan Desktop (PC / Laptop)
 * atau Mobile Device (Android / iPhone / iPad / Tablet).
 *
 * Mendeteksi berdasarkan:
 * 1. Lebar & Tinggi Layar (Viewport breakpoint)
 * 2. User Agent Navigator (Android, iPhone, iPad, Windows, Macintosh, Linux)
 * 3. Fitur Sentuh (Touch Points & pointer: coarse)
 * 4. Orientasi Layar (Portrait vs Landscape)
 */

export const BREAKPOINTS = {
  MOBILE_MAX: 768,       // Layar di bawah 768px selalu dianggap mobile
  TABLET_MAX: 1024,      // 768px - 1024px tablet
  DESKTOP_MIN: 1025,     // Di atas 1024px murni PC / Laptop
};

/**
 * Menghitung tingkat perbesaran / zoom ideal agar tampilan dokumen pas dan tidak kebesaran
 * @param {number} [width] - lebar layar (opsional, otomatis mengambil dari window)
 * @returns {number} zoom ideal (antara 70% hingga 100%)
 */
export function getIdealZoom(width) {
  const w = width || (typeof window !== "undefined" ? window.innerWidth : 1200);
  if (w < 480) return 70;
  if (w < 768) return 80;
  if (w < 1080) return 90;
  return 100;
}

/**
 * Mendeteksi apakah layar saat ini sempit (< 768px)
 * @returns {boolean}
 */
export function isSmallScreen() {
  if (typeof window === "undefined") return false;
  return window.innerWidth < BREAKPOINTS.MOBILE_MAX;
}

/**
 * Mendeteksi apakah pengguna saat ini menggunakan Mobile Device.
 * @returns {boolean} true jika mobile/ponsel, false jika desktop/pc
 */
export function isMobileDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  // 1. Deteksi User Agent
  const ua = navigator.userAgent || navigator.vendor || window.opera || "";
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    ua
  );

  // 2. Deteksi Lebar Layar
  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    0;

  // Jika lebar layar di bawah breakpoint mobile
  if (width < BREAKPOINTS.MOBILE_MAX) {
    return true;
  }

  // Jika perangkat ber-UA mobile dan layar tidak terlalu lebar (bukan monitor desktop besar)
  if (isMobileUA && width <= BREAKPOINTS.TABLET_MAX) {
    return true;
  }

  return false;
}

/**
 * Mengambil informasi perangkat secara komprehensif
 * @returns {{
 *   deviceMode: "mobile" | "pc",
 *   isMobile: boolean,
 *   isTablet: boolean,
 *   isDesktop: boolean,
 *   screenWidth: number,
 *   screenHeight: number,
 *   orientation: "portrait" | "landscape",
 *   hasTouch: boolean,
 *   userAgent: string
 * }}
 */
export function getDeviceInfo() {
  if (typeof window === "undefined") {
    return {
      deviceMode: "pc",
      isMobile: false,
      isTablet: false,
      isDesktop: true,
      screenWidth: 1280,
      screenHeight: 800,
      orientation: "landscape",
      hasTouch: false,
      userAgent: "",
    };
  }

  const width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth ||
    1024;
  const height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight ||
    768;
  const ua = navigator.userAgent || "";

  const hasTouch =
    ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) ||
    ("msMaxTouchPoints" in navigator && navigator.msMaxTouchPoints > 0) ||
    (window.matchMedia && window.matchMedia("(pointer: coarse)").matches);

  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(
    ua
  );
  const isTabletUA = /iPad|Android(?!.*Mobile)/i.test(ua);

  const isMobile = width < BREAKPOINTS.MOBILE_MAX || (isMobileUA && width <= BREAKPOINTS.TABLET_MAX);
  const isTablet = !isMobile && (width <= BREAKPOINTS.TABLET_MAX || isTabletUA);
  const isDesktop = !isMobile && !isTablet;

  return {
    deviceMode: isMobile ? "mobile" : "pc",
    isMobile,
    isTablet,
    isDesktop,
    screenWidth: width,
    screenHeight: height,
    orientation: width > height ? "landscape" : "portrait",
    hasTouch,
    userAgent: ua,
  };
}

/**
 * Mendengarkan perubahan ukuran layar atau rotasi perangkat dengan aman
 * @param {(info: ReturnType<typeof getDeviceInfo>) => void} onChange
 * @returns {() => void} fungsi unsubscriber
 */
export function listenDeviceChange(onChange) {
  if (typeof window === "undefined") return () => {};

  let timer = null;
  const handler = () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      onChange(getDeviceInfo());
    }, 150);
  };

  window.addEventListener("resize", handler);
  window.addEventListener("orientationchange", handler);

  return () => {
    if (timer) clearTimeout(timer);
    window.removeEventListener("resize", handler);
    window.removeEventListener("orientationchange", handler);
  };
}

export default {
  BREAKPOINTS,
  isMobileDevice,
  isSmallScreen,
  getIdealZoom,
  getDeviceInfo,
  listenDeviceChange,
};

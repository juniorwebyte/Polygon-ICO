import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&family=Syne+Mono&display=swap');

/* ========== KEYFRAME ANIMATIONS ========== */

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px #00F5C430, 0 0 40px #00F5C415; }
  50%       { box-shadow: 0 0 40px #00F5C460, 0 0 80px #00F5C430; }
}

@keyframes glowPulseBlue {
  0%, 100% { box-shadow: 0 0 20px #4A9EFF30, 0 0 40px #4A9EFF15; }
  50%       { box-shadow: 0 0 40px #4A9EFF60, 0 0 80px #4A9EFF30; }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-12px); }
}

@keyframes rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

@keyframes scanline {
  0%   { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

@keyframes borderGlow {
  0%, 100% { border-color: #00F5C440; }
  50%       { border-color: #00F5C4aa; }
}

@keyframes countUp {
  from { transform: translateY(10px); opacity: 0; }
  to   { transform: translateY(0); opacity: 1; }
}

@keyframes particleFloat {
  0%   { transform: translateY(0) rotate(0deg); opacity: 0.8; }
  50%  { opacity: 0.4; }
  100% { transform: translateY(-80px) rotate(180deg); opacity: 0; }
}

@keyframes progressFill {
  from { width: 0%; }
  to   { width: var(--progress-width, 50%); }
}

@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.9); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes textGradientShift {
  0%, 100% { background-position: 0% 50%; }
  50%       { background-position: 100% 50%; }
}

@keyframes neonFlicker {
  0%, 95%, 100% { opacity: 1; }
  96%           { opacity: 0.8; }
  97%           { opacity: 1; }
  98%           { opacity: 0.6; }
  99%           { opacity: 1; }
}

/* ========== SCROLLBAR ========== */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #080B14; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, #00F5C4, #4A9EFF);
  border-radius: 3px;
}
::-webkit-scrollbar-thumb:hover { background: #00F5C4; }

/* ========== SELECTION ========== */
::-moz-selection {
  background: ${({ theme }) => theme.colors.primary}40;
  color: ${({ theme }) => theme.colors.primary};
}
::selection {
  background: ${({ theme }) => theme.colors.primary}40;
  color: ${({ theme }) => theme.colors.primary};
}

/* ========== BASE ========== */
*, *::before, *::after { box-sizing: border-box; }

html, body {
  background: ${({ theme }) => theme.colors.bgBody};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 15px;
  font-weight: 400;
  line-height: 1.6;
  overflow-x: hidden;
}

img { max-width: 100%; height: auto; }

p {
  margin: 0px;
  line-height: 1.8;
}

h1, h2, h3, h4, h5, h6 {
  margin: 0px;
  line-height: 1.2;
  font-family: ${({ theme }) => theme.fonts.primary};
  letter-spacing: -0.02em;
}

h2 {
  font-size: 60px;
  font-weight: 700;
}

h5 {
  font-family: ${({ theme }) => theme.fonts.body};
  font-weight: 500;
  font-size: 18px;
  line-height: 36px;
}

a {
  text-decoration: none !important;
  outline: none;
  transition: all .3s ease;
}

ul, ol {
  list-style: outside none none;
  margin: 0px;
  padding: 0px;
}

html, body, p, a {
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.white}cc;
}

input[type='number'] {
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
}

/* ========== GRADIENT TEXT UTILITY ========== */
.gradient-text {
  background: linear-gradient(135deg, #00F5C4 0%, #4A9EFF 50%, #7B5EA7 100%);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: textGradientShift 4s ease infinite;
}

/* ========== ANIMATE ON LOAD UTILITIES ========== */
.animate-fade-up  { animation: fadeInUp 0.7s ease forwards; }
.animate-fade-in  { animation: fadeIn 0.6s ease forwards; }
.animate-scale-in { animation: scaleIn 0.5s ease forwards; }

.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }
.delay-5 { animation-delay: 0.5s; }

/* ========== GLOW UTILITIES ========== */
.glow-primary { animation: glowPulse 3s ease-in-out infinite; }
.glow-blue    { animation: glowPulseBlue 3s ease-in-out infinite; }

/* ========== FONT UTILITIES ========== */
.ff-outfit   { font-family: ${({ theme }) => theme.fonts.primary}; }
.ff-orbitron { font-family: ${({ theme }) => theme.fonts.secondary}; }
.ff-title    { font-family: ${({ theme }) => theme.fonts.title}; }
.ff-title2   { font-family: ${({ theme }) => theme.fonts.title2}; }

/* ========== FONT SIZES ========== */
.fs-15 { font-size: 15px; }
.fs-70 { font-size: 70px; line-height: 90px; }

/* ========== FONT WEIGHTS ========== */
.fw-300 { font-weight: 300; }
.fw-400 { font-weight: 400; }
.fw-500 { font-weight: 500; }
.fw-600 { font-weight: 600; }
.fw-700 { font-weight: 700; }

/* ========== SPACING ========== */
.mt-15 { margin-top: 15px; }
.mt-3  { margin-top: 3px; }
.mt-30 { margin-top: 30px; }
.mt-40 { margin-top: 40px; }
.mb-10 { margin-bottom: 10px; }
.mb-15 { margin-bottom: 15px; }
.mb-17 { margin-bottom: 17px; }
.mb-20 { margin-bottom: 20px; }
.mb-25 { margin-bottom: 25px; }
.mb-30 { margin-bottom: 30px; }
.mb-35 { margin-bottom: 35px; }
.mb-37 { margin-bottom: 37px; }
.mb-40 { margin-bottom: 40px; }
.mb-45 { margin-bottom: 45px; }
.mb-50 { margin-bottom: 50px; }
.mb-74 { margin-bottom: 74px; }

/* ========== CONTAINER ========== */
@media (min-width: 1400px) {
  .container {
    max-width: 1200px;
    padding: 0px 20px;
  }
}

@media (min-width: 1400px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    max-width: 1170px;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }
}

@media (max-width: 575px) {
  .container,
  .container-lg,
  .container-md,
  .container-sm,
  .container-xl,
  .container-xxl {
    padding-left: 20px !important;
    padding-right: 20px !important;
  }
}

/* ========== RAINBOWKIT OVERRIDES ========== */
.ju367v4t { margin-top: 40px; }
.ju367v48 { margin-right: 40px; }
.ju367v3n { margin-left: 40px; }
.ju367v32 { margin-bottom: 40px; }

.iekbcc0 {
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 400;
  background: #0F1525 !important;
  border: 1px solid #00F5C420 !important;
}

.ju367v1d,
.ju367v1c,
.ju367v1b { font-weight: 400 !important; }

#rk_connect_title,
#rk_chain_modal_title {
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  text-transform: uppercase;
  font-size: 20px;
  line-height: 24px;
  background: linear-gradient(135deg, #00F5C4, #4A9EFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ju367v11 {
  font-family: ${({ theme }) => theme.fonts.primary} !important;
}

._1vwt0cg2 {
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
}
`;

export default GlobalStyles;

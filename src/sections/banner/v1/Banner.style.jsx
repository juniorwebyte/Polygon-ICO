import styled, { keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const glowPulse = keyframes`
  0%, 100% { text-shadow: 0 0 20px #00F5C440, 0 0 60px #00F5C420; }
  50%       { text-shadow: 0 0 40px #00F5C480, 0 0 100px #00F5C440; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  33%       { transform: translateY(-15px) rotate(1deg); }
  66%       { transform: translateY(-8px) rotate(-1deg); }
`;

const orb1 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(60px, -80px) scale(1.1); }
  66%  { transform: translate(-40px, 40px) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
`;

const orb2 = keyframes`
  0%   { transform: translate(0, 0) scale(1); }
  33%  { transform: translate(-80px, 60px) scale(0.9); }
  66%  { transform: translate(50px, -30px) scale(1.1); }
  100% { transform: translate(0, 0) scale(1); }
`;

const scanline = keyframes`
  0%   { top: -2px; opacity: 0.5; }
  100% { top: 100%; opacity: 0; }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const borderGlow = keyframes`
  0%, 100% { border-color: #00F5C430; box-shadow: 0 0 0 #00F5C400; }
  50%       { border-color: #00F5C480; box-shadow: 0 0 30px #00F5C420; }
`;

const dotPulse = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50%       { transform: scale(1.4); opacity: 1; }
`;

const BannerWrapper = styled.div`
  background: #080B14;
  min-height: 100vh;
  padding: 160px 0 60px 0;
  position: relative;
  z-index: 0;
  overflow: hidden;

  /* ── Orbs de fundo ── */
  &::before {
    z-index: -1;
    position: absolute;
    content: "";
    top: -200px;
    left: -200px;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, #00F5C415 0%, transparent 70%);
    border-radius: 50%;
    animation: ${orb1} 18s ease-in-out infinite;
    pointer-events: none;
  }

  &::after {
    z-index: -1;
    position: absolute;
    content: "";
    bottom: -200px;
    right: -200px;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, #4A9EFF12 0%, transparent 70%);
    border-radius: 50%;
    animation: ${orb2} 22s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Grid de fundo ── */
  .bg-grid {
    position: absolute;
    inset: 0;
    z-index: -1;
    background-image:
      linear-gradient(rgba(0,245,196,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,245,196,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
  }

  /* ── Orb roxo central ── */
  .bg-orb-center {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 800px;
    height: 800px;
    background: radial-gradient(circle, #7B5EA708 0%, transparent 65%);
    border-radius: 50%;
    z-index: -1;
    pointer-events: none;
  }

  /* ── Linha de scanline animada ── */
  .scanline {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent 0%, #00F5C420 50%, transparent 100%);
    animation: ${scanline} 8s linear infinite;
    z-index: 0;
    pointer-events: none;
  }

  /* ── Badge de status ── */
  .presale-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #00F5C415;
    border: 1px solid #00F5C430;
    border-radius: 50px;
    padding: 8px 20px;
    animation: ${fadeInDown} 0.6s ease forwards, ${borderGlow} 3s ease-in-out 0.6s infinite;

    .dot {
      width: 8px;
      height: 8px;
      background: #00F5C4;
      border-radius: 50%;
      animation: ${dotPulse} 1.5s ease-in-out infinite;
      box-shadow: 0 0 10px #00F5C4;
    }

    span {
      font-family: ${({ theme }) => theme.fonts.secondary};
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #00F5C4;
    }
  }

  /* ── Título principal ── */
  .banner-title {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 800;
    font-size: 72px;
    line-height: 1.05;
    letter-spacing: -0.03em;
    text-align: center;
    color: ${({ theme }) => theme.colors.white};
    animation: ${fadeInUp} 0.8s ease 0.2s both, ${glowPulse} 4s ease-in-out 1s infinite;

    .gradient-word {
      background: linear-gradient(135deg, #00F5C4 0%, #4A9EFF 60%, #7B5EA7 100%);
      background-size: 200% 200%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: ${shimmer} 4s linear infinite;
    }
  }

  /* ── Subtítulo ── */
  .banner-subtitle {
    opacity: 0;
    animation: ${fadeInUp} 0.7s ease 0.4s forwards;
    color: ${({ theme }) => theme.colors.white}80;
    font-size: 17px;
    line-height: 1.7;
    max-width: 500px;
    margin: 0 auto;
  }

  /* ── Card de presale ── */
  .presale-card {
    background: linear-gradient(135deg, #0F152580 0%, #0F152540 100%);
    backdrop-filter: blur(20px);
    border: 1px solid #00F5C420;
    border-radius: 24px;
    padding: 32px;
    position: relative;
    overflow: hidden;
    animation: ${fadeInUp} 0.8s ease 0.6s both;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 1px;
      background: linear-gradient(90deg, transparent, #00F5C460, transparent);
      animation: ${shimmer} 3s linear infinite;
    }

    &:hover {
      border-color: #00F5C440;
      box-shadow: 0 0 40px #00F5C410;
      transition: all 0.4s ease;
    }
  }

  /* ── Stage info ── */
  .stage-info {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #00F5C4;
  }

  .stage-amount {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white}80;
  }

  /* ── Price info ── */
  .price-info {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 24px;
    flex-wrap: wrap;

    .price-item {
      text-align: center;
      padding: 12px 20px;
      background: #ffffff08;
      border: 1px solid #ffffff10;
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        border-color: #00F5C440;
        background: #00F5C408;
      }

      .price-label {
        font-size: 11px;
        font-weight: 600;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.white}50;
        margin-bottom: 4px;
      }

      .price-value {
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 16px;
        font-weight: 700;
        color: #00F5C4;
      }
    }
  }

  /* ── Buy button ── */
  .buy-btn-wrap {
    opacity: 0;
    animation: ${fadeInUp} 0.7s ease 0.8s forwards;
  }

  /* ── Social links ── */
  .social-links {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    flex-wrap: wrap;
    opacity: 0;
    animation: ${fadeInUp} 0.7s ease 1s forwards;

    li a {
      width: 46px;
      height: 46px;
      background: #ffffff0a;
      border: 1px solid #ffffff15;
      backdrop-filter: blur(10px);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      img { transition: all 0.3s ease; width: 20px; height: 20px; }

      &:hover {
        background: #00F5C415;
        border-color: #00F5C450;
        box-shadow: 0 0 20px #00F5C420;
        transform: translateY(-2px);

        img { filter: drop-shadow(0 0 4px #00F5C4); }
      }
    }
  }

  /* ── Floating particles ── */
  .particles {
    position: absolute;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    overflow: hidden;

    .particle {
      position: absolute;
      width: 3px;
      height: 3px;
      background: #00F5C4;
      border-radius: 50%;
      opacity: 0;
      animation: particleFloat 6s ease-in-out infinite;

      @keyframes particleFloat {
        0%   { transform: translateY(0) translateX(0); opacity: 0.6; }
        100% { transform: translateY(-120px) translateX(20px); opacity: 0; }
      }

      &:nth-child(1) { left: 15%; top: 70%; animation-delay: 0s; background: #00F5C4; }
      &:nth-child(2) { left: 30%; top: 80%; animation-delay: 1s; background: #4A9EFF; width: 4px; height: 4px; }
      &:nth-child(3) { left: 50%; top: 75%; animation-delay: 2s; background: #7B5EA7; }
      &:nth-child(4) { left: 70%; top: 85%; animation-delay: 0.5s; background: #00F5C4; }
      &:nth-child(5) { left: 85%; top: 70%; animation-delay: 1.5s; background: #4A9EFF; }
      &:nth-child(6) { left: 10%; top: 60%; animation-delay: 3s; background: #7B5EA7; width: 2px; height: 2px; }
    }
  }

  /* ── Responsive ── */
  @media screen and (max-width: 991px) {
    .banner-title { font-size: 52px; }
    .presale-card { padding: 24px; }
  }

  @media screen and (max-width: 767px) {
    .banner-title { font-size: 40px; }
    .price-info { gap: 12px; }
    .price-info .price-item { padding: 10px 14px; }
  }

  @media screen and (max-width: 575px) {
    padding: 130px 0 50px;
    .banner-title { font-size: 32px; }
  }
`;

export default BannerWrapper;

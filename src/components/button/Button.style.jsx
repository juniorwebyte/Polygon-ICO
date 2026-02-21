import styled, { css, keyframes } from "styled-components";

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 15px #00F5C430, 0 4px 30px #00F5C420; }
  50%       { box-shadow: 0 0 30px #00F5C460, 0 4px 50px #00F5C440; }
`;

const ripple = keyframes`
  0%   { transform: scale(0); opacity: 0.6; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const ButtonWrapper = styled.button`
  background: #00F5C410;
  backdrop-filter: blur(10px);
  border-radius: 50px;
  border: 1px solid #00F5C430;
  padding: 15px 40px;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: 600;
  font-size: 14px;
  line-height: 26px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #00F5C4;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:hover {
    background: #00F5C420;
    border-color: #00F5C460;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px #00F5C420;
  }

  &:active {
    transform: translateY(0px);
  }

  /* Ripple effect */
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    background: #00F5C440;
    border-radius: 50%;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
    transition: none;
  }

  &:active::after {
    animation: ${ripple} 0.5s ease;
  }

  ${({ size }) =>
    size === "large" &&
    css`
      padding: 16px;
      width: 100%;
      background: linear-gradient(135deg, #00F5C4, #4A9EFF);
      background-size: 200% 200%;
      border: none;
      color: #080B14;
      font-weight: 700;
      animation: ${shimmer} 3s linear infinite;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 30px #00F5C440;
        animation: ${shimmer} 2s linear infinite, ${glowPulse} 2s ease infinite;
      }
    `}

  ${({ variant }) =>
    variant === "green" &&
    css`
      padding: 16px;
      min-width: 220px;
      background: linear-gradient(135deg, #00F5C4, #4A9EFF);
      background-size: 200% 200%;
      border: none;
      border-radius: 50px;
      color: #080B14;
      font-weight: 700;
      animation: ${shimmer} 3s linear infinite;

      &:hover {
        box-shadow: 0 8px 40px #00F5C450;
        transform: translateY(-2px);
      }
    `}

  ${({ variant }) =>
    variant === "yellow" &&
    css`
      padding: 16px;
      min-width: 220px;
      background: #FFD166;
      border: none;
      border-radius: 50px;
      color: #080B14;
      font-weight: 700;
      transition: all 0.3s ease;

      &:hover {
        background: #FFE08A;
        box-shadow: 0 8px 30px #FFD16640;
        transform: translateY(-2px);
      }
    `}

  ${({ variant }) =>
    variant === "gradient" &&
    css`
      padding: 18px 50px;
      min-width: 260px;
      background: linear-gradient(135deg, #00F5C4 0%, #4A9EFF 50%, #7B5EA7 100%);
      background-size: 200% 200%;
      border: none;
      border-radius: 50px;
      color: #080B14;
      font-weight: 700;
      font-size: 15px;
      letter-spacing: 0.08em;
      animation: ${shimmer} 4s linear infinite, ${glowPulse} 3s ease-in-out infinite;

      &:hover {
        transform: translateY(-3px);
        box-shadow: 0 12px 50px #00F5C450;
        animation: ${shimmer} 2s linear infinite, ${glowPulse} 1.5s ease-in-out infinite;
      }

      &:active { transform: translateY(0); }
    `}

  ${({ variant }) =>
    variant === "outline" &&
    css`
      background: transparent;
      border: 1px solid #ffffff20;
      color: ${({ theme }) => theme.colors.white};

      &:hover {
        border-color: #00F5C450;
        color: #00F5C4;
        background: #00F5C410;
      }
    `}
`;

export default ButtonWrapper;

import styled, { css, keyframes } from "styled-components";

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const digitFlip = keyframes`
  0%   { transform: rotateX(0deg); }
  50%  { transform: rotateX(45deg); }
  100% { transform: rotateX(0deg); }
`;

const glowNumber = keyframes`
  0%, 100% { text-shadow: 0 0 20px #00F5C440; }
  50%       { text-shadow: 0 0 40px #00F5C480, 0 0 80px #00F5C430; }
`;

const CountdownWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  animation: ${fadeInUp} 0.6s ease 0.3s both;

  .count-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;

    /* Separator */
    &:not(:last-child)::after {
      content: ":";
      position: absolute;
      right: -10px;
      top: 8px;
      font-family: ${({ theme }) => theme.fonts.secondary};
      font-weight: 700;
      font-size: 28px;
      line-height: 1;
      color: #00F5C450;
    }

    .count-box {
      width: 72px;
      height: 72px;
      background: linear-gradient(135deg, #0F152580 0%, #0F152540 100%);
      backdrop-filter: blur(20px);
      border: 1px solid #00F5C420;
      border-radius: 14px;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      overflow: hidden;
      transition: border-color 0.3s ease;

      &:hover {
        border-color: #00F5C450;
        box-shadow: 0 0 20px #00F5C420;
      }

      /* Corner accents */
      &::before, &::after {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        border-color: #00F5C440;
        border-style: solid;
      }
      &::before {
        top: 4px;
        left: 4px;
        border-width: 1px 0 0 1px;
      }
      &::after {
        bottom: 4px;
        right: 4px;
        border-width: 0 1px 1px 0;
      }
    }
  }

  .count {
    font-family: ${({ theme }) => theme.fonts.secondary};
    font-weight: 700;
    font-size: 28px;
    line-height: 1;
    color: #00F5C4;
    animation: ${glowNumber} 3s ease-in-out infinite;
    display: block;
    text-align: center;
  }

  .label {
    font-family: ${({ theme }) => theme.fonts.primary};
    font-weight: 500;
    font-size: 10px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${({ theme }) => theme.colors.white}50;
    text-align: center;
  }

  /* Orbitron variant */
  ${({ font }) =>
    font === "orbitron" &&
    css`
      .count {
        font-family: ${({ theme }) => theme.fonts.secondary};
        font-size: 30px;
      }
    `}

  @media screen and (max-width: 991px) {
    gap: 10px;
    .count-item .count-box { width: 62px; height: 62px; }
    .count { font-size: 24px; }
  }

  @media screen and (max-width: 575px) {
    gap: 8px;
    .count-item .count-box { width: 54px; height: 54px; }
    .count { font-size: 20px; }
    .count-item:not(:last-child)::after { font-size: 22px; right: -8px; }
  }
`;

export default CountdownWrapper;

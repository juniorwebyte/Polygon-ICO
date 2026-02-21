import styled, { css, keyframes } from "styled-components";

const fillIn = keyframes`
  from { width: 0%; }
  to   { width: var(--target-width, 50%); }
`;

const shine = keyframes`
  0%   { left: -100%; }
  60%  { left: 150%; }
  100% { left: 150%; }
`;

const glowMove = keyframes`
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; }
`;

const ProgressWrapper = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255,255,255,0.07);
  border-radius: 50px;
  overflow: hidden;
  position: relative;

  .progress-done {
    height: 100%;
    background: linear-gradient(90deg, #00F5C4 0%, #4A9EFF 100%);
    border-radius: 50px;
    position: relative;
    overflow: hidden;
    animation: ${fillIn} 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.3s both;
    box-shadow: 0 0 12px #00F5C450;

    /* Shine effect */
    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 60%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent);
      animation: ${shine} 3s ease-in-out 1.5s infinite;
    }

    p {
      display: none;
    }
  }

  /* Dashed variant */
  ${({ variant }) =>
    variant === "dashed" &&
    css`
      height: 12px;
      background: rgba(255,255,255,0.06);
      border-radius: 50px;

      .progress-done {
        background: linear-gradient(90deg, #00F5C4 0%, #4A9EFF 60%, #7B5EA7 100%);
        box-shadow: 0 0 20px #00F5C450, 0 0 40px #4A9EFF20;
        border-radius: 50px;

        &::after {
          animation: ${shine} 2.5s ease-in-out 1.5s infinite;
        }
      }
    `}

  ${({ variant }) =>
    variant === "v2" &&
    css`
      height: 16px;
      background: rgba(255,255,255,0.06);
      border-radius: 4px;

      .progress-done {
        background: linear-gradient(90deg, #00F5C4 0%, #4A9EFF 100%);
        border-radius: 4px;

        p {
          display: flex;
          align-items: center;
          padding-right: 8px;
          font-family: ${({ theme }) => theme.fonts.secondary};
          font-weight: 600;
          font-size: 11px;
          color: #080B14;
        }
      }
    `}

  ${({ variant }) =>
    variant === "green" &&
    css`
      height: 10px;
      .progress-done {
        background: linear-gradient(90deg, #00F5C4 0%, #4A9EFF 100%);
      }
    `}
`;

export default ProgressWrapper;

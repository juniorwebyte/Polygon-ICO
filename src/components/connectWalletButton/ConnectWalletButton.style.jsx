import styled, { keyframes } from "styled-components";

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 12px rgba(0,245,196,0.25); }
  50%       { box-shadow: 0 0 25px rgba(0,245,196,0.45); }
`;

const ConnectWalletWrapper = styled.div`
  button {
    font-family: ${({ theme }) => theme.fonts.primary} !important;
    font-weight: 600 !important;
    font-size: 13px !important;
    letter-spacing: 0.06em !important;
    text-transform: uppercase !important;
    color: #00F5C4 !important;
    background: rgba(0,245,196,0.08) !important;
    border: 1px solid rgba(0,245,196,0.25) !important;
    border-radius: 50px !important;
    padding: 11px 24px !important;
    transition: all 0.3s ease !important;
    cursor: pointer;

    &:hover {
      background: rgba(0,245,196,0.15) !important;
      border-color: rgba(0,245,196,0.50) !important;
      animation: ${glowPulse} 2s ease-in-out infinite;
      transform: translateY(-1px);
    }
  }

  /* Connected state */
  .wallet-connected {
    display: flex;
    align-items: center;
    gap: 10px;
    background: rgba(0,245,196,0.06);
    border: 1px solid rgba(0,245,196,0.2);
    border-radius: 50px;
    padding: 8px 16px;

    .wallet-address {
      font-family: ${({ theme }) => theme.fonts.secondary};
      font-size: 12px;
      font-weight: 600;
      color: #00F5C4;
      letter-spacing: 0.05em;
    }

    .wallet-dot {
      width: 8px;
      height: 8px;
      background: #00F5C4;
      border-radius: 50%;
      box-shadow: 0 0 8px #00F5C4;
    }
  }
`;

export default ConnectWalletWrapper;

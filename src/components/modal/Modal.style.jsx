import styled, { css, keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(30px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
`;

const glowBorder = keyframes`
  0%, 100% { border-color: #00F5C420; }
  50%       { border-color: #00F5C450; }
`;

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(8,11,20,0.85);
  backdrop-filter: blur(12px);
  animation: ${fadeIn} 0.3s ease;

  .gittu-modal-dialog {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
  }

  .gittu-modal-content {
    background: linear-gradient(135deg, #0F1525 0%, #0B1020 100%);
    border: 1px solid #00F5C420;
    border-radius: 24px;
    overflow: hidden;
    position: relative;
    animation: ${slideUp} 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    animation: ${glowBorder} 3s ease-in-out 0.35s infinite;

    /* Top accent line */
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, #00F5C4, #4A9EFF, #7B5EA7);
    }
  }

  .gittu-modal-header {
    padding: 24px 28px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ffffff08;

    h4 {
      font-family: ${({ theme }) => theme.fonts.primary};
      font-weight: 700;
      font-size: 18px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      background: linear-gradient(135deg, #00F5C4, #4A9EFF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    button {
      background: #ffffff08;
      border: 1px solid #ffffff10;
      border-radius: 50%;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${({ theme }) => theme.colors.white}70;
      font-size: 18px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        background: #00F5C415;
        border-color: #00F5C440;
        color: #00F5C4;
        transform: rotate(90deg);
      }
    }
  }

  .gittu-modal-body {
    padding: 24px 28px 28px;

    .presale-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;

      h5 {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.white}50;
        line-height: 1;
      }
    }

    .presale-item {
      h6 {
        font-size: 12px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: ${({ theme }) => theme.colors.white}50;
        margin-bottom: 8px;
        font-family: ${({ theme }) => theme.fonts.primary};
      }

      .input-group {
        background: #ffffff06;
        border: 1px solid #ffffff10;
        border-radius: 14px;
        display: flex;
        align-items: center;
        padding: 4px 4px 4px 16px;
        transition: all 0.3s ease;

        &:focus-within {
          border-color: #00F5C440;
          background: #00F5C408;
          box-shadow: 0 0 20px #00F5C410;
        }

        input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          font-family: ${({ theme }) => theme.fonts.secondary};
          font-size: 16px;
          font-weight: 600;
          color: ${({ theme }) => theme.colors.white};
          padding: 8px 0;

          &::placeholder {
            color: ${({ theme }) => theme.colors.white}30;
          }
        }
      }
    }

    .presale-price-info {
      background: #00F5C408;
      border: 1px solid #00F5C415;
      border-radius: 12px;
      padding: 14px 16px;

      p {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-size: 13px;
        font-weight: 500;
        color: ${({ theme }) => theme.colors.white}70;
        display: flex;
        justify-content: space-between;
        align-items: center;

        span {
          color: #00F5C4;
          font-weight: 600;
        }
      }
    }

    .status-icon {
      width: 48px;
      height: 48px;
      object-fit: contain;
    }
  }

  /* Variant v2 */
  ${({ variant }) =>
    variant === "v2" &&
    css`
      .gittu-modal-content {
        background: linear-gradient(135deg, #12101a 0%, #0F0D18 100%);
        border-color: #7B5EA730;

        &::before {
          background: linear-gradient(90deg, #7B5EA7, #4A9EFF, #00F5C4);
        }
      }
    `}

  @media screen and (max-width: 575px) {
    padding: 16px;
    .gittu-modal-header { padding: 20px 20px 16px; }
    .gittu-modal-body { padding: 20px; }
  }
`;

export default ModalWrapper;

import styled, { keyframes } from "styled-components";

const fadeInDown = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

const HeaderWrapper = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  transition: all 0.4s ease;
  animation: ${fadeInDown} 0.6s ease;

  background: linear-gradient(180deg, rgba(8,11,20,0.95) 0%, rgba(8,11,20,0.80) 100%);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0,245,196,0.08);

  &.sticky {
    background: rgba(8,11,20,0.97);
    backdrop-filter: blur(30px);
    border-bottom-color: rgba(0,245,196,0.15);
    box-shadow: 0 4px 40px rgba(0,0,0,0.4);
    padding: 14px 0;
  }

  .gittu-header-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .gittu-header-left {
    display: flex;
    align-items: center;
    gap: 50px;
  }

  .gittu-header-right {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* Logo */
  .gittu-logo {
    img { height: 36px; }
  }

  /* Navigation */
  .gittu-header-menu {
    ul {
      display: flex;
      align-items: center;
      gap: 30px;

      li a {
        font-family: ${({ theme }) => theme.fonts.primary};
        font-weight: 500;
        font-size: 14px;
        letter-spacing: 0.04em;
        color: ${({ theme }) => theme.colors.white}80;
        transition: all 0.3s ease;
        position: relative;

        &::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #00F5C4, #4A9EFF);
          transition: width 0.3s ease;
        }

        &:hover {
          color: #00F5C4;
          &::after { width: 100%; }
        }
      }
    }
  }

  /* Social icons in header */
  .header-social-links {
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      width: 36px;
      height: 36px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;

      img { width: 16px; height: 16px; }

      &:hover {
        background: rgba(0,245,196,0.1);
        border-color: rgba(0,245,196,0.3);
        box-shadow: 0 0 15px rgba(0,245,196,0.15);
        transform: translateY(-2px);
      }
    }
  }

  /* Connect wallet button */
  .connect-btn-wrap button {
    font-family: ${({ theme }) => theme.fonts.primary} !important;
    font-weight: 600;
    font-size: 13px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: #00F5C4 !important;
    background: rgba(0,245,196,0.08) !important;
    border: 1px solid rgba(0,245,196,0.25) !important;
    border-radius: 50px !important;
    padding: 10px 22px !important;
    transition: all 0.3s ease !important;

    &:hover {
      background: rgba(0,245,196,0.15) !important;
      border-color: rgba(0,245,196,0.5) !important;
      box-shadow: 0 0 20px rgba(0,245,196,0.2) !important;
    }
  }

  /* Mobile menu toggle */
  .navbar-toggler {
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 10px;
    padding: 8px 10px;
    color: ${({ theme }) => theme.colors.white};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(0,245,196,0.1);
      border-color: rgba(0,245,196,0.3);
    }
  }

  @media screen and (max-width: 991px) {
    .gittu-header-menu { display: none; }
    .header-social-links { display: none; }
  }
`;

export default HeaderWrapper;

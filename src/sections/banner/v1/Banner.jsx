import BannerWrapper from "./Banner.style";
import Countdown from "../../../components/countdown/Countdown";
import Progressbar from "../../../components/progressbar/Progressbar";
import Button from "../../../components/button/Button";
import Modal from "../../../components/modal/Modal";
import BannerData from "../../../assets/data/bannerV1";
import FooterSocialLinks from "../../../assets/data/footerSocialLinks";
import { usePresaleData } from "../../../utils/PresaleContext";
import { usePresaleModal } from "../../../utils/ModalContext";

const Banner = () => {
  const {
    currentStage,
    currentBonus,
    currentPrice,
    stageEnd,
    nextPrice,
    tokenSymbol,
    goalToken,
    raisedToken,
    tokenPercent,
  } = usePresaleData();

  const { isModalOpen, modalHandle } = usePresaleModal();

  return (
    <>
      <BannerWrapper>
        {/* Background elements */}
        <div className="bg-grid" />
        <div className="bg-orb-center" />
        <div className="scanline" />

        {/* Floating particles */}
        <div className="particles">
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
          <div className="particle" />
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="mb-40 text-center">

                {/* Status badge */}
                <div className="mb-25 d-flex justify-content-center">
                  <div className="presale-badge">
                    <div className="dot" />
                    <span>{BannerData.presaleStatus}</span>
                  </div>
                </div>

                {/* Countdown */}
                <div className="mb-28 d-flex justify-content-center">
                  <Countdown endDate={stageEnd} font="orbitron" />
                </div>

                {/* Title */}
                <div className="mb-20">
                  <h1 className="banner-title">
                    <span className="gradient-word">{BannerData.title}</span>
                    <br />
                    {BannerData.title2}
                  </h1>
                </div>

                {/* Subtitle */}
                <h5 className="banner-subtitle">{BannerData.subtitle}</h5>
              </div>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-7">

              {/* Presale card */}
              <div className="presale-card mb-30">

                {/* Stage info row */}
                <div className="mb-12 d-flex align-items-center justify-content-between gap-1 flex-wrap">
                  <span className="stage-info">
                    Stage {currentStage} · {currentBonus}% Bonus
                  </span>
                  <span className="stage-amount">
                    {raisedToken} / {goalToken}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="mb-24">
                  <Progressbar done={tokenPercent} variant="dashed" />
                </div>

                {/* Price info */}
                <div className="price-info mb-24">
                  <div className="price-item">
                    <div className="price-label">Current Price</div>
                    <div className="price-value">1 {tokenSymbol} = ${currentPrice}</div>
                  </div>
                  <div className="price-item">
                    <div className="price-label">Next Stage</div>
                    <div className="price-value">${nextPrice}</div>
                  </div>
                </div>

                {/* Buy button */}
                <div className="buy-btn-wrap d-flex align-items-center justify-content-center">
                  <Button variant="gradient" onClick={modalHandle}>
                    Buy Now
                  </Button>
                </div>
              </div>

              {/* Social links */}
              <ul className="social-links">
                {FooterSocialLinks?.map((socialLinkItem, i) => (
                  <li key={i}>
                    <a
                      href={socialLinkItem.title}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <img
                        src={socialLinkItem.icon}
                        alt={socialLinkItem.title}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </BannerWrapper>

      {isModalOpen && <Modal />}
    </>
  );
};

export default Banner;
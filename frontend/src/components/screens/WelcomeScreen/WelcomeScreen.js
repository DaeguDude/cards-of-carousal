import React from 'react';
import styled from 'styled-components';
import Header from '../../Header/Header';
import Button from '../../Buttons/Button';
import Footer from '../../Footer/Footer';

const WelcomeScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--primary-background-color);

  /*Header*/
  .header-container {
    display: flex;
    height: 190px;
    flex-direction: column;
    justify-content: flex-end;
  }

  .welcome-to {
    margin-top: 0px;
    line-height: 2rem;
    margin-bottom: -0.14px;
  }

  .CoC {
    font-size: 6rem;
    margin-bottom: -16px;
    vertical-align: bottom;
    line-height: 6rem;
  }

  /*Main Body*/
  .main-body-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: auto;
  }

  .definition-container {
    display: flex;
    flex-direction: column;
    font-size: 3.2rem;
    font-weight: 700;
    transform: rotate(-5deg);
    margin-bottom: 144px;
    line-height: 3.3rem;
  }

  .definition {
    font-size: 2.75rem;
    font-weight: 400;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .join-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 256px;
    height: 48px;
    font-size: 2.5rem;
    font-weight: 900;
  }

  .OR {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);
    border-radius: 50%;
    padding: 16px;
    width: 72px;
    height: 72px;
    margin-left: 93px;
    margin-right: 93px;
    font-size: 2.25rem;
    font-weight: 700;
  }

  /*Footer*/
  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    margin-top: auto;
    height: 140px;
    background-color: var(--secondary-background-color);
    color: var(--secondary-text-color);
    font-size: 2rem;
    font-weight: 400;
    padding-right: 20px;
  }

  /*small size hosting screen */
  @media (max-width: 970px) {
    .definition-container {
      margin-bottom: 80px;
    }

    .CoC {
      font-size: 4rem;
      margin-bottom: -21px;
      line-height: 5rem;
    }
  }

  /*largest desktop player mode */
  @media (max-width: 785px) {
    .header-container {
      height: 180px;
    }

    .CoC {
      font-size: 4rem;
      margin-bottom: -15px;
      line-height: 4.5rem;
    }

    .definition-container {
      display: none;
      margin-bottom: 48px;
    }

    .join-btn {
      width: 224px;
    }

    .host-btn {
      display: none;
    }

    .OR {
      display: none;
    }
  }

  /* Keeps footer content formatted correctly as player only screen shrinks on desktop*/
  @media (max-width: 645px) {
    .welcome-to {
      display: none;
    }
  }

  /*iphone 5*/
  @media (max-width: 320px) {
    .header-container {
      height: 130px;
    }

    .CoC {
      font-size: 3rem;
      margin-bottom: 12px;
      vertical-align: bottom;
      line-height: 3.5rem;
    }
  }
`;

function WelcomeScreen() {
  return (
    <WelcomeScreenWrapper className="primary-background">
      <Header className="header-container">
        <h1 className="welcome-to">WELCOME TO</h1>
        <h2 className="CoC">CARDS OF CAROUSAL</h2>
      </Header>
      <main className="main-body-container">
        <div className="definition-container">
          <div className="word">
            CAROUSAL <span className="definition">(n)</span>
          </div>
          <div className="definition">
            a wild, drunken party or celebration : a drunken revel
          </div>
        </div>
        <div className="button-container">
          <Button type="button" isActive className="join-btn">
            <p> JOIN</p>
          </Button>
          <div className="OR">OR</div>
          <Button type="button" isActive className=" join-btn host-btn">
            <p>HOST</p>
          </Button>
        </div>
      </main>
      <Footer />
    </WelcomeScreenWrapper>
  );
}

export default WelcomeScreen;

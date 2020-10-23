const isServer = typeof window === "undefined";
if (!isServer) require("web-animations-js");
import React, { useEffect, useReducer, useRef } from "react";
import cx from "classnames";
import styled from "styled-components";
import {
  keyframesFrontFlip,
  keyframesFrontHalfFlip,
  keyframesBackFlip,
  keyframesBackHalfFlip,
  timingFlip,
  timingHalfFlip,
  timingFastFlip,
  timingHalfFastFlip,
} from "./animations";

import headsImageSrc from "./img/heads.png";
import tailsImageSrc from "./img/tails.png";
import squareImageSrc from "./img/square.png";
import circleImageSrc from "./img/circle.png";
import goTrumpImageSrc from "./img/headsTrump.png";
import banTrumpImageSrc from "./img/tailsTrump.png";

import { ACTIONS, COIN_STATE, INITIAL_STATE, reducer } from "./reducer";

const COIN_HEADS_ID = "coin-heads";
const COIN_TAILS_ID = "coin-tails";

const TossButton = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid darkgray;
  color: darkgray;
  font-size: 1em;
  margin: 0.5em 1em;
  outline: none;
  padding: 1em 2em;
`;

const ResultsConsole = styled.div`
  color: darkgray;
  height: 3em;
  margin: 0.5em 1em;
  max-width: 300px;
  overflow: hidden;
  overflow-y: scroll;
  padding: 0.5em;
  text-align: left;
  text-transform: uppercase;
  &::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const ResultNotification = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  width: 100%;

  h4 {
    margin: auto;
  }
`;

const COIN_STATE_LITERALS = {
  DEFAULT: { [COIN_STATE.HEADS]: "HEADS", [COIN_STATE.TAILS]: "TAILS" },
  SHAPES: { [COIN_STATE.HEADS]: "SQUARE", [COIN_STATE.TAILS]: "CIRCLE" },
  TRUMP: { [COIN_STATE.HEADS]: "GO-TRUMP!", [COIN_STATE.TAILS]: "BAN-TRUMP!" },
};

const COIN_STATE_IMAGES = {
  DEFAULT: {
    [COIN_STATE.HEADS]: headsImageSrc,
    [COIN_STATE.TAILS]: tailsImageSrc,
  },
  SHAPES: {
    [COIN_STATE.HEADS]: squareImageSrc,
    [COIN_STATE.TAILS]: circleImageSrc,
  },
  TRUMP: {
    [COIN_STATE.HEADS]: goTrumpImageSrc,
    [COIN_STATE.TAILS]: banTrumpImageSrc,
  },
};

export const Coin = ({
  sevenTails = false,
  showTrump = false,
  showShapes = false,
} = {}) => {
  const resultsConsoleElement = useRef(null);
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const hasLoadedImages = state.isHeadsLoaded && state.isTailsLoaded;

  let coinStateLiterals = COIN_STATE_LITERALS.DEFAULT;
  if (showTrump) coinStateLiterals = COIN_STATE_LITERALS.TRUMP;
  if (showShapes) coinStateLiterals = COIN_STATE_LITERALS.SHAPES;

  let coinStateImages = COIN_STATE_IMAGES.DEFAULT;
  if (showTrump) coinStateImages = COIN_STATE_IMAGES.TRUMP;
  if (showShapes) coinStateImages = COIN_STATE_IMAGES.SHAPES;

  useEffect(() => {
    if (!state.tossCoin || state.isAnimating) return;

    const timing = state.isAnimatingFast ? timingFastFlip : timingFlip;
    const timingHalf = state.isAnimatingFast
      ? timingHalfFastFlip
      : timingHalfFlip;

    const nextState = Math.random() < 0.5 ? COIN_STATE.HEADS : COIN_STATE.TAILS;
    const willFlip = state.coinState !== nextState;

    nextState === COIN_STATE.HEADS
      ? dispatch({ type: ACTIONS.HEADS_COUNT_INCREMENT })
      : dispatch({ type: ACTIONS.TAILS_COUNT_INCREMENT });

    let COIN_FRONT_ID = COIN_HEADS_ID;
    let COIN_BACK_ID = COIN_TAILS_ID;

    if (state.coinState === COIN_STATE.TAILS) {
      COIN_FRONT_ID = COIN_TAILS_ID;
      COIN_BACK_ID = COIN_HEADS_ID;
    }

    const coinFront = document.querySelector(`#${COIN_FRONT_ID}`);
    const coinBack = document.querySelector(`#${COIN_BACK_ID}`);

    if (!state.isAnimating) {
      const animation = coinFront.animate(keyframesFrontFlip, timing);
      coinBack.animate(keyframesBackFlip, timing);

      animation.onfinish = () => {
        if (willFlip) {
          const flipAnimation = coinFront.animate(
            keyframesFrontHalfFlip,
            timingHalf
          );
          coinBack.animate(keyframesBackHalfFlip, timingHalf);
          flipAnimation.onfinish = () => {
            dispatch({ type: ACTIONS.TOSS_COIN_RESET });
            dispatch({ type: ACTIONS.ANIMATION_STOPS });
            dispatch({ type: ACTIONS.RESET_ANIMATION_FAST });
          };
        } else {
          dispatch({ type: ACTIONS.TOSS_COIN_RESET });
          dispatch({ type: ACTIONS.ANIMATION_STOPS });
          dispatch({ type: ACTIONS.RESET_ANIMATION_FAST });
        }
      };
      dispatch({ type: ACTIONS.ANIMATION_STARTS });
    }

    dispatch({ type: ACTIONS.COIN_STATE_UPDATE, payload: nextState });
    dispatch({
      type: ACTIONS.RESULTS_UPDATE,
      payload: state.results.concat([nextState]),
    });
  }, [
    state.coinState,
    state.isAnimatingFast,
    state.isAnimating,
    state.tossCoin,
    state.results,
  ]);

  const _getZ = (side) => Number(Boolean(side === state.coinState));

  useEffect(() => {
    if (!state.tossCoinUntilTails || state.isAnimating || state.isAnimatingFast)
      return;
    const lastResults = state.results.slice(-state.numberOfTailsToStop);
    if (
      lastResults.filter((toss) => toss === COIN_STATE.TAILS).length ===
      state.numberOfTailsToStop
    ) {
      dispatch({ type: ACTIONS.TOSS_COIN_UNTIL_TAILS_RESET });
      dispatch({
        type: ACTIONS.SUCCESS_MESSAGE_UPDATE,
        payload: `You got 7 ${coinStateLiterals[COIN_STATE.TAILS]} in a row`,
      });
    } else {
      setTimeout(() => {
        dispatch({ type: ACTIONS.SET_ANIMATION_FAST });
        dispatch({ type: ACTIONS.TOSS_COIN });
      }, 250);
    }
  }, [
    state.isAnimating,
    state.isAnimatingFast,
    state.numberOfTailsToStop,
    state.results,
    state.tossCoinUntilTails,
  ]);

  useEffect(() => {
    if (!state.tossCoin && state.results.length >= 1) {
      dispatch({
        type: ACTIONS.SUCCESS_MESSAGE_UPDATE,
        payload: `You got ${coinStateLiterals[state.coinState]}`,
      });
      dispatch({
        type: ACTIONS.SET_LAST_8_RESULTS,
        payload: coinStateLiterals[state.coinState],
      });
      if (resultsConsoleElement.current)
        resultsConsoleElement.current.scrollTop =
          resultsConsoleElement.current.scrollHeight;
    }
  }, [state.coinState, state.results, state.tossCoin, coinStateLiterals]);

  useEffect(() => {
    dispatch({
      type: ACTIONS.CONSOLE_MESSAGE_UPDATE,
      payload: state.last8results.join(", "),
    });
  }, [state.last8results]);

  return (
    <>
      <div className={cx("loader", { isHidden: hasLoadedImages })}>loading</div>
      <div className={cx("coin-container", { isHidden: !hasLoadedImages })}>
        <img
          className="coin-heads-image"
          onLoad={() => dispatch({ type: ACTIONS.SET_HEADS_LOADED })}
          src={coinStateImages[COIN_STATE.HEADS]}
          id="coin-heads"
          style={{ zIndex: 2 * _getZ(COIN_STATE.HEADS) }}
        />
        <img
          className="coin-tails-image"
          onLoad={() => dispatch({ type: ACTIONS.SET_TAILS_LOADED })}
          src={coinStateImages[COIN_STATE.TAILS]}
          id="coin-tails"
          style={{ zIndex: 2 * _getZ(COIN_STATE.TAILS) }}
        />
      </div>
      <div className={cx("buttons-container", { isHidden: !hasLoadedImages })}>
        <TossButton
          onClick={() => {
            dispatch({ type: ACTIONS.SUCCESS_MESSAGE_RESET });
            dispatch({ type: ACTIONS.RESULTS_RESET });
            dispatch({ type: ACTIONS.HEADS_COUNT_RESET });
            dispatch({ type: ACTIONS.TAILS_COUNT_RESET });
            dispatch({ type: ACTIONS.TOSS_COIN });
          }}
          disabled={state.tossCoin}
        >
          Coin Toss
        </TossButton>
        {sevenTails && (
          <TossButton
            onClick={() => {
              dispatch({ type: ACTIONS.SUCCESS_MESSAGE_RESET });
              dispatch({ type: ACTIONS.RESULTS_RESET });
              dispatch({ type: ACTIONS.HEADS_COUNT_RESET });
              dispatch({ type: ACTIONS.TAILS_COUNT_RESET });
              dispatch({ type: ACTIONS.TOSS_COIN_UNTIL_TAILS });
            }}
            disabled={state.tossCoin}
          >
            {`Keep tossing until 7 ${
              coinStateLiterals[COIN_STATE.TAILS]
            } in a row`}
          </TossButton>
        )}
      </div>
      <ResultNotification className={cx({ isHidden: !hasLoadedImages })}>
        {(state.headsCount || state.tailsCount) && !state.isAnimating ? (
          <h4>{state.successMessage}</h4>
        ) : (
          <></>
        )}
      </ResultNotification>
      {sevenTails && Boolean(state.consoleMessage.length) && (
        <>
          <h5 style={{ margin: 0 }}>Last 8 coin toss outcomes:</h5>
          <ResultsConsole ref={resultsConsoleElement}>
            {state.consoleMessage}
          </ResultsConsole>
        </>
      )}
    </>
  );
};

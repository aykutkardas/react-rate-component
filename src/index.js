import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ReactRateComponent(props) {
  const { showCount, defaultValue, ...config } = props;
  const [value, setValue] = useState(defaultValue || 0);
  const [symbols, setSymbols] = useState([]);
  const [rateCount, setRateCount] = useState(0);

  const getSymbols = count => {
    let activeCount = count;
    if (typeof activeCount === "undefined") {
      activeCount = value;
    }
    const symbolList = [];
    for (let i = 0; i < props.count; i += 1) {
      symbolList.push({
        active: i <= activeCount - 1
      });
    }
    setRateCount(value);
    return symbolList;
  };

  const onMouseOver = rateIndex => {
    if (!props.edit) return;
    const activeIndex = rateIndex + 1;
    setSymbols(getSymbols(activeIndex));
    setRateCount(activeIndex);
  };

  const mouseLeave = () => {
    if (!props.edit) return;
    setSymbols(getSymbols());
    setRateCount(value);
  };

  useEffect(() => {
    setSymbols(getSymbols(value));
    window.addEventListener("onMouseOver", onMouseOver);
    window.addEventListener("onMouseLeave", mouseLeave);
    return () => {
      window.removeEventListener("onMouseOver", onMouseOver);
      window.removeEventListener("onMouseLeave", mouseLeave);
    };
  }, []);

  const handleOnPress = rateIndex => {
    if (!props.edit) return;
    const activeIndex = rateIndex + 1;
    setSymbols(getSymbols(activeIndex));
    setValue(activeIndex);
    setRateCount(activeIndex);
    if (typeof props.onChange === "function") {
      props.onChange(activeIndex);
    }
  };

  const containerStyle = {
    overflow: "hidden",
    position: "relative",
    display: "flex",
    flexDirection: "column"
  };

  return (
    <div style={containerStyle}>
      <div style={{ margin: "0 auto" }}>
        <RenderSymbols
          config={config}
          symbols={symbols}
          onMouseOver={onMouseOver}
          onFocus={onMouseOver}
          onMouseLeave={mouseLeave}
          handleOnPress={handleOnPress}
        />
      </div>
      {showCount && <div style={{ margin: "0 auto" }}>{rateCount}</div>}
    </div>
  );
}

function RenderSymbols({
  config,
  symbols,
  onMouseOver,
  onMouseLeave,
  handleOnPress
}) {
  const { inactiveColor, activeColor, size, symbol, edit } = config;

  const rateDefaultStyle = {
    position: "relative",
    overflow: "hidden",
    cursor: "pointer",
    display: "block",
    float: "left",
    transition: ".10s"
  };

  return symbols.map((rateSymbol, i) => {
    const style = Object.assign({}, rateDefaultStyle, {
      color: rateSymbol.active ? activeColor : inactiveColor,
      cursor: edit ? "pointer" : "default",
      fontSize: `${size}px`
    });
    return (
      <span
        style={style}
        key={i}
        rate-index={i}
        onMouseOver={() => onMouseOver(i)}
        onFocus={() => onMouseOver(i)}
        onMouseLeave={onMouseLeave}
        onClick={() => handleOnPress(i)}
      >
        {symbol}
      </span>
    );
  });
}

ReactRateComponent.propTypes = {
  edit: PropTypes.bool,
  showCount: PropTypes.bool,
  defaultValue: PropTypes.number,
  count: PropTypes.number,
  symbol: PropTypes.string,
  size: PropTypes.number,
  inactiveColor: PropTypes.string,
  activeColor: PropTypes.string
};

ReactRateComponent.defaultProps = {
  edit: true,
  showCount: false,
  defaultValue: 0,
  count: 5,
  symbol: "★",
  size: 25,
  inactiveColor: "#949494",
  activeColor: "#ffd700"
};

RenderSymbols.propTypes = {
  symbols: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool
    })
  ).isRequired,
  onMouseOver: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  handleOnPress: PropTypes.func.isRequired
};

export default ReactRateComponent;

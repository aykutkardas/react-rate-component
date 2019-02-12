import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

function ReactRateComponent (props) {
    const [value, setValue] = useState(props.defaultValue || 0)
    const [symbols, setSymbols] = useState([])
    const [rateCount, setRateCount] = useState(0)
    const [config, setConfig] = useState(props)

    useEffect(() => {
        setSymbols(getSymbols(value))
        window.addEventListener('onMouseOver', onMouseOver)
        window.addEventListener('onMouseLeave', mouseLeave)
        return () => {
            window.removeEventListener('onMouseOver', onMouseOver)
            window.removeEventListener('onMouseLeave', mouseLeave)
        }
    }, [])

    const getSymbols = activeCount => {
        if (typeof activeCount === 'undefined') {
            activeCount = value
        }
        let symbols = []
        for (let i = 0; i < config.count; i++) {
            symbols.push({
              active: i <= activeCount - 1
            })
        }
        setRateCount(value)
        return symbols
    }

    const onMouseOver = rateIndex => {
        if (!config.edit) return
        rateIndex = rateIndex + 1
        setSymbols(getSymbols(rateIndex))
        setRateCount(rateIndex)
    }

    const mouseLeave = _ => {
        if (!config.edit) return
        setSymbols(getSymbols())
        setRateCount(value)
    }

    const handleOnPress = rateIndex => {
        if (!config.edit) return
        let value = rateIndex = rateIndex + 1
        setSymbols(getSymbols(rateIndex))
        setValue(value)
        setRateCount(rateIndex)
        props.onChange(value)
    }

    return (
        <div style={containerStyle}>
            <div style={{margin: '0 auto'}}>
                <RenderSymbols config={config} symbols={symbols} onMouseOver={onMouseOver} onMouseLeave={mouseLeave} handleOnPress={handleOnPress} />
            </div>
            {
                props.showCount &&
                <div style={{margin: '0 auto'}}>
                    {rateCount}
                </div>
            }
        </div>
    )
}

function RenderSymbols ({config, symbols, onMouseOver, onMouseLeave, handleOnPress}) {
    const { inactiveColor, activeColor, size, symbol, edit } = config
    return symbols.map((rate_s, i) => {
      const style = Object.assign({}, rateDefaultStyle, {
        color: rate_s.active ? activeColor : inactiveColor,
        cursor: edit ? 'pointer' : 'default',
        fontSize: `${size}px`
      })
      return (
        <span
          style={style}
          key={i}
          rate-index={i}
          onMouseOver={() => onMouseOver(i)}
          onMouseLeave={onMouseLeave}
          onClick={() => handleOnPress(i)}>
          {symbol}
        </span>
      )
    })
}

const rateDefaultStyle = {
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    display: 'block',
    float: 'left'
}

const containerStyle = {
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column'
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
}
ReactRateComponent.defaultProps = {
    edit: true,
    showCount: false,
    defaultValue: 0,
    count:5,
    symbol: '★',
    size: 25,
    inactiveColor: '#949494',
    activeColor: '#ffd700',
    onChange: () => {}
}

export default ReactRateComponent

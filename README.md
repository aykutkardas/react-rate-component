# react-rate-component

React Hooks Rate Component

[![npm version](https://badge.fury.io/js/react-rate-component.svg)](https://www.npmjs.com/package/react-rate-component/)

## Demo

> React Rate Component - [Demo](https://ebrugulec.com/react-rate-component)

## Install

```bash
    npm install react-rate-component --save
```

## Usage

```javascript
import ReactRateComponent 'react-rate-component'

class Foo extends Component {
    changeRating(newRating) {
      setRate(newRating)
    }

    render() {
      return (
        <ReactRateComponent
            defaultValue={3}
            showCount={true}
            onChange={this.changeRating}
        />
      );
    }
}

class Bar extends Component {
  render() {
    return (
        <ReactRateComponent />
    );
  }
}
```

### Properties

| Property        | Description                             | Default value | Type    |
| --------------- | --------------------------------------- | ------------- | ------- |
| `count`         | Total symbol count                      | 5             | number  |
| `edit`          | You can make disable your rate symbols  | `true`        | boolean |
| `showCount`     | Set rating value                        | `false`       | boolean |
| `defaultValue`  | Set rating default value                | 0             | number  |
| `symbol`        | Which character you want to use         | ★             | string  |
| `size`          | Size of symbol (px)                     | `25px`        | string  |
| `activeColor`   | Color of selected or active symbols     | `#ffd700`     | string  |
| `inactiveColor` | Color of inactive symbols               | `#949494`     | string  |
| `activeClass`   | ClassName of selected or active symbols | `""`          | string  |
| `inactiveClass` | ClassName of inactive symbols           | `""`          | string  |

## Callbacks

| Callback               | Description                                    | Type                |
| ---------------------- | ---------------------------------------------- | ------------------- |
| `onChange(new_rating)` | Will be invoked any time the rating is changed | function (value) {} |

### Todo

- Write tests

License
MIT

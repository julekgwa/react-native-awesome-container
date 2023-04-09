# react-native-awesome-container

![header](example/assets/awesome-container.png)

An easy-to-use React Native library that provides a View component with built-in loaders and popups. This library is designed to simplify the process of adding loading and popup functionality to your React Native Views with minimal setup.

## Installation

```sh
yarn add react-native-awesome-container
```

## Usage

```js
import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import Container from 'react-native-awesome-container';

// ...

export default function App() {
  const [showPopup, setShowPopup] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [popupMessage, setPopupMessage] = React.useState('');

  React.useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);

        const response = await fetch(
          'https://jsonplaceholder.typicode.scom/todos/1'
        );

        if (!response.ok) {
          throw new Error('Unable to get todos');
        }

      } catch (error: any) {
        setShowPopup(true);
        setPopupMessage(error?.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Container
        isLoading={isLoading}
        popupMessage={
          popupMessage || "You've successfully displayed a message."
        }
        popupTitle="Error"
        buttonText="OK"
        popupType={'Danger'}
        onPressPopup={() => setShowPopup(false)}
        showPopup={showPopup}
        spinner={'Grid'}
        spinnerColor="blue"
        style={styles.box}
      >
        ...
      </Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 80,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  box: {
    flex: 1,
    gap: 10,
  },
});
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT

---

Made with [create-react-native-library](https://github.com/callstack/react-native-builder-bob)

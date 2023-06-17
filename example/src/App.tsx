import * as React from 'react';

import { StyleSheet, View, Button } from 'react-native';
import { Container, PopupType } from 'react-native-awesome-container';

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
        console.log(await response.json());
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
        popupType={PopupType.Warning}
        onPressPopup={() => setShowPopup(false)}
        showPopup={showPopup}
        spinner={'Grid'}
        spinnerColor="blue"
        style={styles.box}
      >
        <Button onPress={() => setShowPopup(true)} title="Show Popup" />
        <Button onPress={() => setIsLoading(true)} title="Show Loader" />
      </Container>
      {isLoading && (
        <Button onPress={() => setIsLoading(false)} title="Stop Loader" />
      )}
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

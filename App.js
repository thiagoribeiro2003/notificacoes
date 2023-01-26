import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

export default function App() {
  useEffect(() => {
    /* Ouvinte de evento para as notificações recebidas, ou seja, 
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener();

    /* Ouvinte de evento para as respostas dadas ás Notificações, ou seja, 
    quando o usuário interage (toca na notificação). */
    Notifications.addNotificationResponseReceivedListener();
  }, []);

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Disparar notificação" />
      </SafeAreaView>
    </>
  );
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

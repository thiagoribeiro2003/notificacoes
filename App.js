import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView, Button } from "react-native";
import { useEffect } from "react";
import * as Notifications from "expo-notifications";

/* Manipulador de eventos de notificação */
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: true,
    };
  },
});

export default function App() {
  useEffect(() => {
    /* Necessário para IOS*/
    async function permissoesIos() {
      return await Notifications.requestPermissionsAsync({
        ios: {
          allowAlert: true,
          allowSound: true,
          allowBadge: true,
          allowAnnouncements: true,
        },
      });
    }

    /* Ouvinte de evento para as notificações recebidas, ou seja, 
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas ás Notificações, ou seja, 
    quando o usuário interage (toca na notificação). */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "Não se esqueça 👨‍💻🚀",
      body: "Não se esqueça de tomar água!",
      sound: "default", // necessário pro IOS
      data: { usuario: "Thiago 👨‍💻🚀", cidade: "São Paulo" },
    };

    await Notifications.scheduleNotificationAsync({
      content: mensagem,
      trigger: { seconds: 5 },
    });
  };

  return (
    <>
      <StatusBar />
      <SafeAreaView style={estilos.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Button title="Disparar notificação" onPress={enviarMensagem} />
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

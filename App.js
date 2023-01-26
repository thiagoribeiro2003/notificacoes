import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Platform,
} from "react-native";
import { useEffect, useState } from "react";
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
  const [dados, setDados] = useState(null);

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

    permissoesIos();

    /* Obter as permissões atuais do dispositivo */
    Notifications.getPermissionsAsync().then((status) => {
      if (status.granted) {
        /* Permissões ok? Então obter o token expo do aparelho*/
        Notifications.getExpoPushTokenAsync().then((token) => {
          console.log(token);
        });
      }
    });

    /* Ouvinte de evento para as notificações recebidas, ou seja, 
    quando a notificação aparece no topo da tela do dispositivo. */
    Notifications.addNotificationReceivedListener((notificacao) => {
      console.log(notificacao);
    });

    /* Ouvinte de evento para as respostas dadas ás Notificações, ou seja, 
    quando o usuário interage (toca na notificação). */
    Notifications.addNotificationResponseReceivedListener((resposta) => {
      console.log(resposta.notification.request.content.data);
      setDados(resposta.notification.request.content.data);
    });
  }, []);

  const enviarMensagem = async () => {
    const mensagem = {
      title: "Não se esqueça 👨‍💻🚀",
      body: "Não se esqueça de tomar água!",
      data: { usuario: "Sverino 👨‍💻🚀", cidade: "Vitória de Santo Antão" },
      sound: Platform.OS === "ios" ? "default" : "", // necessário pro IOS
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
        {dados && (
          <View style={estilos.conteudo}>
            <Text>{dados.usuario}</Text>
            <Text>{dados.cidade}</Text>
          </View>
        )}
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
  conteudo: {
    marginVertical: 8,
    backgroundColor: "yellow",
  },
});

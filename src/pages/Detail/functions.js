import { Linking } from 'react-native';
import * as MailComposer from 'expo-mail-composer';

export const navigateBack = (navigation) => () => {
    navigation.goBack();
}

export const sendMail = (message, incident) => () => {
    MailComposer.composeAsync({
        subject: `Herói do caso: ${incident.title}`,
        recipients: [incident.email],
        body: message,
    })
}

export const sendWhatsapp = (message, incident) => () => {
    Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
}

import { Notify } from 'quasar';
import { useTranslate } from './translate';
interface configMessage {
  message?: string;
  caption?: string | undefined;
  color?: string;
}
export function useNotification() {
  const { translate } = useTranslate();
  const time = 5000;
  const success = (config: configMessage = {}) => {
    Notify.create({
      message: config?.message || translate.value.message.success,
      caption: config?.caption || undefined,
      color: config?.color || 'positive',
      timeout: time,
      progress: true,
      icon: 'mdi-check-all',
      position: 'top-right',
    });
  };

  const error = (config: configMessage = {}) => {
    Notify.create({
      message: config?.message || translate.value.message.error,
      caption: config?.caption || undefined,
      color: config?.color || 'negative',
      timeout: time,
      progress: true,
      icon:'mdi-thumb-down-outline',
      position: 'top-right',
    });
  };

  const info = (config: configMessage = {}) => {
    Notify.create({
      message: config.message,
      caption: config?.caption || undefined,
      color: config?.color || 'info',
      timeout: time,
      progress: true,
      icon: 'mdi-information-outline',
      position: 'top-right',
    });
  };

  const confirm = (callback: () => void , config: configMessage = {}) => {
    Notify.create({
      message: translate.value.message.you_sure,
      caption: config?.caption || undefined,
      icon: 'mdi-help-circle-outline',
      position: 'center',
      timeout: 0,
      attrs: {
        id: 'dialog-confirm',
      },
      actions: [
        {
          label: translate.value.no,
          color: 'red',
          handler: () => void 0,
        },
        { label: translate.value.yes, color: 'green', handler: callback },
      ],
    });
  };

  return { notification: { success, error, info, confirm } };
}

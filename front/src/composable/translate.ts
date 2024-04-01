import { LocalStorage } from 'quasar';
import { i18n } from 'src/boot/i18n';
import { computed } from 'vue';

export function useTranslate() {
  const { t, locale } = i18n.global;
  const translate = computed(() => {
    return {
      reports: t('reports'),
      dashboard: t('dashboard'),
      whitelabels: t('whitelabels'),
      id: t('id'),
      customer_name: t('customer_name'),
      customer_email: t('customer_email'),
      partners: t('partners'),
      companies: t('companies'),
      domain: t('domain'),
      groups: t('groups'),
      active: t('active'),
      test: t('test'),
      inactive: t('inactive'),
      blocked: t('blocked'),
      user: t('users', 1),
      users: t('users', 2),
      password: t('password'),
      password_confirmation: t('password_confirmation'),
      department: t('department'),
      playlist: t('playlist'),
      register_account: t('register_account'),
      birth_date: t('birth_date'),
      cpf: t('cpf'),
      name: t('name'),
      column: t('column'),
      value: t('value'),
      table: t('table'),
      income: t('income'),
      pending: t('pending'),
      accepted: t('accepted'),
      rejected: t('rejected'),
      register_user: t('register_user'),
      description: t('description'),
      rules: t('rules'),
      situation: t('situation'),
      language: t('language'),
      administrator: t('administrator'),
      no_data: t('no_data'),
      transactions: t('transactions'),
      user_limit: t('user_limit'),
      username: t('username'),
      accept: t('accept'),
      reject: t('reject'),
      yes: t('yes'),
      no: t('no'),
      message: {
        you_sure: t('message.you_sure'),
        invalid_fields_login: t('message.invalid_fields_login'),
        success_user_signed_out: t('message.success_user_signed_out'),
        success: t('message.success'),
        error: t('message.error'),
        passwords_do_not_match: t('message.passwords_do_not_match'),
        invalid_password_size: t('message.invalid_password_size'),
      },
      days: {
        sunday: t('days.sunday'),
        monday: t('days.monday'),
        tuesday: t('days.wednesday'),
        wednesday: t('days.wednesday'),
        thursday: t('days.thursday'),
        friday: t('days.friday'),
        saturday: t('days.saturday'),
      },
      months: {
        january: t('months.january'),
        february: t('months.february'),
        march: t('months.march'),
        april: t('months.april'),
        may: t('months.may'),
        june: t('months.june'),
        july: t('months.july'),
        august: t('months.august'),
        september: t('months.september'),
        october: t('months.october'),
        november: t('months.november'),
        december: t('months.december'),
      },
      translateRequired: (name: string) => {
        return t('required', { name });
      },
      translateInvalid: (name: string) => {
        return t('invalid', { name });
      },
      themes: t('themes'),
      to_view: t('to_view'),
      to_edit: t('to_edit'),
      to_save: t('to_save'),
      to_register: t('to_register'),
      close: t('close'),
      subgroups: t('subgroups'),
      to_remove: t('to_remove'),
      actions: t('actions'),
      email: t('email'),
      list: t('list'),
      company_name: t('company_name'),
      search: t('search'),
      log_in: t('log_in'),
      forgot_password: t('forgot_password'),
      already_have_account: t('already_have_account'),
    };
  });

  const changeLanguage = (lang: any) => {
    locale.value = lang;
    LocalStorage.set('pi:lang', lang);
  };

  const getLocale = () => {
    return locale.value;
  };

  return { translate, changeLanguage, getLocale };
}

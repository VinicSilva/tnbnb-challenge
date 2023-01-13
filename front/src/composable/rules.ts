import { computed } from 'vue';
import { useTranslate } from './translate';
import { isEmail } from 'src/utils';

export function useRules() {
  const { translate } = useTranslate();
  const { translateRequired, translateInvalid } = translate.value;

  const _DEFAULT = (name: string) => [
    (val: string) => !!val || translateRequired(name),
  ];

  const rules = computed(() => {
    return {
      email: [
        ..._DEFAULT(translate.value.email),
        (val: string) =>
          isEmail(val) || translateInvalid(translate.value.email),
      ],
      name: _DEFAULT(translate.value.name),
      username: _DEFAULT(translate.value.username),
      password: _DEFAULT(translate.value.password),
      language: _DEFAULT(translate.value.language),
      subdomain: _DEFAULT(translate.value.subdomain),
      situation: _DEFAULT(translate.value.situation),
      bi: _DEFAULT('Autenticação Power BI'),
      buttons: _DEFAULT('Botões'),
      rules: _DEFAULT(translate.value.rules),
      user: _DEFAULT(translate.value.user),
      client_id: _DEFAULT('Client ID'),
      client_secret: _DEFAULT('Client Secret'),
      directory_secret: _DEFAULT('Diretório ID'),
      card_login: _DEFAULT('Cor do Card'),
      auth_level: _DEFAULT('Nível de autenticação'),
      value: _DEFAULT(translate.value.value),
      table: _DEFAULT(translate.value.table),
      column: _DEFAULT(translate.value.column),
      sidebar: _DEFAULT('Sidebar'),
      sidebar_icon: _DEFAULT('Sidebar icone'),
      sidebar_text: _DEFAULT('Sidebar texto'),
      background: _DEFAULT('Plano de fundo'),
      description: _DEFAULT(translate.value.description),
      purchase_date: _DEFAULT(translate.value.purchase_date),
      user_limit: _DEFAULT(translate.value.user_limit),
      company_name: _DEFAULT(translate.value.company_name),
    };
  });

  return {
    ...rules.value,
  };
}

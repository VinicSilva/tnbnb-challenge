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
      birth_date: _DEFAULT(translate.value.birth_date),
      cpf: _DEFAULT(translate.value.cpf),
      buttons: _DEFAULT('Botões'),
      rules: _DEFAULT(translate.value.rules),
      user: _DEFAULT(translate.value.user),
      value: _DEFAULT(translate.value.value),
      table: _DEFAULT(translate.value.table),
      column: _DEFAULT(translate.value.column),
    };
  });

  return {
    ...rules.value,
  };
}

import { useAuth } from 'src/composable/auth';
import { computed } from 'vue';

export function useUser() {
  const type = computed(() => {
    const { getUserLogged } = useAuth();
    const user = getUserLogged.value;
    return user.type;
  });

  return { type };
}

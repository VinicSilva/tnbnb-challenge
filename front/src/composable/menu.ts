import { useAuth } from 'src/composable/auth';
import { computed } from 'vue';
import { useUser } from './user';
import { useMenuByUser, useListAllMenu, isActiveMenu } from './all_menus';

export function useMenu() {
  const { getListHiddenMenu, getUserLogged } = useAuth();
  const { type } = useUser();
  const { down } = useListAllMenu();
  const listmenu: any = useMenuByUser();

  const menu = computed(() => {
    return {
      up: configMenu(type.value).map((item: any) => {
        return { ...item, active: isActiveMenu(item.routename) };
      }),
      down: down.value,
    };
  });

  const listRoutesAllowed = computed(() => {
    return menu.value.up.map((item: any) => item.routename);
  });

  const menuType = computed(() => {
    const profileUser: string = getUserLogged.value.type;
    const hiddenMenu: string[] = getListHiddenMenu.value;

    if (hiddenMenu?.length) {
      listmenu[profileUser] = listmenu[profileUser].filter((item: any) => {
        return !hiddenMenu.includes(item.routename);
      });
    }

    return listmenu;
  });

  const configMenu = (type: string) => {
    const { admin, customer } = menuType.value;
    switch (type) {
      case 'customer':
        return customer;
      case 'admin':
        return admin;
      default:
        return [];
    }
  };

  return {
    menu,
    listRoutesAllowed,
  };
}

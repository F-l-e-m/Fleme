import { h } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink } from "vue-router";
import {
  AlbumsOutline as Notes,
  BookmarksOutline as Bookmarks,
  HomeOutline as HomeIcon,
  SettingsOutline as Settings,
} from "@vicons/ionicons5";
import { renderIcon } from "@/utils/icons";

const useMenuOptions = () => {
  const { t } = useI18n();

  return [
    {
      label: () =>
        h(
          RouterLink,
          { to: "/main" },
          { default: () => t("common.menu.home") }
        ),
      key: "main",
      icon: renderIcon(HomeIcon),
    },
    {
      key: "notes",
      label: () =>
        h(
          RouterLink,
          { to: "/notes" },
          { default: () => t("common.menu.notes") }
        ),
      icon: renderIcon(Notes),
    },
    {
      key: "bookmarks",
      label: () =>
        h(
          RouterLink,
          { to: "/bookmarks" },
          { default: () => t("common.menu.bookmarks") }
        ),
      icon: renderIcon(Bookmarks),
    },
    {
      key: "settings",
      label: () =>
        h(
          RouterLink,
          { to: "/settings" },
          { default: () => t("common.menu.settings") }
        ),
      icon: renderIcon(Settings),
    },
  ];
};

export default useMenuOptions;

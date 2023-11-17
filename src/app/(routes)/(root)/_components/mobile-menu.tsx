import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Menu } from "lucide-react";

export function MobileMenu() {
  return (
    <Menubar className="md:hidden block border-none" >
      <MenubarMenu>
        <MenubarTrigger>
          <Menu />
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Menu</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>About</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Content</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}

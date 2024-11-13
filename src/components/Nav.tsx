import type { JSXElement } from 'solid-js';
import { useLocation, A } from '@solidjs/router';
import { Home, Receipt, Users, SquarePlus, CircleUser } from 'lucide-solid';


export function Nav(props: { children: JSXElement }) {
  return (
    <div class="h-full flex flex-col">
      <TopDesktopNav />
      <TopMobileNav />
      <div class="flex-grow overscroll-contain">
        {props.children}
      </div>
      <BottomTabNav />
    </div>
  );
}

function TopDesktopNav() {
  return (
    <div class="hidden sm:block">
    </div>
  );
}

function TopMobileNav() {
  return (
    <div class="block sm:hidden">
    </div>
  );
}

function BottomTabNav() {
  const location = useLocation();
  const active = (path: string) =>
    path == location.pathname ? "text-cyan-50" : "text-cyan-200 hover:text-cyan-100";
  return (
    <div class="sm:hidden grid grid-cols-5 px-2 pt-4 pb-4 gap-1 bg-cyan-600">
      <A href="/" class={"flex flex-col items-center gap-1 " + active("/")}>
        <Home />
        <span class="text-xs font-medium">
          Home
        </span>
      </A>
      <A href="/receipts" class={"flex flex-col items-center gap-1 "+active("/receipts")}>
        <Receipt />
        <span class="text-xs font-medium">
          Receipts
        </span>
      </A>
      <A href="/receipts/create" class={"flex flex-col items-center gap-1 "+active("/receipts/create")}>
        <SquarePlus />
        <span class="text-xs font-medium">
          Create
        </span>
      </A>
      <A href="/friends" class={"flex flex-col items-center gap-1 "+active("/friends")}>
        <Users />
        <span class="text-xs font-medium">
          Friends
        </span>
      </A>
      <A href="/account" class={"flex flex-col items-center gap-1 "+active("/account")}>
        <CircleUser />
        <span class="text-xs font-medium">
          Account
        </span>
      </A>
    </div>
  );
}


import Image from "next/image";

import { useRouter } from "next/router";
import { BiLogOut } from "react-icons/bi";

type Screen = "mobile" | "tablet" | "desktop";

interface LogoType {
  type: "logo";
  size: Exclude<Screen, "desktop">;
}

interface LogoutType {
  type: "logout";
  size: Exclude<Screen, "desktop">;
}

interface NavType {
  type: "nav";
  size: Screen;
}

type NavBarElements = LogoType | NavType | LogoutType;

// Added redundant nav property just so I can apply a larger gap
// at desktop size.
const screens = {
  mobile: {
    logo: { width: 25, height: 20 },
    nav: { width: 16, height: 16 },
    logout: { width: 24, height: 24 },
  },
  tablet: {
    logo: { width: 32, height: 25 },
    nav: { width: 20, height: 20 },
    logout: { width: 40, height: 40 },
  },
  desktop: {
    avatar: { width: 40, height: 40 },
    nav: { width: 20, height: 20 },
  },
};

const Nav = () => {
  const router = useRouter();
  const currentPath = router.pathname;

  async function handleLogout() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}api/auth/logout`
      );
      await response.json();
      router.push("/account/login");
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.error(e.message);
      }
    }
  }
  return (
    <div className="md:px-6  xl:p-0 xl:py-8 xl:pl-8 ">
      <div className="bg-semiDarkBlue flex items-center h-14 px-4 md:h-16 md:rounded-lg xl:flex-col xl:w-24 xl:h-[720px] xl:px-0 xl:py-8 xl:rounded-2xl">
        {/* Logo */}
        {/* Flex to get rid of the extra space for the image on the bottom */}
        <div className=" flex md:hidden items-center ">
          {NavLayout({ type: "logo", size: "mobile" })}
        </div>
        <div className="hidden md:flex items-center">
          {NavLayout({ type: "logo", size: "tablet" })}
        </div>

        {/* Nav  */}
        <div className="flex-1">
          <div className="md:hidden">
            {NavLayout({ type: "nav", size: "mobile" })}
          </div>
          <div className="hidden md:block xl:hidden">
            {NavLayout({ type: "nav", size: "tablet" })}
          </div>
          <div className="hidden xl:block xl:h-full">
            {NavLayout({ type: "nav", size: "desktop" })}
          </div>
        </div>
        {/* Logout */}
        <div className="md:hidden">
          <button onClick={handleLogout}>
            {NavLayout({ type: "logout", size: "mobile" })}
          </button>
        </div>
        <div className="hidden md:block xl:hidden">
          <button aria-label="logout" onClick={handleLogout}>
            {NavLayout({ type: "logout", size: "tablet" })}
          </button>
        </div>
      </div>
    </div>
  );
};

function NavLayout(navBarElement: NavBarElements): JSX.Element {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { type, size } = navBarElement;
  switch (type) {
    case "logo": {
      return (
        <Image
          src="/icons/logo.svg"
          width={screens[size][type].width}
          height={screens[size][type].height}
          alt="logo"
        />
      );
    }
    case "nav": {
      return (
        <div
          className={`flex justify-center gap-6 md:gap-8  xl:h-full  xl:gap-10 xl:flex-col xl:justify-start xl:pt-20`}
        >
          <Image
            onClick={() => router.push("/")}
            className={`${
              currentRoute === "/"
                ? "filter-icon-white "
                : "hover:filter-icon-red "
            }hover:cursor-pointer`}
            src="/icons/icon-nav-home.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Home"
          />

          <Image
            onClick={() => router.push("/movies")}
            className={`${
              currentRoute === "/movies"
                ? "filter-icon-white "
                : "hover:filter-icon-red "
            } hover:cursor-pointer`}
            src="/icons/icon-nav-movies.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Movies"
          />
          <Image
            onClick={() => router.push("/tv_series")}
            className={`${
              currentRoute === "/tv_series"
                ? "filter-icon-white "
                : "hover:filter-icon-red "
            }  hover:cursor-pointer`}
            src="/icons/icon-nav-tv-series.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Tv series"
          />
          <Image
            onClick={() => router.push("/bookmarked")}
            className={`${
              currentRoute === "/bookmarked"
                ? "filter-icon-white "
                : "hover:filter-icon-red "
            } hover:cursor-pointer`}
            src="/icons/icon-nav-bookmark.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Bookmarked movies"
          />
        </div>
      );
    }
    case "logout": {
      return (
        <BiLogOut
          className="text-white cursor-pointer hover:filter-icon-red"
          size={screens[size][type].width}
        />
      );
    }
  }
}

export default Nav;

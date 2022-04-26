import Image from "next/image";
type Screen = "mobile" | "tablet" | "desktop";

interface LogoType {
  type: "logo";
  size: Exclude<Screen, "desktop">;
}

interface NavType {
  type: "nav";
  size: Screen;
}

interface AvatarType {
  type: "avatar";
  size: Screen;
}

type NavBarElements = LogoType | AvatarType | NavType;

// Added redundant nav property just so I can apply a larger gap
// at desktop size.
const screens = {
  mobile: {
    logo: { width: 25, height: 20 },
    nav: { width: 16, height: 16 },
    avatar: { width: 24, height: 24 },
  },
  tablet: {
    logo: { width: 32, height: 25 },
    nav: { width: 20, height: 20 },
    avatar: { width: 40, height: 40 },
  },
  desktop: {
    avatar: { width: 40, height: 40 },
    nav: { width: 20, height: 20 },
  },
};

const Nav = () => {
  return (
    <div className="md:px-6  xl:p-0 xl:py-8 xl:pl-8 ">
      <div className="bg-semiDarkBlue flex items-center h-14  px-4 md:h-16 md:rounded-lg xl:flex-col xl:w-24 xl:h-full xl:px-0 xl:py-8 xl:rounded-2xl">
        {/* Logo */}
        {/* Flex to get rid of the extra space for the image on the bottom */}
        <div className=" flex md:hidden items-center ">
          {NavLayout({ type: "logo", size: "mobile" })}
        </div>
        <div className="hidden md:flex items-center">
          {NavLayout({ type: "logo", size: "tablet" })}
        </div>

        {/* Nav  */}
        <div className="flex-1  border-2 border-white">
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
        {/* Avatar */}
        <div className="md:hidden">
          {NavLayout({ type: "avatar", size: "mobile" })}
        </div>
        <div className="hidden md:block xl:hidden">
          {NavLayout({ type: "avatar", size: "tablet" })}
        </div>
        <div className="hidden xl:block">
          {NavLayout({ type: "avatar", size: "desktop" })}
        </div>
      </div>
    </div>
  );
};

function NavLayout(navBarElement: NavBarElements): JSX.Element {
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
          className={`flex justify-center gap-6 md:gap-8  xl:h-full xl:gap-10 xl:flex-col`}
        >
          <Image
            src="/icons/icon-nav-home.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Home"
          />
          <Image
            src="/icons/icon-nav-movies.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Movies"
          />
          <Image
            src="/icons/icon-nav-tv-series.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Tv series"
          />
          <Image
            src="/icons/icon-nav-bookmark.svg"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="Bookmarked movies"
          />
        </div>
      );
    }
    case "avatar": {
      return (
        <div className="flex items-center">
          <Image
            src="/icons/image-avatar.png"
            width={screens[size][type].width}
            height={screens[size][type].height}
            alt="image avatar"
          />
        </div>
      );
    }
  }
}

export default Nav;

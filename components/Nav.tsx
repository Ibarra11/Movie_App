import Image from "next/image";
interface Props {
  screen: "mobile" | "tablet";
}

const screens = {
  mobile: {
    logo: { width: 25, height: 20 },
    nav: { width: 16, height: 16 },
    avatar: { width: 24, height: 24 },
  },
  tablet: {
    logo: { width: 32, height: 25 },
    nav: { width: 20, height: 20 },
    avatar: { width: 32, height: 32 },
  },
};
const Nav = () => {
  return (
    <div className="bg-semiDarkBlue flex items-center h-14 px-4 border-2 border-red  md:h-16  md:px-6 md:rounded-lg xl:flex-col  xl:w-24 xl:h-full xl:p-0 xl:py-8 ">
      <div>
        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <Image
            src="/icons/logo.svg"
            width={screens.mobile.logo.width}
            height={screens.mobile.logo.width}
            alt="logo"
          />
        </div>
        {/* Tablet Logo */}
        <div className="hidden md:flex items-center">
          <Image
            src="/icons/logo.svg"
            width={screens.tablet.logo.width}
            height={screens.tablet.logo.width}
            alt="logo"
          />
        </div>
      </div>
      <div className="flex-1">
        {/* Mobile Nav */}
        <div className="flex justify-center gap-6  md:hidden">
          <Image
            src="/icons/icon-nav-home.svg"
            width={screens.mobile.nav.width}
            height={screens.mobile.nav.height}
            alt="Home"
          />
          <Image
            src="/icons/icon-nav-movies.svg"
            width={screens.mobile.nav.width}
            height={screens.mobile.nav.height}
            alt="Movies"
          />
          <Image
            src="/icons/icon-nav-tv-series.svg"
            width={screens.mobile.nav.width}
            height={screens.mobile.nav.height}
            alt="Tv series"
          />
          <Image
            src="/icons/icon-nav-bookmark.svg"
            width={screens.mobile.nav.width}
            height={screens.mobile.nav.height}
            alt="Bookmarked movies"
          />
        </div>
        {/* Tablet Nav */}
        <div className="hidden md:flex justify-center gap-8 xl:flex-col xl:h-full">
          <Image
            src="/icons/icon-nav-home.svg"
            width={screens.tablet.nav.width}
            height={screens.tablet.nav.height}
            alt="Home"
          />
          <Image
            src="/icons/icon-nav-movies.svg"
            width={screens.tablet.nav.width}
            height={screens.tablet.nav.height}
            alt="Movies"
          />
          <Image
            src="/icons/icon-nav-tv-series.svg"
            width={screens.tablet.nav.width}
            height={screens.tablet.nav.height}
            alt="Tv series"
          />
          <Image
            src="/icons/icon-nav-bookmark.svg"
            width={screens.tablet.nav.width}
            height={screens.tablet.nav.height}
            alt="Bookmarked movies"
          />
        </div>
      </div>
      <div>
        {/* Mobile Avatar */}
        <div className="flex items-center md:hidden ">
          <Image
            src="/icons/image-avatar.png"
            width={screens.mobile.avatar.width}
            height={screens.mobile.avatar.height}
            alt="image avatar"
          />
        </div>
        {/* Tablet Avatar */}
        <div className="hidden md:flex items-center">
          <Image
            src="/icons/image-avatar.png"
            width={screens.tablet.avatar.width}
            height={screens.tablet.avatar.height}
            alt="image avatar"
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;

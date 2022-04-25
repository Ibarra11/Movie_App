import Image from "next/image";
const Nav = () => {
  return (
    <div className="bg-semiDarkBlue flex items-center h-14 px-4">
      <div className=" flex items-center ">
        <Image src="/icons/logo.svg" width={25} height={20} alt="logo" />
      </div>
      <div className="flex gap-6 flex-1  justify-center">
        <Image
          src="/icons/icon-nav-home.svg"
          width={16}
          height={16}
          alt="Home"
        />
        <Image
          src="/icons/icon-nav-movies.svg"
          width={16}
          height={16}
          alt="Movies"
        />
        <Image
          src="/icons/icon-nav-tv-series.svg"
          width={16}
          height={16}
          alt="Tv series"
        />
        <Image
          src="/icons/icon-nav-bookmark.svg"
          width={16}
          height={16}
          alt="Bookmarked movies"
        />
      </div>
      <div className="flex items-center">
        <Image
          src="/icons/image-avatar.png"
          width={24}
          height={24}
          alt="image avatar"
        />
      </div>
    </div>
  );
};

import Image from "next/image";
const Input = () => {
  return (
    <form className="relative flex items-center w-full cursor-pointer isolate overflow-hidden">
      <div className="flex absolute">
        <Image
          src="/icons/icon-search.svg"
          width={24}
          height={24}
          alt="search icon"
        />
      </div>

      <div className="relative w-full z-10 ">
        <input
          className="peer appearance-none cursor-pointer bg-transparent  w-full pl-10 py-1 pr-1 border-none text-base text-white caret-red font-light focus:outline-none"
          placeholder="Search for movies or Tv series"
          type="text"
        />
        <div className="absolute invisible peer-focus:visible bottom-0 h-px w-[calc(100%_-_theme(spacing.10))] bg-greyishBlue translate-x-10"></div>
      </div>
    </form>
  );
};

export default Input;

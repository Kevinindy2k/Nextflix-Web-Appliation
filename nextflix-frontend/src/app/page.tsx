"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useHomePageData } from "@/hooks/use-movies";
import { Loading, SkeletonCard, SkeletonHero } from "@/components/ui/loading";
import { ErrorState, NetworkError } from "@/components/ui/error";
import { EmptyState } from "@/components/ui/empty";
import { MovieCard } from "@/components/ui/movie-card";
import { Movie } from "@/types/movie";

function ShowLogo() {
  return (
    <div
      className="relative w-full h-full"
      data-name="Show Logo"
      data-node-id="2303:266"
    >
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat text-white flex items-center justify-start text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider"
        data-name="Show Logo"
        data-node-id="2303:267"
        style={{
          fontFamily: "serif",
          textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
          color: "#fff",
        }}
      >
        DEVIL IN OHIO
      </div>
    </div>
  );
}

function NSeriesOriginals() {
  return (
    <div
      className="relative w-full h-full flex items-center"
      data-name="N Series Originals"
      data-node-id="2303:268"
    >
      <div className="w-3 md:w-4 h-6 md:h-8 bg-red-600 flex items-center justify-center text-white font-bold text-sm md:text-lg mr-2 md:mr-3">
        N
      </div>
      <div className="font-medium text-[#b9bbb9] text-sm md:text-lg tracking-[8px] md:tracking-[14px] uppercase">
        SERIES
      </div>
    </div>
  );
}

interface HeroSectionProps {
  movie: Movie;
}

function HeroSection({ movie }: HeroSectionProps) {
  const router = useRouter();
  return (
    <main className="relative z-40 px-4 sm:px-6 md:px-12 pt-20 sm:pt-28 md:pt-32 pb-12 md:pb-24">
      {/* Show Info */}
      <div className="max-w-xs sm:max-w-lg md:max-w-2xl">
        {/* N Series Original */}
        <div className="mb-4 md:mb-6 h-12 md:h-16 w-48 md:w-64">
          <NSeriesOriginals />
        </div>

        {/* Show Title */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider text-white">
            {movie.title.toUpperCase()}
          </h1>
        </div>

        {/* Top 10 badge and ranking */}
        <div className="flex items-center mb-4 md:mb-6">
          <div className="w-6 h-6 md:w-8 md:h-8 bg-red-600 rounded text-white flex items-center justify-center text-xs font-bold mr-2 md:mr-3">
            <span className="text-xs">TOP</span>
          </div>
          <span className="text-white font-semibold text-sm md:text-lg">
            #1 in Movies Today
          </span>
        </div>

        {/* Description */}
        <p className="text-white text-sm sm:text-base md:text-lg mb-6 md:mb-8 leading-relaxed line-clamp-3">
          {movie.overview}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded flex items-center justify-center space-x-2 font-semibold hover:bg-gray-200 transition-colors">
            <span className="text-lg md:text-xl">▶</span>
            <span className="text-sm md:text-base">Play</span>
          </button>
          <button
            onClick={() => router.push(`/movie/${movie.id}`)}
            className="bg-gray-600/70 text-white px-6 md:px-8 py-3 md:py-4 rounded flex items-center justify-center space-x-2 font-semibold hover:bg-gray-600 transition-colors"
          >
            <span className="w-5 h-5 md:w-6 md:h-6 border-2 border-white rounded-full flex items-center justify-center text-xs md:text-sm">
              i
            </span>
            <span className="text-sm md:text-base">More Info</span>
          </button>
        </div>
      </div>
    </main>
  );
}

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
}

function MovieSection({ title, movies, isLoading }: MovieSectionProps) {
  const router = useRouter();
  if (isLoading) {
    return (
      <section className="relative z-40 px-4 sm:px-6 md:px-12 pb-12 md:pb-24">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">
          {title}
        </h2>
        <div className="flex space-x-2 md:space-x-3 overflow-x-auto pb-4">
          {Array.from({ length: 7 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </section>
    );
  }

  if (!movies.length) {
    return (
      <section className="relative z-40 px-4 sm:px-6 md:px-12 pb-12 md:pb-24">
        <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">
          {title}
        </h2>
        <EmptyState type="movies" />
      </section>
    );
  }

  return (
    <section className="relative z-40 px-4 sm:px-6 md:px-12 pb-12 md:pb-24">
      <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-white">
        {title}
      </h2>

      <div className="flex space-x-3 md:space-x-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-white/30">
        {movies.slice(0, 6).map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            size="md"
            onClick={(movie) => {
              router.push(`/movie/${movie.id}`);
            }}
          />
        ))}
      </div>
    </section>
  );
}

export default function Netflix() {
  const router = useRouter();
  const { data: homePageData, isLoading, error, refetch } = useHomePageData();

  if (isLoading) {
    return (
      <div className="bg-black min-h-screen text-white relative overflow-x-hidden">
        {/* Navigation Bar */}
        <nav className="relative z-50 w-full">
          <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

          <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
            <div className="text-red-600 text-2xl md:text-3xl font-bold">
              NETFLIX
            </div>

            <div className="hidden lg:flex items-center space-x-7 text-sm">
              <a href="#" className="text-white font-semibold">
                Home
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                TV Shows
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Movies
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                New & Popular
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                My List
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                Browse by Languages
              </a>
            </div>

            <div className="lg:hidden">
              <button className="text-white text-lg">☰</button>
            </div>

            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <button
                onClick={() => router.push("/search")}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <span className="text-white text-sm">Kids</span>
              <button className="text-white hover:text-gray-300 transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="w-8 h-8 bg-gray-400 rounded"></div>
              <button className="text-white text-sm">▼</button>
            </div>

            <div className="flex lg:hidden items-center space-x-3">
              <button
                onClick={() => router.push("/search")}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <div className="w-6 h-6 bg-gray-400 rounded"></div>
            </div>
          </div>
        </nav>

        <SkeletonHero />

        <MovieSection title="Popular on Netflix" movies={[]} isLoading={true} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-black min-h-screen text-white relative overflow-x-hidden">
        <NetworkError onRetry={() => refetch()} />
      </div>
    );
  }

  if (!homePageData) {
    return (
      <div className="bg-black min-h-screen text-white relative overflow-x-hidden">
        <EmptyState type="generic" title="No Content Available" />
      </div>
    );
  }

  const { hero, popular, trending, topRated, nowPlaying } = homePageData;

  return (
    <div
      className="bg-black min-h-screen text-white relative overflow-x-hidden"
      data-name="Desktop"
      data-node-id="2303:114"
    >
      {/* Main Show Background */}
      <div className="absolute inset-0 w-full h-screen">
        {hero.backdrop_path ? (
          <Image
            src={hero.backdrop_path}
            alt={hero.title}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gray-900" />
        )}
      </div>

      {/* Left gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent w-3/4" />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-black to-transparent" />

      {/* Navigation Bar */}
      <nav className="relative z-50 w-full">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/70 to-transparent" />

        <div className="relative flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
          {/* Logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="139"
            height="39"
            viewBox="0 0 139 39"
            fill="none"
          >
            <g clipPath="url(#clip0_2303_148)">
              <path
                d="M19.1129 35.7153C17.0219 36.0885 14.8942 36.2004 12.6931 36.4983L5.97958 16.5157V37.356C3.88861 37.5796 1.98102 37.8778 0 38.1761V0H5.57629L13.2066 21.6608V0H19.1129V35.7153ZM30.6688 13.9805C32.9434 13.9805 36.4285 13.8686 38.5194 13.8686V19.8335C35.9147 19.8335 32.87 19.8335 30.6688 19.9454V28.8185C34.1173 28.5949 37.5657 28.2963 41.0506 28.1845V33.9255L24.799 35.2306V0H41.0506V5.96502H30.6688V13.9805ZM62.8782 5.96516H56.7886V33.4042C54.8075 33.4042 52.8265 33.4042 50.9192 33.4785V5.96516H44.8295V0H62.8785L62.8782 5.96516ZM72.4163 13.5705H80.4505V19.5354H72.4163V33.0687H66.6563V0H83.0551V5.96502H72.4163V13.5705ZM92.5931 27.8491C95.9316 27.9235 99.3064 28.1849 102.572 28.371V34.2615C97.3257 33.9257 92.0796 33.5907 86.7236 33.4785V0H92.5931V27.8491ZM107.524 34.6716C109.395 34.7836 111.376 34.8955 113.284 35.1189V0H107.524V34.6716ZM139 0L131.553 18.1561L139 38.1761C136.799 37.8778 134.598 37.4677 132.396 37.0948L128.178 26.0598L123.886 36.2004C121.758 35.8272 119.704 35.7153 117.576 35.4171L125.133 17.9322L118.31 0H124.619L128.471 10.0287L132.58 0H139V0Z"
                fill="#E50914"
              />
            </g>
            <defs>
              <clipPath id="clip0_2303_148">
                <rect width="139" height="38.1761" fill="white" />
              </clipPath>
            </defs>
          </svg>

          {/* Menu - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:flex items-center space-x-7 text-sm">
            <a href="#" className="text-white font-semibold">
              Home
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              TV Shows
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Movies
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              New & Popular
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              My List
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Browse by Languages
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button className="text-white text-lg">☰</button>
          </div>

          {/* Right side */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <button
              onClick={() => router.push("/search")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <span className="text-white text-sm">Kids</span>
            <button className="text-white hover:text-gray-300 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="w-8 h-8 bg-gray-400 rounded"></div>
            <button className="text-white text-sm">▼</button>
          </div>

          {/* Mobile right side - simplified */}
          <div className="flex lg:hidden items-center space-x-3">
            <button
              onClick={() => router.push("/search")}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <div className="w-6 h-6 bg-gray-400 rounded"></div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection movie={hero} />

      {/* Movie Sections */}
      <MovieSection title="Popular on Netflix" movies={popular} />
    </div>
  );
}

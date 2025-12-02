/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

// Swiper modules
import "swiper/swiper.css";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function ImageSlider({ images }: {images: string[]}) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="w-full">
      {/* MAIN SLIDER */}
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-[300px] rounded-xl overflow-hidden"
      >
        {images.map((url: string, i: number) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt="Image"
              className="w-full h-full object-cover rounded-xl"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* THUMBNAIL SLIDER */}
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-20 mt-4"
      >
        {images.map((url: any, i: number) => (
          <SwiperSlide key={i} className="w-1/4!">
            <img
              src={url}
              alt="Image"
              className="w-full h-full object-cover rounded-md opacity-40 hover:opacity-100 transition duration-300 cursor-pointer"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

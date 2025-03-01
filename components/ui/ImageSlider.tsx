"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import Image from "next/image";

function ImageSlider({ images }: { images: string[] }) {
  return (
    <Swiper
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="w-full  rounded-lg overflow-hidden"
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <div className="relative w-full h-96 md:h-[80vh]">
            <Image
              src={img}
              alt="Disaster Image"
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default ImageSlider;

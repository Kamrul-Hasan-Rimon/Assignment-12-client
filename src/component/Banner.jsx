import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="w-full h-[660px] bg-gradient-to-r from-[#1a1a1d] to-[#4e4e50] overflow-hidden shadow-2xl">
      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        loop
        className="w-full h-full"
      >
        {/* Slide 1 - Fitness Motivation */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fitness Motivation"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-transparent bg-clip-text">
                Transform Your Body
              </h1>
              <p className="mt-4 text-lg font-medium">
                Start your fitness journey today and achieve your goals with our expert trainers.
              </p>
              <Link
                to={'/trainers'}
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#00C9FF] to-[#92FE9D] text-black font-bold shadow-[0px_4px_20px_rgba(0,201,255,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Find Trainers
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 2 - Workout Classes */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1579758629938-03607ccdbaba?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Workout Classes"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-transparent bg-clip-text">
                Join Our Classes
              </h1>
              <p className="mt-4 text-lg font-medium">
                Discover a variety of workout classes designed to challenge and inspire you.
              </p>
              <Link
                to={'/classes'}
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-black font-bold shadow-[0px_4px_20px_rgba(255,126,95,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Explore Classes
              </Link>
            </div>
          </div>
        </SwiperSlide>

        {/* Slide 3 - Community Engagement */}
        <SwiperSlide>
          <div className="relative w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1599058917212-d750089bc07e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Fitness Community"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 text-white">
              <h1 className="text-5xl font-bold bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-transparent bg-clip-text">
                Join the Community
              </h1>
              <p className="mt-4 text-lg font-medium">
                Connect with like-minded fitness enthusiasts and share your progress.
              </p>
              <Link
                to={'/forumPage'}
                className="btn mt-6 px-8 py-3 bg-gradient-to-r from-[#6A11CB] to-[#2575FC] text-white font-bold shadow-[0px_4px_20px_rgba(106,17,203,0.5)] rounded-full hover:scale-110 transition-all duration-500"
              >
                Join Now
              </Link>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
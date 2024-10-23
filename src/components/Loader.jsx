import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ setIsLoading }) => {
  const floatingImages = [
    { src: "https://i.pinimg.com/236x/3d/18/21/3d182196300ee640b486dc88b3f09bb7.jpg", alt: "Placeholder", className: "top-[7%] left-[2%] right-[2%] bottom-[2%] w-[60px] h-[60px] lg:top-[5%] lg:left-[5%] lg:right-[5%] lg:bottom-[5%] md:top-[14.5%] md:left-[2%] md:right-[2%] md:bottom-[2%] w-[60px] h-[60px] lg:w-[130px] lg:h-[150px] md:w-[110px] md:h-[120px] sm:top-[5%] sm:left-[5%] sm:right-[10%] sm:bottom-[10%] sm:w-[80px] sm:h-[80px]" },
    { src: "https://i.pinimg.com/236x/0e/42/7f/0e427fefb82a8f6326dbcce6e4468a56.jpg", alt: "Placeholder", className: "top-[7%] right-[10%] md:top-[10%] md:right-[8%] lg:top-[7%] lg:right-[10%] w-[55px] h-[60px] lg:w-[100px] lg:h-[100px] md:w-[110px] md:h-[110px] sm:top-[8%] sm:right-[2%] sm:w-[90px] sm:h-[90px]" },
    { src: "https://i.pinimg.com/236x/33/12/c4/3312c4eea018181a4de435c44bdb8f30.jpg", alt: "Placeholder", className: "bottom-[32%] left-[7%] lg:bottom-[15%] lg:left-[7%] md:bottom-[30%] md:left-[7%] w-[60px] h-[60px] lg:w-[130px] lg:h-[140px] md:w-[120px] md:h-[110px] sm:bottom-[30%] sm:left-[1%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/98/8b/0d/988b0d2faafc1156acd8ea0b28009985.jpg", alt: "Placeholder", className: "bottom-[25%] right-[10%] md:bottom-[20%] md:right-[6%] lg:bottom-[20%] lg:right-[13%] w-[60px] h-[50px] lg:w-[140px] lg:h-[130px] md:w-[140px] md:h-[110px] sm:bottom-[12%] sm:right-[5%] sm:w-[120px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/a4/e2/02/a4e202ba80d3a9a0b8db24d75c73ff40.jpg", alt: "Placeholder", className: "top-[25%] left-[24%] lg:top-[22%] lg:left-[23%] md:top-[30%] md:left-[25%] w-[60px] h-[60px] md:w-[110px] md:h-[110px] lg:w-[120px] lg:h-[130px] sm:top-[23%] sm:left-[22%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/4a/cf/77/4acf771a623bb6acacf51b832374028f.jpg", alt: "Placeholder", className: "top-[15%] right-[35%] lg:top-[14%] lg:right-[23.7%] md:top-[23%] md:right-[27%] w-[50px] h-[60px]  lg:w-[160px] lg:h-[150px] md:w-[130px] md:h-[110px] sm:top-[17%] sm:right-[27%] sm:w-[130px] sm:h-[110px]" },
    { src: "https://i.pinimg.com/236x/4d/92/aa/4d92aa15d703b6f5619953a62876e9f9.jpg", alt: "Placeholder", className: "bottom-[6%] right-[22%] md:bottom-[5%] md:right-[25%] lg:bottom-[10%] lg:right-[30%] w-[60px] h-[45px] lg:w-[120px] lg:h-[120px] md:w-[120px] md:h-[100px] block md:block lg:block sm:bottom-[2%] sm:right-[27%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/10/f3/c0/10f3c0375d6afc939af6f854b333bba1.jpg", alt: "Placeholder", className: "top-[41%] right-[3%] md:top-[39%] md:right-[4%] lg:top-[41%] lg:right-[3%] w-[55px] h-[60px] lg:w-[120px] lg:h-[120px] md:w-[110px] md:h-[140px] block md:block lg:block sm:top-[38%] sm:right-[1%] sm:w-[110px] sm:h-[140px]" },
    { src: "https://i.pinimg.com/236x/c9/dd/59/c9dd590d03ea0cc26c8bdb94c53d92cb.jpg", alt: "Placeholder", className: "bottom-[8%] left-[16%] lg:bottom-[5%] lg:left-[25%] md:bottom-[9%] md:left-[20%] w-[60px] h-[40px] md:w-[110px] md:h-[90px] lg:w-[125px] lg:h-[140px] sm:bottom-[10%] sm:left-[16%] sm:w-[110px] sm:h-[90px]" },
    { src: "https://i.pinimg.com/236x/db/92/3a/db923ae921d9807793f5abac42320647.jpg", alt: "Placeholder", className: "bottom-[20%] left-[35%] md:bottom-[25%] md:left-[40%] lg:bottom-[20%] lg:left-[45%] w-[60px] h-[40px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[110px]  md:block lg:block sm:bottom-[20%] sm:left-[40%] sm:w-[100px] sm:h-[100px]" },
    { src: "https://i.pinimg.com/236x/3d/63/90/3d639037ba61d2f2548226940b360db5.jpg", alt: "Placeholder", className: "top-[45%] left-[50%] lg:top-[11%] lg:left-[42%] md:top-[6%] md:left-[37%] w-[40px] h-[40px] lg:w-[120px] lg:h-[110px] md:w-[100px] md:h-[110px] hidden md:block lg:block sm:top-[6%] sm:left-[37%] sm:w-[100px] sm:h-[110px]" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#ECE8E2]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full">
        {floatingImages.map((img, index) => (
          <motion.img
            key={index}
            src={img.src}
            alt={img.alt}
            className={`absolute object-cover rounded-sm ${img.className}`}
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
          />
        ))}
        <motion.div
          className="absolute inset-0 bg-[#ECE8E2]"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, delay: 4 }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-[kalnia] text-black mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Loading Inspiration
            </motion.h2>
            <motion.div
              className="w-64 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 3.5, ease: "easeInOut" }}
            >
              <motion.div
                className="h-full bg-black"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.5, ease: "easeInOut" }}
                onAnimationComplete={() => {
                  setTimeout(() => setIsLoading(false), 500);
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;

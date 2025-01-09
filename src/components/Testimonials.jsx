import { StarIcon } from '@heroicons/react/24/solid';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect } from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Customer',
    image: '/img/testimonial/01.jpg',
    content: 'I had an amazing experience renting from Remons. The service was exceptional, and the car was in perfect condition. Will definitely use their services again!',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Brown',
    role: 'Business Traveler',
    image: '/img/testimonial/02.jpg',
    content: 'Professional service from start to finish. The car was clean, well-maintained, and exactly what I needed for my business trip.',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Davis',
    role: 'Tourist',
    image: '/img/testimonial/03.jpg',
    content: 'Excellent customer service! The team was very helpful in choosing the right car for our family vacation. Highly recommended!',
    rating: 5
  }
];

const Testimonials = () => {
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'shining-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      return particle;
    };

    const particlesContainer = document.getElementById('particles-container');
    if (particlesContainer) {
      // Nettoyage des particules existantes
      particlesContainer.innerHTML = '';
      
      // Création de nouvelles particules
      for (let i = 0; i < 30; i++) {
        particlesContainer.appendChild(createParticle());
      }
    }

    return () => {
      if (particlesContainer) {
        particlesContainer.innerHTML = '';
      }
    };
  }, []);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background avec gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900" />
      
      {/* Container pour les particules */}
      <div id="particles-container" className="absolute inset-0 overflow-hidden" />

      <style>{`
        #particles-container {
          z-index: 1;
        }
        
        .shining-particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
          animation: shine 3s infinite;
          opacity: 0;
        }

        @keyframes shine {
          0% {
            transform: scale(1);
            opacity: 0;
          }
          50% {
            transform: scale(2);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }
      `}</style>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16" data-aos="fade-up" data-aos-duration="1000">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center">
              <ChatBubbleBottomCenterTextIcon className="w-8 h-8 text-[#FF4D30]" />
            </div>
          </div>
          <h3 className="text-[#FF4D30] text-lg font-semibold mb-4">TESTIMONIALS</h3>
          <h2 className="text-white text-4xl font-bold">What They're Talking<br />About Remons</h2>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-3xl mx-auto h-[500px]" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
          <Swiper
            direction="vertical"
            slidesPerView={1}
            spaceBetween={30}
            mousewheel={true}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet !bg-white/30 !w-3 !h-3',
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-[#FF4D30]'
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            modules={[Pagination, Autoplay, Mousewheel]}
            className="h-full"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 h-full flex flex-col">
                  {/* Quote Icon */}
                  <div className="absolute top-4 right-6">
                    <svg className="w-8 h-8 text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                    </svg>
                  </div>

                  {/* Rating */}
                  <div className="flex mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-gray-600 mb-8 text-lg leading-relaxed flex-grow">
                    "{testimonial.content}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center mt-auto">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="text-[#14162E] font-bold">{testimonial.name}</h4>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;

import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Play, Sparkles, Heart } from 'lucide-react';
import { HERO_FOOD_IMAGE, PROMO_FOOD_IMAGE } from '../data/products';

export const SocialSection: React.FC = () => {
  const socialPosts = [
    {
      id: 'soc-01',
      image: HERO_FOOD_IMAGE,
      type: 'instagram',
      caption: 'Sambal Matah racikan Koh Timo yang selalu bikin nagih! 🔥 #KohTimo #RicebowlJuara',
      likes: '1.4k',
    },
    {
      id: 'soc-02',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
      type: 'tiktok',
      caption: 'POV: Telur onsen meleleh di atas daging sapi yakiniku hangat 🤤 #FoodTok',
      likes: '8.2k',
    },
    {
      id: 'soc-03',
      image: PROMO_FOOD_IMAGE,
      type: 'instagram',
      caption: 'Makan siang bareng bestie selalu pesan promo Buy 2 Get 1! 🍚✨',
      likes: '2.1k',
    },
    {
      id: 'soc-04',
      image: 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=600&q=80',
      type: 'tiktok',
      caption: 'Kriuknya kulit ayam Koh Timo gak ada tandingan! 🔊 Sound ON!',
      likes: '14.5k',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E85D04]/10 text-[#E85D04] text-xs font-black uppercase tracking-wider mb-3">
            <Instagram className="w-3.5 h-3.5" />
            @kohtimoricebowl
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black text-[#241A14] tracking-tight mb-4">
            Ikuti Keseruan Koh Timo
          </h2>
          <p className="text-base sm:text-lg text-[#57463A]">
            Pantau update menu baru, keseruan di balik dapur, dan promo dadakan di Instagram & TikTok kami!
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram @kohtimoricebowl</span>
            </a>

            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-2xl bg-[#000000] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-md hover:opacity-90 transition-opacity"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>TikTok @kohtimoricebowl</span>
            </a>
          </div>
        </div>

        {/* Social Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {socialPosts.map((post, idx) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="group relative rounded-3xl overflow-hidden aspect-square bg-[#FFF7E8] border border-[#241A14]/10 shadow-sm cursor-pointer"
            >
              <img
                src={post.image}
                alt="Koh Timo Social Post"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover overlay with likes and icon */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex justify-between items-center">
                  <span className="p-1.5 rounded-xl bg-white/20 backdrop-blur-xs">
                    {post.type === 'instagram' ? (
                      <Instagram className="w-4 h-4 text-white" />
                    ) : (
                      <Play className="w-4 h-4 fill-white text-white" />
                    )}
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>{post.likes}</span>
                  </div>
                </div>

                <p className="text-xs line-clamp-3 text-white/90 leading-snug">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

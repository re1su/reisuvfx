/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Play, Star, ChevronRight, Globe } from 'lucide-react';

const translations = {
  ru: {
    nav: {
      work: "Работы",
      reviews: "Отзывы",
      contact: "Написать мне",
    },
    hero: {
      badge: "Professional Video Editing",
      title: "Создаю видео, которые",
      titleAccent: "удерживают внимание",
      description: "Помогаю блогерам и брендам расти через динамичный монтаж и сторителлинг. Ваш контент заслуживает того, чтобы его досмотрели до конца.",
      ctaPrimary: "Начать проект",
      ctaSecondary: "Смотреть работы",
    },
    work: {
      title: "Мои работы",
      cta: "Хочу такой же монтаж",
      categories: {
        social: "Social Media",
        commercial: "Commercial",
        youtube: "Youtube video",
      },
      titles: {
        vertical: "Вертикальное видео",
        promo: "Проморолик",
        horizontal: "Горизонтальное видео",
      }
    },
    results: {
      title: "Результаты клиентов",
      subtitle: "Цифры, которые говорят сами за себя",
      views: "Просмотров",
      verticalFormat: "На вертикальном формате",
      horizontalFormat: "На горизонтальном формате",
      projects: "Выполненных проектов",
      allTime: "За все время работы",
      onTime: "Проектов сдано вовремя",
    },
    reviews: {
      title: "Что говорят клиенты",
      subtitle: "Социальное доказательство качества моей работы",
      roles: {
        youtuber: "YouTube Блогер (300k+)",
        founder: "Основатель сообщества FSCR / Блогер",
        expert: "Эксперт по автомобилям",
      }
    },
    contact: {
      title: "Если вам нужна качественная работа",
      subtitle: "напишите мне прямо сейчас, и мы обсудим проект",
      button: "Написать в Telegram",
    },
    footer: {
      rights: "Все права защищены.",
      tagline: "Минимализм и качество в каждом кадре.",
    }
  },
  en: {
    nav: {
      work: "Work",
      reviews: "Reviews",
      contact: "Contact me",
    },
    hero: {
      badge: "Professional Video Editing",
      title: "Creating videos that",
      titleAccent: "capture attention",
      description: "Helping creators and brands grow through dynamic editing and storytelling. Your content deserves to be watched until the end.",
      ctaPrimary: "Start a project",
      ctaSecondary: "View work",
    },
    work: {
      title: "My Work",
      cta: "I want this editing",
      categories: {
        social: "Social Media",
        commercial: "Commercial",
        youtube: "Youtube video",
      },
      titles: {
        vertical: "Vertical video",
        promo: "Promo video",
        horizontal: "Horizontal video",
      }
    },
    results: {
      title: "Client Results",
      subtitle: "Numbers that speak for themselves",
      views: "Views",
      verticalFormat: "On vertical format",
      horizontalFormat: "On horizontal format",
      projects: "Completed projects",
      allTime: "Total experience",
      onTime: "Projects delivered on time",
    },
    reviews: {
      title: "What clients say",
      subtitle: "Social proof of my work quality",
      roles: {
        youtuber: "YouTube Creator (300k+)",
        founder: "FSCR Community Founder / Blogger",
        expert: "Car Expert",
      }
    },
    contact: {
      title: "If you need high-quality work",
      subtitle: "write to me right now, and we will discuss the project",
      button: "Message on Telegram",
    },
    footer: {
      rights: "All rights reserved.",
      tagline: "Minimalism and quality in every frame.",
    }
  }
};

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PortfolioItem = ({ title, category, videoUrl, index, isVertical = false, thumbnail }: { title: string, category: string, videoUrl: string, index: number, isVertical?: boolean, thumbnail?: string }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isHovering, setIsHovering] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoId = getYouTubeId(videoUrl);
  
  // Use provided thumbnail, or YouTube thumbnail, or a placeholder for local videos
  const finalThumbnail = thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : `https://picsum.photos/seed/reisu${index}/800/1200`);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`group relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 card-glow transition-all duration-500 ${isVertical ? 'aspect-[9/16]' : 'aspect-video'} ${isPlaying ? 'ring-2 ring-accent/50' : ''}`}
    >
      {isPlaying ? (
        <div className="w-full h-full relative bg-black">
          {videoId ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&controls=1&disablekb=1`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              <div className="absolute top-0 left-0 w-full h-16 z-10 cursor-default" onClick={(e) => e.stopPropagation()}></div>
              <div className="absolute bottom-0 right-0 w-24 h-12 z-10 cursor-default" onClick={(e) => e.stopPropagation()}></div>
            </>
          ) : (
            <video 
              src={videoUrl} 
              className="w-full h-full object-cover" 
              controls 
              autoPlay
              playsInline
            />
          )}
        </div>
      ) : (
        <div 
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          {/* Overlay with info */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-100 z-20 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p className="text-accent text-[10px] font-bold mb-1 uppercase tracking-[0.2em]">{category}</p>
              <h3 className={`${isVertical ? 'text-lg' : 'text-2xl'} font-bold leading-tight text-white group-hover:text-accent transition-colors duration-300`}>{title}</h3>
            </div>
          </div>

          {/* Play Button Center */}
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: isHovering ? 1 : 0.8, opacity: isHovering ? 1 : 0 }}
              className="w-20 h-20 rounded-full bg-accent/90 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-accent/40"
            >
              <Play className="text-white fill-current ml-1" size={32} />
            </motion.div>
          </div>

          {/* Image Preview - Fix for mobile */}
          <img 
            src={finalThumbnail} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            referrerPolicy="no-referrer"
          />
          
          {/* Video Preview on Hover (Desktop only) */}
          {!videoId && !isVertical && (
            <video 
              ref={videoRef}
              src={videoUrl} 
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block"
              muted
              playsInline
              preload="metadata"
              onMouseEnter={(e) => e.currentTarget.play()}
              onMouseLeave={(e) => {
                e.currentTarget.pause();
                e.currentTarget.currentTime = 0;
              }}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

const ResultCard = ({ value, label, title, index }: { value: string, label: string, title: string, index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-zinc-900/30 border border-zinc-800 p-8 rounded-3xl text-center hover:border-accent/50 transition-colors duration-500 card-glow"
  >
    <div className="text-4xl md:text-6xl font-bold text-accent mb-2 tracking-tighter">{value}</div>
    <div className="text-sm uppercase tracking-widest text-zinc-500 mb-4 font-semibold">{label}</div>
    <div className="text-lg font-medium text-zinc-300">{title}</div>
  </motion.div>
);

const Testimonial = ({ name, role, content, avatar, index }: { name: string, role: string, content: string, avatar: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    className="bg-zinc-900/50 p-8 rounded-3xl border border-zinc-800 flex flex-col h-full card-glow"
  >
    <div className="flex items-center mb-6">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full mr-4 object-cover" referrerPolicy="no-referrer" />
      <div>
        <h4 className="font-semibold">{name}</h4>
        <p className="text-zinc-500 text-sm">{role}</p>
      </div>
    </div>
    <p className="text-zinc-300 italic flex-grow">"{content}"</p>
    <div className="flex mt-6 text-accent">
      {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
    </div>
  </motion.div>
);

const CTAButton = ({ children, primary = false, href = "#" }: { children: React.ReactNode, primary?: boolean, href?: string }) => (
  <motion.a 
    href={href}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className={`
      inline-flex items-center justify-center px-8 py-4 rounded-full font-medium transition-all duration-300
      ${primary 
        ? 'bg-accent text-white hover:bg-accent-hover shadow-lg shadow-accent/20' 
        : 'bg-zinc-800 text-white hover:bg-zinc-700 border border-zinc-700'}
    `}
  >
    {children}
  </motion.a>
);

export default function App() {
  const [lang, setLang] = React.useState<'ru' | 'en'>('ru');
  const t = translations[lang];

  const toggleLang = () => setLang(prev => prev === 'ru' ? 'en' : 'ru');

  return (
    <div className="min-h-screen selection:bg-accent selection:text-white relative overflow-x-hidden">
      <div className="noise-overlay" />
      
      {/* Background Glow Blobs */}
      <div className="glow-blob top-[-15%] left-[-10%] animate-pulse" />
      <div className="glow-blob top-[-5%] right-[-5%] opacity-60 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="glow-blob top-[10%] left-[20%] opacity-40 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 apple-blur bg-black/60 border-b border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold tracking-tighter uppercase">reisu<span className="text-accent">vfx</span></div>
          <div className="flex items-center space-x-6 md:space-x-8 text-sm font-medium text-zinc-400">
            <button 
              onClick={toggleLang}
              className="flex items-center space-x-2 hover:text-white transition-colors uppercase tracking-widest font-bold text-xs bg-zinc-800/50 px-3 py-1.5 rounded-full border border-zinc-700"
            >
              <Globe size={14} className="text-accent" />
              <span>{lang === 'ru' ? 'RU' : 'EN'}</span>
            </button>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#work" className="hover:text-white transition-colors">{t.nav.work}</a>
              <a href="#reviews" className="hover:text-white transition-colors">{t.nav.reviews}</a>
              <a href="#contact" className="text-accent hover:text-accent-hover transition-colors">{t.nav.contact}</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 relative z-10 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(168, 85, 247, 0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-accent uppercase bg-accent/10 rounded-full border border-accent/20">
              {t.hero.badge}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-glow">
              {t.hero.title} <br />
              <span className="text-gradient">{t.hero.titleAccent}</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton primary href="https://t.me/reisuvfx">
                {t.hero.ctaPrimary} <ChevronRight className="ml-2" size={18} />
              </CTAButton>
              <CTAButton href="#work">{t.hero.ctaSecondary}</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-32 px-6 bg-zinc-950/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-glow">{t.work.title}</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          {/* Vertical Videos - 3 in a row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-12">
            <PortfolioItem 
              index={0}
              isVertical={true}
              title={t.work.titles.vertical}
              category={t.work.categories.social}
              videoUrl="videos/1.mp4"
              thumbnail="thumbnails/1.jpg" // Put your thumbnail here: public/thumbnails/1.jpg
            />
            <PortfolioItem 
              index={1}
              isVertical={true}
              title={t.work.titles.vertical}
              category={t.work.categories.social}
              videoUrl="videos/2.mp4"
              thumbnail="thumbnails/2.jpg" // Put your thumbnail here: public/thumbnails/2.jpg
            />
            <PortfolioItem 
              index={2}
              isVertical={true}
              title={t.work.titles.vertical}
              category={t.work.categories.social}
              videoUrl="videos/3.mp4"
              thumbnail="thumbnails/3.jpg" // Put your thumbnail here: public/thumbnails/3.jpg
            />
          </div>

          {/* Horizontal Videos - 2 in a row on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <PortfolioItem 
              index={3}
              title={t.work.titles.promo}
              category={t.work.categories.commercial}
              videoUrl="videos/promo.mp4"
              thumbnail="thumbnails/promo.jpg" // Put your thumbnail here: public/thumbnails/promo.jpg
            />
            <PortfolioItem 
              index={4}
              title={t.work.titles.horizontal}
              category={t.work.categories.youtube}
              videoUrl="https://youtu.be/YE4Q25yjjFk?si=JYQ0zHe6WOcoQvT1"
            />
          </div>

          <div className="text-center mt-20">
            <CTAButton primary href="https://t.me/reisuvfx">
              {t.work.cta}
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.02)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">{t.results.title}</h2>
            <p className="text-zinc-500">{t.results.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResultCard 
              index={0}
              value="15M+"
              label={t.results.views}
              title={t.results.verticalFormat}
            />
            <ResultCard 
              index={1}
              value="1M+"
              label={t.results.views}
              title={t.results.horizontalFormat}
            />
            <ResultCard 
              index={2}
              value="500+"
              label={t.results.projects}
              title={t.results.allTime}
            />
            <ResultCard 
              index={3}
              value="100%"
              label={t.results.onTime}
              title={t.results.allTime}
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.02)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">{t.reviews.title}</h2>
            <p className="text-zinc-500">{t.reviews.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              index={0}
              name="INSTARDING"
              role={t.reviews.roles.youtuber}
              content={lang === 'ru' ? "Невероятного уровня анимации за такой срок, благодарю за очередной шедевр!" : "Incredible level of animation in such a short time, thank you for another masterpiece!"}
              avatar="https://yt3.googleusercontent.com/ytc/AIdro_ntF6t9sw9aA4T4pQYa2LSA-AkylY89kEu-KrvznCOOZOs=s900-c-k-c0x00ffffff-no-rj"
            />
            <Testimonial 
              index={1}
              name="Keingnade"
              role={t.reviews.roles.founder}
              content={lang === 'ru' ? "Работа просто легендарнейшая, все супер, оставляем как есть" : "The work is simply legendary, everything is super, let's keep it as is"}
              avatar="https://yt3.googleusercontent.com/0c1qaNA-lY161JBGMyyGkktrJIA3MQutKiujjKk-AjvaXOG1WVHRLErNc_r-wwak8XMSoHe5vA=s900-c-k-c0x00ffffff-no-rj"
            />
            <Testimonial 
              index={2}
              name="MDM Group"
              role={t.reviews.roles.expert}
              content={lang === 'ru' ? "Как всегда качественный монтаж, спасибо за работу, приятно с вами сотрудничать)" : "As always, high-quality editing, thank you for the work, a pleasure to collaborate with you)"}
              avatar="https://mdmcar.com/assets/logo_black_2-bde940ab.png"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="pt-32 pb-16 px-6 bg-zinc-950/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.05)_0%,transparent_70%)] pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-glow">{t.contact.title}</h2>
            <p className="text-xl text-zinc-400 mb-12">
              {t.contact.subtitle}
            </p>
            
            <div className="flex flex-col items-center space-y-6">
              <motion.a 
                href="https://t.me/reisuvfx" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-4 bg-[#0088cc] hover:bg-[#0077b5] text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform"
              >
                <Send size={24} />
                <span>{t.contact.button}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} REISUVFX. {t.footer.rights}</p>
        <p className="mt-1">{t.footer.tagline}</p>
      </footer>
    </div>
  );
}

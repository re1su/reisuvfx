/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Send, Mail, Play, Star, ChevronRight } from 'lucide-react';

const getYouTubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
};

const PortfolioItem = ({ title, category, videoUrl, index, isVertical = false }: { title: string, category: string, videoUrl: string, index: number, isVertical?: boolean }) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const videoId = getYouTubeId(videoUrl);
  const isLocalVideo = !videoId && (videoUrl.endsWith('.mp4') || videoUrl.endsWith('.webm') || videoUrl.startsWith('/'));
  const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : (isLocalVideo ? '' : videoUrl);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`group relative w-full overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 card-glow ${isVertical ? 'aspect-[9/16]' : 'aspect-video'}`}
    >
      {isPlaying ? (
        <div className="w-full h-full relative">
          {videoId ? (
            <>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&iv_load_policy=3&controls=1&disablekb=1`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
              {/* Protective overlays to block YouTube's external links */}
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
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300 z-10">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-xl shadow-accent/20"
            >
              <Play className="text-white fill-current ml-1" size={24} />
            </motion.div>
          </div>
          {thumbnailUrl ? (
            <img 
              src={thumbnailUrl} 
              alt={title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
              <Play className="text-zinc-700" size={48} />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-20">
            <p className="text-accent text-[10px] font-medium mb-0.5 uppercase tracking-widest">{category}</p>
            <h3 className={`${isVertical ? 'text-base' : 'text-xl'} font-semibold leading-tight`}>{title}</h3>
          </div>
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
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-zinc-400">
            <a href="#work" className="hover:text-white transition-colors">Работы</a>
            <a href="#reviews" className="hover:text-white transition-colors">Отзывы</a>
            <a href="#contact" className="text-accent hover:text-accent-hover transition-colors">Написать мне</a>
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
              Professional Video Editing
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] text-glow">
              Создаю видео, которые <br />
              <span className="text-gradient">удерживают внимание</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              Помогаю блогерам и брендам расти через динамичный монтаж и сторителлинг. 
              Ваш контент заслуживает того, чтобы его досмотрели до конца.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton primary href="https://t.me/reisuvfx">
                Начать проект <ChevronRight className="ml-2" size={18} />
              </CTAButton>
              <CTAButton href="#work">Смотреть работы</CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="work" className="py-32 px-6 bg-zinc-950/30 relative z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.03)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-24">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-glow">Мои работы</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>
          
          {/* Vertical Videos - 3 in a row on desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start mb-12">
            <PortfolioItem 
              index={0}
              isVertical={true}
              title="Вертикальное видео"
              category="Social Media"
              videoUrl="https://picsum.photos/seed/edit1/720/1280"
            />
            <PortfolioItem 
              index={1}
              isVertical={true}
              title="Вертикальное видео"
              category="Social Media"
              videoUrl="https://picsum.photos/seed/edit2/720/1280"
            />
            <PortfolioItem 
              index={2}
              isVertical={true}
              title="Вертикальное видео"
              category="Social Media"
              videoUrl="https://picsum.photos/seed/edit3/720/1280"
            />
          </div>

          {/* Horizontal Videos - 2 in a row on desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <PortfolioItem 
              index={3}
              title="Проморолик"
              category="Commercial"
              videoUrl="https://picsum.photos/seed/edit4/1280/720"
            />
            <PortfolioItem 
              index={4}
              title="Горизонтальное видео"
              category="Youtube video"
              videoUrl="https://youtu.be/YE4Q25yjjFk?si=JYQ0zHe6WOcoQvT1"
            />
          </div>

          <div className="text-center mt-20">
            <CTAButton primary href="https://t.me/reisuvfx">
              Хочу такой же монтаж
            </CTAButton>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.02)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Результаты клиентов</h2>
            <p className="text-zinc-500">Цифры, которые говорят сами за себя</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ResultCard 
              index={0}
              value="15M+"
              label="Просмотров"
              title="На вертикальном формате"
            />
            <ResultCard 
              index={1}
              value="1M+"
              label="Просмотров"
              title="На горизонтальном формате"
            />
            <ResultCard 
              index={2}
              value="500+"
              label="Выполненных проектов"
              title="За все время работы"
            />
            <ResultCard 
              index={3}
              value="100%"
              label="Проектов сдано вовремя"
              title="за все время работы"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="reviews" className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.02)_0%,transparent_50%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-glow">Что говорят клиенты</h2>
            <p className="text-zinc-500">Социальное доказательство качества моей работы</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Testimonial 
              index={0}
              name="INSTARDING"
              role="YouTube Блогер (300k+)"
              content="Невероятного уровня анимации за такой срок, благодарю за очередной шедевр!"
              avatar="https://yt3.googleusercontent.com/ytc/AIdro_ntF6t9sw9aA4T4pQYa2LSA-AkylY89kEu-KrvznCOOZOs=s900-c-k-c0x00ffffff-no-rj"
            />
            <Testimonial 
              index={1}
              name="Keingnade"
              role="Основатель сообщества FSCR / Блогер"
              content="Работа просто легендарнейшая, все супер, оставляем как есть"
              avatar="https://yt3.googleusercontent.com/0c1qaNA-lY161JBGMyyGkktrJIA3MQutKiujjKk-AjvaXOG1WVHRLErNc_r-wwak8XMSoHe5vA=s900-c-k-c0x00ffffff-no-rj"
            />
            <Testimonial 
              index={2}
              name="MDM Group"
              role="Эксперт по автомобилям"
              content="Как всегда качественный монтаж, спасибо за работу, приятно с вами сотрудничать)"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-8 text-glow">Если вам нужна качественная работа</h2>
            <p className="text-xl text-zinc-400 mb-12">
              напишите мне прямо сейчас, и мы обсудим проект
            </p>
            
            <div className="flex flex-col items-center space-y-6">
              <motion.a 
                href="https://t.me/reisuvfx" 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center space-x-4 bg-[#0088cc] hover:bg-[#0077b5] text-white px-10 py-5 rounded-2xl text-xl font-bold transition-all transform"
              >
                <Send size={24} />
                <span>Написать в Telegram</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 px-6 border-t border-zinc-900 text-center text-zinc-600 text-xs">
        <p>© {new Date().getFullYear()} REISUVFX. Все права защищены.</p>
        <p className="mt-1">Минимализм и качество в каждом кадре.</p>
      </footer>
    </div>
  );
}

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, AlertTriangle, TrendingDown, Users, Flame, Info, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  
  // Parallax and background color transformations
  const bgTransform = useTransform(
    scrollYProgress,
    [0, 0.4, 0.7, 1],
    [
      "hsl(0, 0%, 7%)", // Black
      "hsl(0, 0%, 10%)", // Dark Gray
      "hsl(20, 20%, 15%)", // Transition
      "hsl(44, 100%, 59%, 0.1)" // Golden tint
    ]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // Intersection observer for nav highlights
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-mc-black">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-16 h-16 border-t-4 border-mc-yellow rounded-full"
        />
      </div>
    );
  }

  const navItems = [
    { id: "hero", label: "Accueil" },
    { id: "crise", label: "La Crise" },
    { id: "contexte", label: "Contexte" },
    { id: "transformation", label: "Transformation" },
    { id: "renaissance", label: "Renaissance" },
    { id: "infos", label: "Infos" },
  ];

  return (
    <motion.div style={{ backgroundColor: bgTransform }} className="min-h-screen text-white font-sans selection:bg-mc-red selection:text-white">
      
      {/* Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="fixed top-0 left-0 right-0 z-40 glass-card border-b-0 py-4 px-6 md:px-12 flex items-center justify-between"
      >
        <div className="text-xl font-black tracking-tighter text-mc-red uppercase">
          Crise & <span className="text-mc-yellow">Renaissance</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-1 bg-black/40 p-1 rounded-full border border-white/10">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeSection === item.id 
                  ? "bg-mc-red text-white shadow-[0_0_15px_rgba(218,41,28,0.5)]" 
                  : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-mc-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`text-2xl font-black uppercase tracking-wider ${
                  activeSection === item.id ? "text-mc-yellow" : "text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        {/* 1. HERO */}
        <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-mc-red/20 via-mc-black to-mc-black z-0" />
          
          <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-none mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-300 to-gray-600">
                Crise <br/>
                <span className="text-mc-red">&</span> <br/>
                <span className="text-mc-yellow">Renaissance</span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mb-12"
            >
              Quand une stratégie floue met tout en danger… La descente aux enfers et la résurrection d'un empire.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <Button 
                onClick={() => scrollTo('infos')}
                size="lg" 
                className="bg-mc-red hover:bg-mc-red/90 text-white rounded-full px-8 py-6 text-lg font-bold glow-hover transition-all group"
              >
                Découvrir la pièce
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 opacity-50"
          >
            <div className="w-[2px] h-16 bg-gradient-to-b from-mc-red to-transparent" />
          </motion.div>
        </section>

        {/* 2. CRISE */}
        <section id="crise" className="py-32 px-6 relative">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-24"
            >
              <h2 className="text-5xl md:text-7xl font-black text-mc-red uppercase mb-6 tracking-tight">Le point de rupture</h2>
              <p className="text-2xl text-gray-400 font-serif max-w-3xl mx-auto">
                Qualité en baisse. Identité perdue. Clients fuyants. Le géant vacille.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: AlertTriangle, title: "Qualité altérée", desc: "Des standards qui s'effondrent sous le poids de l'expansion rapide." },
                { icon: Users, title: "Désamour", desc: "Une clientèle qui ne se reconnaît plus dans la marque." },
                { icon: TrendingDown, title: "Chute Libre", desc: "Des résultats en berne et une stratégie qui tourne à vide." }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className="glass-card p-10 rounded-3xl border-t-mc-red/30 border-t-2"
                >
                  <item.icon className="w-16 h-16 text-mc-red mb-6" />
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. CONTEXTE */}
        <section id="contexte" className="py-32 px-6 bg-black/50">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black uppercase mb-16 text-gray-200"
            >
              Les Années <span className="text-mc-red">Sombres</span> <br/> 2000-2003
            </motion.h2>

            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-mc-red before:via-gray-800 before:to-mc-yellow">
              {[
                { year: "2000", title: "L'Alerte", desc: "Premiers signaux de faiblesse. L'expansion agressive montre ses limites opérationnelles." },
                { year: "2002", title: "La Crise de Sens", desc: "Pertes financières historiques. Changement de direction dans l'urgence." },
                { year: "2003", title: "Le Plan", desc: "Mise en place de 'Plan to Win'. Focus sur la qualité plutôt que la quantité." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.2 }}
                  className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-mc-red text-black shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] glass-card p-6 rounded-2xl">
                    <div className="font-black text-4xl text-white/20 mb-2">{item.year}</div>
                    <h3 className="text-xl font-bold mb-2 text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. TRANSFORMATION */}
        <section id="transformation" className="py-32 px-6 overflow-hidden relative">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-7xl font-black uppercase mb-8 leading-tight">
                  <span className="text-gray-600 block">De l'Ombre</span>
                  <span className="text-mc-yellow block">À la Lumière</span>
                </h2>
                <p className="text-xl text-gray-300 font-serif leading-relaxed mb-8">
                  La restructuration est violente mais nécessaire. Nouveaux menus, nouveaux designs, nouvelle promesse. Le théâtre de la transformation se joue en coulisses.
                </p>
                <div className="flex items-center gap-4 text-mc-yellow font-bold">
                  <Flame className="w-6 h-6" />
                  Le phénix renaît de ses cendres
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1 }}
                className="relative h-[600px] rounded-full overflow-hidden border border-mc-yellow/30 shadow-[0_0_50px_rgba(255,199,44,0.1)]"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-mc-yellow/20 to-transparent mix-blend-overlay z-10" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,199,44,0.1),transparent_50%)]" />
                
                {/* Abstract visual representing transformation */}
                <div className="w-full h-full flex items-center justify-center">
                   <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-[150%] h-[150%] rounded-full border border-dashed border-mc-yellow/20"
                   />
                   <motion.div 
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute w-[100%] h-[100%] rounded-full border border-dashed border-white/10"
                   />
                   <div className="absolute w-32 h-32 bg-mc-yellow rounded-full blur-3xl opacity-50" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* 5. RENAISSANCE */}
        <section id="renaissance" className="py-40 px-6 bg-gradient-to-b from-transparent to-mc-yellow/10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-6xl md:text-8xl font-black uppercase text-mc-yellow mb-8 drop-shadow-lg">
                Renaissance
              </h2>
              <p className="text-3xl font-serif text-white mb-12">
                "Une bonne gestion peut sauver la situation."
              </p>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Le succès n'est jamais acquis. Il se reconstruit chaque jour. La pièce explore la tension humaine derrière les décisions corporatives qui ont sauvé la marque.
              </p>
            </motion.div>
          </div>
        </section>

        {/* 6. INFOS PRATIQUES */}
        <section id="infos" className="py-32 px-6 relative">
          <div className="max-w-5xl mx-auto">
            <div className="glass-card rounded-[3rem] p-10 md:p-20 border-mc-yellow/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-mc-red via-mc-yellow to-mc-red" />
              
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-4xl font-black uppercase mb-10">Rejoignez <br/> l'expérience</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-mc-yellow shrink-0">
                        <Calendar />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Dates</h4>
                        <p className="text-gray-400">Du 11 Mai 2026</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-mc-yellow shrink-0">
                        <MapPin />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Lieu</h4>
                        <p className="text-gray-400">ESMIA, Salle 3</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-mc-yellow shrink-0">
                        <Info />
                      </div>
                      <div>
                        <h4 className="font-bold text-white">Durée</h4>
                        <p className="text-gray-400">1h</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center">
                  <div className="bg-black/50 p-8 rounded-3xl border border-white/10 mb-8">
                    <div className="text-sm font-bold text-mc-red uppercase mb-2">Tarif Unique</div>
                    <div className="text-5xl font-black text-white mb-2">Gratuit</div>
                    <p className="text-sm text-gray-400">Placement libre</p>
                  </div>

                  <Button 
                    size="lg" 
                    className="w-full bg-mc-yellow hover:bg-mc-yellow/90 text-black rounded-full py-8 text-xl font-black uppercase tracking-wide glow-hover transition-all"
                    onClick={() => {
                      // Simulate a booking action
                      alert("Redirection vers la billetterie...");
                    }}
                  >
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-white/10 text-center text-gray-500 text-sm">
          <p>© 2024 Production Crise & Renaissance. Ceci est un projet théâtral de Controle coninue.</p>
        </footer>
      </main>
    </motion.div>
  );
}

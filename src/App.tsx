import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  MapPin,
  MessageCircle,
  GraduationCap,
  Code2,
} from "lucide-react";
import type { ReactNode } from "react";

export default function InvitoLaurea() {
  const laurea = {
    nome: "Carla",
    titolo: "Dottoressa in Informatica",
    dataFesta: "Venerdì 12 giugno, dalle 18:00 ",
    dataDiscussione: "Martedì 9 giugno, ore 14:30, Aula Scipione Bobbio",
    dataFestaIso: "2026-06-12T18:00:00",
    luogoFesta: "Casa mia - Via sant'andrea 11, Montecalvo Irpino (AV)",
    luogoDiscussione:
      "Università degli Studi di Napoli - Piazzale Vincenzo Tecchio 80, Napoli",
    luogoFestaMappa: "Contrada Bosco 25, Montecalvo Irpino (AV)",
    telefonoWhatsapp: "3343614657",
  };

  const targetDate = useMemo(
    () => new Date(laurea.dataFestaIso).getTime(),
    [laurea.dataFestaIso],
  );
  const [now, setNow] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const diff = Math.max(targetDate - now, 0);
  const giorni = Math.floor(diff / (1000 * 60 * 60 * 24));
  const ore = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minuti = Math.floor((diff / (1000 * 60)) % 60);
  const secondi = Math.floor((diff / 1000) % 60);

  const messaggio = encodeURIComponent(
    `Ciao ${laurea.nome}, confermo la mia presenza alla tua laurea! Numero di persone: 🎓`,
  );

  const whatsappUrl = `https://wa.me/${laurea.telefonoWhatsapp}?text=${messaggio}`;

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1347e655,transparent_35%),radial-gradient(circle_at_bottom_right,#EA731744,transparent_30%)]" />

      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative w-full max-w-4xl"
      >
        <div className="border border-slate-800 bg-slate-900/85 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
          <div className="flex items-center gap-2 bg-slate-800 px-5 py-3 border-b border-slate-700">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-sm text-slate-400 font-mono">
              invito-laurea.tsx
            </span>
          </div>

          <div className="p-6 md:p-10">
            <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-sm text-blue-200 mb-6">
                  <Code2 size={16} /> npm run laurea
                </div>

                <h1 className="mt-7 text-4xl md:text-6xl font-bold tracking-tight">
                  Sei invitato/a alla mia laurea
                </h1>

                <div className="mt-8 flex flex-wrap gap-3">
                  <p>
                    {" "}
                    Per favore conferma la tua presenza e il numero di persone
                    che verranno con te{" "}
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-2xl bg-[#1347e6] hover:bg-blue-700 px-6 py-3 text-base font-medium text-white transition-colors"
                  >
                    <MessageCircle className="mr-2" size={20} /> Conferma
                    presenza
                  </a>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      laurea.luogoFestaMappa,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-2xl border border-[#EA7317] text-[#EA7317] hover:bg-[#EA7317] hover:text-white px-6 py-3 text-base font-medium transition-colors"
                  >
                    <MapPin className="mr-2" size={20} /> Apri mappa per la
                    festa
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      laurea.luogoDiscussione,
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-2xl border border-[#EA7317] text-[#EA7317] hover:bg-[#EA7317] hover:text-white px-6 py-3 text-base font-medium transition-colors"
                  >
                    <MapPin className="mr-2" size={20} /> Apri mappa per la
                    discussione
                  </a>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-center mb-5">
                  <div className="h-24 w-24 rounded-3xl bg-[#1347e6] flex items-center justify-center shadow-lg shadow-blue-900/40">
                    <GraduationCap size={52} />
                  </div>
                </div>

                <Info
                  icon={<Clock size={20} />}
                  label="Data festa"
                  value={laurea.dataFesta}
                />
                <Info
                  icon={<MapPin size={20} />}
                  label="Luogo festa"
                  value={laurea.luogoFesta}
                />
                <Info
                  icon={<MapPin size={20} />}
                  label="Luogo discussione"
                  value={laurea.luogoDiscussione}
                />
                <Info
                  icon={<Clock size={20} />}
                  label="Data Discussione"
                  value={laurea.dataDiscussione}
                />

                <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5">
                  <p className="text-sm text-slate-400 mb-3 font-mono">
                    countdown()
                  </p>
                  <div className="grid grid-cols-4 gap-3 text-center">
                    <TimeBox number={giorni} label="giorni" />
                    <TimeBox number={ore} label="ore" />
                    <TimeBox number={minuti} label="min" />
                    <TimeBox number={secondi} label="sec" />
                  </div>
                </div>

                <div className="rounded-2xl border border-orange-500/40 bg-orange-500/10 p-5 text-orange-100">
                  <p className="text-sm font-mono mb-1">npm run note</p>
                  <ul className="list-disc list-inside text-sm text-orange-300">
                    <li>Si dispensa dai fiori </li>
                    <li>Dress code festa: Casual </li>
                    <li>Si dispensa anche dagli astemi</li>
                    <li>
                      Dopo la seduta ci sarà un piccolo rinfresco e per i più
                      coreggiosi un giro in centro a Napoli
                    </li>
                    <li>
                      Parcheggio per festa: Cercate di aggregarvi il più
                      possibile, i posti sono limitati. Si parcheggia "A lu
                      spiazzale di Fernando Tufo" (RINGRAZIAMENTO SPECIALE A
                      FERNANDO)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}

function Info({
  icon,
  label,
  value,
  subvalue,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  subvalue?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-950/60 p-5 flex gap-4">
      <div className="text-[#EA7317] mt-1">{icon}</div>
      <div>
        <p className="text-sm text-slate-400">{label}</p>
        <p className="font-semibold text-slate-100">{value}</p>
        {subvalue && <p className="text-sm text-slate-400 mt-1">{subvalue}</p>}
      </div>
    </div>
  );
}

function TimeBox({ number, label }: { number: number; label: string }) {
  return (
    <div className="rounded-xl bg-slate-800 p-3">
      <p className="text-xl md:text-2xl font-bold text-white">
        {String(number).padStart(2, "0")}
      </p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  );
}

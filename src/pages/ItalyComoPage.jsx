import { useEffect, useMemo, useState } from 'react'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import { mountJsonLd, upsertMeta } from './seo/pageMeta'

const CANONICAL = 'https://vacanzabianca.ru/italy/tury-ozero-como/'
const TITLE = 'Туры на озеро Комо: авторские маршруты и отдых – Vacanza Bianca'
const DESCRIPTION =
  'Туры на озеро Комо: прогулки на катере и каяке, виллы и панорамы, комфортные отели и сопровождение. Программы по дням и подбор маршрута под вас.'

const heroImage = '/images/resorts/valmalenco/3.jpg'

const programDays = [
  {
    day: 'День 1',
    title: 'Прилет и заселение',
    text: 'Встреча в аэропорту, трансфер и заселение в отель в окрестностях города Комо.',
    note: 'Встреча: Милан Мальпенса (MPX) или Бергамо (BGY). Отель бронируется заранее.',
  },
  {
    day: 'День 2',
    title: 'Комо и атмосфера озера',
    text: 'Прогулка по городу Комо: исторический центр, набережная, рассказ о местах и ресторанах. Во второй половине дня — поездка в Менаджо или Белладжо, водопад, прогулка, аперитив.',
  },
  {
    day: 'День 3',
    title: 'Активный отдых на выбор',
    text: 'Хайкинг над озером Комо (в зависимости от уровня). Возможны варианты: легкий маршрут к замку Бараделло, подъём на Монте Болеттоне или виа феррата в окрестностях Комо.',
    note: 'Инвентарь для хайкинга и виа ферраты предоставляется. Обед — в хайкинах по пути.',
  },
  {
    day: 'День 4',
    title: 'Переезд на Гарду (через Бергамо)',
    text: 'Переезд на озеро Гарда. По пути — остановка в Бергамо (по желанию музей). Обед в старом городе. Вечером прогулка по Сирмионе, набережная и старый город.',
  },
  {
    day: 'День 5',
    title: 'Вода и пляж',
    text: 'Катание на 4-местном катере по озеру, пляжный отдых, каяк. Обед в ресторане на пляже.',
    note: 'Нужны купальные костюмы, обувь/одежда для прогулок у воды, солнцезащитные средства.',
  },
  {
    day: 'День 6',
    title: 'SPA-день',
    text: 'Отдых и восстановление. На выбор: Parco Termale del Garda, SPA & Thermal Garden Sirmione или другой SPA-центр.',
  },
  {
    day: 'День 7',
    title: 'Отъезд',
    text: 'Трансфер в аэропорт, завершение программы.',
  },
]

const ItalyComoPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const jsonLd = useMemo(
    () => [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Vacanza Bianca',
        url: 'https://vacanzabianca.ru/',
        logo: 'https://vacanzabianca.ru/images/icons/favicon.png',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Главная', item: 'https://vacanzabianca.ru/' },
          { '@type': 'ListItem', position: 2, name: 'Италия', item: 'https://vacanzabianca.ru/italy/' },
          { '@type': 'ListItem', position: 3, name: 'Озеро Комо', item: CANONICAL },
        ],
      },
    ],
    [],
  )

  useEffect(() => {
    const origin =
      typeof window !== 'undefined' && window.location?.protocol?.startsWith('http')
        ? window.location.origin
        : 'https://vacanzabianca.ru'
    upsertMeta({
      title: TITLE,
      description: DESCRIPTION,
      canonical: CANONICAL,
      ogImage: `${origin}${heroImage}`,
    })
    const unmount = mountJsonLd('italy-como-jsonld', jsonLd)
    return () => unmount()
  }, [jsonLd])

  return (
    <div className="min-h-screen bg-bg-base">
      <Navigation />
      <main className="pb-12 pt-24 sm:pt-28 md:pt-32">
        <section className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h1 className="section-title !mb-4 text-center">Озёрный край: Комо и Гарда</h1>
          <p className="mx-auto mb-10 max-w-[760px] text-center font-sans text-sm leading-7 text-text-light sm:text-base">
            Авторская программа на 6 ночей
          </p>
          <h2 className="section-title !mb-10 text-center">Программа по дням</h2>
          <div className="space-y-4">
            {programDays.map((item, index) => (
              <article key={item.day} className="rounded-xl border border-border-soft bg-bg-card p-6">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#777]">
                    {item.day}
                  </p>
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-bg-base text-xs uppercase tracking-[0.12em] text-text-main">
                    {index + 1}
                  </div>
                </div>
                <h3 className="font-sans text-base font-medium text-text-main mb-3" style={{ fontWeight: '500' }}>
                  {item.title}
                </h3>
                <p className="text-sm leading-7 text-text-light whitespace-pre-line">{item.text}</p>
                {item.note ? (
                  <p className="mt-4 rounded-lg bg-bg-warm p-4 text-sm leading-7 text-text-main whitespace-pre-line">
                    {item.note}
                  </p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="rounded-2xl border border-border-soft bg-bg-card px-6 py-10 text-center md:px-10 md:py-14">
            <h2 className="section-title !mb-10">Подобрать тур на Комо</h2>
            <p className="mx-auto mb-8 max-w-[760px] text-sm leading-7 text-text-light">
              Оставьте заявку — подберем маршрут, уровень активности и варианты отелей. Ответим в WhatsApp/Telegram и на почту.
            </p>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="rounded-[50px] border border-text-main bg-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-text-main/90"
            >
              Подобрать тур
            </button>
          </div>
        </section>
      </main>

      <Footer />
      <TelegramFloatButton />
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}

export default ItalyComoPage


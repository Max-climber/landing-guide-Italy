import { useEffect, useMemo, useState } from 'react'
import Navigation from '../components/Navigation'
import Hero from '../components/Hero'
import Footer from '../components/Footer'
import ContactModal from '../components/ContactModal'
import TelegramFloatButton from '../components/TelegramFloatButton'
import BreadcrumbOverlay from '../components/BreadcrumbOverlay'
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
      <div className="relative">
        <Hero
          title="Озёрный Край: Комо и Гарда. 6 ночей"
          subtitle=""
          description="Программа по дням для вашего маршрута Комо и Гарда. Никаких аккордеонов — всё сразу видно."
          ctaLabel="Подобрать тур"
          showStructureLink={false}
          backgroundImage={heroImage}
          onCtaClick={() => setIsModalOpen(true)}
        />
        <BreadcrumbOverlay
          ariaLabel="Хлебные крошки"
          homeLabel="Главная"
          currentLabel="Туры на озеро Комо"
        />
      </div>

      <main className="pb-12">
        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <h2 className="section-title !mb-10">Программа по дням</h2>
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
          <h2 className="section-title !mb-10">Далее</h2>
          <div className="grid gap-6 lg:grid-cols-3">
            <article className="rounded-xl border border-border-soft bg-bg-card p-6">
              <h3 className="mb-4 font-serif text-[28px] leading-[1.1] text-text-main" style={{ fontWeight: '300' }}>
                Что входит в стоимость тура
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-text-light">
                <li>Проживание в отеле с бассейном и завтраком</li>
                <li>Трансфер - полностью в течение всего тура, включая бензин, парковки, платные дороги и т.д.</li>
                <li>Индивидуальное сопровождение в течение всего времени активного отдыха</li>
                <li>Прогулка на катере</li>
                <li>Прогулка на каяке</li>
                <li>Отдых в СПА</li>
                <li>Необходимое снаряжение – спас жилеты, палки для ходьбы, страховочная система, страховочное устройство, каски, перчатки</li>
              </ul>
            </article>

            <article className="rounded-xl border border-border-soft bg-bg-card p-6">
              <h3 className="mb-4 font-serif text-[28px] leading-[1.1] text-text-main" style={{ fontWeight: '300' }}>
                Что НЕ входит в стоимость тура
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-text-light">
                <li>Авиабилеты</li>
                <li>Питание (кроме завтрака в отеле)</li>
                <li>Входные билеты на платный пляж (при выборе платного пляжа)</li>
                <li>Входные билеты в музеи, виллы, платные парки и т.п.</li>
                <li>Любые дополнительные виды отдыха – полеты на гидроплане, параплане, планере, дополнительные прогулки на катерах и яхтах, дополнительный отдых в СПА, массажи, процедуры и т.д.</li>
              </ul>
            </article>

            <article className="rounded-xl border border-border-soft bg-bg-card p-6">
              <h3 className="mb-4 font-serif text-[28px] leading-[1.1] text-text-main" style={{ fontWeight: '300' }}>
                Условия бронирования и оплаты тура
              </h3>
              <ul className="space-y-2 text-sm leading-6 text-text-light">
                <li>Первая консультация онлайн, до 40 минут – бесплатно</li>
                <li>Предоплата - 300 евро. Бронируется время путешествия. В случае отказа менее, чем за 1,5 месяца – не возвращаются</li>
                <li>Бронировании отелей с аккаунта компании - после перевода полной стоимости бронирования</li>
                <li>Оплата 50% оставшейся стоимости тура в первый день тура</li>
                <li>Оставшаяся часть – в последний день тура, перед трансфером в аэропорт</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="mx-auto mt-16 w-full max-w-[1200px] px-4 sm:px-6 md:px-8 lg:px-5">
          <div className="rounded-2xl border border-border-soft bg-bg-card px-6 py-10 text-center md:px-10 md:py-14">
            <h2 className="section-title !mb-10">Подобрать тур на Комо</h2>
            <p className="mx-auto mb-8 max-w-[760px] text-sm leading-7 text-text-light">
              Оставьте заявку — подберем маршрут, уровень активности и варианты отелей. Ответим в WhatsApp/Telegram и на почту.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-[50px] border border-text-main px-8 py-3 text-[12px] uppercase tracking-[0.12em] text-text-main transition-all duration-300 hover:bg-text-main hover:text-white"
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


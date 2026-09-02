import { useTranslation } from 'react-i18next'
import FaqSection from '../../FaqSection'

const ArticleFaq = ({ items }) => {
  const { t } = useTranslation()

  if (!items?.length) return null

  const faqItems = items.map((item) => ({
    question: item.question,
    answerHtml: `<p>${item.answer}</p>`,
  }))

  return (
    <FaqSection
      id="article-faq"
      heading={t('blogPage.faqHeading')}
      items={faqItems}
      className="mt-12"
    />
  )
}

export default ArticleFaq

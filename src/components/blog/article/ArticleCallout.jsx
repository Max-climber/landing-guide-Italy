import { useTranslation } from 'react-i18next'

const ArticleCallout = ({ variant = 'tip', html }) => {
  const { t } = useTranslation()
  const label = t(`blogPage.callouts.${variant}`, { defaultValue: t('blogPage.callouts.default') })

  return (
    <aside className={`article-callout article-callout--${variant}`} role="note">
      <p className="article-callout__label">{label}</p>
      <div className="article-callout__body" dangerouslySetInnerHTML={{ __html: html }} />
    </aside>
  )
}

export default ArticleCallout

import { At, GithubLogo, InstagramLogo, LinkedinLogo, ReadCvLogo, XLogo } from "@phosphor-icons/react"

import { useEffect, useRef } from 'react'
import { marked } from 'marked'
import Prism from 'prismjs'

import { bodyContent } from './Body.content'
import cvPdf from '../assets/cv.pdf'

import styles from './Body.module.css'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-go'
import 'prismjs/themes/prism-tomorrow.css'

function Body() {
  const contentRef = useRef<HTMLDivElement>(null)
  const iconSize = 32
  const iconColor = "#FFF"
  const iconStyle = "light"

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = cvPdf
    link.download = 'CV - Otávio Monteiro Rossoni.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  useEffect(() => {
    const fetchContainerContent = async () => {
      const readmeHtml = await marked(bodyContent)

      if (contentRef.current) {
        contentRef.current.innerHTML = readmeHtml
        Prism.highlightAllUnder(contentRef.current)
      }
    }

    fetchContainerContent()
  }, [])

  return (
    <>
      <div className={styles.header}>
        <a title="E-mail" href="mailto:otarossoni@gmail.com">
          <At color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
        <a title="CV" onClick={handleDownloadCV} target="_blank">
          <ReadCvLogo color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
        <a title="GitHub" href="https://github.com/Otarossoni" target="_blank">
          <GithubLogo color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
        <a
          title="Linkedin"
          href="https://www.linkedin.com/in/otavio-monteiro-rossoni/"
          target="_blank"
        >
          <LinkedinLogo color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
        <a title="X" href="https://x.com/Otarossoni" target="_blank">
          <XLogo color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
        <a
          title="Instagram"
          href="https://www.instagram.com/otarossoni/"
          target="_blank"
        >
          <InstagramLogo color={iconColor} size={iconSize} weight={iconStyle} />
        </a>
      </div>

      <div ref={contentRef} className={styles.container}></div>
    </>
  )
}

export default Body

import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { AiOutlineDownload } from 'react-icons/ai';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import pdf from '../../Assets/Dawūd_Vermeulen.pdf';
import styles from './Resume.module.css';

// Self-hosted worker — set up by `npm run generate:worker` (runs on postinstall).
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';

function DownloadButton() {
  return (
    <a
      href={pdf}
      target="_blank"
      rel="noopener noreferrer"
      download
      className={styles.downloadBtn}
      aria-label="Download CV as PDF"
    >
      <AiOutlineDownload aria-hidden="true" /> Download CV
    </a>
  );
}

export default function ResumeNew() {
  const [width, setWidth] = useState(() =>
    typeof window === 'undefined' ? 1200 : window.innerWidth
  );
  const [error, setError] = useState(false);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.actions}>
          <DownloadButton />
        </div>

        <div className={styles.viewer}>
          {error ? (
            <p className={styles.error}>
              Resume preview is unavailable. Please use the download button above.
            </p>
          ) : (
            <Document
              file={pdf}
              onLoadError={() => setError(true)}
              onSourceError={() => setError(true)}
              loading={<p className={styles.loading}>Loading resume…</p>}
            >
              <Page pageNumber={1} scale={width > 786 ? 1.4 : 0.6} renderAnnotationLayer={false} />
            </Document>
          )}
        </div>

        <div className={styles.actions}>
          <DownloadButton />
        </div>
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import { CloseIconBlack } from "libs/shared/assets/svg";
import styles from "./dso-info-overlay.module.scss";
import { FeatureDSOInfo } from "pages/feature-dso-info";

export const DsoInfoOverlay = ({
  isActiveOverlay,
  id,
  dataType,
  toggleOverlay
}:{
  isActiveOverlay: Boolean,
  id?: string | number,
  dataType?: string,  
  toggleOverlay: (isActive : Boolean, id?: string | number, dataType? : string) => void
}) => {

  const [isActive, setIsActive] = useState<Boolean>(false)
  const [isOverlayShow, setIsOverlayShow] = useState<Boolean>(false)
  const [overlayData, setOverlayData] = useState<{ id?: string | number, dataType? : string }>
    ({id: 0, dataType: ""})

  useEffect(()=>{
    setOverlayData({id, dataType})
    setIsOverlayShow(isActiveOverlay)
    setTimeout(()=>{
      setIsActive(isActiveOverlay)
    }, 500)
  }, [isActiveOverlay])

  const closeOverlay = () => {
    setOverlayData({id: 0, dataType: ""})
    setIsActive(false)
    toggleOverlay(false)
    setTimeout(()=>{
      setIsOverlayShow(false)
    }, 200)
  }

  return (
    <div className={`${styles.info_overlay} ${(isOverlayShow) ? styles.active :''} `}>
      <div className={styles.overlay_backdrop} onClick={() => closeOverlay()}></div>
      <div className={`${styles.overlay_container} ${(isActive) ? styles.active : ''} `}>
        {/* <iframe src={overlay_url} title="" ></iframe> */}
        <div className={styles.container}>
          <section className={styles.icon_container} onClick={() => closeOverlay()}>
            <CloseIconBlack />
          </section>
          <FeatureDSOInfo id={overlayData.id} dataType={overlayData.dataType} />
        </div>
      </div>
    </div>
  )
}
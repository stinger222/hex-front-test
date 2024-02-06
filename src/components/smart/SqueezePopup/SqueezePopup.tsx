import { useState, useCallback } from "react"
import { createPortal } from "react-dom"
import { resetSqueezing } from "../../../store/linkSlice"
import { useAppDispatch, useAppSelector } from "../../../hooks/store"
import LinkSqueezingForm from "../../forms/LinkSqueezingForm/LinkSqueezingForm"
import Popup from "../../shared/Popup/Popup"

const SqueezePopup = () => {
  const dispatch = useAppDispatch()
  const [isModalActive, setIsModalActive] = useState<boolean>(false)
  const squeezing = useAppSelector(state => state.link.squeezing)
  const squeezedSuccessfuly = (!!squeezing.result && !squeezing.inProcess)

  const closePopup = useCallback(() => {
    dispatch(resetSqueezing())
    setIsModalActive(false)
  }, [dispatch])

  return (
    <div>
      <button onClick={() => {setIsModalActive(true)}}>Open Popup</button>
      
      {
        isModalActive && (
          createPortal((
            <Popup handleClose={closePopup}>
              <LinkSqueezingContent isSuccessful={squeezedSuccessfuly} shortLink={squeezing.result} />
            </Popup>
          ), document.body)
        )
      }
    </div>
  )
}

export default SqueezePopup


interface ILinkSqueezingContentProps {
  isSuccessful: boolean,
  shortLink: string | null
}

const LinkSqueezingContent = ({ isSuccessful, shortLink}: ILinkSqueezingContentProps) => {
  return (
    isSuccessful ? <LinkSqueezingResult shortLink={shortLink as string}/> : <LinkSqueezingForm />
  )
}

interface ILinkSqueezingResult {
  shortLink: string
}

const LinkSqueezingResult = ({ shortLink }: ILinkSqueezingResult) => {

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shortLink)
  }

  return (
    <div className="flex flex-col items-center w-96 py-5 px-8 bg-white rounded-md">
      <h1 className="mb-5 text-blue-300 text-3xl">Success!</h1>
      <h2 className="mb-2 text-xl">Short version of your link:</h2>

      <a href={shortLink} target="_blank" className="mb-5 break-all" id="squeezed-link">
        { shortLink }
      </a>

      <button onClick={handleCopy}>Copy</button>
    </div>
  )
}

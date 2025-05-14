import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './ui/button'
import { CopyIcon, Download, Trash2 } from 'lucide-react'
import useFetch from '@/hooks/use-fetch'
import { deleteUrl } from '@/db/apiUrls'
import { BeatLoader } from 'react-spinners'

const LinkCard = ({ url, fetchUrls }) => {
  const downloadImage = () => {
    const imageUrl = url?.qr
    const fileName = url?.title

    const anchor = document.createElement('a')
    anchor.href = imageUrl
    anchor.download = fileName

    document.body.appendChild(anchor)
    anchor.click()
    document.body.removeChild(anchor)
  }

  const shortLink = `${window.location.origin}/${url?.custom_url || url?.short_url}`

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, url?.id)

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        className="h-36 aspect-square object-cover ring ring-blue-500 self-start rounded"
        src={url?.qr}
        alt="qr code"
      />

      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <span className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </span>

        <span className="text-2xl font-bold text-[#dcb14c] hover:underline cursor-pointer break-words">
          {shortLink}
        </span>

        <span className="text-blue-400 flex items-center gap-1 hover:underline cursor-pointer">
          {url?.original_url}
        </span>

        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>

      <div className="flex gap-2">
        <Button
          variant="ghost"
          onClick={() => navigator.clipboard.writeText(shortLink)}
        >
          <CopyIcon className="text-blue-500" />
        </Button>

        <Button variant="ghost" onClick={downloadImage}>
          <Download size={28} />
        </Button>

        <Button
          variant="ghost"
          className="text-red-600"
          onClick={() => fnDelete().then(() => fetchUrls())}
        >
          {loadingDelete ? (
            <BeatLoader size={5} color="#912121" />
          ) : (
            <Trash2 />
          )}
        </Button>
      </div>
    </div>
  )
}

export default LinkCard

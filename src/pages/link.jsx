import { Button } from "@/components/ui/button";
import { UrlState } from "@/context";
import { getClicksForUrl } from "@/db/apiClicks";
import { deleteUrl, getUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { CopyIcon, Download, LinkIcon, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BarLoader, BeatLoader } from "react-spinners";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Location from "@/components/location-stats";
import Device from "@/components/device-stats";

const Link = () => {
  const downloadImage = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);

    anchor.click();

    document.body.removeChild(anchor);
  };

  const { id } = useParams();
  const { user } = UrlState();
  const navigate = useNavigate();

  const {
    loading,
    data: url,
    fn,
    error,
  } = useFetch(getUrl, { id, user_id: user?.id });

  const {
    loading: loadingStats,
    data: stats,
    fn: fnStats,
  } = useFetch(getClicksForUrl, id);

  const { loading: loadingDelete, fn: fnDelete } = useFetch(deleteUrl, id);

  useEffect(() => {
    fn();
    fnStats();
  }, []);

  if (error) {
    navigate("/dashboard");
  }

  let link = "";

  if (url) {
    link = url?.custom_url ? url?.custom_url : url.short_url;
  }

  return (
    <>
      {(loading || loadingStats) && (
        <BarLoader className="mb-4" width={"100%"} color="#912121" />
      )}

      <div className="flex flex-col gap-8 mt-10 px-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left Column */}
        <div className="flex flex-col gap-6 sm:w-1/2 w-full">
          <span className="text-3xl sm:text-5xl font-extrabold hover:underline cursor-pointer break-words">
            {url?.title}
          </span>

          <a
            href={`https://slimlink.io/${link}`}
            target="_blank"
            className="text-xl sm:text-3xl text-[#dcb14c] font-bold hover:underline break-all"
          >
            https://slimlink.io/{link}
          </a>

          <a
            href={url?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline cursor-pointer break-all"
          >
            <LinkIcon className="p-1" />
            {url?.original_url}
          </a>

          <span className="font-extralight text-sm">
            {new Date(url?.created_at).toLocaleString()}
          </span>

          <div className="flex gap-2 ">
            <Button
              variant="ghost"
              onClick={() =>
                navigator.clipboard.writeText(
                  `https://slimlink.io/${url?.short_url}`
                )
              }
            >
              <CopyIcon className="text-blue-500" />
            </Button>

            <Button variant="ghost" onClick={downloadImage}>
              <Download size={28} />
            </Button>

            <Button
              variant="ghost"
              className="text-red-600"
              onClick={() => fnDelete()}
            >
              {loadingDelete ? (
                <BeatLoader size={5} color="#912121" />
              ) : (
                <Trash2 />
              )}
            </Button>
          </div>

          <img
            src={url?.qr}
            className="w-[80%] self-center sm:self-start ring ring-blue-500 p-1 object-contain "
            alt="qr code"
          />
        </div>

        {/* Right Column */}
        <Card className="w-full sm:w-1/2">
          <CardHeader>
            <CardTitle className="text-3xl sm:text-4xl font-extrabold">
              Stats
            </CardTitle>
          </CardHeader>
          {stats && stats.length ? (
            <CardContent className="flex flex-col gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Clicks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{stats.length}</p>
                </CardContent>
              </Card>

              <CardTitle>Location</CardTitle>
              <Location stats={stats} />

              <CardTitle>Device Info</CardTitle>
              <Device stats={stats} />
            </CardContent>
          ) : (
            <CardContent>
              {loadingStats === false
                ? "No statistics yet"
                : "Loading statistics..."}
            </CardContent>
          )}
        </Card>
      </div>
    </>
  );
};

export default Link;

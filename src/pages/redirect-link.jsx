import { storeClicks } from "@/db/apiClicks";
import { getLongUrl } from "@/db/apiUrls";
import useFetch from "@/hooks/use-fetch";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { BarLoader } from "react-spinners";

const RedirectLink = () => {
  const {id} = useParams();

  const {loading, data, fn} = useFetch(getLongUrl, id);

  const {loading: loadingStats, fn: fnStats} = useFetch(storeClicks, {
    id: data?.id,
    originalUrl: data?.original_url,
  });

  useEffect(() => {
    fn();
  }, []);

  useEffect(() => {
    if (!loading && data) {
      // fnStats();
      // window.location.href = data.original_url; // ← ADD THIS LINE

      fnStats().then(() => {
        window.location.href = data.original_url;
      });
      
    }
  }, [loading]);
  

  if (loading || loadingStats) {
    return (
      <>
        <BarLoader className="mb-4" width={"100%"} color="#912121" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
};

export default RedirectLink;

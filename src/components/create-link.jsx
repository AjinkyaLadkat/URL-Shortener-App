import { UrlState } from "@/context";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Error from "./error";
import { Card } from "./ui/card";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { QRCode } from "react-qrcode-logo";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";

const CreateLink = () => {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid url")
      .required("Long URL is requried"),
    customUrl: yup.string(),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const{loading, error, data, fn: fncreateUrl} = useFetch(createUrl,{...formValues, user_id:user.id });

  useEffect(()=>{
    if(error === null && data){
        navigate(`/link/${data[0].id}`)
    }
  }, [error, data]);


  const createNewLink = async () => {
    setErrors([]);
    try {
        await schema.validate(formValues, {abortEarly: false});
        const canvas = ref.current.canvasRef.current;
        const blob = await new Promise((resolve) => canvas.toBlob(resolve));

        await fncreateUrl(blob)
    } catch (e) {
        const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors)
    }
  }


  return (
    <div>
      <Dialog
        defaultOpen={longLink}
        onOpenChange={(res) => {
          if (!res) setSearchParams({});
        }}
      >
        <DialogTrigger>
          <Button variant="destructive">Create New Link</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-bold text-2xl text-[#dcb14c]">
              Create New
            </DialogTitle>
          </DialogHeader>

          <Input
            id="title"
            placeholder="Short Link's Title"
            value={formValues.title}
            onChange={handleChange}
          />
          {errors.title && <Error message={errors.title} />}

          <Input
            id="longUrl"
            placeholder="Enter Your Long URL"
            value={formValues.longUrl}
            onChange={handleChange}
          />
          {errors.longUrl && <Error message={errors.longUrl} />}

          <div className="flex items-center gap-2">
            <Card className="p-2">slimklink.io</Card> /
            <Input
              id="customUrl"
              placeholder="Custom Link (optional)"
              value={formValues.customUrl}
              onChange={handleChange}
            />
          </div>
          {/* {error && <Error message={"Custom URL already taken"} />} */}
          {error && <Error message={error.message} />}

          {formValues?.longUrl && (
            <div className="flex flex-col gap-2 text-[#dcb14c] font-semibold sm:max-w-md items-center  sm:items-start">
              <span>QR For Short URL</span>
              <QRCode ref={ref} size={150} value={formValues?.longUrl} />
            </div>
          )}

          <DialogFooter className="sm:justify-start">
            <Button disabled={loading} type="submit" variant="destructive" onClick={createNewLink}>
            {loading ? <BeatLoader size={10} color="#e1ba60" /> : "Create Short URL"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateLink;

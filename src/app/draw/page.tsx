// app/draw/PageClient.tsx
"use client";

import React, { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

const CreateCraft = () => {
  const searchParams = useSearchParams();
  const [isFetched, setIsFetched] = useState(false);
  const width = parseInt(searchParams.get("w") || "100", 10);
  const height = parseInt(searchParams.get("h") || "100", 10);
  const mutate = useMutation(api.crafts.createCraft);
  const isValid = !isNaN(width) && !isNaN(height);
  const router = useRouter();

  const createCraft = async () => {
    const id = await mutate({ w: width, h: height });
    setIsFetched(true);
    if (id) {
      router.push("/draw/" + id);
    } else {
      toast.error("error");
    }
  };

  useEffect(() => {
    if (isValid && !isFetched) {
      createCraft();
    }
  }, [width, height]);

  if (!isValid) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Invalid query params, bro.
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen text-muted-foreground">
      <Loader2 className="h-10 w-10 animate-spin mb-2" />
      <p className="text-lg font-medium">Creating your craft...</p>
    </div>
  );
};

const page = () => {
  return (
    <Suspense>
      <CreateCraft/>
    </Suspense>
  )
}

export default page

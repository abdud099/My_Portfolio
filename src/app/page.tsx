"use client";

import { Toaster } from "@/components/ui/toaster";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Page() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  if (!isClient) return null;

  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

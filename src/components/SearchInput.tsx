"use client";
import debounceHook from "@/hooks/debounceHook";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import qs from 'query-string';
import Input from "./Input";

const SearchInput = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const debounceValue = debounceHook<string>(value, 500);
  useEffect(()=>{
    const query = {
        searchTerm: debounceValue,
    }
    const url = qs.stringifyUrl({
        url:'/search',
        query: query
    })
    router.push(url);
  },[debounceValue, router])
  return <div>
    <Input placeholder="Search by song title or author." value={value} onChange={(e)=>{setValue(e.target.value)}}/>
  </div>;
};

export default SearchInput;
